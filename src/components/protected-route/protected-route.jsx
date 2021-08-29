import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { isUserAuth } from '../../services/helpers';

const ProtectedRoute = (props) => {
    const { children, ...otherProps } = props;
    const isAuth = isUserAuth();

    return (
        <Route
            {...otherProps}
            render={({ location }) => 
                isAuth ? children : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
