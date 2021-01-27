import React from 'react';
// Redux
import { useSelector } from 'react-redux';
// @Material Ui
import PersonIcon from '@material-ui/icons/Person';
import PublicIcon from '@material-ui/icons/Public';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import TodayIcon from '@material-ui/icons/Today';

import './table.css';

const Table = () => {
	const filteredUsers = useSelector((state) => state.filteredUsers);
	const rowsPerPage = useSelector((state) => state.rowsPerPage);
	const currentPage = useSelector((state) => state.currentPage);
	const firstIdx = rowsPerPage * (currentPage - 1);
	const lastIdx = currentPage * rowsPerPage;
	return (
		<table className='table'>
			<tbody>
				<tr>
					<th>
						<div className='tableHeader'>
							<PersonIcon color='primary' />
							<h4 className='tableHeaderText'>Name</h4>
						</div>
					</th>
					<th>
						<div className='tableHeader'>
							<PublicIcon color='primary' />
							<h4 className='tableHeaderText'>Country</h4>
						</div>
					</th>
					<th>
						<div className='tableHeader'>
							<LocationCityIcon color='primary' />
							<h4 className='tableHeaderText'>State</h4>
						</div>
					</th>
					<th>
						<div className='tableHeader'>
							<AttachMoneyIcon color='primary' />
							<h4 className='tableHeaderText'>Balance</h4>
						</div>
					</th>
					<th>
						<div className='tableHeader'>
							<DirectionsRunIcon color='primary' />
							<h4 className='tableHeaderText'>Is Active</h4>
						</div>
					</th>

					<th>
						<div className='tableHeader'>
							<TodayIcon color='primary' />
							<h4 className='tableHeaderText'>Registered</h4>
						</div>
					</th>
				</tr>
				{filteredUsers.slice(firstIdx, lastIdx).map((user, idx) => (
					<tr key={user.id} style={{ backgroundColor: idx % 2 && '#f7f7f7' }}>
						<td>{user.fullName}</td>
						<td>{user.country}</td>
						<td>{user.state}</td>
						<td>{user.balance}</td>
						<td>{`${user.isActive}`}</td>
						<td>{user.registered.slice(0, -9)}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;
