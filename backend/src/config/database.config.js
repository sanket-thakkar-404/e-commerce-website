const mongoose = require('mongoose')
const debug = require('debug')("development:mongoose");

const connectedToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    debug('mongodb Connected Successfully')
  } catch (err) {
    debug('Failed To Connect DB :', err.message)
    process.exit(1)
  }
}

module.exports = connectedToDb