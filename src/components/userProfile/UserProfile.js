import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import { BrowserRouter, Redirect, Switch, Link } from "react-router-dom";
import axios from "axios";
import ProfileDesign from "../../views/design/ProfileDesign";
import Player from "../../views/Player";

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: white;
`;


const Label = styled.label
    `height: 35px;
padding-left: 15px;
margin-left: -4px;
border: none;
border-radius: 20px;
margin-bottom: 20px;
color: white;
font-size: 30px
`;

const Register = styled.label
`height: 35px;
padding-left: 15px;
margin-left: -4px;
border: none;
border-radius: 20px;
margin-bottom: 20px;
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
            userId: localStorage.getItem("SelectedUser"),
        };
        this.getUser()

    }

    // we set the user to the searched user with his userID
    async getUser(){
        const url ='/users/'+this.state.userId;
        const response = await api.get(url);
        const user = new User(response.data);
        // the key gets set on new User(response.data);
        this.setState({user:user});

    }

    //need this instead of Mount because I can change my profile and this helps me to stay
    //with the actual situation
    componentDidUpdate(prevProps, prevState, snapshot) {this.getUser()}


    render() {
        return(
                <FormContainer>
                    <center><Label>Profile</Label></center>
                            {this.state.user?
                                (<ProfileDesign user={this.state.user}/>): <h2>There is an error...</h2>}
                            <center>
                                <Link to={"/game/dashboard"}><Register>
                                    BACK TO DASHBOARD
                                </Register></Link></center>
                            <Button
                            width={"16%"}
                            onClick={() => {
                                localStorage.setItem("SelectedUser",this.state.userId);
                                this.props.history.push("profile/edit");
                            }}>
                                Edit Profile
                            </Button>

                </FormContainer>

        )
    }


    /** HTTP put request is sending to the backend.
     * it updates an existing user
     */

}
export default withRouter(UserProfile)