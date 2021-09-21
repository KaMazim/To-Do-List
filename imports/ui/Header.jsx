import React from 'react';
import { Meteor } from "meteor/meteor";
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHistory, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useTracker } from 'meteor/react-meteor-data';
import { tasks } from '../api/collections';

const HeaderWrapper = styled.header`
    background-color: #F2F2F2;
    width: 100%;
    max-width: 1024px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ButtonsWrapper = styled.nav`
    display: flex;
    width: 100%;

    & > * {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        padding: 20px;
        font-size: 20px;

        svg > path {
            fill: rgba(25, 25, 25, 0.6);
        }

        &:hover {
            background-color: #E0E0E0;
    
    
            svg > path {
                fill: #191919;
            }
        }
    }

    .selected {
        border-bottom: 4px solid #007EA7;
        padding: 18px;
        svg > path {
            fill: #007EA7;
        }
    }
`;

const MessageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    padding: 3.5rem;

    h2 {
        font-size: 3rem;
        margin-bottom: 12px;
    }

    p {
        color: #707070;
        font-weight: 700;
    }

    @media screen and (max-width: 400px) {

        padding: 2.2rem 1.6rem;


        h2 {
            font-size: 2rem;
            margin-bottom: 6px;
        }

        p {
            font-size: 14px;
        }
    }
`;

export function Header() {
    let first_name = Meteor.user().profile.name.split(" ")[0];

    let collection_size = useTracker(() => tasks.find().count());
    let message = "";

    switch(collection_size) {
        case 0:
            message = "Você não tem nenhuma tarefa pendente."
            break;
        case 1:
            message = "Você tem uma tarefa pendente."
            break;
        default:
            message = `Você tem ${collection_size} tarefas pendentes.`
    }
    return(
        <HeaderWrapper>
            <MessageWrapper>
                <h2>Olá { first_name }!</h2>
                <p>
                    { message }
                </p>
            </MessageWrapper>
            <ButtonsWrapper>
                <NavLink exact={true} activeClassName="selected" title="Home" to="/">
                    <FontAwesomeIcon icon={faHome} />
                </NavLink>
                <NavLink activeClassName="selected" title="Histórico" to="/history">
                    <FontAwesomeIcon icon={faHistory} />
                </NavLink>
                <NavLink activeClassName="selected" title="Conta" to="/account">
                    <FontAwesomeIcon icon={faUserCircle} />
                </NavLink>
            </ButtonsWrapper>
        </HeaderWrapper>
    );
}