import { request, response } from "express";
import { cartModel } from "../models/carts.js";

export const getCartById =async ( req = request, res = response)=>{
    try{
        const {cid} = req.params;
        const cart = await cartModel.findById(cid);

        if(cart)
            return res.json({ cart });
        return res.status(404).json({msg:`El carrito con id ${cid} no existe`})
    } catch (error) {
        console.log(`getCartById -> `, error);
        return res.status(500).json({msg:`Hablar con un administrador`});
    }
};

export const createCart =async ( req = request, res = response)=>{
    try{
        const cart = await cartModel.create({});
        return res.json({msg:`Carrito creado exitosamente`, cart });
    } catch (error) {
        console.log(`getCartById -> `, error);
        return res.status(500).json({msg:`Hablar con un administrador`});
    }
};

export const addProductInCart =async ( req = request, res = response)=>{
    try{
        const {cid, pid} = req.params;
        const cart = await cartModel.findById(cid);


        if(!cart)
            return res.status(404).json({msg:`El carrito con ${cid} no existe`});

        const productIncart = cart.products.find(p=>p.id.toString() === pid);

        if (productIncart) 
            productIncart.quantity++;
        else
            cart.products.push({ id: pid, quantity: 1 });

        cart.save();

        return res.json({msg:`carrito actualizado!`, cart})
    } catch (error) {
        console.log(`getCartById -> `, error);
        return res.status(500).json({msg:`Hablar con un administrador`});
    }
};