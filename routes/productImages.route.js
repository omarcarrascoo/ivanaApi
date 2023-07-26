const router = require("express").Router();
const multer = require('multer');
const Events = require("../models/Events");
const Product = require("../models/Product");
// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
  }
});

const upload = multer({ storage });

// Handle file upload
router.post('/uploadcompress/:id', upload.array('images'), async (req, res) => {
  try {
    // Access the uploaded files using req.files
    const files = req.files;
    // Array to store the names of the compressed images
    // const compressedImageNames = files.map((file)=>{
    // });
    const compressedImageNames = files.map((item) =>item.filename)
    console.log(files);
    console.log(compressedImageNames);
    // Add watermark and compress each file, and convert to WebP
    const imgArray = await Product.findById(req.params.id)
    console.log(imgArray.img);
    const objct =  imgArray.img.concat(compressedImageNames)

    const property = await Product.findByIdAndUpdate(req.params.id, {
        $set: { img: objct }
      }, {
        new: true
      });
  
      await property.save();

    res.send('Files uploaded');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred during file upload');
  }
});

router.put('/deleteImg/:id', async(req, res) =>{
  const imgRoute= req.body;
  const reverse = imgRoute
  try {
    const img = await Product.findByIdAndUpdate(req.params.id, {
      $set:{img: reverse}
    },
    {new:true})
    console.log(req.body)
    console.log(img)
  } catch (error) {
    console.log(error)
  }
} )






router.post('/uploadEvent/:id', upload.array('images'), async (req, res) => {
  try {
    // Access the uploaded files using req.files
    const files = req.files;
    // Array to store the names of the compressed images
    // const compressedImageNames = files.map((file)=>{
    // });
    const compressedImageNames = files.map((item) =>item.filename)
    console.log("Event iimage information");
    console.log(files);
    console.log(compressedImageNames);
    // Add watermark and compress each file, and convert to WebP
    const imgArray = await Events.findById(req.params.id)
    console.log(imgArray.img);
    const objct =  imgArray.img.concat(compressedImageNames)
    
    const property = await Events.findByIdAndUpdate(req.params.id, {
        $set: { img: objct }
      }, {
        new: true
      });
  
      await property.save();

    res.send('Files uploaded');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred during file upload');
  }
});

router.put('/deleteImgEvent/:id', async(req, res) =>{
  const imgRoute= req.body;
  const reverse = imgRoute
  try {
    const img = await Events.findByIdAndUpdate(req.params.id, {
      $set:{img: reverse}
    },
    {new:true})
    console.log(req.body)
    console.log(img)
  } catch (error) {
    console.log(error)
  }
} )

module.exports = router;

