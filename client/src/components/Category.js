import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemCard from "./ItemCard";
import styled from "styled-components";
import Loader from "./loaders/Loader";
import { Pagination } from "@mui/material";
import PaginationContainer from "./PaginationContainer";

const Category = () => {
  const [itemsInCategory, setItemsInCategory] = useState();
  const { category } = useParams();

  useEffect(() => {
    fetch(`/api/categories/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setItemsInCategory(data.data);
      })
      .catch((err) => console.log(err));
  }, [category]);

  if (!itemsInCategory) {
    return <Loader />;
  }

  return (
    <ContainerAll>
      <SectionTitle>{category} </SectionTitle>
      <Container>
		<PaginationContainer perPage={3} items={itemsInCategory.map((item) => {
          return <ItemCard product={item} key={item._id} />;
        })} />
      </Container>
    </ContainerAll>
  );
};

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 3rem;

  @media (max-width: 1249px) {
    justify-content: center;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #2e3659;
  letter-spacing: 0.05em;
  text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.2);
`;

export const ContainerAll = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 80rem;
  margin-bottom: 4rem;
`;

export default Category;
