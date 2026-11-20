import Product from "../models/product.js";

const obtenerProductos = async (req, res) => {
  const productos = await Product.find({ estado: true }).populate(
    "usuario",
    "email username role",
  );
  const total = await Product.countDocuments({ estado: true });

  return res.status(200).json({
    ok: true,
    total,
    productos,
  });
};

const crearProducto = async (req, res) => {
  const nombre = req.body.nombre.toUpperCase();

  try {
    const validarNombre = await Product.findOne({ nombre }).populate(
      "product",
      "precio categoria descripcion imagen nombre",
    );

    if (validarNombre) {
      return res.status(400).json({
        ok: false,
        message: `El producto: ${nombre} ya existe`,
      });
    }

    //const usuario = req.user._id;

    const producto = new Product({
      precio,
      categoria,
      descripcion,
      imagen,
      nombre,
    });

    await producto.save();

    return res.status(201).json({
      ok: true,
      message: "Se agregó un nuevo producto",
      categoria,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};

export { obtenerProductos, crearProducto };
