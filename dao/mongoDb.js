import { MongoClient} from 'mongodb';
const uri = "mongodb+srv://sebakarp26:pass@test.ctqc9tr.mongodb.net/Eccommerce?retryWrites=true&w=majority";
const client = new MongoClient(uri);
await client.connect()
  const productosDb = client.db().collection("products");
const productoEncontrado= await productosDb.findOne()

console.log(productoEncontrado)
 await  client.close();

 export default productosDb
 