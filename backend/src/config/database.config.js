const mongoose = require('mongoose')



const connectedToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('mongodb Connected Successfully')
  } catch (err) {
    console.error('Failed To Connect DB :', err.message)
    process.exit(1)
  }
}



module.exports = connectedToDb