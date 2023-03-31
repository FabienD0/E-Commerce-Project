import { Link } from "react-router-dom";
import styled from "styled-components";

const SectionFiveHomePage = () => {
  return (
    <Container>
      <DivisionLeft></DivisionLeft>
      <DivisionRight>
        <ContainerText>
          <Title>Fashionable Activewear</Title>
          <Description>
            With our stylish activewear collection, you won't need to worry
            about how you look while exercising.
          </Description>
          <Link style={{ all: "unset" }} to={"/products/allProducts"}>
            <Button>SHOP NOW</Button>
          </Link>
        </ContainerText>
      </DivisionRight>
    </Container>
  );
};
export default SectionFiveHomePage;

const Container = styled.div`
  display: flex;
  height: 20rem;
  margin-bottom: 10rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;
const DivisionRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #d2daff;
  height: 100%;
  width: 50%;

  @media (max-width: 620px) {
    width: 100%;
  }
`;

const DivisionLeft = styled.div`
  background-color: blue;
  height: 100%;
  width: 50%;
  background-image: url("/images/cardActive.jpg");
  background-size: cover;

  @media (max-width: 620px) {
    display: none;
  }
`;

const ContainerText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 80%;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  letter-spacing: 0.07em;
  font-weight: 800;
`;

const Description = styled.p`
  font-size: 1.1rem;
`;

const Button = styled.button`
  all: unset;
  width: 8rem;
  text-align: center;
  font-weight: 700;
  background-color: black;
  letter-spacing: 0.05em;
  color: white;
  padding: 0.8rem 0;
  border: 2px solid transparent;

  :hover {
    cursor: pointer;
    background-color: transparent;
    color: black;
    border: 2px solid black;
    transition: all 0.2s;
    -webkit-transition: all 0.2s;
  }
`;
