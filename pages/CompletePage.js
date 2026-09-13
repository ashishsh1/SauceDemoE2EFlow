const BasePage = require('./BasePage');

class CompletePage extends BasePage {

    constructor(page) {
        super(page);

        // Final checkout page title.
        this.completeTitle = page.locator('.title');

        // Order confirmation message.
        this.confirmationMessage = page.locator('.complete-header');

        // Generate PDF order button.
        this.generatePdfButton = page.getByRole('button', {
            name: /Generate PDF order/i
        });
    }

    async getConfirmationMessage() {

        // Return the confirmation message.
        return await this.confirmationMessage.textContent();
    }

    async downloadOrderPdf() {

        // Start listening for the browser download event.
        const downloadPromise = this.page.waitForEvent('download');

        // Click the application's PDF generation button.
        await this.generatePdfButton.click();

        // Wait for the download to complete.
        const download = await downloadPromise;

        // Return the downloaded file object.
        return download;
    }
}

module.exports = CompletePage;