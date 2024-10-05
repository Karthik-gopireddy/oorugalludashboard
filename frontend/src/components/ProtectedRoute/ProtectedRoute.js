import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// A component to handle protected routes
const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('token'); // Check if token exists

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" /> // Redirect to login if not authenticated
                )
            }
        />
    );
};

export default PrivateRoute;
