import { Router } from "express";

const router = Router()

const users = [
    { nombre: "Pepe", apellido: "Perez", edad: 20, correo: "pepe@gmail.com", telefono: "1112345678" },
    { nombre: "Ana", apellido: "Diaz", edad: 30, correo: "ana@gmail.com", telefono: "1123456789" },
    { nombre: "Maria", apellido: "Gomez", edad: 35, correo: "maria@gmail.com", telefono: "1134567890" },
    { nombre: "Camila", apellido: "Morales", edad: 18, correo: "camila@gmail.com", telefono: "1145678901" },
    { nombre: "Juan", apellido: "Castro", edad: 27, correo: "juan@gmail.com", telefono: "1156789012" },
]

const food=[
    {name:"Hamburguesa",price:120},
    {name:"Ensalada",price:80},
    {name:"Pizza",price:100},
    {name:"HotDog",price:120},
]

const role="admin"


router.get("/productos",(req,res)=>{
    const data={
        products:food,
        isAdmin: role==="admin"? true:false
    }
    res.render("products",data)
})
router.get("/", (req, res) => {
    res.render("home",{style:"home.css"})
})

router.get("/contacto", (req, res) => {
    res.render("contact")
})

router.get("/perfil", (req, res) => {
    const randomNumber = Math.floor(Math.random() * users.length)
    const user=users[randomNumber]
    console.log(user)
    res.render("profile",{...user,style:"profile.css"})
})

export { router as viewsRouter }