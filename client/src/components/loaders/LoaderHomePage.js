import React from "react";
import styled from "styled-components";
import { ReactComponent as LoaderTwoRows } from "./loaderHomePage.svg";
const LoaderHomePage = () => {
  return (
    <Wrapper>
      <LoaderTwoRows></LoaderTwoRows>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
`;
export default LoaderHomePage;
