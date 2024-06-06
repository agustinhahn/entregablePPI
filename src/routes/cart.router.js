import {Router} from "express"
import * as controller from "../controllers/carts.controllers.js"

const router = Router()

// traer todos los carts
router.get("/", controller.getCarts)
//traer cart por id especifico
router.get("/:cid", controller.getCartByCid)

//esta ruta, crea un nuevo carrito con ID propio y adjunta el producto equivalente al pid enviado
router.post("/:pid", controller.addCart)
//esta ruta, elimina el cart que le envies
router.delete("/:cid", controller.remove)


// queda pendiente
//esta ruta, agrega productos a un carrito especifico segun corresponda
router.post("/:cid/products/:pid", controller.updateCart)

//una ruta para eliminar productos dentro de carritos
//una ruta para agregar productos a carritos ya existentes (update podria ser)
export default router