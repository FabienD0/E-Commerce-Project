import { useEffect, useState } from "react";
import ItemCard from "../ItemCard";
import styled from "styled-components";
import LoaderHomePage from "../loaders/LoaderHomePage";
import PaginationContainer from "../PaginationContainer";
import { URL } from "../App";

//show latest products added to website
const SectionTwoHomePage = () => {
  const [products, setProducts] = useState();

  //fetch for all the products in our database
  useEffect(() => {
    // fetch("/api/products")
    fetch(`${URL}/api/products`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        //return the most favorite products
        const filteredProduct = data.data.filter(
          (item) =>
            item._id === 6544 ||
            item._id === 6552 ||
            item._id === 6582 ||
            item._id === 6627 ||
            item._id === 6551 ||
            item._id === 6727 ||
            item._id === 6841 ||
            item._id === 7000
        );
        setProducts(filteredProduct);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!products) {
    return (
      <LoaderWrapper>
        <LoaderHomePage />
      </LoaderWrapper>
    );
  }

  return (
    <>
      <SectionTitle>Latest Products</SectionTitle>
      <Container>
        {products.map((product) => {
          return <ItemCard product={product} key={product._id} />;
        })}
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  justify-content: space-between;
  margin-top: -6rem;

  @media (max-width: 1249px) {
    justify-content: center;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #2e3659;
  letter-spacing: 0.05em;
  text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.2);
`;
const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
`;
export default SectionTwoHomePage;
