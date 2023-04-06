import express, { Router } from 'express'
import { productRouter } from '../router/productRouter.js';
import { cartRouter } from '../router/cartRouter.js';
import  productosDb  from '../dao/mongoDb.js';

const app = express()
app.use("/", productRouter);
app.use("/", cartRouter);


// import { MongoClient} from 'mongodb';
// const uri = "mongodb+srv://sebakarp26:floresycolores@test.ctqc9tr.mongodb.net/Eccommerce?retryWrites=true&w=majority";
// const client = new MongoClient(uri);
// await client.connect()
//   const productosDb = client.db().collection("products");
// const productoEncontrado= await productosDb.findOne()

// console.log(productoEncontrado)
//  await  client.close();




try {
productosDb.find()
}
catch (err) {
console.log(err)
}


const server = app.listen(3004)
