import styled from "styled-components";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";

const FormData = () => {
  const {
    state: { selectedProducts, totalPrice },
    actions: { clearCart },
  } = useContext(CartContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    address: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cart: selectedProducts,
  });
  const [errorMessage, setErrorMessage] = useState();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    fetch("/api/checkout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formOrder: formData }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          navigate(`/order/${data.data._id}`);
          clearCart();
        } else {
          setErrorMessage(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <StyledForm onSubmit={handleSumbit}>
      <DivLabelInput>
        <label htmlFor={"fname"}>First Name:</label>
        <StyledInput
          type={"text"}
          name={"fname"}
          id={"fname"}
          onChange={handleChange}
          required
        />
      </DivLabelInput>
      <DivLabelInput>
        <label htmlFor={"lname"}>Last Name:</label>
        <StyledInput
          type={"text"}
          name={"lname"}
          id={"lname"}
          onChange={handleChange}
          required
        />
      </DivLabelInput>
      <DivLabelInput>
        <label htmlFor={"address"}>Address:</label>
        <StyledInput
          type={"address"}
          name={"address"}
          id={"address"}
          onChange={handleChange}
          required
        />
      </DivLabelInput>
      <DivLabelInput>
        <label htmlFor={"email"}>E-mail:</label>
        <StyledInput
          type={"email"}
          name={"email"}
          id={"email"}
          onChange={handleChange}
          required
        />
      </DivLabelInput>
      <DivLabelInput>
        <label htmlFor={"cardNumber"}>Card Number:</label>
        <StyledInput
          type={"text"}
          placeholder={"0000000000000000"}
          name={"cardNumber"}
          id={"cardNumber"}
          onChange={handleChange}
          required
        />
      </DivLabelInput>
      <DivLabelInput>
        <label htmlFor={"expiry"}>Expiry:</label>
        <StyledInput
          type={"text"}
          placeholder={"MMYY"}
          name={"expiry"}
          id={"expiry"}
          onChange={handleChange}
          required
        />
      </DivLabelInput>
      <ContainerError>{<p>{errorMessage}</p>}</ContainerError>
      <ContainerPrice>
        <ContainerText>
          <Title>Subtotal </Title>
          <Price>${totalPrice.toFixed(2)}</Price>
        </ContainerText>
        <ContainerText>
          <Title>Taxes </Title>
          <Price>
            ${(totalPrice * 0.05 + totalPrice * 0.09975).toFixed(2)}
          </Price>
        </ContainerText>
        <ContainerText>
          <Title>Total Amount </Title>
          <Price>
            $
            {(totalPrice + (totalPrice * 0.05 + totalPrice * 0.09975)).toFixed(
              2
            )}
          </Price>
        </ContainerText>
      </ContainerPrice>
      <StyledSubmit type="submit">Place Order</StyledSubmit>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-radius: 5px;
  padding-left: 2rem;
`;

const DivLabelInput = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  align-items: center;
  font-size: 20px;
`;

const StyledInput = styled.input`
  width: 300px;
  border-radius: 3px;
  border: none;
  box-shadow: 0.5px 0.5px 6px lightgray;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 5px;
  font-size: 16px;
`;

const ContainerError = styled.div`
  text-align: center;
  color: #ff7070;
  opacity: 0.8;
`;

const ContainerPrice = styled.div`
  width: 100%;
  height: 10rem;

  & div:nth-child(2) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.6);
    padding-bottom: 1rem;
  }
`;

const ContainerText = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0rem;
  font-size: 1.2rem;
`;

const Title = styled.p`
  opacity: 0.6;
`;

const Price = styled.p`
  font-weight: 900;
`;

const StyledSubmit = styled.button`
  border: 2px solid transparent;
  background: #a1b1f7;
  color: black;
  font-size: 18px;
  border-radius: 3px;
  padding: 12px 7px;
  width: 100%;
  transition: all 0.2s ease-in-out;

  &:hover {
    border: 2px solid #a1b1f7;
    background-color: white;
    cursor: pointer;
    letter-spacing: 0.2rem;
  }
`;

export default FormData;
