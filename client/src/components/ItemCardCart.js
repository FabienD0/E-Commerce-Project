import { useContext, useState } from "react";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { CartContext } from "./CartContext";

const ItemCardCart = ({ product, isItemRemoved, setIsItemRemoved }) => {
  const [isRemoveLoading, setIsRemoveLoading] = useState(false);



  const {actions: {removeFromCart, fetchCart}} = useContext(CartContext);
  //change price STRING to price FLOAT
  const productPrice = parseFloat(
    product.price.replace("$", "") * product.quantity
  ).toFixed(2);
  //Remove ONE item from the card
  const handleRemove = () => {
    setIsRemoveLoading(true);
    fetch(`/api/removeFromCart/${product._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
		console.log(`then: `, product)
        setIsItemRemoved(!isItemRemoved);
        setIsRemoveLoading(false);
		removeFromCart({product});
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <CardContainer>
      <ContainerImage>
        <Img src={product.imageSrc} alt={product.name} />
        {product.quantity > 1 && (
          <ContainerQuantity>
            <p>x{product.quantity}</p>
          </ContainerQuantity>
        )}
      </ContainerImage>
      <ItemName>{product.name} </ItemName>
      <ItemText>${productPrice} </ItemText>
      {isRemoveLoading ? <LoadingIcon /> : <Delete onClick={handleRemove} />}
    </CardContainer>
  );
};

const CardContainer = styled.button`
  all: unset;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background-color: white;
  height: 5rem;
  width: 90%;
  padding: 2rem 1rem;
  text-decoration: none;
  color: black;

  text-align: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;

const ContainerImage = styled.div`
  position: relative;
`;

const Img = styled.img`
  position: relative;
  height: 2.5rem;
`;

const ContainerQuantity = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: -20px;
  font-weight: 900;
  border-radius: 50%;
  font-size: 12px;
  width: 1.5rem;
  height: 1.5rem;
  opacity: 0.7;
`;

const ItemName = styled.p``;

const ItemText = styled.p`
  font-weight: bold;
  font-size: 1.2rem;
`;

const Delete = styled(DeleteIcon)`
  position: absolute;
  bottom: 5px;
  right: 10px;
  opacity: 0.7;

  :hover {
    cursor: pointer;
    opacity: 1;
    transition: all 0.3s ease-in-out;
    -webkit-transition: all 0.3s;
  }
`;

const LoadingIcon = styled(AutorenewIcon)`
  position: absolute;
  bottom: 5px;
  right: 10px;
  opacity: 0.7;
`;

export default ItemCardCart;
