// Load environment var from the .env file.
require('dotenv').config();

//Store applevel config.
const environment = {

    //Base URL 
    baseURL: 'https://www.saucedemo.com',

    // Username loaded securely from the env.
    username: process.env.SAUCE_USERNAME,

    // Password loaded securely from the env.
    password: process.env.SAUCE_PASSWORD
};

module.exports = environment;