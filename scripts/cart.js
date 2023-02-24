'use strict'

// cart
const CART_NAME = 'fffdtrt44455566ooopppaaa'

//записываем данные в хранилище 
function setCartData(obj) {
    localStorage.setItem(CART_NAME, JSON.stringify(obj))
    return false

}


//получаем данные из хранилища
function getCartData() {
    return JSON.parse(localStorage.getItem(CART_NAME))
}

//очистить корзину
export function clearCart(cartContent, elem, addCartButtons) {
    localStorage.removeItem(CART_NAME)
    render(cartContent, elem, addCartButtons)
    cartItemCount(elem)
    showItemCart(addCartButtons)
}



// добавим товар в корзину
export function addToCart(event, title, price, img, elem, addCartButtons) {
    const btn = event.target
    btn.disabled = true
    const cartData = getCartData() || {}
    const item = btn.parentElement
    const itemId = item.dataset.id
    const itemTitle = item.querySelector(title).textContent
    const itemPrice = item.querySelector(price).textContent
    const itemImg = item.querySelector(img).src
    if (!cartData.hasOwnProperty(itemId)) {
        cartData[itemId] = [itemTitle, itemPrice, itemImg]
    }
    btn.disabled = setCartData(cartData)
    cartItemCount(elem)
    showItemCart(addCartButtons)
}


//удаляем товар из корзины
function deleteItemCart(event, cartContent, elem, addCartButtons) {
    const cartData = getCartData()
    delete cartData[event.target.dataset.id]
    if (Object.keys(cartData).length === 0) {
        clearCart(cartContent, elem, addCartButtons)
    } else {
        setCartData(cartData)
    }
    render(cartContent, elem, addCartButtons)
    cartItemCount(elem)
    showItemCart(addCartButtons)
}

function addEventDelete(cartContent, elem, addCartButtons) {
    document.querySelectorAll('.cart__delete')
        .forEach(btn => {
            btn.addEventListener('click', event => {
                deleteItemCart(event, cartContent, elem, addCartButtons)
            })
        })


}

//отрисовка корзины
export function render(cartContent, elem, addCartButtons) {
    const cartData = getCartData()
    let totalAmount = 0;

    let totalItems;
    if (!cartData) {
        totalItems = '<p class="basket-quilty">Корзина пуста</p>';
    } else {
        totalItems = `
            <table class='cart__table'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
        `
        for (const itemId in cartData) {
            totalItems += '<tr>'
            totalAmount += +cartData[itemId][1]
            for (let i = 0; i < cartData[itemId].length; i++) {
                if (i === 2) {
                    totalItems += `<td>
                    <img class='cart__img' src="${cartData[itemId][i]}" alt=""></td>`
                } else {
                    totalItems += `<td>${cartData[itemId][i]}</td>`
                }

            }
            totalItems += `<td><button class ="cart__delete" data-id="${itemId}">Delete</button></td></tr>`
        }
        totalItems += '</tbody></table>'
        totalItems += `<p>Total Amount: ${totalAmount}</p>`
    }

    cartContent.innerHTML = totalItems
    addEventDelete(cartContent, elem, addCartButtons)
}

//количество товара в корзине
export function cartItemCount(elem) {
    const cartData = getCartData()
    elem.textContent = cartData ? Object.keys(cartData).length : 0

}

//добавлен ли товар в корзину
 export function showItemCart(addCartButtons) {
    const cartData = getCartData()
    addCartButtons.forEach(btn => {
        if (cartData && cartData.hasOwnProperty(btn.parentElement.dataset.id)){
           btn.textContent = 'Already added'
        } else {
            btn.textContent = 'add to cart'
        }
    }) 
}

