const BasePage = require('./BasePage');

class LoginPage extends BasePage {

    constructor(page) {
        super(page); //--> this calls the const of the parent-BasePage

        // Login page locators.
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
    }

    async login(username, password) {
        // Enter the username.
        await this.usernameInput.fill(username);

        // Enter the password.
        await this.passwordInput.fill(password);

        // Click the login button.
        await this.loginButton.click();
    }
}

module.exports = LoginPage;