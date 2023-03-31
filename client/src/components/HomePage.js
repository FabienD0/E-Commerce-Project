import styled from "styled-components";
import SectionOneHomePage from "./SectionHomePage/SectionOneHomePage";
import SectionTwoHomePage from "./SectionHomePage/SectionTwoHomePage";
import SectionThreeHomePage from "./SectionHomePage/SectionThreeHomePage";
import SectionFourHomePage from "./SectionHomePage/SectionFourHomePage";
import SectionFiveHomePage from "./SectionHomePage/SectionFiveHomePage";

const HomePage = () => {
  return (
    <ContainerAll>
      <SectionOneHomePage />
      <SectionTwoHomePage />
      <SectionThreeHomePage />
      <SectionFourHomePage />
      <SectionFiveHomePage />
    </ContainerAll>
  );
};

export default HomePage;

const ContainerAll = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10rem;
  width: 80rem;
`;
