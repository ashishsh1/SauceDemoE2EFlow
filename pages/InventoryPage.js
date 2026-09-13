const BasePage = require('./BasePage');

class InventoryPage extends BasePage {

    constructor(page) {
        super(page);

        // Inventory page locators.
        this.inventoryTitle = page.locator('.title');
        this.sortDropdown = page.locator('.product_sort_container');
        this.productCards = page.locator('.inventory_item');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartButton = page.locator('.shopping_cart_link');
    }

    async sortByPriceLowToHigh() {
        // Select Price (low to high) from the sort dropdown.
        await this.sortDropdown.selectOption('lohi');
    }

    async getProducts() {

        const products = [];

        // Get the number of products currently displayed.
        const productCount = await this.productCards.count();

        // Read each product's name and price.
        for (let index = 0; index < productCount; index++) {

            const productCard = this.productCards.nth(index);

            const name = await productCard.locator('.inventory_item_name').textContent();

            const priceText = await productCard.locator('.inventory_item_price').textContent();

            // Convert price from "$29.99" to numeric value 29.99.
            const price = Number(priceText.replace('$', ''));

            products.push({name: name.trim(),price});
        }

        return products;
    }

    async isSortedByPriceLowToHigh() {

        const products = await this.getProducts();

        // Verify every product price is greater than or equal
        // to the previous product price.
        for (let index = 1; index < products.length; index++) {

            if (products[index].price < products[index - 1].price) {
                return false;
            }
        }

        return true;
    }

    async addProduct(productName) {

        // Find the product card using the product name.
        const productCard = this.productCards.filter({hasText: productName});

        // Click the Add to cart button inside that product card.
        await productCard.getByRole('button', {name: /Add to cart/i}).click();
    }

    async getCartCount() {

        // Return 0 when the cart badge is not displayed.
        if (await this.cartBadge.count() === 0) {
            return 0;
        }

        // Convert the cart count from text to a number.
        return Number(await this.cartBadge.textContent());
    }

    async openCart() {
        await this.cartButton.click();
    }

    
}

module.exports = InventoryPage;