const user = require('../models/User');

async function getByEmail(email) {
  return await user.findOne({ where: { email: email } });
}

async function create(newUser) {
  return await user.create(newUser);
}

async function getById(id) {
  return await user.findByPk(id);
}

async function update(id, updatedUser) {
  const userToUpdate = await user.findByPk(id);
    if (!userToUpdate) {
        throw new Error('Usuário não encontrado');
    }
    return await userToUpdate.update(updatedUser);
}

async function remove(id) {
  const userToDelete = await user.findByPk(id);
    if (!userToDelete) {
        throw new Error('Usuário não encontrado');
    }
    return await userToDelete.destroy();
}

module.exports = { getByEmail ,getById, create, update, remove };
