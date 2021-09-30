import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const tasks = new Mongo.Collection('tasks');
tasks.schema = new SimpleSchema({
    title: {type: String},
    author: {type: String},
    creationDate: {type: Date},
    finished: {type: Boolean},
    marked: {type: Boolean},
    dueDate : {type: String, optional: true},
    completionDate: {type: Date, optional: true},
});