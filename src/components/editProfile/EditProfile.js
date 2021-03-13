import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import {Link, withRouter} from 'react-router-dom';
import { Button } from '../../views/design/Button';

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
  color: white;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 250%;
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

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
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

class EditProfile extends React.Component{

    constructor() {
        super();
        // first I need the data so i import the from my local storage
        this.state ={
            birthday: null,
            userID: localStorage.getItem("SelectedUser"),
            onlineUser: localStorage.getItem("loggedIn"),
        }
    }

    // same as for the UserProfile to get the data
    async getUser(){
        const url = '/users/'+this.state.userID;
        const response = await api.get(url);
        const user = new User(response.data);
        this.setState({user:user});
    }

    //same as for the login/registration
    handleInputChange(key,value){
        this.setState({[key]:value})
    }

    componentDidMount() {}

    // Here I send the requested body to the server
    async editStats(){
        try {
            const requestBody = JSON.stringify({
                username: this.state.username,
                birthday: this.state.birthday
            });
            const url = "/users/"+this.state.userID;
            await api.put(url,requestBody);
        } catch (error){
            alert(`something went wrong: \n${handleError(error)}`);
        }
    }

    render() {
        return(
            //make sure that the logged in user can edit only his profile not the others
            (this.state.userID !== this.state.onlineUser) ?
                <Container>
                    <h2>You're not allowed to change others Profile!!!</h2>
                        <center>
                            <Link to={"/game/dashboard/profile"}><Register>
                                BACK TO PROFILE
                            </Register></Link></center>
                </Container>
                :
                <BaseContainer>
                    <FormContainer>
                        <Form>
                            <h2>Change your Profile:</h2>
                            <Label>New Username</Label>
                            <InputField
                                placeholder="Enter here.."
                                onChange={e => {
                                    this.handleInputChange('username', e.target.value);
                                }}
                            />

                            <Label>New Birthday</Label>
                            <InputField
                                placeholder="Enter here.."
                                onChange={e => {
                                    this.handleInputChange('birthday', e.target.value);
                                }}
                            />

                            <center>
                                <Link to={"/game/dashboard/profile"}><Register>
                                    BACK TO PROFILE
                                </Register></Link></center>

                            <ButtonContainer>
                                <Button
                                    disabled={((this.state.username == null) && (this.state.birthday == null))}
                                    width="20%"
                                    onClick={() => {
                                        this.editStats();
                                        this.props.history.push("/game/dashboard/profile");
                                    }}
                                >
                                    Save
                                </Button>
                            </ButtonContainer>

                        </Form>
                    </FormContainer>
                </BaseContainer>
        );
    }
}

export default withRouter(EditProfile)