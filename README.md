# E-Commerce Project

This is my first group project, we had to build a full-stack complete E-Commerce. I learned a lot about decision making and how to work as a group with Git. 

The front-end was built with React, and the back-end with Node.js and MongoDB.

We created a modern design that is mobile friendly. UseReducer is used to deal with the backend, with this we avoid useless request to the backend. 

![](https://github.com/FabienD0/E-Commerce-Project/blob/master/client/public/images/ezgif-1-5fb55e88cf.gif)

## Functionallity

- Display details of the product when you click on it
- Add / Remove quantity 
- Add to cart
- A search bar that look at every product in the database
- Can't add to cart the products that are 'out of stock'
- Filter items by categories or brands
- Modal for the cart that display an icon when you add products 
- From the cart you can remove an item or clear everything
- Checkout page that calculate the total with the taxes, the total will change if we update the quantity directly from the checkout page
- The back-end will validate if you enter the right information in the checkout form. If not,an error will display
- Confirmation page with your order ID, everything is saved in the database

## Coding Editor Setup

> **NOTE: You will need 2 terminals for this project to run!** (A split terminal works just as well)

### **First Terminal: The Server**

1. Open a terminal.
2. Navigate to the server folder: `cd server`.
3. Install the required packages: `yarn install`
4. Once that's done you can start the server: `yarn start`

### **Second Terminal: The Website**

1. Open a terminal.
2. Navigate to the server folder: `cd client`.
3. Install the required packages: `yarn install`
4. Once that's done you can start the server: `yarn start`
---
