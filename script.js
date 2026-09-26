// ================= CART =================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ================= ADD TO CART =================

function addToCart(name, price) {

    cart.push({
        name: name,
        price: Number(price)
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(name + " added to cart!");
}


// ================= CART COUNT =================

function updateCartCount() {

    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.innerText = cart.length;
    }
}


// ================= SHOW CART =================

function showCart() {

    // Remove old cart if already open
    const oldCart = document.getElementById("cartBox");

    if (oldCart) {
        oldCart.remove();
    }


    // Create cart
    const cartBox = document.createElement("div");

    cartBox.id = "cartBox";


    cartBox.innerHTML = `

        <div class="cart-header">

            <h2>🛒 Your Cart</h2>

            <button onclick="closeCart()">✕</button>

        </div>


        <div id="cartItems"></div>


        <div class="cart-total">

            <h3>
                Total: ₹<span id="cartTotal">0</span>
            </h3>

        </div>

    `;


    document.body.appendChild(cartBox);


    displayCartItems();
}


// ================= DISPLAY CART =================

function displayCartItems() {

    const cartItems = document.getElementById("cartItems");

    const cartTotal = document.getElementById("cartTotal");


    if (!cartItems) {
        return;
    }


    // Empty cart

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <h3>Your cart is empty 🛒</h3>

                <p>Add some products to your cart!</p>

            </div>

        `;

        if (cartTotal) {
            cartTotal.innerText = "0";
        }

        return;
    }


    let total = 0;

    cartItems.innerHTML = "";


    cart.forEach(function(item, index) {

        total += Number(item.price);


        const itemDiv = document.createElement("div");

        itemDiv.className = "cart-item";


        itemDiv.innerHTML = `

            <div>

                <h3>${item.name}</h3>

                <p>₹${item.price}</p>

            </div>


            <button
                class="remove-btn"
                onclick="removeFromCart(${index})">

                Remove

            </button>

        `;


        cartItems.appendChild(itemDiv);

    });


    if (cartTotal) {

        cartTotal.innerText = total;

    }

}


// ================= REMOVE FROM CART =================

function removeFromCart(index) {

    if (index < 0 || index >= cart.length) {
        return;
    }


    cart.splice(index, 1);


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();


    displayCartItems();

}


// ================= CLOSE CART =================

function closeCart() {

    const cartBox =
        document.getElementById("cartBox");


    if (cartBox) {

        cartBox.remove();

    }

}


// ================= SEARCH =================

function searchProduct() {

    const searchBox =
        document.getElementById("searchBox");


    if (!searchBox) {
        return;
    }


    const searchText =
        searchBox.value.toLowerCase().trim();


    const products =
        document.querySelectorAll(".product");


    products.forEach(function(product) {

        const productName =
            product.querySelector("h3")
            ?.innerText
            .toLowerCase() || "";


        const category =
            product.getAttribute("data-category")
            ?.toLowerCase() || "";


        if (
            searchText === "" ||
            productName.includes(searchText) ||
            category.includes(searchText)
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

}


// ================= SHOP NOW =================

function scrollToProducts() {

    const products =
        document.getElementById("products");


    if (products) {

        products.scrollIntoView({
            behavior: "smooth"
        });

    }

}


// ================= LOGIN =================

function checkLogin() {

    const loggedInUser =
        localStorage.getItem("loggedInUser");


    const welcomeUser =
        document.getElementById("welcomeUser");


    const loginLink =
        document.getElementById("loginLink");


    const registerLink =
        document.getElementById("registerLink");


    const logoutButton =
        document.getElementById("logoutButton");


    if (loggedInUser) {

        try {

            const user =
                JSON.parse(loggedInUser);


            if (welcomeUser) {

                welcomeUser.innerText =
                    "Hi, " + user.name;

            }


            if (loginLink) {

                loginLink.style.display =
                    "none";

            }


            if (registerLink) {

                registerLink.style.display =
                    "none";

            }


            if (logoutButton) {

                logoutButton.style.display =
                    "inline-block";

            }

        } catch (error) {

            localStorage.removeItem(
                "loggedInUser"
            );

        }

    } else {

        if (welcomeUser) {

            welcomeUser.innerText = "";

        }


        if (loginLink) {

            loginLink.style.display =
                "inline";

        }


        if (registerLink) {

            registerLink.style.display =
                "inline";

        }


        if (logoutButton) {

            logoutButton.style.display =
                "none";

        }

    }

}


// ================= LOGOUT =================

function logout() {

    localStorage.removeItem(
        "loggedInUser"
    );


    checkLogin();


    alert("You have been logged out.");

}


// ================= PAGE LOAD =================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCartCount();

        checkLogin();

    }
);