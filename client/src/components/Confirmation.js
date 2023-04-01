import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { URL } from "./App";

const Confirmation = () => {
  const [orderInfo, setOrderInfo] = useState();
  const { orderId } = useParams();

  //fetch order from BE
  useEffect(() => {
    fetch(`${URL}/api/confirmation/${orderId}`)
      .then((res) => res.json())
      .then((data) => {
        setOrderInfo(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //clear cart from DB
  useEffect(() => {
    fetch(`${URL}/api/resetCart`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!orderInfo) {
    return <h1>Loading...</h1>;
  }
  return (
    <Container>
      <SectionTitle>Confirmation </SectionTitle>
      <p>
        Thank you for your purchase{" "}
        <span style={{ fontStyle: "italic" }}>{orderInfo.fname}</span>
      </p>
      <p>
        We will ship the order to:{" "}
        <span style={{ fontStyle: "italic" }}>{orderInfo.address}</span>
      </p>
      <p>
        Order ID:
        <span style={{ fontStyle: "italic" }}>{orderInfo._id}</span>
      </p>
    </Container>
  );
};

export default Confirmation;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  width: 50%;
  height: 25rem;
  font-size: 1.3rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #2e3659;
  letter-spacing: 0.05em;
  text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.2);
`;
