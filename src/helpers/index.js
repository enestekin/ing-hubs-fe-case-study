export const getPaginatedEmployees = (state) => {
  const allEmployees = state.employees;
  const start = (state.currentPage - 1) * state.itemsPerPage;
  return allEmployees.slice(start, start + state.itemsPerPage);
};

export const getTotalPages = (state) => {
  return Math.ceil(state.employees.length / state.itemsPerPage);
};
