import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Cart from "./Cart";
import Footer from "./Footer";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import HomePage from "./HomePage";
import ProductDetails from "./ProductDetails";
import Overlay from "./utils/overlay";
import Category from "./Category";
import Error from "./Error";
import PageNotFound from "./PageNotFound";
import Brands from "./Brands";
import Brand from "./Brand";
import AllProducts from "./AllProducts";
import Checkout from "./Checkout";
import Confirmation from "./Confirmation";

function App() {
  const [isCart, setIsCart] = useState(false);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <ContainerAll>
        <Cart isCart={isCart} setIsCart={setIsCart} />
        {isCart && <Overlay setIsCart={setIsCart} />}
        <Header setIsCart={setIsCart} />
        <Main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/allProducts" element={<AllProducts />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            <Route path="/categories/:category" element={<Category />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/brands/:brandId" element={<Brand />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order/:orderId" element={<Confirmation />} />
            <Route path="/404" element={<Error />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Main>
        <Footer />
      </ContainerAll>
    </BrowserRouter>
  );
}

export default App;

const ContainerAll = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const Main = styled.main`
  display: flex;
  justify-content: center;
  padding-top: 10rem;
`;
