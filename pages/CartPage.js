const BasePage = require('./BasePage');

class CartPage extends BasePage {

    constructor(page) {
        super(page);

        // Cart page title.
        this.cartTitle = page.locator('.title');

        // Products displayed inside the cart.
        this.cartItems = page.locator('.cart_item');

        // Checkout button.
        this.checkoutButton = page.locator('#checkout');
    }

    async getCartItemNames() {

        // Create an array to store product names.
        const productNames = [];

        // Get the number of products in the cart.
        const itemCount = await this.cartItems.count();

        // Read each product name.
        for (let index = 0; index < itemCount; index++) {

            // Get the current cart item.
            const cartItem = this.cartItems.nth(index);

            // Read the product name.
            const name = await cartItem.locator('.inventory_item_name').textContent();

            // Add the cleaned product name to the array.
            productNames.push(name.trim());
        }

        // Return all product names.
        return productNames;
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}

module.exports = CartPage;