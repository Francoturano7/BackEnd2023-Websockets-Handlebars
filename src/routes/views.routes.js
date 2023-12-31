import { Router } from "express";
import { productsService } from "../persistence/index.js";

const router = Router()

router.get("/", async (req, res) => {
    const products=await productsService.getProducts()
    console.log("Products",products)
    res.render("home",{products:products})
})

router.get("/realtimeproducts", async (req, res) => {
    res.render("realTime")
})

export { router as viewsRouter }