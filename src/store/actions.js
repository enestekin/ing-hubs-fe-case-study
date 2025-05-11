export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
export const SET_EMPLOYEES = 'SET_EMPLOYEES';
export const SET_PAGE = 'SET_PAGE';
export const SET_VIEW_MODE = 'SET_VIEW_MODE';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';

export const setEmployees = (employees) => ({
  type: SET_EMPLOYEES,
  payload: employees,
});

export const addEmployee = (employee) => ({
  type: ADD_EMPLOYEE,
  payload: employee,
});

export const updateEmployee = (employee) => ({
  type: UPDATE_EMPLOYEE,
  payload: employee,
});

export const deleteEmployee = (id) => ({
  type: DELETE_EMPLOYEE,
  payload: id,
});

export const setPage = (page) => ({
  type: SET_PAGE,
  payload: page,
});

export const setViewMode = (viewMode) => ({
  type: SET_VIEW_MODE,
  payload: viewMode,
});

export const setSearchQuery = (query) => ({
  type: SET_SEARCH_QUERY,
  payload: query,
});
