const express=require("express")
const router=express.Router()
const Vendor=require("../models/Vendor")
const vendorControllers=require("../controllers/vendorControllers")

router.post("/register",vendorControllers.vendorRegister);
router.post("/login",vendorControllers.vendorLogin);

module.exports=router