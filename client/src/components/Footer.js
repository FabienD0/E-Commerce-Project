import styled from "styled-components";

const Footer = () => {
  return (
    <Container>
      <ContainerLink>
        <Link href="#">About</Link>
        <Link href="#">Careers</Link>
        <Link href="#">Support</Link>
        <Link href="#">FAQs</Link>
        <Link href="#">Contact</Link>
      </ContainerLink>
      <TextCopyright>
        Copyright Ⓒ2023 PulsePeak. All right reserved{" "}
      </TextCopyright>
    </Container>
  );
};

export default Footer;

const Container = styled.footer`
  margin-top: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
  height: 8rem;
  background: #aac4ff;
  background-color: black;
`;

const ContainerLink = styled.div``;

const Link = styled.a`
  font-weight: 700;
  text-decoration: none;
  color: white;
  margin: 0 2rem;

  :hover {
    text-decoration: underline;
  }

  @media (max-width: 600px) {
    margin: 0px 0.4rem;
  }
`;

const TextCopyright = styled.p`
  font-weight: 700;
  color: white;
`;
