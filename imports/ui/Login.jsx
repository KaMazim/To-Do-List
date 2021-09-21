import React, { useState } from 'react';
import { Meteor } from "meteor/meteor";
import {  useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';

const LoginWrapper = styled.div`
    background-color: #F2F2F2;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3.5rem 2rem; 
    width: 100%;
    max-width: 440px;

    h2 {
        font-size: 2.75rem;
    }

    form {
        display: flex;
        flex-direction: column;

        width: 100%;
        margin-block: 3rem;
        font-size: 17px;

        input {
            margin-bottom: 18px;
            border: none;
            background-color: #E0E0E0;
            padding: 1rem;
            font-size: inherit;

            &:hover {
                background-color: #EBEBEB;
            }
        }

        label {
            cursor: default;
            font-size: 15px;
            margin-bottom: 8px;
        }

        button {
            width: fit-content;
            align-self: center;
            font-size: 24px;
            padding: 10px 40px;
            border: 4px solid #191919;
            background-color: #191919;
            color: #F2F2F2;

            &:hover {
                background-color: #F2F2F2;
                color: #191919;
            }
        }

    }

    p {
        font-size: 15px;
        color: #707070;
        font-weight: 500;

        a:hover {
            color: #191919;
        }
    }

    p.error {
        color: #C42021;
        align-self: center;
        margin-bottom: 1rem;
        font-weight: 700;
        font-size: 16px;
        text-align: center;
    }
`;

export function Login() {
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [errorMessage, setErrorMessage] = useState('');

    let history = useHistory();

    function handleSubmit(event) {
        //Preventing the Page Refresh
        event.preventDefault();

        Meteor.loginWithPassword(username.trim(), password.trim(), 
            
            function handleError(error) {
                if (error) {
                    switch(error.reason) {
                        case 'User not found':
                            setErrorMessage('Usuário não existe');        
                            break;
                        case 'Incorrect password':
                            setErrorMessage('Senha incorreta');
                            break;
                    }
                } else {
                    setErrorMessage('');
                    history.push("/");
                    history.go(1);
                }
            }
                
        );
    }

    return (
        <LoginWrapper>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <p className="error">{ errorMessage }</p>
                <label>Usuário</label>
                <input type="text"
                    required
                    value={ username }
                    maxLength="30"
                    placeholder="Nome de usuário"
                    onChange={ event => setUsername(event.target.value) }
                />

                <label>Senha</label>
                <input type="password"
                    required
                    value={ password }
                    placeholder="Senha"
                    onChange={ event => setPassword(event.target.value) }
                />

                <button type="submit">Entrar</button>
            </form>
            
            <p>Ainda não tem uma conta? <Link to="/signup">Cadastre-se</Link></p>
        </LoginWrapper>
    );
}