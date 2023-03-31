import React from "react";
import { ImWarning } from "react-icons/im";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Wrapper>
      <ErrorWrapper>
        <Number>404</Number>
        <StyledImWarning />
      </ErrorWrapper>
      <div>
        <h1>Page Not Found!</h1>
        <p>
          to go back to the homepage <Link to={"/"}>click here</Link>.
        </p>
      </div>
    </Wrapper>
  );
};

const StyledImWarning = styled(ImWarning)`
  font-size: 160px;
  margin-bottom: 50px;
`;

const Number = styled.h1`
  font-size: 200px;
`;
const ErrorWrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-around;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 35px;
  height: 60vh;
  justify-content: space-around;
  background-color: #e6e6e6;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 100px;
`;
export default PageNotFound;
