import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        await mongoose.connect("mongodb+srv://Bosco:bosco2135@solutioneus.xefhlef.mongodb.net/ecommerce");
        console.log("Base de datos online");
    } catch (error) {
        console.log(`Error al levantar la base de datos ${error}`);
        process.exit(1);
    }
}