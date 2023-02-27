# Company ABC Frontend App.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It is has guest's view and also and admin panel.\

A user without credentials:\
- View products
- Add products to cart 
- Place orders

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eslint`
Runs eslint to confirm if application code follows recommended specifications.\


## Application Routes
- `/` - Homepage
- `cart` - Cart(Holds all items a user has added to cart)
- `/admin` - Admin panel(renders products is one is authenticated otherwise login page)
- `/admin/orders` - Orders(required authentication)
