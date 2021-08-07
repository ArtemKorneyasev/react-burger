import { Redirect, Route } from 'react-router-dom';
import { getCookie } from '../../services/helpers';

const ProtectedRoute = (props) => {
    const { children, ...otherProps } = props;
    const hasToken = getCookie('accessToken');

    return (
        <Route
            {...otherProps}
            render={({ location }) => 
                hasToken && hasToken !== 'undefined' ? children : (
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
