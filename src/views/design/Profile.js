import React from "react";
import styled from "styled-components";
import {withRouter} from "react-router-dom";

const Container = styled.div`
  margin: 6px 0;
  width: 800px;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  border: 1px solid #ffffff26;
`;

const UserName = styled.div`
  font-weight: bold;
  margin-left: auto;

`;

const Name = styled.div`
  font-weight: bold;
  color: #06c4ff;
`;

const Id = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-weight: bold;
`;

const CreationDate = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-weight: bold;
`;

const BirthDate = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-weight: bold;
`;

/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */
const Profile = ({ user }) => {
    return (
        <Container>
            <UserName>Username: {user.username}</UserName>

            <Id>Online Status: {user.status}</Id>

            <CreationDate>Creation Date: {user.creationdate}</CreationDate>

            <BirthDate>Birth Date: {user.birthdate ? user.birthdate : "Not yet added"} </BirthDate>

        </Container>
    );
};

export default Profile;
