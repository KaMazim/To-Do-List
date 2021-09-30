import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Task } from './Task';
import { useTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';

Meteor.subscribe('TasksPublication');

const ListWrapper = styled.section`
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

export function TaskList(props) {
    let collection = props.collection;
    let watched_collection = useTracker(() => collection.find({finished: false}).fetch());

    if (watched_collection.length > 0) {
        return(
            <ListWrapper >
                { watched_collection.map(documentedTask => <Task documented_task={ documentedTask }  selection={ props.selection } key={ documentedTask._id }/>) }
            </ListWrapper>
        );
    } else {
        return (
            <MessageWrapper>Parece que você não tem nenhuma tarefa pendente. Adicione uma!</MessageWrapper>
        );
    }
}