const { ObjectId } = require('mongodb')
const { db } = require('../db/connect')

const getContacts = async (req, res) => {
  db()
    .collection('contacts')
    .find()
    .toArray((error, result) => {
      if (error) {
        res.status(500).json({ error })
      } else {
        res.status(200).json(result)
      }
    })
}

const getContact = async (req, res) => {
  const _id = ObjectId(req.params.id)
  db()
    .collection('contacts')
    .findOne({ _id }, (error, result) => {
      if (error) {
        return res.status(500).json({ error })
      } else {
        return res.status(200).json(result)
      }
    })
}

const createContact = async (req, res) => {
  if (
    req.body.firstName &&
    req.body.lastName &&
    req.body.email &&
    req.body.birthday &&
    req.body.favoriteColor
  ) {
    db()
      .collection('contacts')
      .insertOne(req.body, (error, result) => {
        if (error) {
          return res.status(500).json({ error })
        } else {
          return res.status(201).json({ id: result.insertedId })
        }
      })
  } else {
    return res.status(400).json({ error: 'Missing required data' })
  }
}

const updateContact = async (req, res) => {
  const _id = ObjectId(req.params.id)
  if (
    req.body.firstName ||
    req.body.lastName ||
    req.body.email ||
    req.body.birthday ||
    req.body.favoriteColor
  ) {
    db()
      .collection('contacts')
      .updateOne({ _id }, { $set: req.body }, (error) => {
        if (error) {
          return res.status(500).json({ error })
        } else {
          return res.status(204).json()
        }
      })
  } else {
    return res
      .status(400)
      .json({ error: 'Please provide data to update the contact with' })
  }
}

const deleteContact = async (req, res) => {
  const _id = ObjectId(req.params.id)
  db()
    .collection('contacts')
    .deleteOne({ _id }, (error) => {
      if (error) {
        return res.status(500).json({ error })
      } else {
        return res.status(204).json()
      }
    })
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
}
