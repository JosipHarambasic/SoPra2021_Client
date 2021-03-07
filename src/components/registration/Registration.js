import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import { BrowserRouter, Redirect, Switch, Link } from "react-router-dom";


const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: white;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 1.0);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const Register = styled.label`
  color: white;
`;



class Registration extends React.Component {
    render(){
        return (
            <BaseContainer>
                <FormContainer>
                    <Form>
                        <Label>Username</Label>
                        <InputField
                        placeholder={"Enter your Username.."}>
                        </InputField>
                        <Label>Password</Label>
                        <InputField
                            placeholder={"Enter your Password.."}>
                        </InputField>
                        <Label>Password confirmation</Label>
                        <InputField
                            placeholder={"Enter your Password again.."}>
                        </InputField>
                        <ButtonContainer>
                            <Button
                                width={"50%"}>
                                register
                            </Button>
                        </ButtonContainer>

                    </Form>
                </FormContainer>
            </BaseContainer>)
    }
}
export default withRouter(Registration);