import { Meteor } from 'meteor/meteor';
import { tasks, finishedTasks } from "./collections";

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

            finishedTasks.insert(task);
            finishedTasks.update(
                {_id: task._id},
                { $set: { completionDate: new Date() } }
            );
            tasks.remove(task._id);
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

    'deleteManyTasks'() {
        /*
        let marked_tasks = tasks.find({marked: true}).fetch();
        marked_tasks.forEach(
            task => tasks.remove(task._id)
        );
        */
       tasks.remove({marked: true});
    },

    'selectAllTasks' (mark_state) {
        
        if (this.userId) {
            let user_tasks = tasks.find({author: this.userId}).fetch();

            user_tasks.forEach(
                task => tasks.update(
                    { _id: task._id },
                    { $set: { marked: mark_state } }
                )
            );
        }
        
    }
});