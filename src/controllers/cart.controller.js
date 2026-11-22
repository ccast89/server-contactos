import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

//Obtener el carrito del usuario
export const getItems = async (req, res) => {
  try {
    const cart = await Cart.findOne({ usuario: req.user._id }).populate(
      "items.producto",
    );
    //console.log(cart.items.length);
    return res.status(200).json(cart || { items: [], total: 0 });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};

//agregar producto al carrito

export const addItem = async (req, res) => {
  try {
    const { productoId, cantidad } = req.body;
    let producto = await Product.findById(productoId);
    let cart = await Cart.findOne({ usuario: req.user._id });

    if (!cart) {
      cart = new Cart({ usuario: req.usuario._id, items: [] });
    }

    const itemExiste = cart.items.find(
      (item) => item.producto.toString() === productoId,
    );

    if (itemExiste) {
      itemExiste.cantidad += cantidad;
    } else {
      cart.items.push({
        producto: productoId,
        cantidad,
        precioUnitario: producto.precio,
      });
    }

    cart.calcularTotal();

    await cart.save();
    return res.status(200).json({
      ok: true,
      message: "Producto agregado al carrito",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};
