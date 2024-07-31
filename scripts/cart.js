export const cart = [];
export const cartCount = document.getElementById('cart-count');

export function updateCartCount() {
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalQuantity;
}

export function handleDisplayCart() {
    const cartContainer = document.getElementById('aside-container');
    if (cartContainer.classList.contains('hideCart')) {
        cartContainer.classList.remove('hideCart');
        cartContainer.classList.add('showCart');
    } else {
        cartContainer.classList.remove('showCart');
        cartContainer.classList.add('hideCart');
    }
    displayCart();
}

export function handleAddToCart(e) {
    if (e.target.classList.contains('add-cart')) {
        const productElement = e.target.closest('.products-container');
        const title = productElement.querySelector('.product-title').textContent;
        const price = parseFloat(productElement.querySelector('.product-price').textContent.replace('$', ''));
        const image = productElement.querySelector('.products-image img').src;
        const description = productElement.querySelector('.product-description').textContent;

        const existingProduct = cart.find(item => item.title === title);
        if (existingProduct) {
            existingProduct.quantity += 1;
            existingProduct.totalPrice += price;
        } else {
            const newProduct = { title, price, description, image, quantity: 1, totalPrice: price };
            cart.push(newProduct);
        }

        updateCartCount();
        displayCart();
    }
}

export function handleRemoveFromCart(e) {
    if (e.target.classList.contains('remove-cart')) {
        const productElement = e.target.closest('.cart-product');
        const title = productElement.querySelector('h3').textContent;
        const productIndex = cart.findIndex(product => product.title === title);
        if (productIndex !== -1) {
            const product = cart[productIndex];
            product.quantity -= 1;
            product.totalPrice -= product.price;
            if (product.quantity <= 0) {
                cart.splice(productIndex, 1);
            }
            updateCartCount();
            displayCart();
        }
    }
}

export function displayCart() {
    const cartContainer = document.getElementById('aside-container');
    cartContainer.innerHTML = '';
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p style="color:white;">No hay productos en el carrito</p>';
    } else {
        cart.forEach((product) => {
            const { title, totalPrice, image, quantity } = product;
            const cartHTML = `
            <div class="cart-product">
                <div class="cart-product-info">
                    <img src="${image}" alt="${title}" width="75px" height="auto">
                    <div class="cart-product-center">
                        <h3>${title}</h3>
                        <div class="cart-product-row">
                            <p>Precio: $<span>${totalPrice.toFixed(2)}</span></p>
                            <p>Cantidad: <span>${quantity}</span></p>
                        </div>
                    </div>
                    <button class="remove-cart">X</button>
                </div>
            </div>
            <hr class="dashed">
        `;
            cartContainer.insertAdjacentHTML('beforeend', cartHTML);
        });
        cartContainer.addEventListener('click', handleRemoveFromCart);
    }
}
