import React, { useState } from 'react';
import { tasks } from '../api/collections';
import { AddTask } from './AddTask';
import { TaskList } from './TaskList';
import { Meteor } from 'meteor/meteor';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

Meteor.subscribe('Tasks Publication');

const Wrapper = styled.main`
    display: flex;
    flex-direction: column;
    background-color: #f2f2f2;
    width: 100%; max-width: 1024px;


    div.mini-menu {
        display: flex;
        align-content: center;
    }

    input[type="checkbox"] {
        display: none;
    }


    div.options {
        display: flex;
    }


    div.options label {
        display: flex;
        width: fit-content;
        align-items: center;
        padding: 20px;
    }

    label.check:hover {
        background-color: #E0E0E0;
    }

    input[type="checkbox"]:checked ~ label.check > div.checked,  label.check:hover > div.checked{
        border-color: #191919;
    }

    div.options div.checked {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 20px;
        height: 20px;
        font-size: 0px;
        border: 2px solid rgba(25, 25, 25, 0.5);
    }

    div.options input[type="checkbox"]:checked ~ label.check > div.checked > div.inner-checked {
        background-color: #007EA7;
        width: 16px;
        height: 16px;
    }


    button.excluir {
        align-items: center;
        display: flex;
        border: none;
        padding: 20px;
        font-size: 20px;
    }
    
    button.excluir > svg > path {
        fill: rgba(25, 25, 25, 0.8);
    }
    
    button.excluir:hover > svg > path {
        fill: #F2F2F2;
    }
    
    button.editar:hover {
        background-color: #191919;
    }
    
    button.excluir:hover {
        background-color: #C42021;
    
    }

    label.many-selections {
        display: flex;
        align-items: center;
        padding: 20px;
        font-size: 14px;
        border: 2px solid rgba(0, 0, 0, 0);
    }
    input[type="checkbox"]:checked ~ label.many-selections {
        color: #007EA7;

    }
    label.many-selections:hover {
        color: #007EA7;
    }

    div.many-selections {
        display: flex;
        align-items: center;
    }

    div.many-selections:hover {
        background-color: #E0E0E0;
    }
    label {
        display: flex;
        align-items: center;
        padding: 18px;
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

        svg {
            transition: all 0.05s;
        }

        svg > path {
            display: none;
        }
    }
    
    label:hover > div.mark-as-done {
        border-color: #f2f2f2;
        font-size: 14px;
    }

    label:hover > div.mark-as-done > svg > path {
        fill: #f2f2f2;
        display: flex;
    }
    
    input[type="radio"], input[type="checkbox"] {
        display: none;
    }

    label.mark_many_as_done:hover {
        background-color: #007EA7;
    }
`;

export function Home() {
    let [selection, setSelection] = useState(false);

    let [markAll, setMarkAll] = useState("Selecionar");

    function selectAll(event) {
        let mark_state = event.target.checked;
        Meteor.call('selectAllTasks', mark_state);
        setMarkAll(event.target.checked ? "Desselecionar" : "Selecionar");
    }

    function verifySelection() {
        if (selection) {
            return(
                <div className="options">
                    <input id="selector" type="checkbox" onChange={ selectAll } />
                    <label title={ markAll + " tudo"} className="check" htmlFor="selector"> <div className="checked"> <div className="inner-checked"></div> </div> </label>
                    <input type="radio" id="mark_many_as_done" onClick={ () => Meteor.call('finishManyTasks') }/>
                    <label title="Marcar selecionados como feito" className="mark_many_as_done"  htmlFor="mark_many_as_done">
                        <div className="mark-as-done">
                            <FontAwesomeIcon icon={faCheck} />
                        </div>
                    </label>
                    <button title="Excluir selecionados" className="excluir" onClick={ () => Meteor.call('deleteManyTasks') }><FontAwesomeIcon icon={faTimesCircle} /></button>
                </div>
            );
        }
    }

    return(
        <Wrapper>
            <div className="mini-menu">
                <div className="many-selections">
                    <input type="checkbox" id="many-selections" onChange={ event => setSelection(event.target.checked) }/>
                    <label htmlFor="many-selections" className="many-selections">Seleção Multipla</label>
                </div>
                { verifySelection() }
            </div>
            <TaskList collection={ tasks } selection={ selection } />
            <AddTask />
        </Wrapper>
    );
}