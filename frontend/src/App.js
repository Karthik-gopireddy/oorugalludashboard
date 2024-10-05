import React from 'react';
import "./App.css"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Home from './components/home';
import PrivateRoute from './components/ProtectedRoute/ProtectedRoute'; // Import the PrivateRoute component
import Notfound from './components/Notfound';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/registration" component={Register} />
                
                {/* Protect the /home route */}
                <PrivateRoute exact path="/dashboard" component={Home} />
                <Route exact path="*" component={Notfound}/>
            </Switch>
        </Router>
    );
}

export default App;
