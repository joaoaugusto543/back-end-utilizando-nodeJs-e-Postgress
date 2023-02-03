import { Router } from "express";
import userControllers from "./controllers/userControllers";

const routes=new Router()

routes.get('/user',userControllers.index)
routes.post('/user',userControllers.create)
routes.get('/user/:id',userControllers.show)
routes.put('/user/:id',userControllers.update)
routes.delete('/user/:id',userControllers.destroy)

export default routes