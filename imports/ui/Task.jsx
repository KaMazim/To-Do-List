import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { TaskForm } from './TaskForm';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPen } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';

const TaskWrapper = styled.div`
    display: flex;
    align-items: stretch;
    background-color: #F2F2F2;
    width: 100%;
    max-width: 100%;
    overflow-wrap: break-word;

    &:hover {
        background-color: #E0E0E0;
    }

    label {
        display: flex;
        align-items: center;
        padding: 18px;
    }
    
    label:hover {
        background-color: #007EA7;
    }

    label > div.mark-as-done {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 24px;
        height: 24px;
        font-size: 0px;
        border: 2px solid rgba(25, 25, 25, 0.5); border-radius: 50%;
    }
    
    label > div.mark-as-done > svg {
        transition: all 0.05s;
    }
    
    label:hover > div.mark-as-done {
        border-color: #f2f2f2;
        font-size: 14px;
    }
    
    label > div.mark-as-done > svg > path {
        display: none;
    }

    label:hover > div.mark-as-done > svg > path {
        fill: #f2f2f2;
        display: flex;
    }
    
    input[type="radio"], input[type="checkbox"] {
        display: none;
    }



    /*      Input Check      */
    label.check:hover {
        background-color: #E0E0E0;
    }

    input[type="checkbox"]:checked ~ label.check > div.checked,  label.check:hover > div.checked{
        border-color: #191919;
    }

    div.checked {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 1rem;
        height: 1rem;
        font-size: 0px;
        border: 2px solid rgba(25, 25, 25, 0.5);
    }

    input[type="checkbox"]:checked ~ label.check > div.checked > div.inner-checked {
        background-color: #007EA7;
        width: 12px;
        height: 12px;
    }


    /*      Inner Task      */
    div.inner-task {
        max-width: 100%;
        flex-grow: 1;
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        border-bottom: rgba(25, 25, 25, 0.1) solid 1px;
    }

    div.title {
        display: flex;
        flex-direction: column;
        height: 100%;
        font-size: 15px;
        flex-wrap: wrap;
        justify-content: center;
        padding-block: 14px;
        overflow-wrap: break-word;
        word-wrap: break-word;
        hyphens: auto;
        max-width: calc(100vw - 250px);
        h3 {
            max-width: 100%;
            hyphens: auto;
        }
        p {
            font-size: 12px;
            font-weight: 700;
            color: #707070;
        }
    }

    label:hover ~ div.inner-task{
        padding-left: 18px;
    }

    label.check:hover ~ div.inner-task {
        padding-left: 0px;
    }


    /*      Buttons      */
    div.buttons {
        display: flex;
    }
    
    div.buttons > button {
        display: flex;
        border: none;
        padding: 20px;
        font-size: 20px;
        align-items: center;
    }
    
    div.buttons > button > svg > path {
        fill: rgba(25, 25, 25, 0.8);
    }
    
    div.buttons > button:hover > svg > path {
        fill: #F2F2F2;
    }
    
    button.editar:hover {
        background-color: #191919;
    }
    
    button.excluir:hover {
        background-color: #C42021;
    
    }
    @media screen and (max-width: 400px) {

        div.buttons > button, label {
            padding: 12px;
            font-size: 18px;
        }

        label > div.mark-as-done {
            width: 20px; height: 20px;
        }
        label:hover > div.mark-as-done {
            font-size: 12px;
        }

        div.title {
            font-size: 13px;
            max-width: calc(100vw - 170px);
        }

        div.checked {
            width: 14px;
            height: 14px;
        }
    }
`;

export function Task(props) {
    let documented_task = props.documented_task;
    let [editable, setEditable] = useState(false);

    let mark_state = documented_task.marked;
    function markTask(event) {
        mark_state = event.target.checked;
        Meteor.call('markTask', documented_task, mark_state);
        
    }

    if(editable) {
        return <TaskForm setEditable={ setEditable } documented_task={ documented_task }/>;
    } else {
        return (
            <TaskWrapper>
                
                <input id={ documented_task._id + "123" }type="checkbox" onChange={markTask} checked={mark_state}/>
                { props.selection && <label className="check" htmlFor={ documented_task._id + "123" }> <div className="checked"> <div className="inner-checked"></div> </div> </label> }

                <input type="radio" id={ documented_task._id } onClick={ () => Meteor.call('finishTask', documented_task) }/>
                <label title="Marcar como feito" htmlFor={ documented_task._id }>
                    <div className="mark-as-done">
                        <FontAwesomeIcon icon={faCheck} />
                    </div>
                </label>

                <div className="inner-task">
                    
                    <div className="title" lang="en">
                        <h3>{ documented_task.title }</h3>
                        <p>{ documented_task.dueDate.split("-").reverse().join('-') }</p>
                    </div>

                    <div className="buttons">
                        <button className="editar" title="Editar" onClick={() => setEditable(true)}>
                            <FontAwesomeIcon icon={faPen} />
                        </button>
                        <button className="excluir" title="Excluir" onClick={ () =>  Meteor.call('deleteTask', documented_task) }>
                            <FontAwesomeIcon icon={faTimesCircle} />
                        </button>
                    </div>

                </div>
            </TaskWrapper>
        );
    }

}