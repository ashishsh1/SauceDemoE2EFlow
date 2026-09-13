# SauceDemo Playwright Automation Framework

## Overview

This project is an end-to-end UI automation framework built using Playwright and JavaScript for automating the SauceDemo purchase flow.

The framework follows the Page Object Model (POM) and focuses on:

- Maintainable and reusable automation
- Dynamic product identification
- Clear test assertions
- Environment-based credential management
- Failure diagnostics
- Application-generated PDF validation
- CI/CD execution

The implementation is designed to demonstrate practical automation framework design rather than simply automating individual UI actions.

---

## Application

**Application:** SauceDemo

**URL:** https://www.saucedemo.com

---

## Technology Stack

- **Language:** JavaScript
- **Automation:** Playwright
- **Test Runner:** Playwright Test
- **Runtime:** Node.js
- **Design Pattern:** Page Object Model (POM)
- **PDF Validation:** pdf-parse
- **Environment Management:** dotenv
- **Reporting:** Playwright HTML Report
- **CI/CD:** GitHub Actions

---

## Automated End-to-End Flow

The automation covers the complete purchase journey:

1. Launch SauceDemo.
2. Login using valid credentials.
3. Verify the Inventory page.
4. Sort products by **Price Low to High**.
5. Dynamically identify the cheapest product.
6. Dynamically identify the most expensive product.
7. Add both products to the cart.
8. Verify the cart count.
9. Verify that the expected products are present in the cart.
10. Enter checkout customer information.
11. Verify the Checkout Overview page.
12. Capture product names, prices, subtotal, tax, and total from Checkout Overview.
13. Complete the order.
14. Verify the order confirmation page.
15. Click the application's **Generate PDF order** button.
16. Capture the browser download.
17. Save the downloaded PDF.
18. Extract text from the PDF.
19. Verify the PDF contains the expected product and order information captured from Checkout Overview.

---

## Framework Structure

```text
saucedemo-playwright/
│
├── config/
│   └── environment.js
│
├── data/
│   └── testData.js
│
├── pages/
│   ├── BasePage.js
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   └── CompletePage.js
│
├── utils/
│   ├── PDFReader.js
│   └── FileUtils.js
│
├── tests/
│   └── purchase.spec.js
│
├── generated/
│   └── order-summary.pdf
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md