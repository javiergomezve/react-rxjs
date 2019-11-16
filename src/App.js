import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import './App.css';
import auth0Client from './Auth/Auth';
import Public from "./Components/Public/Public";
import Callback from "./Components/Callback/Callback";
import SecuredRoute from "./Components/SecuredRoute/SecuredRoute";
import Protected from "./Components/Protected/Protected";

class App extends Component {

    state = {
        checkingSession: true,
    };

    async componentDidMount() {
        if (this.props.location.pathname === '/callback') {
            this.setState({ checkingSession: false });
            return;
        }

        try {
            await auth0Client.silentAuth();
            this.forceUpdate();
        } catch (e) {
            if (e.error !== 'login_required') console.log(e.error);
        }

        this.setState({ checkingSession: false });
    }

    render() {
        return (
            <div className="h-screen bg-blue-lighter text-center pt-10">
                <Route component={Public} path='/' exact />
                <Route component={Callback} path='/callback' exact />
                <SecuredRoute
                    path='/protected'
                    component={Protected}
                    checkingSession={this.state.checkingSession}
                />
            </div>
        );
    }
}

export default withRouter(App);
