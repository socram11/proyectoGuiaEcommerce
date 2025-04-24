const { Article, User } = require("../models");

async function index(req, res) {
  try {
    const articles = await Article.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
          r,
        },
      ],
    });
    res.status(200).json(articles);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error al obtener artículos", details: err.message });
  }
}

async function show(req, res) {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ error: "Artículo no encontrado" });
    }
    res.status(200).json(article);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error al buscar el artículo", details: err.message });
  }
}

async function store(req, res) {
  try {
    const { title, content, author } = req.body;
    const newArticle = await Article.create({ title, content });
    res.status(201).json(newArticle);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Error al crear el artículo", details: err.message });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { title, content, author } = req.body;

    const [updatedRowsCount] = await Article.update(
      { title, content, author },
      { where: { id } }
    );

    if (updatedRowsCount === 0) {
      return res
        .status(404)
        .json({ error: "Artículo no encontrado o sin cambios" });
    }

    const updatedArticle = await Article.findByPk(id);
    res.status(200).json(updatedArticle);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Error al actualizar el artículo", details: err.message });
  }
}

async function destroy(req, res) {
  try {
    const deletedRowsCount = await Article.destroy({
      where: { id: req.params.id },
    });

    if (deletedRowsCount === 0) {
      return res.status(404).json({ error: "Artículo no encontrado" });
    }

    res.status(200).json({ message: "Artículo eliminado correctamente" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error al eliminar el artículo", details: err.message });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
