import {initMongoDB} from './daos/mongodb/connection.js'
import express from "express"
import morgan from "morgan"
import 'dotenv/config'
import productsRouter from './routes/product.router.js'
import cartsRouter from "./routes/cart.router.js"
import { Server } from "socket.io"
import { __dirname } from "./utils.js"
import handlebars from "express-handlebars"
const app = express()




//statics
app.use(express.static(__dirname + "/public"));

//para realizar consultas en la URL (req.query)
app.use(express.urlencoded({extended: true}));
//middlewares basicos
app.use(express.json());
app.use(morgan('dev'));
//handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");


//rutas

app.use('/products', productsRouter)
app.use('/carts', cartsRouter)
app.use('/chat', )
// app.use('/message', messageRouter)

if(process.env.PERSISTENCE === 'MONGO') initMongoDB()

const PORT =8080;

// app.listen(PORT,()=>console.log(`SERVER UP ON PORT ${PORT}`))
const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`)});

//ejecuto server IO
const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    })

    socket.emit('saludoDesdeBack', 'Bienvenido a websockets')

    socket.on('getProducts', async (message) => {
        console.log(message);
        socket.emit('allProducts', await productManager.getProducts())
    })

    socket.on('newProduct', async (prod) => {
        await productManager.addProduct(prod)
        socketServer.emit('products', await productManager.getProducts());
    })

    socket.on('deleteProduct', async(id)=>{
        await productManager.deleteProduct(id)
    })
})