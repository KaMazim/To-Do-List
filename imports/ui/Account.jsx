import React from 'react';
import { Meteor } from 'meteor/meteor';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import {  useHistory } from 'react-router-dom';

const AccountWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #f2f2f2;
    width: 100%; max-width: 1024px;

    button {
        display: flex;
        border: none;
        padding: 20px;
        font-size: 20px;
        align-items: center;
        justify-content: center;
    }

    button > svg > path {
        fill: rgba(25, 25, 25, 0.8);
    }
    
    button:hover > svg > path {
        fill: #F2F2F2;
    }

    button.sair:hover {
        background-color: #C42021;
    
    }
`;

export function Account() {

    let history = useHistory();

    function LogOut() {
        history.push("/");
        Meteor.logout();
        history.go(1);
    }

    return (
        <AccountWrapper>
            <button title="Sair" className="sair" onClick={LogOut}>
                <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
        </AccountWrapper>
    );
}