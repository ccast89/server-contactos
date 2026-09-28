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

export { getContacts, postContact };
