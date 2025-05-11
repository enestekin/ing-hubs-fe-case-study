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

export function validateEmployee(employee, existingEmployees) {
  const errors = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[0-9]{10,15}$/;

  if (!emailRegex.test(employee.email)) {
    errors.push('Invalid email format.');
  }

  if (!phoneRegex.test(employee.phone)) {
    errors.push(
      'Phone number must be 10–15 digits, optionally starting with +.'
    );
  }

  const duplicate = existingEmployees.find(
    (e) =>
      e.email === employee.email &&
      e.firstName === employee.firstName &&
      e.lastName === employee.lastName
  );

  if (duplicate) {
    errors.push('Duplicate employee. Same name and email already exist.');
  }

  return errors;
}
