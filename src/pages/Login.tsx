import React, { useEffect, useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import get from 'lodash/get';
import cookies from 'js-cookie';
import api from '../utils/api';
import { CHAVE_TOKEN, SIGNATURE } from '../utils/constants';
import Line from '../components/Line';
import CardLogin from '../components/CardLogin';
import '../styles/pages/login.css';

const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');

    useEffect(() => {
        const token = cookies.get(CHAVE_TOKEN);
        if (token) {
            history.push('/');
        }
    });

    const setToken = (token: string) => cookies.set(CHAVE_TOKEN, token);

    const authenticate = (token: string) => jwt.verify(token, SIGNATURE, (error, decoded): boolean => {
        if (error) {
            alert(get(
                error,
                'message',
                'Algo deu errado',
            ));

            return false;
        }

        setToken(token);
        history.replace('/')
        return true;
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const { data: { token } } = await api.login({ email, senha });

            authenticate(token);
        } catch (error) {
            alert(get(
                error,
                'response.data.message',
                'Algo deu errado',
            ));
        }
    };

    return (
        <div className="sig-in">

            <CardLogin />

            <form className="box-shadow" onSubmit={handleSubmit}>
                <div className="input-email">
                    <input
                        type="email"
                        onChange={e => setEmail(e.target.value)}
                        placeholder="E-mail"
                    />
                </div>
                <div className="input-password">
                    <input
                        type="password"
                        onChange={e => setSenha(e.target.value)}
                        placeholder="Senha"
                    />
                </div>

                <div className="form-btn">
                    <button
                        type="submit"
                        className="btn btn-sigin"
                        name="login"
                    >
                        Entrar
                    </button>
                </div>

                <div className="forgot-password">
                    <Link to="/login">Esqueceu a senha?</Link>
                </div>

                <Line />
            </form>
        </div>
    );
};

export default Login;