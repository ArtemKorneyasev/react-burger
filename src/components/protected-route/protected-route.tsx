import { FC } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isUserAuth } from '../../services/helpers';

interface IProps {
    children: React.ReactNode,
    path: string,
    exact?: boolean,
}

const ProtectedRoute: FC<IProps> = (props: IProps) => {
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
