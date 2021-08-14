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

export default ProtectedRoute;
