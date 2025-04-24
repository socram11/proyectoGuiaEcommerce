const { User } = require("../models");

async function index(req, res) {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ error: "error al obtener usuarios", details: err.message });
  }
}

async function show(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(400).json({ error: "usuario no encontrado" });
    }
    res.status(200).json.user;
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error al buscar el usuario", details: err.message });
  }
}

async function store(req, res) {
  try {
    const { firstname, lastname, email, password } = req.body;
    const newUser = await User.create({ firstname, lastname, email, password });
    res.status(201).json(newUser);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Error al crear el usuario", details: err.message });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, password } = req.body;

    const [updatedRowsCount] = await User.update(
      { firstname, lastname, email, password },
      { where: { id } }
    );

    if (updatedRowsCount === 0) {
      return res
        .status(404)
        .json({ error: "Usuario no encontrado o sin cambios" });
    }

    const updatedUser = await User.findByPk(id);
    res.status(200).json(updatedUser);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Error al actualizar el usuario", details: err.message });
  }
}

async function destroy(req, res) {
  try {
    const deletedRowsCount = await User.destroy({
      where: { id: req.params.id },
    });

    if (deletedRowsCount === 0) {
      return res.status(404).json({ error: "Uusario no encontrado" });
    }

    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error al eliminar el usuario", details: err.message });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
