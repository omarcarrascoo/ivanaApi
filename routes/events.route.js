const { verifyToken, verifyTokenAuthorization, verifyTokenAdmin } = require("./verifyToken.route");
const Events = require("../models/Events.js");
const router = require("express").Router();


//CREATE
router.post("/", verifyTokenAdmin, async (req,res)=>{
    const newProduct = new Events(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct)
    } catch (error) {
        res.status(500).json(error)
    }
})
//UPDATE
router.put("/:id",verifyTokenAdmin, async  (req,res)=>{
    try {
        const updatedProduct = await Events.findByIdAndUpdate(req.params.id, 
            {
            $set: req.body
            },
            {new:true}
        );
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
})


//DELEATE
router.delete("/:id", verifyTokenAdmin, async (req,res)=>{
    try {
        await Events.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted")
    } catch (error) {
       res.status.json(error) 
    }
})
//GET PRODUCT
router.get("/find/:id", async (req,res)=>{
    try {
        const product = await Events.findById(req.params.id)
        res.status(200).json(product);
    } catch (error) {
       res.status.json(error) 
    }
})
//GET ALL PRODUCTS
router.get("/", async (req,res) => {
    const qNew = req.query.new;
    const qCategory =  req.query.category;
    try {
        let products;

        if(qNew){
            products = await Events.find().sort({createdAt: -1}).limit(1)
        }else if(qCategory){
            products = await Events.find({
                categories: {
                    $in: [qCategory],
                }
            });
        }else {
            products = await Events.find();
        }
        res.status(200).json(products);
    } catch (error) {
        console.log(products);
       res.status.json(error) 
    }
})

module.exports = router;