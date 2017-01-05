import * as React from 'react';
import { isAuthenticated, logout } from '../Services/authentication';
import { Grid, Row, Button, Col, Checkbox, Form, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { login, getMe } from '../Api/Api';

export default class Login extends React.Component<{}, {}> {

    public componentDidMount() {
        if (isAuthenticated()) {
            logout();
            browserHistory.push('/');
        }        
    }
 
    public render() {
        if (isAuthenticated()) {
            return null;
        }
        return <div className='login'>
            <Grid>
                <Row>
                    <Col md={6} mdOffset={3}>
                        <Form horizontal>
                            <FormGroup controlId="form-email">
                                <Col componentClass={ControlLabel} sm={2}>Email</Col>
                                <Col sm={10}>
                                    <FormControl type="email" placeholder="Email" />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="form-password">
                                <Col componentClass={ControlLabel} sm={2}>Password</Col>
                                <Col sm={10}>
                                    <FormControl type="password" placeholder="Password" />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col smOffset={2} sm={10}><Checkbox>Remember me</Checkbox></Col>
                            </FormGroup>

                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Button bsStyle='primary' block={true} onClick={ () => this.onLogin() }>Sign in</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Grid>            
        </div>;
    }

    private onLogin() {
        localStorage.setItem('token', '12345');
        const me = getMe();
        console.log(me);
        // login('savijcoder@outlook.com', 'password123').execute()
        //     .then(token => {
        //         console.log(`user is logged in with token: ${token.access_token}`);
        //         localStorage.setItem('token', token.access_token);
        //         getMe().execute().then(me => {
        //             console.log(`got me: firstName=${me.firstName}, lastName=${me.lastName}`);
        //         });
        //     })
        //     .catch(() => {
        //         console.log("login failed");  
        //     });
    }
}