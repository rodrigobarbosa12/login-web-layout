import React, { lazy, Suspense } from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import jwt from 'jsonwebtoken';
import cookies from 'js-cookie';
import Spinner from './components/Spinner';
import { CHAVE_TOKEN, SIGNATURE } from './utils/constants';

const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));

const styles = {
    top: '300px',
    display: 'inline-block',
};

const getToken = () => cookies.get(CHAVE_TOKEN);
const unsetToken = () => cookies.remove(CHAVE_TOKEN);

const PrivateRoute = ({ component: Component, ...rest }) => {
    const token = getToken();

    if (!token) {
        return <Redirect to="/login" />;
    }

    jwt.verify(token, SIGNATURE, (err) => {
        if (err && err.message === 'jwt expired') {
            unsetToken();
        }
    });

    return (
        <Route
            {...rest}
            render={props => (getToken() ? <Component {...props} /> : <Redirect to="/login" />)}
        />
    );
};

const Routes = () => (
    <BrowserRouter>
        <Suspense fallback={<Spinner style={styles} />}>
            <Switch>
                <Route path="/login" exact component={Login} />
                <PrivateRoute path="/" exact component={Home} />
            </Switch>
        </Suspense>
    </BrowserRouter>
);

export default Routes;
