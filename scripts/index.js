import { addToCart, render, clearCart as cartClear, cartItemCount, showItemCart } from "./cart.js"


const cart = document.getElementById('cart')
const openCart = document.getElementById('open-cart')
const closeCart = document.getElementById('close-cart')
const productCart = document.querySelectorAll('.product__cart')
const cartContent = document.getElementById('cart-content')
const clearCart = document.getElementById('clear-cart')
const countCart = document.getElementById('count-cart')





productCart.forEach(btn => {
    btn.addEventListener('click', event => {
        addToCart(
            event,
            '.product__title',
            '.product__price span',
            '.product__img',
            countCart,
            productCart
        )
    })
});

clearCart.addEventListener('click', () => {
    cartClear(cartContent, countCart, productCart)
})



openCart.addEventListener('click', () => {
    cart.style.display = 'flex'
    document.body.style.overflow = 'hidden'
    render(cartContent, countCart, productCart)
})

closeCart.addEventListener('click', () => {
    cart.style.display = 'none'
    document.body.style.overflow = 'auto'
})


cartItemCount(countCart)
showItemCart(productCart)






// const cartData = {
//     '1': ['product 1', ' 100'],
//     '2': ['product 2', ' 200'],
//     '3': ['product 3', '300']
// }
// console.log(Object.keys(cartData).length === 0)

