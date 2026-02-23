const ownerModel = require('../models/owner.model')
const bcrypt = require('bcrypt')

module.exports.createOwner = async (req, res) => {
  try {
    const { fullname, email, password, contact } = req.body;

    let existingOwner = await ownerModel.find();

    if (existingOwner.length > 0) {
      return res.status(409).json({ message: "You Have No Permission to created Owner" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)

    let owner = await ownerModel.create({
      fullname,
      email,
      password: hash,
      contact,
    })
    res.status(201).json({
      message: "Owner created successfully",
      owner,
    });

  } catch (err) {
    console.error("Create Owner Error:", err);
    res.status(500).json({ message: "Internal Server Error" })
  }
}
