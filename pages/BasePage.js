class BasePage {

    constructor(page) {
        this.page = page;
    }

    async navigateTo(path) {
        await this.page.goto(path);
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('domcontentloaded');
    }

    async getPageTitle() {
        return await this.page.title();
    }
}
module.exports = BasePage;