import {createStore} from 'redux';
import {employeeReducer} from './employeeReducer.js';

export const store = createStore(employeeReducer);
