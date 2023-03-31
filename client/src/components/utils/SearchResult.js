import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SearchResult = ({
  searchInput,
  isSearchResultActive,
  setIsSearchResultActive,
  setSearchInput,
}) => {
  const [resultItems, setResultItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState();

  //Close Search Input
  const handleClick = () => {
    setIsSearchResultActive(false);
    setResultItems([]);
    setSearchInput("");
  };

  //Fetch item by name
  useEffect(() => {
    if (isSearchResultActive) {
      fetch(`/api/products/${searchInput}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setResultItems(data.data);
          } else {
            setErrorMessage(data.message);
            setResultItems([]);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [searchInput]);

  //Return No item found if the server didn't receive anything
  if (resultItems.length === 0 && !errorMessage) {
    return (
      <Container>
        <DivLoading>
          <h1>Loading...</h1>
        </DivLoading>
      </Container>
    );
  }

  //Return message if there's not product found
  if (errorMessage && resultItems.length === 0) {
    return (
      <Container>
        <DivLoading>
          <h1>{errorMessage}</h1>
        </DivLoading>
      </Container>
    );
  }

  return (
    <Container>
      {resultItems.map((item) => {
        return (
          <ContainerItemSearched
            key={item._id}
            to={`/products/${item._id}`}
            onClick={handleClick}
          >
            <ItemImage src={item.imageSrc} />
            <ItemName>{item.name}</ItemName>
            <ItemPrice>{item.price}</ItemPrice>
          </ContainerItemSearched>
        );
      })}
    </Container>
  );
};

export default SearchResult;

const Container = styled.div`
  position: absolute;
  width: 100%;
  min-height: 5rem;
  max-height: 25rem;
  background-color: white;
  border: 1px solid #9d9d9d;
  border-radius: 10px;
  overflow: auto;

  @media (max-width: 800px) {
    width: calc(100% + 3rem);
  }
`;

const DivLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
`;

const ContainerItemSearched = styled(Link)`
  all: unset;
  padding: 1rem 1rem;
  max-height: 10rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid transparent;
  border-bottom: 1px solid #9d9d9d;

  @media (max-width: 800px) {
    flex-direction: column;
    max-height: 20rem;
    font-size: 14px;
  }

  :hover {
    cursor: pointer;
    border: 2px solid #9d9d9d;
    border-bottom: 3px solid #9d9d9d;
  }
`;

const ItemName = styled.p`
  width: 60%;

  @media (max-width: 800px) {
    width: 100%;
    margin: 1rem 0;
  }
`;

const ItemImage = styled.img`
  width: 5rem;
`;

const ItemPrice = styled.p`
  font-weight: 900;
`;
