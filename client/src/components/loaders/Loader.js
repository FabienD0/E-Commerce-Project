import React from "react";
import styled from "styled-components";
import { ReactComponent as LoaderSvg } from "./loader.svg";
const Loader = () => {
  return (
    <Wrapper>
      <LoaderSvg></LoaderSvg>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
`;
export default Loader;
