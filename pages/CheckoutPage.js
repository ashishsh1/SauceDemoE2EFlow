const BasePage = require('./BasePage');

class CheckoutPage extends BasePage{

    constructor(page) {
        super(page);

        // Checkout page title.
        this.checkoutTitle = page.locator('.title');

        // Customer information fields.
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');

        // Continue button on the customer information page.
        this.continueButton = page.locator('#continue');

        // Products displayed on Checkout Overview.
        this.checkoutItems = page.locator('.cart_item');

        // Product name inside each checkout item.
        this.productNames = page.locator('.inventory_item_name');

        // Product price inside each checkout item.
        this.productPrices = page.locator('.inventory_item_price');

        // Order subtotal.
        this.subtotal = page.getByText(/Item total:/);

        // Order tax.
        this.tax = page.getByText(/^Tax:/);

        // Final order total.
        this.total = page.getByText(/^Total:/);

        // Finish button on Checkout Overview.
        this.finishButton = page.locator('#finish');
    }

    async enterCustomerDetails(firstName, lastName, postalCode) {

        // Enter the first name.
        await this.firstNameInput.fill(firstName);

        // Enter the last name.
        await this.lastNameInput.fill(lastName);

        // Enter the postal code.
        await this.postalCodeInput.fill(postalCode);
    }

    async continueToOverview() {

        // Continue to the Checkout Overview page.
        await this.continueButton.click();
    }

    async getOrderSummary() {

        // Store all products displayed in Checkout Overview.
        const products = [];

        // Get the number of products in the order.
        const itemCount = await this.checkoutItems.count();

        // Read each product.
        for (let index = 0; index < itemCount; index++) {

            // Get the current checkout item.
            const item = this.checkoutItems.nth(index);

            // Read the product name.
            const name = await item
                .locator('.inventory_item_name')
                .textContent();

            // Read the product price.
            const price = await item
                .locator('.inventory_item_price')
                .textContent();

            // Store the product details.
            products.push({
                name: name.trim(),
                price: price.trim()
            });
        }

        // Read and normalize the subtotal.
        const subtotal = this.normalizePrice(
            await this.subtotal.textContent()
        );

        // Read and normalize the tax.
        const tax = this.normalizePrice(
            await this.tax.textContent()
        );

        // Read and normalize the final total.
        const total = this.normalizePrice(
            await this.total.textContent()
        );

        // Return the complete order information.
        return {
            products,
            subtotal,
            tax,
            total
        };
    }

    // Convert a currency string to standard 2-decimal format.
    normalizePrice(text) {

        // Extract the numeric amount after the $ sign.
        const match = text.match(/\$[\d.]+/);

        // Fail clearly if no price is found.
        if (!match) {
            throw new Error(`Price not found in text: ${text}`);
        }

        // Convert the extracted amount to a number
        // and format it to exactly two decimal places.
        return `$${Number(
            match[0].replace('$', '')
        ).toFixed(2)}`;
    }

    async completeOrder() {

        // Finish the purchase.
        await this.finishButton.click();
    }
}

module.exports = CheckoutPage;