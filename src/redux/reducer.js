import { Types } from './types';

const INITIAL_STATE = {
	users: [],
	filteredUsers: [],
	isFetching: false,
	currentPage: 1,
	rowsPerPage: 20,
};

const rootReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	switch (type) {
		case Types.FETCH_USERS_START:
			return { ...INITIAL_STATE, isFetching: true };
		case Types.FETCH_USERS_SUCCESS:
			return { ...INITIAL_STATE, users: payload, filteredUsers: payload };
		case Types.SORT_USERS:
			const { sortValue, orderValue } = payload;
			const sortedUsers = sortFn(state.filteredUsers, sortValue, orderValue);
			return { ...state, currentPage: 1, filteredUsers: [...sortedUsers] };
		case Types.FILTER_USERS:
			const newUsers = filterFn(state.users, payload);
			return { ...state, currentPage: 1, filteredUsers: [...newUsers] };
		case Types.CHANGE_PAGE:
			const prevPage = state.currentPage;
			return { ...state, currentPage: prevPage + payload };
		case Types.CHANGE_ROWS_PER_PAGE:
			return { ...state, currentPage: 1, rowsPerPage: payload };
		default:
			return state;
	}
};

export default rootReducer;

const sortFn = (users, sortValue, orderValue) => {
	return users.sort((a, b) => {
		return orderValue === 'ascending'
			? String(a[sortValue]).localeCompare(String(b[sortValue]))
			: String(b[sortValue]).localeCompare(String(a[sortValue]));
	});
};

const filterFn = (users, filterData) => {
	const {
		fullName,
		country,
		state,
		minBalance,
		maxBalance,
		isActive,
		registeredBefore,
		registeredAfter,
	} = filterData;
	let newUsers = [...users];
	if (fullName)
		newUsers = newUsers.filter((user) =>
			user.fullName.toLowerCase().includes(fullName.toLowerCase())
		);
	if (country)
		newUsers = newUsers.filter((user) =>
			user.country.toLowerCase().includes(country.toLowerCase())
		);
	if (state)
		newUsers = newUsers.filter((user) =>
			user.state.toLowerCase().includes(state.toLowerCase())
		);
	if (minBalance)
		newUsers = newUsers.filter(
			(user) => user.balance.slice(1, -3).replaceAll(',', '') > minBalance
		);
	if (maxBalance)
		newUsers = newUsers.filter(
			(user) => user.balance.slice(1, -3).replaceAll(',', '') < maxBalance
		);
	if (isActive)
		newUsers = newUsers.filter((user) => `${user.isActive}` === isActive);
	if (registeredBefore)
		newUsers = newUsers.filter(
			(user) =>
				new Date(user.registered).getTime() <
				new Date(registeredBefore).getTime()
		);
	if (registeredAfter)
		newUsers = newUsers.filter(
			(user) =>
				new Date(user.registered).getTime() >
				new Date(registeredAfter).getTime()
		);
	return newUsers;
};
