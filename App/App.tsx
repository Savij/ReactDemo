import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as axios from 'axios';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';

import { isAuthenticated } from './Services/authentication';

import Header from './Navigation/Header';

import Dashboard from './Home/Dashboard';
import Login from './Home/Login';
import Settings from './Settings/Settings';

interface IAuthentication {
    result: {
        accessToken: string;
        expiresIn: number;
    }
}

class App extends React.Component<{}, {}> {

    public render() {
        return (
            <div id='App-container'>
                <Header />
                { this.props.children }
            </div>
        );
    }
}

function requireAuth(nextState: any, replace: any) {
  if (!isAuthenticated()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

const routes = <Router history={ browserHistory }>
    <Route path='/' component={ App }>
        <IndexRoute component={ Dashboard } />
        <Route path='home' component={ Dashboard } />
        <Route path='settings' component={ Settings } onEnter={ requireAuth } />
        <Route path='login' component={ Login } />
    </Route>
</Router>

ReactDOM.render(
    routes,
    document.getElementById('app')
);