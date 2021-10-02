import React from 'react';
import { Meteor } from 'meteor/meteor';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../api/formatDate';

const TaskWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #F2F2F2;
    width: 100%;
    padding-left: 20px;
    text-decoration: line-through;
    border-bottom: rgba(25, 25, 25, 0.1) solid 1px;
    &:hover {
        background-color: #E0E0E0;
        text-decoration: none;

        h3, p {
            opacity: 1;
        }

        button > svg > path {
            fill: #191919;
        }
    }
    div {
        display: flex;
        flex-direction: column;
        justify-content: center;

        h3 {
            font-size: 17.5px;
            opacity: 0.6;
            max-width: calc(100vw - 86px);
            hyphens: auto;
            overflow-wrap: break-word;
            word-wrap: break-word;
        }

        p {
            font-size: 14px;
            font-weight: 700;
            opacity: 0.6;
            color: #707070;
        }
    }
    

    button {
        display: flex;
        border: none;
        padding: 21px;
        font-size: 20px;
        align-items: center;

        svg > path {
            fill: rgba(25, 25, 25, 0.6);
        }

        &:hover {
            background-color: #191919;

            svg > path {
                fill: #F2F2F2;
            }
        }
    }

`;

export function FinishedTask(props) {
    let documented_task = props.documentedTask;

    let date = documented_task.completionDate;

    return(
        <TaskWrapper>
            <div>
                <h3 lang="en">{ documented_task.title }</h3>
                <p>Completado em: { formatDate(date) } - { (date.getHours() < 10 ? `0${date.getHours()}` : date.getHours() ) + ':' + (date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes() )} </p>
            </div>
            <button title="Desfazer tarefa" onClick={ () => Meteor.call('undoTask', documented_task) }>
                <FontAwesomeIcon icon={ faUndo } />
            </button>
        </TaskWrapper>
    );
}