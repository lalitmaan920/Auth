const express = require("express");
const ensureAuthenticate = require("../Middlewares/Auth");
const Product = require('../Models/Product');

const router = require("express").Router();


router.get('/', ensureAuthenticate, async (req,res)=>{
    const products = await Product.find();
    return res.json([
        {
            name:"Chestn gold",
            description:"Cheston Cold Tablet is used in the treatment of common cold symptoms like runny nose, stuffy nose, sneezing, watery eyes, and congestion or stuffiness. It is also used to relieve pain and fever.",
            price:"35"
        },
         {
            name:"Asprin",
            description:"Aspirin is in a group of medications called salicylates. It works by stopping the production of certain natural substances that cause fever, pain, swelling, and blood clots",
            price:"75"
        },
         {
            name:"Azithromycin",
            description:"Azithromycin belongs to the class of drugs known as macrolide antibiotics. It works by killing bacteria or preventing their growth. However, this medicine will not work for colds, flu, or other virus infections. This medicine is available only with your doctor's prescription.",
            price:"80"
        }
    ])
});


module.exports=router;