import { Router } from "express";
import { productModel } from "../models/products.js";

const router = Router();

router.get(`/`,async(req,res)=>{
    const products = productModel.find();
    return res.render(`home`,{products, styles:`styles.css`});
})

router.get('/realtimeproducts', (req,res)=>{
    return res.render('realTimeProducts');
});

export default router;