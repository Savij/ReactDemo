import * as React from 'react';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Modal, Nav, Navbar, NavItem } from 'react-bootstrap';

import { isAuthenticated } from '../Services/authentication';

import About from './About';

interface IState {
    showAbout?: boolean;
}

export default class Header extends React.Component<{}, IState> {
    public componentWillMount() {
        this.setState({
            showAbout: false
        });
    }

    public render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand onClick={ () => this.showAbout() }>
                        React Demo Site
                    </Navbar.Brand>                  
                </Navbar.Header>
                <Nav bsStyle='pills'>
                    <LinkContainer to='home'>
                        <NavItem>Home</NavItem>
                    </LinkContainer>                   
                    { isAuthenticated() && <LinkContainer to='settings'>
                        <NavItem>Settings</NavItem>
                    </LinkContainer> }
                    <LinkContainer to='login'>
                        <NavItem>{ isAuthenticated() ? 'Logout' : 'Login' }</NavItem>
                    </LinkContainer>
                    <NavItem onClick={ () => this.showAbout() }>About Us</NavItem>
                </Nav>
                <About showModal={ this.state.showAbout } closeModal={ () => { this.closeAbout() } }/>
            </Navbar>
        );
    }

    private showAbout() {
        this.setState({
            showAbout: true
        });
    }

    private closeAbout() {
        this.setState({
            showAbout: false
        });
    }
}