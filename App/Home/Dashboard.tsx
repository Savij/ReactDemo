import * as React from 'react';
import { Table, Panel, Grid, Row, Col, Jumbotron, Button, Modal } from 'react-bootstrap';
import { StyleSheet, css } from 'aphrodite';

import { isAuthenticated } from '../Services/authentication';

const styles = StyleSheet.create({
    dashboardPanel: {
        ':hover': {
            borderColor: '#337ab7'
        },
        ':hover .panel-heading': {
            backgroundColor: '#337ab7',
            borderColor: '#337ab7',
            color: '#fff'
        }
    }
});

interface IState {
    currentOpenings?: Array<any>;
    showLearnMore?: boolean;
}

export default class Dashboard extends React.Component<{}, IState> {
    public componentWillMount() {
        this.setState({
            currentOpenings: this.getCurrentOpenings(),
            showLearnMore: false
        });
    }

    private getCurrentOpenings() {
        return [
            { start: new Date(), title: 'driver', description: 'need a driver' },
            { start: new Date(), title: 'busboy', description: 'full time busboy' },
            { start: new Date(), title: 'reception', description: 'someone to answer the phone.' }
        ];
    }

    public render() {
        return (
            <Grid fluid={ true }>
                <Row>
                    <Col md={12}>
                        { isAuthenticated() ?
                            this.authenticatedUserDashboard() :
                            this.anonymousUserDashboard()    
                        }
                    </Col>
                </Row>
                { this.learnMore() }
            </Grid>
        );
    }

    private learnMore() {
        return (
            <Modal bsSize={ 'large' } show={ this.state.showLearnMore } onHide={ () => this.setState({showLearnMore: false}) }>
            <Modal.Header closeButton>
                <Modal.Title>Learn More</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Kakaw Kakaw Bitches!</h4>
                <p>Crap mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={ () => this.setState({showLearnMore: false}) }>Close</Button>
            </Modal.Footer>
            </Modal>
        );
    }

    private anonymousUserDashboard() {
        return (
            <Jumbotron>
                <h1>Hello Anonymous User</h1>
                <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                <p><Button bsStyle="primary" onClick={ () => this.setState({showLearnMore: true}) }>Learn more</Button></p>
            </Jumbotron>
        );
    }

    private authenticatedUserDashboard() {
        return (
            <Grid fluid={ true }>
                <Row>
                    <Col md={6}>
                        <Panel header={ 'Current Openings' } className={ css(styles.dashboardPanel) }>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Start Date</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                    { this.state.currentOpenings.map((opening, index) => {
                                        return <tr key={ index }>
                                            <td>{ opening.start.toDateString() }</td>
                                            <td>{ opening.title }</td>
                                            <td>{ opening.description }</td>
                                        </tr>
                                    } )}         
                                </thead>
                            </Table>
                        </Panel>
                    </Col>
                    <Col md={6}>
                        <Panel header={ 'Inbox' } className={ css(styles.dashboardPanel) }>
                            Inbox List
                        </Panel>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Panel header={ 'Recent Activity' } className={ css(styles.dashboardPanel) }>
                            List of Recent Activity
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        );
    }
}