import React from 'react';
// Redux
import { useDispatch } from 'react-redux';
import { filterUsers } from '../redux/actions';
// @MaterialUi
import TextField from '@material-ui/core/TextField';
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import './filterUsers.css';

const FilterUsers = () => {
	const [showFilters, setShowFilters] = React.useState(false);
	const [data, setData] = React.useState({
		fullName: '',
		country: '',
		state: '',
		minBalance: '',
		maxBalance: '',
		isActive: '',
	});
	const [registeredBefore, setrRegisteredBefore] = React.useState(null);
	const [registeredAfter, setrRegisteredAfter] = React.useState(null);

	const handleRegisteredBefore = (date) => {
		setrRegisteredBefore(date);
	};
	const handleRegisteredAfter = (date) => {
		setrRegisteredAfter(date);
	};
	const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
	const dispatch = useDispatch();
	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(filterUsers({ ...data, registeredBefore, registeredAfter }));
		setShowFilters(false);
	};
	const { fullName, country, state, minBalance, maxBalance, isActive } = data;
	return (
		<>
			<div className='header'>
				<h3
					className='showFilters'
					onClick={() => setShowFilters(!showFilters)}>
					{showFilters ? 'Hide Filters' : 'Show Filters'}
				</h3>
			</div>

			{showFilters && (
				<form onSubmit={onSubmit} className='filterUsers'>
					<TextField
						label='Name'
						name='fullName'
						value={fullName}
						onChange={onChange}
					/>
					<TextField
						label='Country'
						name='country'
						value={country}
						onChange={onChange}
					/>
					<TextField
						label='State'
						name='state'
						value={state}
						onChange={onChange}
					/>
					<TextField
						label='Min Balance'
						name='minBalance'
						value={minBalance}
						onChange={onChange}
					/>
					<TextField
						label='Max Balance'
						name='maxBalance'
						value={maxBalance}
						onChange={onChange}
					/>
					<div className='active'>
						<InputLabel>Is Active</InputLabel>
						<Select
							className='activeSelect'
							name='isActive'
							value={isActive}
							onChange={onChange}>
							<MenuItem value='true'>True</MenuItem>
							<MenuItem value='false'>False</MenuItem>
							<MenuItem value=''>Reset</MenuItem>
						</Select>
					</div>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							disableToolbar
							variant='inline'
							format='MM/dd/yyyy'
							margin='normal'
							id='date-picker-inline'
							label='Registered before'
							value={registeredBefore}
							onChange={handleRegisteredBefore}
							style={{ paddingBottom: 7 }}
							KeyboardButtonProps={{
								'aria-label': 'change date',
							}}
						/>
						<KeyboardDatePicker
							disableToolbar
							variant='inline'
							format='MM/dd/yyyy'
							margin='normal'
							id='date-picker-inline'
							label='Registered after'
							value={registeredAfter}
							style={{ paddingBottom: 7 }}
							onChange={handleRegisteredAfter}
							KeyboardButtonProps={{
								'aria-label': 'change date',
							}}
						/>
					</MuiPickersUtilsProvider>

					<button type='submit' className='filterUsersButton'>
						Filter
					</button>
				</form>
			)}
		</>
	);
};

export default FilterUsers;
