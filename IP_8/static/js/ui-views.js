// Add your code to this file to solve this assignment!

console.log("ui-views.js is running");


let isMenuCollapsed = false;


function renderNavbar() {

    console.log("renderNavbar() called");

    // Hint: "renderNavbar" is mostly complete, however only 1 button has a tab order

    let nav = document.querySelector('#navbar');
    let btn;

    // Hint: To create a "Hamburger Menu" icon, create a btn like below, then
    // create a toggleHamburger function, and then use the following code:
    /*
    btn.innerHTML = 'MENU <span role="img" aria-label="Menu icon">&equiv;</span>';
    btn.addEventListener('click', toggleHamburger);
    */


    let menuButton = document.createElement('div');

    menuButton.setAttribute('class', 'Navbar-menuToggle');
    menuButton.setAttribute('role', 'button');
    menuButton.setAttribute('tabindex', '0');

    menuButton.innerHTML =
        'MENU <span role="img" aria-label="menu icon">☰</span>';

    menuButton.addEventListener('click', toggleHamburger);

    nav.append(menuButton);


    btn = document.createElement('div');

    btn.setAttribute('role', 'button');
    btn.setAttribute('class', 'Navbar-button');
    btn.setAttribute('tabindex', '0');  // set all to "0" will follow order on page

    btn.innerHTML = 'OUTLET MALL SHOPPING';

    btn.addEventListener('click', showWelcome);

    nav.append(btn);

    // Make sure all the navbar buttons have "role" 'button' and "tabindex" "0"

    btn = document.createElement('div');

    btn.setAttribute('role', 'button');
    btn.setAttribute('class', 'Navbar-button');
    btn.setAttribute('tabindex', '0');

    btn.innerHTML = 'View Return Policy';

    btn.addEventListener('click', showReturnInfo);

    nav.append(btn);


    btn = document.createElement('div');

    btn.setAttribute('role', 'button');
    btn.setAttribute('class', 'Navbar-button');
    btn.setAttribute('tabindex', '0');

    btn.innerHTML = 'View Shopping Cart';

    btn.addEventListener('click', showCart);

    nav.append(btn);

    isMenuCollapsed = false;
}



/* Hint: Create a toggleHamburger function to show or hide the menu. There are two valid approaches to solve this:
 * 1. Using more JavaScript: Adding and removing DOM content when toggled
 * 2. Using more CSS: Only using JS to toggle CSS classes, then doing the showing / hiding / adjusting entirely in CSS 
 */
/*function toggleHamburger() { }*/


function toggleHamburger() {

    console.log("Menu toggled");

    let nav = document.querySelector('#navbar');

    if (!nav) return;

    isMenuCollapsed = !isMenuCollapsed;

    for (let i = 1; i < nav.children.length; i++) {

        if (isMenuCollapsed) {

            nav.children[i].style.display = 'none';

        } else {

            nav.children[i].style.display = '';
        }
    }
}


function renderProduct(product) {

    console.log("renderProduct() called");

    let div = document.createElement('div');
    div.setAttribute('class', 'Item');   // Ensure gets 'Item' class

    // TODO: #1 - Accessibility
    // 1a) Ensure the button below exists in tab (use "tabindex")
    // 1b) Make sure the two emoji characters below (look for &#....; syntax) are accessible
    // (see "span" around icon in menu button above as example). Fill in "aria-label" with an 
    // accessible description of the emoji.
    // TODO: #2 - Performance
    // Switch to use a smaller product image the img tag below (hint: look at API data for another URL)


    div.innerHTML = `
        <div class="Item-rating">
            <span role="img" aria-label="star rating">&#11088;</span>
            ${product.rating}
        </div>

        <div
            class="Item-imageWrapper"
            role="button"
            tabindex="0"
            aria-label="View ${product.title} image"
        >
            <img
                src="${product.thumbnail}"
                alt="${product.title}"
                loading="lazy"
            />
        </div>

        <div class="Item-details">

            <div
                class="Item-button"
                role="button"
                tabindex="0"
                aria-label="Add ${product.title} to cart"
                onclick="addToCart(${product.price})"
            >
                <span role="img" aria-label="shopping cart">&#128722;</span>
                \$${product.price}
            </div>

            <div class="Item-title">
                ${product.title}
            </div>

            <p class="Item-description">
                ${product.description}
            </p>

        </div>
    `;

    return div;
}


// The following 4 functions are completed for you, and don't require any changes:
function showWelcome() {
    showShopModal('<h1>Welcome to OUTLET MALL! We hope you shop here forever!</h1>');
}

function showReturnInfo() {
    showShopModal('<h1>Return Policy</h1><p>Remember: Do not return products, it is against policy!</p>');
}

function showCart() {
    showShopModal('<h1>Shopping Cart</h1><p><strong>TOTAL:</strong> ' + Math.round(cartPrice * 100) / 100 + '</p>');
}

function renderProducts(products) {
    document.querySelector('#products_div').append(...products.map(renderProduct));
}

