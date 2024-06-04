import {initMongoDB} from './daos/mongodb/connection.js'
import express from "express"
import morgan from "morgan"
import 'dotenv/config'
import productsRouter from './routes/product.router.js'
import cartsRouter from "./routes/cart.router.js"
import { Server } from "socket.io"
import { __dirname } from "./utils.js"
import handlebars from "express-handlebars"
import messageRouter from "./routes/message.router.js"
import MessageDaoMongoDB from './daos/mongodb/message.dao.js'
const app = express()

const messageDaoMongoDB = new MessageDaoMongoDB()

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
app.use('/message', messageRouter)

if(process.env.PERSISTENCE === 'MONGO') initMongoDB()

const PORT =8080;

// app.listen(PORT,()=>console.log(`SERVER UP ON PORT ${PORT}`))
const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`)});

//ejecuto server IO
const socketServer = new Server(httpServer);

socketServer.on('connection', async(socket) => {
    console.log('🟢 ¡New connection!', socket.id);
    socketServer.emit('messages', await messageDaoMongoDB.getAll());   //emite a todos los clientes

    socket.on('disconnect', ()=>{
        console.log('🔴 User disconnect', socket.id);
    })

    socket.on('newUser', (user)=>{
        console.log(`> ${user} ha iniciado sesión`);
        socket.broadcast.emit('newUser', user);
    })

    socket.on('chat:message', async(msg)=>{
        await messageDaoMongoDB.create(msg);
        socketServer.emit('messages', await messageDaoMongoDB.getAll());   //emite a todos los clientes
    })

    socket.on('chat:typing', (data)=>{
        socket.broadcast.emit('chat:typing', data)
    })
})