import {
  ADD_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  SET_EMPLOYEES,
  SET_PAGE,
  SET_VIEW_MODE,
  SET_SEARCH_QUERY,
  SET_LANGUAGE,
} from './actions.js';

import {mockEmployees} from '../data/mock-employees.js';

const initialState = {
  employees: mockEmployees,
  currentPage: 1,
  itemsPerPage: 10,
  viewMode: 'table',
  searchQuery: '',
  language: 'en',
};

export const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EMPLOYEES:
      return {
        ...state,
        employees: [...action.payload],
      };

    case ADD_EMPLOYEE:
      return {
        ...state,
        employees: [...state.employees, action.payload],
      };

    case UPDATE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map((emp) =>
          emp.id === action.payload.id ? action.payload : emp
        ),
      };

    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter((emp) => emp.id !== action.payload),
      };

    case SET_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case SET_VIEW_MODE:
      return {
        ...state,
        viewMode: action.payload,
      };

    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
      };

    case SET_LANGUAGE:
      document.documentElement.lang = action.payload;
      return {
        ...state,
        language: action.payload,
      };

    default:
      return state;
  }
};
