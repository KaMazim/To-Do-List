import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../api/formatDate';

const FormWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    width: 100%;
    &:hover {
        background-color: #E0E0E0;
    }

    button {
        display: flex;
        align-items: center;
        border: none;
        padding: 20px;
        font-size: 29.1px;
    }

    button > svg {
        height: 20px;
    }

    button:hover {
        background-color: #191919;
    }
    button:hover > svg > path {
        fill: #F2F2F2;
    }


    form {
        display: flex;
        flex-grow: 1;
    }
    form button {
        font-size: 23px;
    }

    form > button > svg > path {
        fill: #007EA7;
    }

    form > button:hover {
        background-color: #007EA7;
    }

    form > input {
        background-color: inherit;
        padding-left: 1.5rem;
        width: 100%;
        border: none;
        font-size: 18px;
        font-weight: 700;
    }

    form > div.inputs {
        background-color: inherit;
        padding-left: 1.5rem;
        flex-grow: 1;
        border: none;
        
        font-weight: 700;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: stretch;

        input[type="text"] {
            padding-block: 12px;
            flex-grow: 1;
            font-size: 19px;
            
        }

        input[type="date"] {
            padding: 12px 8px;
            font-size: 1rem;
            color: #707070;
            flex-basis:200px;

            &:hover {
                color: #191919;
            }
        }

        
        input {
            font-weight: 700;
            border: none;
            background-color: inherit;
            &:hover {
                background-color: #EBEBEB;
            }
        }

        label {
            cursor: default;
            color: #707070;
            font-size: 15px;
            align-self: center;
        }

        
        
    }


    @media screen and (max-width: 400px) {
        button {
            padding: 12px;
            font-size: 18px;
        }
        form > div.inputs {
            padding-left: 0.5rem;

            input[type="text"] {
                font-size: 15px;
            }

            input[type="date"] {
                font-size: 13px;
                padding: 10px 5px;
                flex-grow: 0;
            }
        }

    }
`;


export function TaskForm(props) {
    let documented_task = props.documented_task;
    
    let [formTitle, setFormTitle] = useState(documented_task.title);
    let [formDate, setFormDate] = useState(documented_task.dueDate);

    function handleSubmit(event) {
        //Preventing the Page Refresh
        event.preventDefault();

        let form_task = {
            title: formTitle,
            dueDate: formDate
        };

        Meteor.call('editTask', documented_task, form_task);

        props.setEditable(false);
    }

    return(
        <FormWrapper>
            <form onSubmit={handleSubmit}>
                <div className="inputs">
                    <input
                        type="text"
                        required
                        autoFocus
                        maxLength="96" 
                        placeholder="Título da tarefa"
                        value={ formTitle }
                        onChange={ event => setFormTitle(event.target.value) }
                    />

                    <input 
                        type="date" 
                        min={ formatDate(new Date()).split("-").reverse().join('-') } 
                        value={ formDate } 
                        onChange={ event => setFormDate(event.target.value) } 
                    />
                    </div>

                <button type="submit" title="Salvar" ><FontAwesomeIcon icon={faSave} /></button>
            </form>
            <button title="Cancelar" onClick={ () => props.setEditable(false) }><FontAwesomeIcon icon={faTimes} /></button>
        </FormWrapper>
    );
}