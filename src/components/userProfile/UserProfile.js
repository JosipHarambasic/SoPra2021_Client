import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import { BrowserRouter, Redirect, Switch, Link } from "react-router-dom";
import axios from "axios";
import Profile from "../../views/design/Profile";


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


/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */
class UserProfile extends React.Component {
    /**
     * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
     * The constructor for a React component is called before it is mounted (rendered).
     * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
     * These fields are then handled in the onChange() methods in the resp. InputFields
     */
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            userID: localStorage.getItem("ProfileUser")
        };
        this.getUser();
    }

    async getUser(){
        const url ="/users/"+this.state.userID;
        const response = await api.get(url);
        const user = new User(response.data);
        this.setState({user:user});
    }

    //need this instead of Mount because I can change my profile and this helps me to stay
    //with the actual situation
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.getUser();
    }


    render() {
        return(
            <BaseContainer>
                <FormContainer>
                    <Form>
                        <h2>Profile</h2>
                        {this.state.user?(<Profile user={this.state.user}/>):(<h1>Null</h1>)}
                        <ButtonContainer>
                            <Button
                            width={"40%"}
                            onClick={() => {
                                localStorage.setItem("ProfileUserEdit",this.state.userID);
                                this.props.history.push("/game/dashboard/userProfile/edit");
                            }}>
                                Edit Profile
                            </Button>
                            <center>
                                <Link to={"/game/dashboard"}><Register>
                                    EXIT
                                </Register></Link></center>
                        </ButtonContainer>
                    </Form>
                </FormContainer>
            </BaseContainer>
        )
    }


    /** HTTP put request is sending to the backend.
     * it updates an existing user
     */

}
export default withRouter(UserProfile)