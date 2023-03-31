import { badgeClasses } from "@mui/material";
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  sortByName,
  sortPriceHighToLow,
  sortPriceLowToHigh,
} from "./utils/Sorting";
const Sorter = ({ products, setProducts, setSortOrder }) => {
  const [showSorter, setShowSorter] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleShowSorter = () => {
    setShowSorter(!showSorter);
    setIsClosing(false);
  };

  const handleClose = () => {
    setIsClosing(true);
    setShowSorter(true);
  };

  const handleAnimationEnd = () => {
    if (isClosing) {
      setShowSorter(false);
      setIsClosing(false);
    }
  };

  return (
    <Wrapper>
      {showSorter ? (
        <SortContainer
          showSorter={showSorter}
          isClosing={isClosing}
          onAnimationEnd={handleAnimationEnd}
        >
          <li>
            <BeautifulButton
              onClick={() => {
                setSortOrder("highToLow");
                setProducts(sortPriceHighToLow(products));
              }}
            >
              high to low
            </BeautifulButton>
          </li>
          <li>
            <BeautifulButton
              onClick={() => {
                setSortOrder("lowToHigh");
                setProducts(sortPriceLowToHigh(products));
              }}
            >
              low to high
            </BeautifulButton>
          </li>
          <li>
            <BeautifulButton
              onClick={() => {
                setSortOrder("name");
                setProducts(sortByName(products));
              }}
            >
              name
            </BeautifulButton>
          </li>
          <li>
            <BeautifulButton
              style={{ color: "black" }}
              onClick={() => {
                setShowSorter(false);
                handleClose();
              }}
            >
              {">"}
            </BeautifulButton>
          </li>
        </SortContainer>
      ) : (
        <BeautifulButton onClick={handleShowSorter}>Sort</BeautifulButton>
      )}
    </Wrapper>
  );
};

const slideFromRight = keyframes`
  0% {
    transform: translate3d(70%, 0, 0);
    opacity: 0.1;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`;

const slideToRight = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(70%, 0, 0);
    opacity: 0.1;
  }
`;
const SortContainer = styled.ul`
  animation: ${({ showSorter, isClosing }) =>
      isClosing ? slideToRight : showSorter ? slideFromRight : "none"}
    0.5s ease-in-out;
  display: ${({ showSorter, isClosing }) =>
    isClosing || showSorter ? "flex" : "none"};
  backface-visibility: hidden;
`;

const Wrapper = styled.ul`
  display: flex;
  align-items: center;
`;
const BeautifulButton = styled.button`
  border: none;
  font-size: 1rem;
  font-weight: 700;
  color: #2e3659;
  letter-spacing: 0.05em;
  text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.2);
  background-color: transparent;
  &:hover {
    cursor: pointer;
  }
`;

export default Sorter;
