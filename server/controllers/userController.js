const userService = require("../service/userService.js");
const auth = require("../auth/auth.js");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_JWT;
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
    const payload = { id: user.id, email: user.email };
    const token = auth.generateAccessToken(payload);
    const referralLink = `${user.referralCode}`;
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

async function getProfileById(req, res) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token não fornecido' });

    const decoded = jwt.verify(token, secretKey);

    const user = await User.findByPk(decoded.id, {
      attributes: ['id', 'name', 'email', 'score', 'referralCode']
    });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    const referralLink = `${user.referralCode}`;
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      score: user.score,
      referralLink
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}

async function updateUser(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if(!user){
        return res.status(404).json({ message: "Usuário não encontrado." });
    }
    const { name, email, password} = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    await user.save();
    res.json({ message: "Usuário atualizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar usuário." });
  }
}

async function deleteUser(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if(!user){
        return res.status(404).json({ message: "Usuário não encontrado" });
    }
    await user.destroy();
    res.json({ message: "Usuário apagado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao apagar usuário." });
  }
}


module.exports = { register, login, getScore,getProfileById, updateScore, updateUser, deleteUser };
