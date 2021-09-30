import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { formatDate } from '../api/formatDate';

const ButtonWrapper = styled.button`
    display: flex;
    justify-content: center;
    align-content: center;
    padding: 18px;
    font-size: 24px;
    border: none;

    &:hover {
        background-color: #E0E0E0;


        svg > path {
            fill: #007EA7;
        }
    }
`;

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
            &:hover, &:focus {
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
 

export function AddTask() {
    let [formTitle, setFormTitle] = useState('');
    let [formDate, setFormDate] = useState('');
    let [active, setActive] = useState(false);

    function handleSubmit(event) {
        //Preventing the Page Refresh
        event.preventDefault();
        
        let documented_task = {
            title: formTitle.trim(),
            author: Meteor.userId(),
            creationDate: new Date(),
            finished: false,
            marked: false,
            dueDate: formDate
        };

        Meteor.call('addTask', documented_task);

        setFormTitle('');
        setFormDate('');
        setActive(false);
    }

    if (active) {
        return(
            <FormWrapper>
                <form onSubmit={handleSubmit}>
                    <div className="inputs">
                        <input
                            type="text"
                            required
                            autoFocus
                            maxLength="72" 
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
    
                    <button title="Adicionar" type="submit">
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </form>
                <button title="Cancelar" onClick={ () => { setActive(false); setFormTitle(''); setFormDate(''); } }>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </FormWrapper>
        );
    } 
    else {
        return (
            <ButtonWrapper title="Adicionar Tarefa" onClick={ () => setActive(true) } >
                <FontAwesomeIcon icon={faPlus} />
            </ButtonWrapper>
        );
    }
}