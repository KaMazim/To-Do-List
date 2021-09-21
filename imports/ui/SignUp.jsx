import React, { useState } from 'react';
import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base';
import {  useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';

const SignUpWrapper = styled.div`
    background-color: #F2F2F2;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3.5rem 2rem; 
    width: 100%;
    max-width: 440px;

    h2 {
        font-size: 2.5rem;
    }

    form {
        display: flex;
        flex-direction: column;

        width: 100%;
        margin-block: 2.2rem;
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

export function SignUp() {
    let [fullName, setFullName] = useState('');
    let [formUsername, setFormUsername] = useState('');
    let [formPassword, setFormPassword] = useState('');
    let [errorMessage, setErrorMessage] = useState('');

    let history = useHistory();

    function handleSubmit(event) {
        //Preventing the Page Refresh
        event.preventDefault();

        if (formPassword.length < 8 || formPassword.length > 20) {
            setErrorMessage("Senha deve ter entre 8 e 20 caracteres")
        } else {

            Accounts.createUser(
                {
                    username: formUsername.trim(), 
                    password: formPassword.trim(),
                    profile: {
                        name: fullName.trim()
                    }
                }, 
                function handleError(error) {
                    if (error) {
                        switch(error.reason) {
                            case 'Username already exists.':
                                setErrorMessage('Nome de usuário já está sendo utilizado');        
                                break;
                        }
                    } else {
                        setErrorMessage('');
                        if (Meteor.user()) {
                            history.push("/");
                            history.go(1);
                        }
                    }
                }
            );
        }
    }

    return(
        <SignUpWrapper>
            <h2>Cadastro</h2>
            <form onSubmit={handleSubmit}>
                <p className="error" >{ errorMessage }</p>
                <label>Nome completo</label>
                <input type="text"
                    required
                    value={ fullName }
                    maxLength="64"
                    placeholder="Nome completo"
                    onChange={ event => setFullName(event.target.value) }
                />

                <label>Nome de Usuário</label>
                <input type="text"
                    required
                    value={ formUsername }
                    maxLength="30"
                    placeholder="Nome de usuário"
                    onChange={ event => setFormUsername(event.target.value) }
                />

                <label>Senha</label>
                <input type="formPassword"
                    required
                    value={ formPassword }
                    maxLength="20"
                    placeholder="Senha"
                    onChange={ event => setFormPassword(event.target.value) }
                />

                <button type="submit">Cadastrar-se</button>
            </form>
            <p>Já tem uma conta? <Link to="/login">Entre</Link></p>
        </SignUpWrapper>
    );
}