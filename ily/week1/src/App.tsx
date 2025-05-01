import { useState } from "react";
import styled from "styled-components";
import Input from "./components/Input";

import "./App.css";

function App() {
  return (
    <>
      <Container>To Do List</Container>
      <Input></Input>
    </>
  );
}

export default App;

const Container = styled.div`
  display: flex;
`;
