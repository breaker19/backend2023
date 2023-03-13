import express, { Router } from 'express'
import { productRouter } from '../router/productRouter.js';
import { cartRouter } from '../router/cartRouter.js';
const app = express()


app.use("/", productRouter);
app.use("/", cartRouter);














const server = app.listen(3004)
