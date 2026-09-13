const { test, expect } = require('@playwright/test');

const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const CompletePage = require('../pages/CompletePage');

const testData = require('../data/testData');
const environment = require('../config/environment.js');

const path = require('path');
const fs = require('fs');

const PDFReader = require('../utils/PDFReader');
const FileUtils=require('../utils/FileUtils.js');


test('Verify SauceDemo end to end purchase Flow', async ({page}) => {

    // Create an instance of LoginPage.
    const loginPage = new LoginPage(page);

    // Create an instance of InventoryPage.
    const inventoryPage = new InventoryPage(page);

    // Create an instance of CartPage.
    const cartPage = new CartPage(page);

    // Create an instance of CheckoutPage.
    const checkoutPage = new CheckoutPage(page);

    // Create an instance of CompletePage.
    const completePage = new CompletePage(page);


    // Open the SauceDemo login page.
    await loginPage.navigateTo('/');

    // Verify that the login page is displayed.
    await expect(page).toHaveTitle('Swag Labs');


    // Login using credentials from the environment configuration.
    await loginPage.login(
        environment.username,
        environment.password
    );


    // Verify that the Inventory page is displayed.
    await expect(page).toHaveURL(/inventory.html/);

    // Verify the Inventory page title.
    await expect(inventoryPage.inventoryTitle).toHaveText('Products');


    // Sort products by Price - Low to High.
    await inventoryPage.sortByPriceLowToHigh();

    // Validate that products are sorted correctly.
    const isSorted =
        await inventoryPage.isSortedByPriceLowToHigh();

    expect(isSorted).toBe(true);


    // Get dynamically identified products.
    const products =
        await inventoryPage.getProducts();

    // Identify the cheapest product.
    const cheapestProduct = products[0];

    // Identify the most expensive product.
    const mostExpensiveProduct =
        products[products.length - 1];


    // Add the cheapest product to the cart.
    await inventoryPage.addProduct(
        cheapestProduct.name
    );

    // Add the most expensive product to the cart.
    await inventoryPage.addProduct(
        mostExpensiveProduct.name
    );


    // Verify that the cart contains two products.
    const cartCount =
        await inventoryPage.getCartCount();

    expect(cartCount).toBe(2);


    // Open the Cart page.
    await inventoryPage.openCart();

    // Verify that the Cart page is displayed.
    await expect(cartPage.cartTitle)
        .toHaveText('Your Cart');


    // Get product names displayed in the Cart.
    const cartProductNames =
        await cartPage.getCartItemNames();


    // Verify that the cheapest product is present.
    expect(cartProductNames).toContain(cheapestProduct.name);

    // Verify that the most expensive product is present.
    expect(cartProductNames).toContain(mostExpensiveProduct.name);


    // Proceed to Checkout.
    await cartPage.proceedToCheckout();


    // Verify the Checkout: Your Information page.
    await expect(checkoutPage.checkoutTitle)
        .toHaveText('Checkout: Your Information');


    // Enter customer information from test data.
    await checkoutPage.enterCustomerDetails(
        testData.checkoutCustomer.firstName,
        testData.checkoutCustomer.lastName,
        testData.checkoutCustomer.postalCode
    );


    // Continue to Checkout: Overview.
    await checkoutPage.continueToOverview();


    // Verify that the Checkout Overview page is displayed.
    await expect(checkoutPage.checkoutTitle)
        .toHaveText('Checkout: Overview');


    // Capture order information from the Checkout Overview page.
    // This data will be used later to verify the generated PDF.
    const orderSummary =
        await checkoutPage.getOrderSummary();


    // Finish the order.
    await checkoutPage.completeOrder();


    // Verify that the final confirmation page is displayed.
    await expect(completePage.completeTitle)
        .toHaveText('Checkout: Complete!');


    // Get the order confirmation message.
    const confirmationMessage =
        await completePage.getConfirmationMessage();

    // Verify that the order was successfully placed.
    expect(confirmationMessage)
        .toContain('Thank you for your order!');


    // Click the application's "Generate PDF Order" button
    // and capture the browser download.
    const download =
        await completePage.downloadOrderPdf();


    // Save the application-generated PDF.
    const pdfPath = await FileUtils.saveDownload(download,'order-summary.pdf');

    // Verify that the PDF was downloaded successfully.
    expect(FileUtils.exists(pdfPath)).toBe(true);

    // Verify that the downloaded PDF is not empty.
    expect(FileUtils.getFileSize(pdfPath)).toBeGreaterThan(0);


    // Read the downloaded PDF.
    const pdfText =await PDFReader.readText(pdfPath);


    // Verify every product captured from
    // Checkout Overview is present in the PDF.
    for (const product of orderSummary.products) {
        // Verify the product name.
        expect(pdfText)
            .toContain(product.name);
        // Verify the product price.
        expect(pdfText)
            .toContain(product.price);
    }

    // Verify the Item Total from Checkout Overview.
    expect(pdfText).toContain(orderSummary.subtotal);

    // Verify the Tax from Checkout Overview.
    expect(pdfText).toContain(orderSummary.tax);

    // Verify the Final Total from Checkout Overview.
    expect(pdfText).toContain(orderSummary.total);
});