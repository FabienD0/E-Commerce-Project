import { ImWarning } from "react-icons/im";
import styled from "styled-components";

const Error = () => {
  return (
    <Wrapper>
      <ErrorWrapper>
        <Number>404</Number>
        <StyledImWarning />
      </ErrorWrapper>
      <div>
        <h1>An unknown error has occurred.</h1>
        <p>
          Please try refreshing the page, or <a href="#">contact support</a> if
          the problem persists.
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

export default Error;
