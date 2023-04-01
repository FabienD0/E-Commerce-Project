import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";
import VisibilityIcon from "@mui/icons-material/Visibility";
import QuantityComponent from "./utils/quantityComponent";
import { CartContext } from "./CartContext";
import ProductDetailsLoader from "./loaders/ProductDetailsLoader";
import { URL } from "./App";
//Displays the product based on productId
const ProductDetails = () => {
  const [product, setProduct] = useState();
  const [brand, setBrand] = useState();
  const [priceItem, setPriceItem] = useState();
  const [quantity, setQuantity] = useState(1);

  const [isUpdating, setIsUpdating] = useState(false);
  //grab id from params
  const params = useParams().productId;
  const navigate = useNavigate();
  //useEffect used to fetch for the specific product then fetch for the company that made it.
  useEffect(() => {
    fetch(`${URL}/api/product/${params}`)
      .then((res) => res.json())
      .then((result) => {
        setProduct(result.data);
        setPriceItem(parseFloat(result.data.price.replace("$", "")));
        return fetch(`${URL}/api/brand/${result.data.companyId}`);
      })
      .then((res) => res.json())
      .then((result) => {
        setBrand(result.data);
      })
      .catch((err) => {
        console.log(err);
        navigate("/404");
      });
  }, [params]);

  const {
    state,
    actions: { addToCart },
  } = useContext(CartContext);

  //handleClick will update the cart in the db and the context
  const handleClick = (e) => {
    e.preventDefault();
    setIsUpdating(true);
    const cartItem = state.selectedProducts.find(
      (prod) => prod._id === parseInt(params)
    );
    const addedQuantity = cartItem
      ? cartItem.quantity
        ? cartItem.quantity + quantity
        : quantity
      : quantity;
    const newQuantity =
      addedQuantity >= product.numInStock ? product.numInStock : addedQuantity;

    addToCart({ product, quantity: newQuantity });

    fetch(`${URL}/api/addToCart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product, quantity: newQuantity }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsUpdating(false);
      })
      .catch((err) => {
        console.log(err);
        navigate("/404");
      });
  };

  if (!product || !brand) return <ProductDetailsLoader />;
  else {
    let allProductStockAdded;
    if (state.selectedProducts.find((prod) => prod._id === parseInt(params))) {
      allProductStockAdded =
        state.selectedProducts.length &&
        product &&
        state.selectedProducts.find((prod) => prod._id === parseInt(params))
          .quantity === product.numInStock;
    }

    return (
      <Wrapper>
        <Title>{product.name}</Title>
        <Container>
          <DivisionLeft>
            <WatchImage src={product.imageSrc} alt="watch" />
          </DivisionLeft>
          <DivisionRight>
            <ContainerText>
              <Description>
                <InfoWrapper>
                  <Category>{product.category}</Category>
                  {product.numInStock !== 0 ? (
                    <span>
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "#4243AE",
                          textShadow: "2px 4px 3px rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        {product.numInStock}
                      </span>{" "}
                      left in stock
                    </span>
                  ) : (
                    <span style={{ fontSize: "1rem", color: "red" }}>
                      Out of stock
                    </span>
                  )}
                  <p>
                    Made{" "}
                    <span style={{ fontStyle: "italic", fontSize: "1.2rem" }}>
                      by
                    </span>{" "}
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "#4243AE",
                        textShadow: "2px 4px 3px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      {brand.name}
                    </span>
                  </p>
                </InfoWrapper>
              </Description>

              <QuantityComponent
                itemPrice={priceItem}
                quantity={quantity}
                setQuantity={setQuantity}
                numInStock={product.numInStock}
              />

              <Button
                onClick={(e) => handleClick(e)}
                disabled={
                  product.numInStock === 0 || isUpdating || allProductStockAdded
                }
              >
                ADD TO CART
              </Button>
              <ContainerVisibility>
                <VisibilityIcon />
                <TextVisibility>{product.viewCount}</TextVisibility>
              </ContainerVisibility>
            </ContainerText>
          </DivisionRight>
        </Container>
      </Wrapper>
    );
  }
};

export default ProductDetails;

const Wrapper = styled.div`
  height: auto;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2em;
  align-items: center;
  justify-content: center;
  width: 70%;
  @media (max-width: 864px) {
    margin-bottom: 12rem;
    height: auto;
  }
`;

const Container = styled.div`
  display: flex;
  height: 22rem;
  width: 100%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

  @media (max-width: 864px) {
    flex-direction: column;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const WatchImage = styled.img`
  width: 15rem;
  transition: all 0.3s;

  :hover {
    transition: all 0.3s;
    transform: scale(1.1) rotate(5deg);
  }
  @media (max-width: 864px) {
    width: 8rem;

    :hover {
      transform: scale(0.9) rotate(5deg);
    }
  }
`;

const DivisionRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #d2daff;
  padding: 2rem;
  height: 100%;
  width: 50%;

  @media (max-width: 864px) {
    width: 100%;
    padding: 1rem 0;
  }
`;

const DivisionLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50%;
  background-color: white;

  @media (max-width: 864px) {
    width: 100%;
  }
`;

const ContainerText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  gap: 1em;
`;

const Category = styled.p`
  font-size: 1rem;
  opacity: 0.7;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  letter-spacing: 0.07em;
  font-weight: 800;
  text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.2);
  @media (max-width: 864px) {
    font-size: 1.2rem;
  }
`;

const Description = styled.div`
  font-size: 1.5rem;
  text-align: center;
`;

const Button = styled.button`
  all: unset;
  width: 12rem;
  text-align: center;
  font-weight: 700;
  border: 2px solid black;
  letter-spacing: 0.05em;

  color: black;
  padding: 0.8rem 0;
  background-color: transparent;

  :hover {
    cursor: pointer;
    background-color: black;
    color: white;
    transition: all 0.2s;
    -webkit-transition: all 0.2s;
  }
  &:disabled {
    opacity: 0.2;
    cursor: default;

    :hover {
      background-color: transparent;
      color: black;
    }
  }
`;
const ContainerVisibility = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 5rem;
  opacity: 0.7;
`;

const TextVisibility = styled.p`
  font-weight: 900;
`;
