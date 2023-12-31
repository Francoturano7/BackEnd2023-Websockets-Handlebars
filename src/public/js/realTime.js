// const socketClient=io()

// //elementos
// const productsList=document.getElementById("productsList")
// const createProductForm=document.getElementById("createProductForm")

// //E nviamos info del form al servidor
// createProductForm.addEventListener("submit",(e)=>{
//     e.preventDefault()
//     const formData=new FormData(createProductForm)
//     //console.log(formData.get("title"))
//     const jsonData=[]
//     for(const[key,value]of formData.entries()){
//         jsonData[key]=value
//     }
//      jsonData.price=parseInt(jsonData.price)
//     console.log(jsonData)
//     //enviamos info del producto al socket del servidor
//     socketClient.emit("addProduct",jsonData)
//     createProductForm.reset()
// })


// //recibimos los productos
// socketClient.on("productsArray",(dataProducts)=>{
//     console.log(dataProducts)
//     let productsElms=""
//     dataProducts.forEach(product=>{
//        productsElms+=
//         `<li>
//            <p>Nombre: ${product.title}</p>
//         </li>`
//     })
//     //console.log(productsElms)
//     productsList.innerHTML=productsElms
// })

const socket = io();
const formProduct = document.getElementById('formProducts')
const title = document.getElementById('title');
const description = document.getElementById('description');
const code = document.getElementById('code');
const price = document.getElementById('price');
const stock = document.getElementById('stock');
const category = document.getElementById('category');
const thumbnails = document.getElementById('thumbnails');
const tableProducts = document.getElementById('listaProd')


socket.on('allProducts', async (data) => {

 const html=  await data?.map( ( prod )=> {
        return (
            ` <tr>

                <td>${prod.title}</td>
                <td>${prod.description}</td>
                <td>$ ${prod.price}</td>
                <td>${prod.stock}</td>
                <td>${prod.category}</td>
                <td>${prod.code}</td>
                <td><img src=${prod.thumbnails} alt="" width="30px" /> </td>
            </tr>
            `
           
        )
       
    
});

  tableProducts.innerHTML= html

})




formProduct.addEventListener('submit', e => {
    e.preventDefault();

    socket.emit('addProduct',{
        title: title.value,
        description: description.value,
        code: code.value,
        price:parseInt (price.value),
        stock:parseInt ( stock.value),
        category: category.value,
        thumbnails: thumbnails.value
    })
    formProduct.reset();
    alert('El producto ha sido agregado correctamente');

})