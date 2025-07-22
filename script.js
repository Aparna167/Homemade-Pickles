/* LOGIN PAGE */

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const nameInput = document.getElementById("name");
    const countrySelect = document.getElementById("country");
    const errorrMessage = document.getElementById("errorrMessage");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const nameValue = nameInput.value.trim();
        const countryValue = countrySelect.value;

        // Validate name
        if (nameValue === "" || !/^[a-zA-Z\s]+$/.test(nameValue)) {
            errorrMessage.textContent = "Please enter a valid name (letters only).";
            errorrMessage.style.color = "red";
            return;
        }

        // Clear error message
        errorrMessage.textContent = "";

        // Handle country selection
        if (countryValue === "India") {
            localStorage.setItem("userName", nameValue); // Store name for use in the home page
            window.location.href = "home.html"; // Redirect to home page
        } else {
            errorrMessage.textContent = "Delivery outside India is not available.";
            errorrMessage.style.color = "red";
        }
    });
});

/* HOME PAGE */

// Set user name in dropdown
document.addEventListener("DOMContentLoaded", () => {
    const userNameDisplay = document.getElementById("userName");
    const userName = localStorage.getItem("userName") || "Guest";
    userNameDisplay.textContent = userName;
});

/* CONTACT PAGE */

document.addEventListener('DOMContentLoaded', function() {
    // Select the form element
    const form = document.querySelector('form');

    // Add submit event listener to the form
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting

        // Select all input fields except comments
        const inputs = form.querySelectorAll('input:not([name="comments"])');
        let allValid = true;

        // Regular expression to allow only alphabetic characters and spaces
        const alphaRegex = /^[A-Za-z\s]+$/;

        // Loop through each input field
        inputs.forEach(function(input) {
            const value = input.value.trim();

            // Check if the field is empty or contains non-alphabetic characters
            if (value === '' || !alphaRegex.test(value)) {
                allValid = false;
                input.classList.add('is-invalid'); // Add Bootstrap's invalid class
            } else {
                input.classList.remove('is-invalid'); // Remove invalid class if valid
            }
        });

        // Display appropriate message based on validation
        if (allValid) {
            errorMessage.textContent = "Feedback submitted! Thank You .";
            errorMessage.style.color = "green";
        } else {
            errorMessage.textContent = "Please fill out all required fields with alphabetic characters only.";
            errorMessage.style.color = "red";
        }
    });
});

/* SHOP PAGE */

// Sample Products with Base Prices
const products = [
    { id: 1, name: "Mango Pickle", basePrice: 150, image: "si1.jpg", category: "veg-pickles", rating: 5 },
    { id: 2, name: "Amla Pickle", basePrice: 150, image: "si2.jpg", category: "veg-pickles", rating: 5 },
    { id: 3, name: "Lemon Pickle", basePrice: 120, image: "si3.jpg", category: "veg-pickles", rating: 4 },
    { id: 4, name: "Tomato Pickle", basePrice: 100, image: "si4.jpg", category: "veg-pickles", rating: 5 },
    { id: 5, name: "Gongura Pickle", basePrice: 120, image: "si5.jpg", category: "veg-pickles", rating: 4 },
    { id: 6, name: "Ginger Pickle", basePrice: 110, image: "si6.jpg", category: "veg-pickles", rating: 4 },
    { id: 7, name: "Mixed Veggies Pickle", basePrice: 100, image: "si7.jpg", category: "veg-pickles", rating: 4 },
    { id: 8, name: "Pandu Mirapakaya Pickle", basePrice: 110, image: "si8.jpg", category: "veg-pickles", rating: 4 },
    { id: 9, name: "Chicken Pickle", basePrice: 300, image: "si9.jpg", category: "nonveg-pickles", rating: 5 },
    { id: 10, name: "Chicken(BoneLess) Pickle", basePrice: 350, image: "si10.jpg", category: "nonveg-pickles", rating: 5 },
    { id: 11, name: "Mutton Pickle", basePrice: 500, image: "si11.jpg", category: "nonveg-pickles", rating: 5 },
    { id: 12, name: "Mutton(BoneLess) Pickle", basePrice: 550, image: "si12.jpg", category: "nonveg-pickles", rating: 5 },
    { id: 13, name: "Fish Pickle", basePrice: 200, image: "si13.jpg", category: "nonveg-pickles", rating: 4},
    { id: 14, name: "Tiger Prawns Pickle", basePrice: 350, image: "si14.jpg", category: "nonveg-pickles", rating: 5 },
    { id: 15, name: "Prawns Pickle", basePrice: 250, image: "si15.jpg", category: "nonveg-pickles", rating: 5 },
    { id: 16, name: "Gongura Chicken Pickle", basePrice: 350, image: "si16.jpg", category: "nonveg-pickles", rating: 4 },
];

// Render Products on Shop Page
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("veg-pickles-container")) renderProducts("veg-pickles");
    if (document.getElementById("nonveg-pickles-container")) renderProducts("nonveg-pickles");
    if (document.getElementById("cart-items")) displayCartItems();
});

function renderProducts(category) {
    const container = document.getElementById(`${category}-container`);
    const filteredProducts = products.filter(product => product.category === category);

    filteredProducts.forEach(product => {
        const card = document.createElement("div");
        card.className = "shop-card col-lg-4 col-md-6 col-sm-12";
        card.innerHTML = `
            <img src="${product.image}" class="shop-card-img-top" alt="${product.name}">
            <div class="shop-card-body">
                <h5 class="spn">${product.name}</h5>
                <p class="sbp">Base Price: ₹${product.basePrice} (0.5kg)</p>
                <div class="shop-card-rating">${"★".repeat(product.rating)}${"☆".repeat(5 - product.rating)}</div>
                <select class="form-select quantity-dropdown" data-id="${product.id}">
                    <option value="0.5" data-price="${product.basePrice}">0.5kg - ₹${product.basePrice}</option>
                    <option value="1" data-price="${product.basePrice * 2}">1kg - ₹${product.basePrice * 2}</option>
                    <option value="1.5" data-price="${product.basePrice * 3}">1.5kg - ₹${product.basePrice * 3}</option>
                    <option value="2" data-price="${product.basePrice * 4}">2kg - ₹${product.basePrice * 4}</option>
                </select>
                <button class="btn btn-primary add-to-cart mt-3" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        container.appendChild(card);
    });

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.removeEventListener("click", handleAddToCart);
        button.addEventListener("click", handleAddToCart);
    });
}

function handleAddToCart(event) {
    const productId = event.target.dataset.id;
    const product = products.find(p => p.id == productId);

    const quantityDropdown = document.querySelector(`.quantity-dropdown[data-id="${productId}"]`);
    const selectedOption = quantityDropdown.options[quantityDropdown.selectedIndex];
    const quantity = parseFloat(selectedOption.value);
    const price = parseInt(selectedOption.dataset.price);

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(item => item.id == product.id && item.quantity === quantity);

    if (existing) existing.totalPrice += price;
    else cart.push({ id: product.id, name: product.name, image: product.image, quantity, totalPrice: price });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`Added to Cart: ${quantity}kg of ${product.name} for ₹${price}`);
}

function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");
    const cartSummary = document.getElementById("cart-summary");

    cartContainer.innerHTML = "";
    let totalItems = 0, totalPrice = 0;

    cart.forEach(item => {
        const card = document.createElement("div");
        card.className = "cart-card mb-3";
        card.innerHTML = `
            <div class="cart-card-body d-flex justify-content-between">
                <div class="ccd">
                    <h5>${item.name}</h5>
                    <p>Weight: ${item.quantity}kg</p>
                    <p>Price: ₹${item.totalPrice}</p>
                </div>
                <button class="btn btn-danger remove-item" data-id="${item.id}" data-quantity="${item.quantity}">Remove</button>
            </div>
        `;
        cartContainer.appendChild(card);

        totalItems += item.quantity;
        totalPrice += item.totalPrice;
    });

    cartSummary.innerHTML = `
        <div class="cart-summary-card">
            <div class="cart-summary-body d-flex justify-content-between">
                <p>Total Items: ${cart.length}</p>
                <p>Total Price: ₹${totalPrice}</p>
                <button class="btn btn-success" id="buy-now">Buy Now</button>
            </div>
        </div>
    `;

    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", () => removeFromCart(button.dataset.id, button.dataset.quantity));
    });

    document.getElementById("buy-now").addEventListener("click", () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (cart.length === 0) {
            alert("Your cart is empty!");
        } else {
            window.location.href = "orders.html";
        }
    });
}

function removeFromCart(productId, quantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => !(item.id == productId && item.quantity == quantity));
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
}

/* ORDERS PAGE */

document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const orderList = document.getElementById("order-list");
    const totalItemsElement = document.getElementById("total-items");
    const totalWeightElement = document.getElementById("total-weight");
    const totalCostElement = document.getElementById("total-cost");
    const saveAddressBtn = document.getElementById("save-address-btn");
    const proceedBtn = document.getElementById("proceed-btn");
    const confirmationMessage = document.getElementById("confirmation-message");

    let totalItems = 0, totalWeight = 0, totalCost = 0;

    cart.forEach(item => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = `${item.name} - ${item.quantity}kg - ₹${item.totalPrice}`;
        orderList.appendChild(li);

        totalItems++;
        totalWeight += item.quantity;
        totalCost += item.totalPrice;
    });

    totalItemsElement.textContent = totalItems;
    totalWeightElement.textContent = totalWeight;
    totalCostElement.textContent = totalCost;

    saveAddressBtn.addEventListener("click", () => {
        const name = document.getElementById("name").value.trim();
        const mobile = document.getElementById("mobile").value.trim();
        const doorNo = document.getElementById("door-no").value.trim();
        const village = document.getElementById("village").value.trim();
        const district = document.getElementById("district").value.trim();
        const pincode = document.getElementById("pincode").value.trim();
        const state = document.getElementById("state").value.trim();

        const nameRegex = /^[A-Za-z\s]+$/;
        const numberRegex = /^\d+$/;

        let isValid = true;

        const errors = {
            name: !nameRegex.test(name),
            mobile: !numberRegex.test(mobile) || mobile.length !== 10,
            village: !nameRegex.test(village),
            district: !nameRegex.test(district),
            pincode: !numberRegex.test(pincode) || pincode.length !== 6,
            state: !nameRegex.test(state),
        };

        for (const [key, hasError] of Object.entries(errors)) {
            const errorElement = document.getElementById(`${key}-error`);
            if (hasError) {
                errorElement.classList.remove("d-none");
                isValid = false;
            } else {
                errorElement.classList.add("d-none");
            }
        }

        if (isValid) {
            alert("Address saved successfully! You can press Proceed");
            proceedBtn.disabled = false;
        }
    });

    proceedBtn.addEventListener("click", () => {
        confirmationMessage.classList.remove("d-none");
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("feedbackForm");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Thank you for your feedback!");
            window.location.href = "thankyou.html";
        });
    }
});
