const userService = require("../services/userService.js");
const auth = require("../auth/auth.js");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

async function register(req, res) {
  const { name, email, password, ref } = req.body;
  if (!name || !password || !email) {
    return res.status(400).json({ error: "Campos obrigatórios em branco" });
  }
  try {
    const user = await userService.getByEmail(email);
    if (user) {
      return res
        .status(400)
        .json({ error: "Email já cadastrado tente novamente" });
    }
    const newUser = { name: name, password: password, email: email };
    await userService.create(newUser);
    if (ref) {
      const referrer = await User.findOne({ where: { referralCode: ref } });
      if (referrer) {
          referrer.score += 1;
          await referrer.save();
      }
    }
    return res.status(200).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Campos obrigatórios em branco" });
  }
  try {
    const user = await userService.getByEmail(email);
    if (!user) {
      return res.status(400).json({ error: "Email não cadastrado" });
    }
    const hashedPassword = user.password;
    const ok = await bcrypt.compare(password, hashedPassword);
    if (!ok) {
      return res.status(400).json({ error: "Senha incorreta!" });
    }
    const payload = { id: user.user_id, email: user.email };
    const token = auth.generateAccessToken(payload);
    const referralLink = `https://SEU_DOMINIO/register?ref=${user.referralCode}`;
    return res.status(200).json({ token: token, referralLink });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function getScore(req, res) {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ["id", "name", "score"],
    });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.json({ score: user.score });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar pontuação do usuário" });
  }
}

async function updateScore(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    const { score } = req.body;
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    user.score = score;
    await user.save();
    res.json({
      message: "Pontuação atualizada com sucesso",
      score: user.score
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar pontuação do usuário" });
  }
}

module.exports = { register, login, getScore, updateScore };
