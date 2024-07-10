const Contact = require("../../models/Contact.model");

const createContact = async (req, res) => {
  try {
    const contact = new Contact({
     name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
      
    });
    await contact.save().then((contact) => {
      res.status(201).json({ data: contact, status: 201 });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const getContacts = async (req, res) => {
  try {
    var contacts = await Contact.find();
    res.status(200).json({ data: contacts, status: 200 });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
}


module.exports = {
  createContact,
  getContacts,
};