import { Types } from './types';
import axios from 'axios';

export const fetchUsers = () => async (dispatch) => {
	dispatch({ type: Types.FETCH_USERS_START });
	const { data } = await axios.get('https://fww-demo.herokuapp.com/');
	const users = [];
	data.map((country) =>
		country.state.map((state) =>
			state.users.map((user) =>
				users.push({ ...user, country: country.country, state: state.name })
			)
		)
	);
	dispatch({ type: Types.FETCH_USERS_SUCCESS, payload: users });
};

export const sortUsers = (field) => ({
	type: Types.SORT_USERS,
	payload: field,
});

export const filterUsers = (data) => ({
	type: Types.FILTER_USERS,
	payload: data,
});

export const changePage = (num) => ({
	type: Types.CHANGE_PAGE,
	payload: num,
});

export const changeRowsPage = (num) => ({
	type: Types.CHANGE_ROWS_PER_PAGE,
	payload: num,
});
