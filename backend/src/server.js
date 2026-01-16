const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
dotenv.config()

const PORT = process.env.PORT || 3000




app.get('/', (req, res) => {
  res.send("server is running")
})


app.listen(PORT, () => {
  console.log(`server is running in the port : ${PORT}`)
})