import { Link } from "react-router-dom";
import styled from "styled-components";

const SectionOneHomePage = () => {
  return (
    <MainContainer>
      <FirstCategory to="/categories/Entertainment">
        <Category>Entertainment</Category>
      </FirstCategory>
      <SecondCategory to="/categories/Lifestyle">
        <Category>Lifestyle</Category>
      </SecondCategory>
      <FirstElement to="/categories/Fitness">
        <Category>Fitness</Category>
      </FirstElement>
      <SecondElement to="/categories/Medical">
        <Category>Medical</Category>
      </SecondElement>
    </MainContainer>
  );
};

export default SectionOneHomePage;

const MainContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-areas:
    "one two three"
    "one two four";
  grid-template-columns: 2fr 1.2fr 1fr;
  grid-template-rows: 1fr 1fr;
  height: 30rem;

  @media (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "one three"
      "two four";
  }
`;

const Category = styled.p`
  position: absolute;
  bottom: 20px;
  left: 20px;
  font-weight: bold;
  font-size: 42px;
  letter-spacing: 0.04em;
  color: #eef1ff;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 2;
  cursor: pointer;

  @media (max-width: 800px) {
    font-size: 24px;
  }
  @media (max-width: 415px) {
    font-size: 18px;
  }
`;

const FirstCategory = styled(Link)`
  position: relative;
  grid-area: one;
  background-image: url("/images/entertainment.jpg");
  background-size: cover;
  overflow: hidden;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0.4;
    transition: all 1s;
    -webkit-transition: all 1s;
  }

  :hover:after {
    opacity: 1;
    cursor: pointer;
  }
`;

const SecondCategory = styled(Link)`
  position: relative;
  grid-area: two;
  overflow: hidden;
  background-image: url("/images/lifestyle.jpg");
  background-size: cover;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0.4;
    transition: all 1s;
    -webkit-transition: all 1s;
  }

  :hover:after {
    opacity: 1;
    cursor: pointer;
  }
`;

const FirstElement = styled(Link)`
  grid-area: three;
  height: 100%;
  position: relative;
  background-image: url("/images/fitness.jpeg");
  background-size: cover;
  overflow: hidden;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0.4;
    transition: all 1s;
    -webkit-transition: all 1s;
  }

  :hover:after {
    opacity: 1;
    cursor: pointer;
  }
`;

const SecondElement = styled(Link)`
  grid-area: four;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-image: url("/images/medical.jpg");
  background-size: cover;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0.4;
    transition: all 1s;
    -webkit-transition: all 1s;
  }

  :hover:after {
    opacity: 1;
    cursor: pointer;
  }
`;
