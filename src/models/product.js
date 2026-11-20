import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      unique: true,
    },
    estado: {
      type: Boolean,
      default: true,
    },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    precio: {
      type: Number,
      default: 0,
    },
    categoria: {
      type: Schema.Types.ObjectId,
      ref: "Categoria",
    },
    descripcion: {
      type: String,
    },
    disponible: {
      type: Boolean,
      default: true,
    },
    img: {
      type: String,
      //default: ,
    },
  },
  {
    timestamps: true,
  },
);

export default model("Product", ProductSchema);
