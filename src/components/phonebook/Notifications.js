import styled from "styled-components";

const Div = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 3%;
  bottom: 80%;
  text-align: center;
  padding: 10px;
  min-width: 100px;
  height: 70px;
  background-color: orange;
  color: black;
`;

export const Empty = () => {
  return (
    <Div>
      <p>Enter the contact's name and(or) phone number!</p>
    </Div>
  );
};

export const ByUsed = () => {
  return (
    <Div>
      <p>Is already in use!</p>
    </Div>
  );
};
