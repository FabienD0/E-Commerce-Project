import { useState } from "react";
import { useEffect } from "react";
import Loader from "./loaders/Loader";
import ItemCard from "./ItemCard";
import { SectionTitle, ContainerAll, Container } from "./Category";
import { sortByNumInStock } from "./utils/Sorting";
import Sorter from "./Sorter";
import styled from "styled-components";
const AllProducts = () => {
  const [products, setProducts] = useState();
  const [sortOrder, setSortOrder] = useState("default");
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((result) => setProducts(sortByNumInStock(result.data)));
  }, []);

  if (!products) return <Loader />;

  return (
    <ContainerAll>
      <SorterContainer>
        <SectionTitle>All items</SectionTitle>

        <Sorter
          products={products}
          setProducts={setProducts}
          setSortOrder={setSortOrder}
        />
      </SorterContainer>
      <Container>
        {products.map((item) => {
          return <ItemCard product={item} key={item._id} />;
        })}
      </Container>
    </ContainerAll>
  );
};

const SorterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export default AllProducts;
