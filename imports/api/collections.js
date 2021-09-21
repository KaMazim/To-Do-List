import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const tasks = new Mongo.Collection('tasks');
tasks.schema = new SimpleSchema({
    title: {type: String},
    author: {type: String},
    creationDate: {type: Date},
    marked: {type: Boolean},
    dueDate : {type: String, optional: true}
});

export const finishedTasks = new Mongo.Collection('finished-tasks')