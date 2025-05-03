import styled from "styled-components";
import Input from "./assets/components/Input";
import { useState } from "react";
function App() {
  return (
    <>
      <Navbar>UMC Study Plan</Navbar>
      <Wrapper>
        <Input></Input>
      </Wrapper>
    </>
  );
}

export default App;

const Navbar = styled.div`
  display: absolute;
  font-size: 80px;
  text-align: center;
  margin-top: 100px;
  text-decoration: underline;
`;

const Wrapper = styled.div`
  width: 100%;
`;
