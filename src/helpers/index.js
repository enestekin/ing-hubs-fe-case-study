export const getFilteredEmployees = (state) => {
  return state.employees.filter((employee) => {
    return `${employee.firstName} ${employee.lastName}`
      .toLowerCase()
      .includes(state.searchQuery.toLowerCase());
  });
};

export const getPaginatedEmployees = (state) => {
  const filtered = getFilteredEmployees(state);
  const start = (state.currentPage - 1) * state.itemsPerPage;
  return filtered.slice(start, start + state.itemsPerPage);
};

export const getTotalPages = (state) => {
  return Math.ceil(getFilteredEmployees(state).length / state.itemsPerPage);
};
