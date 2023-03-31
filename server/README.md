# Backend

**OPTIONAL: You can document your endpoints in this file.**
| Endpoint | Method | Description | Expected Body |
|---------------------- | --------- | ------------------------------------------------- | --------------------- |
| `"/api/products"` | `GET` | Returns an array of all the products. | `N/A` |
| `"/api/product/:id"` | `GET` | Returns a single product based on it's ID. | `N/A` |
| `"/api/products/:name"` | `GET` | Returns a single product based on it's name. | `N/A` |
| `"/api/brands"` | `GET` | Returns an array of all the brands. | `N/A` |
| `"/api/brand/:brandId"` | `GET` | Returns a single brand based on it's ID. | `N/A` |
| `"/api/categories"` | `GET` | Returns an array of all the categories. | `N/A` |
| `"/api/categories/:category"` | `GET` | Returns a single category. | `N/A` |
| `"/api/cart"` | `GET` | Returns array of products and the total price. | `N/A` |
| `"/api/addToCart"` | `POST` | Adds a product to the cart and fixes it's quantity value. | `{ product: {...}, quantity: int }` |
| `"/api/checkout"` | `POST` | Creates an order and assigns it an \_id, then updates the number we have in stock | `{ newOrder: {...}}` |
| `"/api/removeFromCart/:itemId"` | `PATCH` | Updates the cart by removing the product (or an instance of it) from cart. | `{ _id: int, quantity: int }` |
| `"/api/resetCart"` | `DELETE` | Empties the cart | `N/A` |

---
