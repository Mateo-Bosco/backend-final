import {Schema, model} from "mongoose";

const nameCollection = `Cart`

const CartSchema = new Schema({
    products:[
        {
            id:{
                type:Schema.Types.ObjectId,
                ref:`Product`
            },
            quantity:{
                type:Number,
                required:[true, `La cantidad del producto es obligatoria`]
            }
        }
    ]
});

export const cartModel = model(nameCollection, CartSchema);