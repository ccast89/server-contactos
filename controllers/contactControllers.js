import Contact from "../models/contact.js";

const getContacts = async (req, res) => {
  const contacts = await Contact.find();

  res.json({
    contacts,
  });
};

const postContact = async (req, res) => {
  const { name, phone, email } = req.body;

  const contact = new Contact({
    name,
    phone,
    email,
  });

  await contact.save();

  res.json({
    msg: "Contacto guardado",
    contact,
  });
};

const putContact = async (req, res) => {
  const { id } = req.params;

  const contacto = await Contact.findById(id);

  if (!contacto) {
    return res.status(404).json({
      msg: "Contacto no encontrado",
    });
  }

  contacto.modified = !contacto.modified;

  await contacto.save();

  return res.status(200).json({
    msg: "Información de contacto modificada exitosamente!",
    contacto,
  });
};

const deleteContact = async (req, res) => {
  const { id } = req.params;

  const contacto = await Contact.findById(id);

  if (!contacto) {
    return res.status(404).json({
      msg: "Contacto no encontrado",
    });
  }
  await Contact.findByIdAndDelete(id);

  return res.status(200).json({
    msg: "Contacto eliminado",
  });
};

export { getContacts, postContact, putContact, deleteContact };
