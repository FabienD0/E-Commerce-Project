import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import FormData from "./FormData";
import QuantityComponent from "./utils/quantityComponent";
import styled from "styled-components";
import { useEffect } from "react";
import Loader from "./loaders/Loader";
import { URL } from "./App";

const Checkout = () => {
  const {
    state: { selectedProducts },
    actions: { updateCart, fetchCart },
  } = useContext(CartContext);

  const [quantity, setQuantity] = useState();
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setQuantity([...selectedProducts.map((prod) => prod.quantity)]);
  }, [selectedProducts]);

  if (!quantity || isUpdating) {
    return <Loader />;
  }

  const updateCartAndFetch = (updatedQtys, product, i) => {
    updatedQtys.forEach((qty, index) => {
      if (index === i) {
        updateCart({ index, quantity: qty });

        setIsUpdating(true);
        fetch(`${URL}/api/addToCart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product, quantity: qty }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === 200) {
              setIsUpdating(false);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <Container>
      <ProductContainer>
        {selectedProducts.map((product, i) => {
          const itemPrice = product.price.replace("$", "");
          return (
            <ItemDiv key={i}>
              <p>{product.name} </p>
              <img src={product.imageSrc} />
              <QuantityComponent
                itemPrice={parseInt(itemPrice)}
                quantity={quantity[i]}
                setQuantity={(callback) => {
                  const updatedQtys = quantity.map((qty, index) =>
                    index === i ? callback(qty) : qty
                  );
                  updateCartAndFetch(updatedQtys, product, i);
                  setQuantity(updatedQtys);
                }}
                numInStock={product.numInStock}
              />
            </ItemDiv>
          );
        })}
      </ProductContainer>
      <FormData />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  box-shadow: 2px 2px 15px lightgray;
  background-color: white;
  margin-bottom: 4rem;
  padding: 2rem;
`;

const ProductContainer = styled.div`
  width: 20rem;
  border-right: 1px solid lightgray;
  margin-left: 1rem;
  padding-right: 2rem;
  img {
    height: 5rem;
  }
`;

const ItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  border-bottom: 1px solid lightgray;
`;

export default Checkout;
