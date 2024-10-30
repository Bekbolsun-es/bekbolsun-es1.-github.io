// Объект для хранения товаров в корзине
let cart = {};
// Переменная для хранения общей суммы
let total = 0;

// Функция для добавления товара в корзину
function addToCart(itemName, itemPrice) {
    if (cart[itemName]) {
        cart[itemName].quantity += 1; // Увеличиваем количество, если товар уже в корзине
    } else {
        cart[itemName] = { price: itemPrice, quantity: 1 }; // Добавляем новый товар
    }
    total += itemPrice; // Увеличиваем общую сумму
    updateCartDisplay(); // Обновляем отображение корзины
}

// Функция для обновления отображения корзины
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    
    cartItems.innerHTML = ''; // Очищаем список товаров в корзине
    
    for (let item in cart) {
        const li = document.createElement('li');
        li.textContent = `${item} - ${cart[item].price} сом x ${cart[item].quantity} = ${cart[item].price * cart[item].quantity} сом`;
        
        // Кнопка для уменьшения количества товара
        const buttonDecrease = document.createElement('button');
        buttonDecrease.textContent = '-';
        buttonDecrease.onclick = () => {
            changeQuantity(item, -1);
        };
        
        // Кнопка для увеличения количества товара
        const buttonIncrease = document.createElement('button');
        buttonIncrease.textContent = '+';
        buttonIncrease.onclick = () => {
            changeQuantity(item, 1);
        };
        
        // Кнопка для удаления товара из корзины
        const buttonRemove = document.createElement('button');
        buttonRemove.textContent = 'Удалить';
        buttonRemove.onclick = () => {
            removeFromCart(item);
        };
        
        li.appendChild(buttonDecrease);
        li.appendChild(buttonIncrease);
        li.appendChild(buttonRemove);
        
        cartItems.appendChild(li);
    }
    
    totalPrice.textContent = total; // Обновляем общую сумму
}

// Функция для изменения количества товара в корзине
function changeQuantity(item, delta) {
    if (cart[item]) {
        if (delta < 0 && cart[item].quantity > 1) {
            cart[item].quantity += delta; // Уменьшаем количество, если оно больше 1
            total -= cart[item].price; // Уменьшаем общую сумму
        } else if (delta > 0) {
            cart[item].quantity += delta; // Увеличиваем количество
            total += cart[item].price; // Увеличиваем общую сумму
        }
        updateCartDisplay(); // Обновляем отображение корзины
    }
}

// Функция для удаления товара из корзины
function removeFromCart(item) {
    if (cart[item]) {
        total -= cart[item].price * cart[item].quantity; // Уменьшаем общую сумму
        delete cart[item]; // Удаляем товар из корзины
        updateCartDisplay(); // Обновляем отображение корзины
    }
}

// Функция для очистки корзины
function clearCart() {
    cart = {};
    total = 0;
    updateCartDisplay(); // Обновляем отображение корзины
}

// Функция для открытия формы оформления заказа
function openCheckoutForm() {
    const checkoutForm = document.getElementById('checkoutForm');
    checkoutForm.style.display = 'block'; // Показываем форму
}

// Функция для закрытия формы оформления заказа
function closeCheckoutForm() {
    const checkoutForm = document.getElementById('checkoutForm');
    checkoutForm.style.display = 'none'; // Скрываем форму
}

// Функция для отправки заказа
function submitOrder(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы
    
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const comments = document.getElementById("comments").value;
    
    // Формируем текст заказанных товаров без кнопок
    let cartText = '';
    for (let item in cart) {
        cartText += `${item} - ${cart[item].price} сом x ${cart[item].quantity} = ${cart[item].price * cart[item].quantity} сом\n`;
    }

    const totalPrice = document.getElementById("totalPrice").innerText;
    
    const message = `Здравствуйте! Хочу оформить заказ:\n\nИмя: ${name}\nАдрес: ${address}\nТелефон: ${phone}\n\nЗаказ:\n${cartText}\nИтого: ${totalPrice} сом\n\nКомментарии: ${comments}`;
    const encodedMessage = encodeURIComponent(message);
    
    const whatsappLink = `https://wa.me/996507025353?text=${encodedMessage}`;
    window.open(whatsappLink, "_blank"); // Открываем WhatsApp с сообщением
    
    clearCart(); // Очищаем корзину
    closeCheckoutForm(); // Закрываем форму
    alert("Ваш заказ оформлен! Мы свяжемся с вами через WhatsApp."); // Уведомление о заказе
}
function openCheckoutForm() {
    const checkoutForm = document.getElementById('checkoutForm');
    checkoutForm.style.display = 'block'; // Показываем форму
    checkoutForm.scrollIntoView({ behavior: "smooth" }); // Прокрутка к форме
}

function closeCheckoutForm() {
    const checkoutForm = document.getElementById('checkoutForm');
    checkoutForm.style.display = 'none'; // Скрываем форму
}
