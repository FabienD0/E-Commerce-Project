import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useState } from "react";
import { useContext } from "react";

import {CartContext} from "./CartContext";

const ItemCard = ({ product }) => {
  const [isCartPending, setIsCartPending] = useState(false);


	const { state: { selectedProducts }, actions : { addToCart : addToCartReducer }} = useContext(CartContext);
  //Add item to the cart
  const addToCart = (e) => {
    e.preventDefault();
    if (product.numInStock !== 0) {
      setIsCartPending(true);

	const productInCart = selectedProducts.length && selectedProducts.find(prod => prod._id === product._id);

	const selectQuantity = productInCart && (productInCart.quantity + 1 >= productInCart.numInStock ? productInCart.numInStock : productInCart.quantity + 1);

	const quantityToAdd = productInCart ? (selectQuantity) : 1;

	addToCartReducer({product, quantity: quantityToAdd})
			
      fetch("/api/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({product, quantity: quantityToAdd}),
      })
        .then((response) => response.json())
        .then((data) => {
          setIsCartPending(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <CardContainer to={`/products/${product._id}`}>
      <ItemName>{product.name} </ItemName>
      <Img
        src={product.imageSrc}
        alt={product.name}
        outOfStock={product.numInStock}
      />
      {product.numInStock === 0 && <TextOut>Out Of Stock</TextOut>}
      <ItemText>{product.price} </ItemText>
      <IconDiv inStock={product.numInStock} onClick={addToCart}>
        {!isCartPending ? (
          <AddRoundedIcon
            sx={{
              "&:hover": {
                transform: product.numInStock === 0 ? "" : "scale(1.3)",
              },
            }}
          />
        ) : (
          <AutorenewIcon />
        )}
      </IconDiv>
    </CardContainer>
  );
};

const CardContainer = styled(Link)`
  position: relative;
  height: 23rem;
  width: 17rem;
  padding: 2rem 1rem;
  text-decoration: none;
  color: black;
  display: flex;
  background-color: white;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

  :hover {
    cursor: pointer;
    transform: scale(1.05);
    transition: all 0.2s ease-in-out;
  }
  @media (max-width: 929px) {
    height: 20rem;
    width: 14rem;
  }
  @media (max-width: 513px) {
    height: 16rem;
    width: 10rem;
  }
`;

const Img = styled.img`
  position: relative;
  height: 10rem;
  opacity: ${(props) => (props.outOfStock === 0 ? "0.2" : "1")};

  @media (max-width: 929px) {
    height: 7rem;
  }
  @media (max-width: 513px) {
    height: 4rem;
  }
`;

const ItemName = styled.p`
  @media (max-width: 929px) {
    font-size: 0.9rem;
  }
  @media (max-width: 513px) {
    font-size: 0.8rem;
  }
`;

const ItemText = styled.p`
  font-weight: bold;
  font-size: 1.2rem;
  @media (max-width: 929px) {
    font-size: 1rem;
  }
`;

const TextOut = styled.p`
  font-weight: 900;
  color: red;
  font-size: 12px;
`;

const IconDiv = styled.button`
  all: unset;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d2daff;
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  bottom: -20px;
  opacity: ${(props) => props.inStock === 0 && "0.7"};
  cursor: ${(props) => props.inStock === 0 && "default"};
  transition: all 0.2s;
  -webkit-transition: all 0.2s;

  :hover {
    /* border: 1px solid black; */
    background-color: ${(props) => (props.inStock === 0 ? "" : "#b1b2ff")};
    font-weight: ${(props) => (props.inStock === 0 ? "" : "900")};
  }
`;
export default ItemCard;
