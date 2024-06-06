import fs from "fs";
import { v4 as uuidv4 } from 'uuid';

export default class CartManager {
    constructor(path) {
        this.path = path
    }

    
    async addCart(obj) {
        try {
            const cart = {
                id: uuidv4(),
                products: []
            };
            const cartsFiles = await this.getCarts();
            const newProduct = {pid:obj.id, quantity:1}
            cart.products.push(newProduct)
            cartsFiles.push(cart)
            await fs.promises.writeFile(this.path, JSON.stringify(cartsFiles)) //aca guarda en formato json
            return cartsFiles
        }
        catch (error) {
            console.error(error)
        }
    }

    async addProductCurrentCart(cid,productById){
        try {
            const cartsFiles = await this.getCarts(); //traigo todos los carts
            const currentCart = await this.getCartByCid(cid); //traigo el cart que contiene el id enviado por parametro
            const newProducts = {pid: productById.id, quantity:1} //creo el obj en base al obj obtenido por metodo en el endpoint
            const productExistIndex = currentCart.products.findIndex((p)=>p.pid === productById.id)
            if(productExistIndex !== -1){
                currentCart.products[productExistIndex].quantity += 1
            }
            else{
                currentCart.products.push(newProducts) //dentro de la prop products cargo el obj previamente creado
            }
            const newArray = cartsFiles.filter((c)=>c.id !== cid) //elimino el cart con el id enviado por parametro
            newArray.push(currentCart) 
            await fs.promises.writeFile(this.path, JSON.stringify(newArray))
            return currentCart
        } catch (error) {
            console.error(error)
        }
    }

    async getCarts() {
        try {
            if (fs.existsSync(this.path)) { //verifica si existe el archivo
                const cartFile = await fs.promises.readFile(this.path, "utf-8") //lee el archivo que esta como cadena de texto
                const carts = JSON.parse(cartFile) //pasamos a js
                return carts;
            }
            else {
                return []
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    async getCartByCid(cid){
        try {
            const cartsFile = await this.getCarts();
            const cartCid = cartsFile.find((p) => p.id === cid)
            if (cartCid) {
                return cartCid
            }
            else return null
        } catch (error) {
            console.error(error)
        }
    }
}