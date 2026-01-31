
const ImageKit = require('imagekit')


const cors = require('cors')
const fs = require('fs')
const axios = require('axios')
const multer = require('multer')
const FormData = require('form-data')
const path = require('path')

const imageModel = require('./models/image.model')

const uploadDir = path.join(__dirname, "./uploads");
dotenv.config()


const imageKit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  urlEndpoint: process.env.URL_ENDPOINT,
})

const upload = multer({ storage: multer.memoryStorage() });

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const form = new FormData();
    form.append("image", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const response = await axios.post(
      "https://web-production-167be.up.railway.app/remove-bg",
      form,
      {
        headers: form.getHeaders(),
        responseType: "arraybuffer",
      }
    );
    // const uploadResult = await imageKit.upload({
    //   file : 
    // })

    const uploadResult = await imageKit.upload({
      file: response.data,              // 🔥 buffer directly
      fileName: `bg-${Date.now()}.png`,
      folder: "/products",              // optional but recommended
    });

    const imageDoc = await imageModel.create({
      url: uploadResult.url,
      fileId: uploadResult.fileId,
      folder: uploadResult.filePath,
    })

    const outputName = `bg-${Date.now()}.png`;
    const outputPath = path.join(uploadDir, outputName);

    fs.writeFileSync(outputPath, response.data);

    return res.status(201).json({
      message: "upload done",
      imageUrl: outputName,
      imageDoc
    });

  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Background remove failed");
  }
});
app.use("/uploads", express.static(uploadDir));

app.get("/images", (req, res) => {
  try {
    const files = fs.readdirSync(uploadDir);

    const images = files.filter(file =>
      file.endsWith(".png") || file.endsWith(".jpg") || file.endsWith(".jpeg")
    );

    return res.json({
      images, // ["bg-123.png", "bg-456.png"]
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to load images" });
  }
});
