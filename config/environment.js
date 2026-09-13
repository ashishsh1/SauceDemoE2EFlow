// Load environment variables from the .env file.
require('dotenv').config();

// Store application-level configuration.
const environment = {

    // Base URL of the application.
    baseURL: 'https://www.saucedemo.com',

    // Username loaded securely from the environment.
    username: process.env.SAUCE_USERNAME,

    // Password loaded securely from the environment.
    password: process.env.SAUCE_PASSWORD
};

// Export the environment configuration.
module.exports = environment;