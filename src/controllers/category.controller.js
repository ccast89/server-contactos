import Categoria from "../models/category.js";

const getCategories = async (req, res) => {
  const categorias = await Categoria.find({ estado: true }).populate(
    "usuario",
    "username email role",
  );
  const total = await Categoria.countDocuments({ estado: true });

  return res.status(200).json({
    ok: true,
    total,
    categorias,
  });
};

const addCategory = async (req, res) => {
  const nombre = req.body.nombre.toUpperCase();

  try {
    const validarNombre = await Categoria.findOne({ nombre });

    if (validarNombre) {
      return res.status(400).json({
        ok: false,
        message: `La categoría ${nombre} ya existe`,
      });
    }

    const usuario = req.user._id;

    const categoria = new Categoria({ nombre, usuario });

    await categoria.save();

    return res.status(201).json({
      ok: true,
      message: "Se creó una nueva categoría",
      categoria,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  const nombre = req.body.nombre.toUpperCase();
  const validarNombre = await Categoria.findOne({ nombre, _id: { $ne: id } });
  console.log("ID recibido:", id);
  console.log("Nombre recibido:", nombre);
  console.log("Categoría encontrada:", validarNombre);
  if (validarNombre) {
    return res.status(400).json({
      ok: false,
      message: `Ya existe una categoría ${nombre}`,
    });
  }

  const datos = {
    nombre,
    estado,
    usuario: req.user._id,
  };
  const categoria = await Categoria.findByIdAndUpdate(id, datos, {
    returnDocument: "after",
  });

  res.status(200).json({
    ok: true,
    message: "Categoria actualizada",
    categoria,
  });
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  if (!existeCategoria.estado) {
    return res.status(400).json({
      ok: false,
      message: `La categoría ${existeCategoria.nombre} no está activa`,
    });
  }

  const categoriaborrada = await Categoria.findByIdAndUpdate(
    id,
    { estado: false },
    { returnDocument: "after" },
  );

  return res.status(200).json({
    ok: true,
    message: "Categoría eliminada",
    categoriaborrada,
  });
};
export { getCategories, addCategory, updateCategory, deleteCategory };
