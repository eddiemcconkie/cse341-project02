const { db } = require('../db/connect')

const getContacts = async (req, res) => {
  const result = await db().collection('contacts').find()
  result.toArray().then((contacts) => {
    res.status(200).json(contacts)
  })
}

const getContact = async (req, res) => {
  const id = req.params.id
  const result = await db().collection('contacts').find({ id })
  result.toArray().then((contact) => {
    res.status(200).json(contact)
  })
}

module.exports = {
  getContacts,
  getContact,
}
