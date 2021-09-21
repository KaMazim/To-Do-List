import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { finishedTasks } from '../api/collections';
import { FinishedTask } from './FinishedTask';
import styled from 'styled-components';

Meteor.subscribe('FinishedTasksPublication');

const HistoryWrapper = styled.section`
    background-color: #f2f2f2;

    width: 100%; max-width: 1024px;

    display: flex;
    flex-direction: column;
`;

const MessageWrapper = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 22px;
    font-size: 15px;
    color: #707070;
    font-weight: 700;
    text-align: center;

    &:hover {
        background-color: #E0E0E0;
    }
`;

export function History() {
    let watched_collection = useTracker(() => finishedTasks.find({}, { sort: { completionDate: -1 } }).fetch());

    return(
        <HistoryWrapper>
            <MessageWrapper>
                Aqui é onde todas as suas tarefas completadas se encontram.
            </MessageWrapper>
            { watched_collection.map( documentedTask => <FinishedTask documentedTask={ documentedTask } key={ documentedTask._id } /> ) }
        </HistoryWrapper>
    );
}