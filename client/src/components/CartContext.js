import { createContext, useReducer } from "react";
import { ADD_TO_CART, CLEAR_CART, FETCH_CART, REMOVE_FROM_CART, UPDATE_CART } from "./constants/CartConstants";

export const CartContext = createContext();

const initialState = {
  selectedProducts: [],
  totalPrice: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
	case ADD_TO_CART: {
		const incomingProduct = action.product;
		const productInCart = state.selectedProducts.findIndex(product => product._id === incomingProduct._id);
		console.log(`Incoming: `, incomingProduct)
		const cartObj = {...incomingProduct, quantity: action.quantity}
		if(productInCart === -1) {
			return {
				...state,
				selectedProducts: [...state.selectedProducts, cartObj],
				totalPrice: state.totalPrice + (cartObj.quantity * (+cartObj.price.replace("$", "")))
			}
		}

		const updatedProducts = state.selectedProducts.map(eachProduct => {
			if(eachProduct._id === incomingProduct._id) {

				const quantity = action.quantity >= incomingProduct.numInStock ? incomingProduct.numInStock : action.quantity;
				return {
					...eachProduct,
					quantity
				}
			}
			return eachProduct
		});

		const updatedTotal = updatedProducts.reduce((acc, val) => acc + (val.quantity * (+val.price.replace("$", ""))), 0);
		return {
			...state,
			selectedProducts: updatedProducts,
			totalPrice: updatedTotal
		}
	}

	case REMOVE_FROM_CART: {
		const productToRemove = action.product;
		const singleProduct = productToRemove.quantity === 1;
		const updatedCartProducts = singleProduct ? state.selectedProducts.filter(product => product._id !== productToRemove._id) : state.selectedProducts.map(product => {
			if(product._id === productToRemove._id) {
				return {
					...product,
					quantity: product.quantity - 1
				}
			}
			return product;
		});

		const updatedPrice = updatedCartProducts.reduce((acc, prod) => acc + (prod.quantity * (+prod.price.replace("$", ""))) ,0)
		return {
			...state,
			selectedProducts: updatedCartProducts,
			totalPrice: updatedPrice
		}
	}

	case FETCH_CART: {
		const allProducts = action.products;
		return {
			...state,
			selectedProducts: allProducts,
			totalPrice: allProducts.reduce((acc, prod) => acc + (prod.quantity * (+prod.price.replace("$", ""))), 0)
		}
	}

	case UPDATE_CART: {
		const prodIndex = action.index;
		const updatedQty = action.quantity;
		


		const updatedProds = state.selectedProducts.map((prod, index) => {
			if(prodIndex === index) {
				return {
					...prod,
					quantity: updatedQty
				}
			}
			return prod;

		})
		const updatedTotal = updatedProds.reduce((val, prod) => parseInt(prod.price.replace("$", "")) * prod.quantity, 0);
		return {
			...state,
			selectedProducts: updatedProds,
			totalPrice: updatedTotal
		}
	 }
	case CLEAR_CART: {
		return {
			...state,
			selectedProducts: [],
			totalPrice: 0
		}
	}
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const editCart = (data) => {
    dispatch({
      type: "edit-cart",
      ...data,
    });
  };

  const addToCart = (data) => {
	dispatch({
		type: ADD_TO_CART,
		...data
	});
  }

  const removeFromCart = (data) => {
	dispatch({
		type: REMOVE_FROM_CART,
		...data
	});
  }


  const fetchCart = (data) => {
	dispatch({
		type: FETCH_CART,
		...data
	})
  }


  const clearCart = () => {
	dispatch({
		type: CLEAR_CART
	});
  }

  const updateCart = (data) => {
	dispatch({
		type: UPDATE_CART,
		...data
	})
  }

  return (
    <CartContext.Provider
      value={{
        state,
        actions: {
          editCart,
		  addToCart,
		  removeFromCart,
		  clearCart,
		  fetchCart,
		  updateCart
        },
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
