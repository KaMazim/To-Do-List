import { Meteor } from 'meteor/meteor';
import {tasks, finishedTasks } from "../imports/api/collections";
import "../imports/api/methods";

Meteor.publish('TasksPublication', 
    function () {
    if (Meteor.user()) {
        return tasks.find( { author: Meteor.userId(), finished: false } );
    }
});

Meteor.publish('FinishedTasksPublication', 
    function () {
    if (Meteor.user()) {
        return tasks.find( { author: Meteor.userId(), finished: true } );
    }
});

Meteor.startup(() => {

});