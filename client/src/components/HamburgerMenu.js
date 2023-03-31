import styled from "styled-components";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Link } from "react-router-dom";
import { useState } from "react";

const HamburgerMenu = ({ isHamburger, setIsHamburger, categories }) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const handleClickLink = () => {
    setIsCategoriesOpen(false);
    setIsHamburger(false);
  };

  return (
    <>
      <ButtonHamburger onClick={() => setIsHamburger(!isHamburger)}>
        <ContainerHamburger>
          <Hamburger1
            isHamburger={isHamburger}
            style={{ top: 12 }}
          ></Hamburger1>
          <Hamburger2
            isHamburger={isHamburger}
            style={{ top: 24 }}
          ></Hamburger2>
          <Hamburger3
            isHamburger={isHamburger}
            style={{ top: 36 }}
          ></Hamburger3>
        </ContainerHamburger>
      </ButtonHamburger>
      <ContainerMenuHamburger isHamburger={isHamburger}>
        <ContainerCategories>
          <div
            style={{
              display: "flex",
            }}
          >
            <LinkHamburger
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
            >
              Categories
            </LinkHamburger>
            {isCategoriesOpen ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </div>
          {isCategoriesOpen && (
            <ContainerCategoriesHamburger>
              {categories.map((category) => {
                return (
                  <LinkHamburgerCategory
                    key={category}
                    to={`/categories/${category}`}
                    onClick={handleClickLink}
                  >
                    {category}
                  </LinkHamburgerCategory>
                );
              })}
            </ContainerCategoriesHamburger>
          )}
        </ContainerCategories>
        <LinkHamburger to="/brands" onClick={handleClickLink}>
          Brands
        </LinkHamburger>
        <LinkHamburger to={`/checkout`} onClick={handleClickLink}>
          Cart
        </LinkHamburger>
        {/* <LinkHamburger>Profile</LinkHamburger> */}
      </ContainerMenuHamburger>
    </>
  );
};

export default HamburgerMenu;

const ButtonHamburger = styled.button`
  all: unset;
  display: none;

  @media (max-width: 800px) {
    display: block;
    margin: 0px 15px;
  }
`;

const ContainerHamburger = styled.label`
  display: none;
  width: 40px;
  height: 60px;
  position: relative;
  cursor: pointer;
  @media (max-width: 800px) {
    display: block;
  }
`;

const Hamburger1 = styled.span`
  position: absolute;
  height: 4px;
  width: 100%;
  background: black;
  transition: 0.5s;
  transform: ${(props) =>
    props.isHamburger ? "translateY(12px) rotate(-45deg);" : ""};
`;
const Hamburger2 = styled.span`
  position: absolute;
  height: 4px;
  width: 100%;
  background: black;
  transition: 0.5s;
  opacity: ${(props) => (props.isHamburger ? "0" : "100")};
`;
const Hamburger3 = styled.span`
  position: absolute;
  height: 4px;
  width: 100%;
  background: black;
  transition: 0.5s;
  transform: ${(props) =>
    props.isHamburger ? "translateY(-12px) rotate(45deg)" : ""};
`;

const ContainerMenuHamburger = styled.div`
  display: none;
  position: absolute;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  gap: 1em;
  top: 80px;
  opacity: ${(props) => (props.isHamburger ? "0.9" : "0")};
  width: 100%;
  min-height: 15rem;
  background-color: #d2daff;
  background: linear-gradient(
    90deg,
    hsla(190, 79%, 59%, 1) 0%,
    hsla(226, 50%, 65%, 1) 100%
  );
  border: 1px solid #9d9d9d;
  padding: 1rem 0;
  transition: all 0.3s ease-in-out;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;

  @media (max-width: 800px) {
    display: flex;
  }
`;

const ContainerCategories = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContainerCategoriesHamburger = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LinkHamburger = styled(Link)`
  all: unset;
  font-weight: 700;
  font-size: 1.5rem;
  transition: all 0.2s;
  -webkit-transition: all 0.2s;

  :hover {
    cursor: pointer;
    opacity: 0.6;
  }

  :visited {
    text-decoration: none;
    color: inherit;
  }
`;

const LinkHamburgerCategory = styled(Link)`
  all: unset;
  font-weight: 700;
  font-size: 1rem;
  margin: 0.3rem 0;
  transition: all 0.2s;
  -webkit-transition: all 0.2s;

  :hover {
    cursor: pointer;
    opacity: 0.6;
  }

  :visited {
    text-decoration: none;
    color: inherit;
  }
`;
