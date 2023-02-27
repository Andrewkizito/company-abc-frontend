# Project Overview

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It is has guest's view and also and admin panel.

## Getting Started
After cloning this project, there are several scripts available that you can use inorder to setup the application correctly. The application utilises a backedn taht is powered by nodejs/express and thst can be [found here](https://github.com/Andrewkizito/company-abc-backend). Make sure the application is running on the same server as this application else you will new to update the config file found at `/src/utils/module.ts`

### Applciation requirements
- Nodejs - (min verison 17x)

### Available scripts

#### `npm install`

Installs all the projects dependencies.
This will install all the dependencies and external libraries that the project utilises.

#### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

#### `npm run eslint`
Runs eslint to confirm if application code follows recommended specifications.

### Features
A user without credentials:
- View products
- Add products to cart 
- Place orders

A user with credentials:
Will have access to the admin panel with extended functionality which includes
- Adding new products
- Update the stock of the products
- Managing orders that have been place by the users of the application


### Application Routes
- `/` - Homepage
- `cart` - Cart (Holds all items a user has added to cart)
- `/admin` - Admin panel (renders products is one is authenticated otherwise login page)
- `/admin/orders` - Orders(required authentication)

### Authentication
The application uses token based authentication utilizing a `username - admin` and `password - Kitab777!`. When the credentials are sent to the backend, a jwt token is generated with and expiry of 2 hours. This can be used to perform actions in the admin panel util its invalid and you will be required to login again.