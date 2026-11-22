import { request, response } from "express";
import Product from "../models/Product.js";

///obtener lista de productos

const obtenerProductos = async (req, res) => {
  const { limite = 5, desde = 0 } = req.query;
  try {
    const [total, productos] = await Promise.all([
      Product.countDocuments({ estado: true }),
      Product.find({ estado: true })
        .limit(limite)
        .skip(desde)
        .populate("usuario", "username main role")
        .populate("categoria", "nombre"),
    ]);

    return res.json({
      total,
      productos,
    });
  } catch (error) {
    console.log(error);
  }
};

const crearProducto = async (req, res) => {
  try {
    const { precio, categoria, descripcion, img } = req.body;
    const nombre = req.body.nombre.toUpperCase();

    const productoDB = await Product.findOne({ nombre });

    if (productoDB) {
      return res.status(400).json({
        message: `El producto con el nombre ${productoDB.nombre} ya existe`,
      });
    }

    const data = {
      nombre,
      categoria,
      precio,
      descripcion,
      img,
      usuario: req.user._id,
    };

    const producto = new Product(data);

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

const actualizarProducto = async (req = request, res = response) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    const { precio, categoria, descripcion, disponible } = req.body;
    const usuario = req.user._id;

    let data = {
      precio,
      categoria,
      descripcion,
      disponible,
      estado,
      usuario,
    };
    if (req.body.nombre) {
      data.nombre = req.body.nombre.toUpperCase();
    }

    await Product.findByIdAndUpdate(id, data);

    res.status(200).json({
      ok: true,
      message: "Prducto actualizado",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};

const borrarProducto = async (req, res) => {
  const { id } = req.params;

  await Product.findByIdAndUpdate(id, { estado: false });

  res.status(200).json({
    ok: true,
    message: "Producto eliminado",
  });
};
export { obtenerProductos, crearProducto, actualizarProducto, borrarProducto };
