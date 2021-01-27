import React from 'react';
// Redux
import { useDispatch } from 'react-redux';
import { sortUsers } from '../redux/actions';
// @Material Ui
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import './sortUsers.css';

const SortUsers = () => {
	const [data, setData] = React.useState({
		sortValue: 'fullName',
		orderValue: 'ascending',
	});
	const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
	const dispatch = useDispatch();
	const sort = (field) => dispatch(sortUsers(field));
	const { sortValue, orderValue } = data;
	const onSubmit = (e) => {
		e.preventDefault();
		sort({ sortValue, orderValue });
	};
	return (
		<form onSubmit={onSubmit} className='sortUsers'>
			<InputLabel className='inputValue'>Sort by </InputLabel>
			<Select name='sortValue' value={sortValue} onChange={onChange}>
				<MenuItem value='fullName'>Name</MenuItem>
				<MenuItem value='country'>Country</MenuItem>
				<MenuItem value='state'>State</MenuItem>
				<MenuItem value='balance'>Balance</MenuItem>
				<MenuItem value='isActive'>Is Active</MenuItem>
				<MenuItem value='registered'>Registered at</MenuItem>
			</Select>
			<InputLabel className='inputValue'>Order </InputLabel>
			<Select name='orderValue' value={orderValue} onChange={onChange}>
				<MenuItem value='ascending'>Ascending</MenuItem>
				<MenuItem value='descending'>Descending</MenuItem>
			</Select>
			<button type='submit' className='sortUsersButton'>
				Sort
			</button>
		</form>
	);
};

export default SortUsers;
