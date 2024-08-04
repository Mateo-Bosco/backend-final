import { request, response } from "express";
import { productModel } from "../models/products.js";

export const getProducts = async ( req = request, res = response) => {
    try{
        // TODO: terminar el metodo
        // const { limit } = req.query;
        const products = await productModel.find();
        return res.json({ products });
    } catch {
        console.log(`getProducts -> `, error);
        return res.status(500).json({msg:`Hablar con un administrador`});
    }
}

export const getProductsById = async ( req = request, res = response) => {
    try{
        const {pid} = req.params;
        const product = await productModel.findById(pid);
        if(!product)
            return res.status(404).json({ msg:`El producto con id ${pid} no existe` });
        return res.json({ products });
    } catch {
        console.log(`getProductsById -> `, error);
        return res.status(500).json({msg:`Hablar con un administrador`});
    }
}

export const addProduct = async ( req = request, res = response) => {
    try{
        const { title, description, price, thumbnails, code, stock, category, status} = req.body;
        if (!title, !description, !code, !price, !stock, !category)
            return res.status(404).json({ msg: `los campos [title, description, price, code, stock, category, status] son obligatorios`})

        const product = await productModel.create({title, description, price, thumbnails, code, stock, category, status});
        return res.json({product});
    } catch {
        console.log(`addProduct -> `, error);
        return res.status(500).json({msg:`Hablar con un administrador`});
    }
}
export const updateProduct = async ( req = request, res = response) => {
    try{
        const {pid} = req.params;
        const { id, ...rest} = res.body;
        const product = await productModel.findByIdAndUpdate(pid,{...rest},{new: true});
        if(product)
            return res.json({msg:`producto actualizado`, product});
        return res.status(404).json({msg:`No se pudo actualizar el producto con el id ${pid}`});
    } catch {
        console.log(`updateProduct -> `, error);
        return res.status(500).json({msg:`Hablar con un administrador`});
    }
}

export const deleteProduct = async ( req = request, res = response) => {
    try{
        const {pid} = req.params;
        const product = await productModel.findByIdAndDelete(pid);
        if(product)
            return res.json({msg:`producto eliminado`, product});
        return res.status(404).json({msg:`No se pudo eliminar el producto con el id ${pid}`});
    } catch {
        console.log(`deleteProduct -> `, error);
        return res.status(500).json({msg:`Hablar con un administrador`});
    }
}