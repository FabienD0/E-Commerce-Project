import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SectionFourHomePage = () => {
  const navigate = useNavigate();
  //Function to go to the page of that category
  const handleClick = (id) => {
    navigate(`brands/${id}`);
  };

  const logoSize = 150;

  return (
    <Container>
      <SectionTitle>Trending Brands</SectionTitle>
      <ContainerBrand>
        <Button onClick={() => handleClick(16384)}>
          <img
            src="/images/belkin.png"
            alt="belkin"
            style={{ width: logoSize }}
          />
        </Button>
        <Button onClick={() => handleClick(13334)}>
          <img
            src="/images/casio.png"
            alt="casio"
            style={{ width: logoSize }}
          />
        </Button>
        <Button onClick={() => handleClick(10759)}>
          <img
            src="/images/fitbit.png"
            alt="fitbit"
            style={{ width: logoSize }}
          />
        </Button>
        <Button onClick={() => handleClick(10713)}>
          <img
            src="/images/garmin.png"
            alt="garmin"
            style={{ width: logoSize, marginBottom: "10px" }}
          />
        </Button>
        <Button onClick={() => handleClick(18432)}>
          <img
            src="/images/samsung.png"
            alt="samsung"
            style={{ width: logoSize }}
          />
        </Button>
        <Button onClick={() => handleClick(11939)}>
          <img
            src="/images/nike.png"
            alt="nike"
            style={{ width: logoSize - 30 }}
          />
        </Button>
      </ContainerBrand>
    </Container>
  );
};

export default SectionFourHomePage;

const Container = styled.div`
  height: auto;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #2e3659;
  letter-spacing: 0.05em;
  text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 2rem;
`;

const ContainerBrand = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0px 1rem;
`;

const Button = styled.button`
  all: unset;
  transition: all 0.2s;
  -webkit-transition: all 0.2s;
  margin: 1rem 1rem;
  :hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;
