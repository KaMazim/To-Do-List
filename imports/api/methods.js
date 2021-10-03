import { Meteor } from 'meteor/meteor';
import { tasks } from "./collections";

Meteor.methods({
    'addTask' (task) {

        if(this.userId) {
            
            try {
                tasks.schema.validate(task);
            } catch(error) {
                console.log(error);
            }

            tasks.insert(task);
        }
        
    },

    'deleteTask' (task) {
        if(this.userId === task.author) {
            tasks.remove(task._id);
        }
    },

    'editTask' (current_task, new_task) {
        if(this.userId === current_task.author) {
            tasks.update(
                {_id: current_task._id},
                { $set: new_task }
            );
        }
    },

    'finishTask' (task) {
        if(this.userId === task.author) {

            tasks.update(
                {_id: task._id},
                { $set: { finished: true, marked: false, completionDate: new Date() } }
            );
        }
    },

    'undoTask' (task) {
        if(this.userId === task.author) {

            tasks.update(
                {_id: task._id},
                { $set: { finished: false } }
            );
        }
    },

    'markTask' (task, mark_state) {
        if(this.userId === task.author) {
            tasks.update(
                {_id: task._id},
                { $set: {marked: mark_state} }
            );
        }
    },

    'finishManyTasks' () {
        if(this.userId) {
            let user_tasks = tasks.find({author: this.userId, finished: false}).fetch();
            user_tasks.forEach(
                task => tasks.update(
                    { _id: task._id, marked: true },
                    { $set: {finished: true, marked: false, completionDate: new Date()} }
                )
            );
        }
    },

    'deleteManyTasks'() {
       tasks.remove({marked: true});
    },

    'selectAllTasks' (mark_state) {
        
        if (this.userId) {
            let user_tasks = tasks.find({author: this.userId, finished: false}).fetch();
            user_tasks.forEach(
                task => tasks.update(
                    { _id: task._id },
                    { $set: { marked: mark_state } }
                )
            );
        }
        
    }
});