import React from 'react';
import styled from 'styled-components';
import { formatDate } from '../api/formatDate';

const TaskWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #F2F2F2;
    width: 100%;
    padding: 20px 24px;
    text-decoration: line-through;
    &:hover {
        background-color: #E0E0E0;
        text-decoration: none;

        h3, p {
            opacity: 1;
        }
    }

    h3 {
        font-size: 17.5px;
        opacity: 0.6;
        max-width: calc(100vw - 160px);
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
`;

export function FinishedTask(props) {
    let documented_task = props.documentedTask;

    let date = documented_task.completionDate;

    return(
        <TaskWrapper>
            <h3 lang="en">{ documented_task.title }</h3>
            <p>Completado em: { formatDate(date) } - { (date.getHours() < 10 ? `0${date.getHours()}` : date.getHours() ) + ':' + (date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes() )} </p>
        </TaskWrapper>
    );
}