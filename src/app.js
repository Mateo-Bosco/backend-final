import express from "express";
import {Server, Socket} from 'socket.io';
import {engine} from 'express-handlebars';

import products from "./routers/products.js";
import carts from "./routers/carts.js";
import views from "./routers/views.js";
import __dirname from "./utlis.js";
import { dbConnection } from "./database/config.js";
import { productModel } from "./models/products.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', views);
app.use(`/api/products`, products);
app.use(`/api/carts`, carts);

await dbConnection();

const expressServer = app.listen(PORT, ()=>{console.log(`Corriendo aplicación en el puerto ${PORT}`);});
const io = new Server(expressServer);

io.on('connection',async(socket)=>{
    const products = await productModel.find();
    socket.emit('products', products);

    socket.on('addProduct', product=>{
        const newProduct = productModel.create({...product});
        if(newProduct){
            products.push(newProduct);
            socket.emit('products', products);
        }
    });
});
