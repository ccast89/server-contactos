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
      required: true,
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
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBMlmZMyak30Jn6GOX4jFDAyu90OLghCqL23-lwES2yA&s=10",
    },
  },
  {
    timestamps: true,
  },
);

export default model("Product", ProductSchema);
