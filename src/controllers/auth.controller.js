import User from "../models/User.js";
import { sendVerificationEmail } from "../config/nodemailer.js";
import { generateToken } from "../utils/jwt.js";

const getUsers = async (req, res) => {
  const users = await User.find();
  res.json({
    msg: "Todo bien",
    users,
  });
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = new User({ username, email, password });
    //Genera el còdigo de verificacion - Primero se crea el método está en el modelo de user
    const verificationCode = user.generateVerificationCode();
    console.log(verificationCode); //tengo q dejar este console log xq no manda el mail

    await user.save();
    //Enviamos el mail de verificacion
    await sendVerificationEmail(email, username, verificationCode);

    return res.status(201).json({
      ok: true,
      msg: "Usuario creado!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "Credenciales incorrectas",
      });
    }

    //para chequear con el método creado en user
    const isPasswordValid = user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(403).json({
        ok: false,
        message: "Credenciales incorrectas",
      });
    }

    //se chequea si el codigo esta verificado
    if (!user.emailVerified) {
      return res.status(403).json({
        ok: false,
        message: "El email no está verificado",
      });
    }
    //generar y guardar el token en las cookies
    const token = generateToken(user._id);

    //Cookies
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000, //1hora
    };

    res.cookie("token", token, cookieOptions);

    //Iniciar sesión
    return res.status(200).json({
      ok: true,
      message: "Login exitoso!",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { code, email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    if (user.verificationCode !== code) {
      return res.status(400).json({
        ok: false,
        message: "Código de verificación incorrecto",
      });
    }

    if (user.verificationCodeExpires < Date.now()) {
      return res.status(400).json({
        ok: false,
        message: "Código de verificación ya expiró",
      });
    }

    user.emailVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpires = null;

    await user.save();

    return res.status(200).json({
      ok: true,
      message: "Email verificado correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({
      msg: "Usuario no encontrado",
    });
  }
  await User.findByIdAndDelete(id);

  return res.status(200).json({
    msg: "Usuario eliminado",
  });
};

export { getUsers, register, login, verifyEmail, deleteUser };
