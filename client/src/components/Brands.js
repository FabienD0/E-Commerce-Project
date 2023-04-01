import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BrandsLoader from "./loaders/BrandsLoader.js";
import styled from "styled-components";
import { URL } from "./App.js";

//display all the names/logos of the brands available
const Brands = () => {
  const [brands, setBrands] = useState();

  //get Brands from Mongo
  useEffect(() => {
    fetch(`${URL}/api/brands`)
      .then((res) => res.json())
      .then((data) => {
        //save and sort brand names in alphabetical order
        setBrands(
          data.data.sort((b1, b2) => {
            const brand1 = b1.name;
            const brand2 = b2.name;
            if (brand1 > brand2) {
              return 1;
            }
            if (brand1 < brand2) {
              return -1;
            }
          })
        );
      })
      .catch((err) => console.log(err));
  }, []);

  if (!brands) {
    return <BrandsLoader />;
  }

  return (
    <SectionDiv>
      <H2>Brands</H2>
      <BrandContainer>
        {brands.map((brand) => {
          return (
            <BrandLink key={brand.name} to={`/brands/${brand._id}`}>
              <BrandBox>
                <Text>{brand.name}</Text>
              </BrandBox>
            </BrandLink>
          );
        })}
      </BrandContainer>
    </SectionDiv>
  );
};

const SectionDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: -3rem 2rem 2rem 3rem;
  gap: 3rem;
`;
const H2 = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #2e3659;
  letter-spacing: 0.05em;
  text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.2);
`;

const BrandContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 3rem;
  text-align: center;
`;

const BrandLink = styled(Link)`
  all: unset;
`;

const BrandBox = styled.div`
  width: 10rem;
  height: 4rem;
  box-shadow: 0px 0px 6px 5px rgba(0, 0, 0, 0.07);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;

  :hover {
    background-color: #eef1ff;
    cursor: pointer;
  }
`;

const Text = styled.p`
  font-weight: 700;
`;

export default Brands;
