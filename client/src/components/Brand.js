import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemCard from "./ItemCard";
import Loader from "./loaders/Loader";
import styled from "styled-components";

//show all items from a certain brand
const Brand = () => {
  const { brandId } = useParams();
  const [brand, setBrand] = useState();
  const [products, setProducts] = useState();
  useEffect(() => {
    fetch(`${URL}/api/brand/${brandId}`)
      .then((res) => res.json())
      .then((data) => {
        setBrand(data.data.brand);
        setProducts(data.data.products);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!brand || !products) {
    return <Loader />;
  }

  return (
    <SectionDiv>
      <SectionTitle href={brand.url} target="_blank">
        {brand.name}
      </SectionTitle>
      <Container>
        {products.map((product) => {
          return <ItemCard product={product} />;
        })}
      </Container>
    </SectionDiv>
  );
};

const SectionDiv = styled.div`
  width: 100%;
  margin-left: 3rem;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  align-items: flex-start;
  margin: 3rem 0;
  @media (max-width: 1249px) {
    justify-content: center;
  }
`;

const SectionTitle = styled.a`
  text-decoration: none;
  font-size: 2rem;
  font-weight: 700;
  color: #2e3659;
  letter-spacing: 0.05em;
  text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.2);
  :hover {
    opacity: 0.7;
  }
`;

export default Brand;
