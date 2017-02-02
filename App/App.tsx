import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';

import Home from './Home/Home';

class App extends React.Component<{}, {}> {

    public render() {
        return (
            <div id='App-container'>
                {this.props.children}
            </div>
        );
    }
}

const routes = <Router history={browserHistory}>
    <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='home' component={Home} />
    </Route>
</Router>

ReactDOM.render(
    routes,
    document.getElementById('app')
);