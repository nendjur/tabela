import React from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { changePage, changeRowsPage } from '../redux/actions';
// @Material Ui
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import './pagination.css';

const Pagination = () => {
	const rowsPerPage = useSelector((state) => state.rowsPerPage);
	const currentPage = useSelector((state) => state.currentPage);
	const numOfRows = useSelector((state) => state.filteredUsers.length);
	const hasMorePages = currentPage * rowsPerPage < numOfRows;
	const dispatch = useDispatch();
	const goToPrevPage = () => dispatch(changePage(-1));
	const goToNextPage = () => dispatch(changePage(1));
	const changeNumOfRowsPerPage = (num) => dispatch(changeRowsPage(num));
	return (
		<div className='pagination'>
			<div className='currentPage'>
				{currentPage > 1 && (
					<NavigateBeforeIcon
						style={{ cursor: 'pointer' }}
						onClick={goToPrevPage}
						color='primary'
					/>
				)}
				Current Page: {currentPage}
				{hasMorePages && (
					<NavigateNextIcon
						style={{ cursor: 'pointer' }}
						onClick={goToNextPage}
						color='primary'
					/>
				)}
			</div>
			<div className='rowsPerPage'>
				Rows Per Page
				{[20, 50, 100].map((rows, i) => (
					<button
						className='rowsPerPageButton'
						onClick={() => changeNumOfRowsPerPage(rows)}
						key={i}
						disabled={rows > numOfRows}>
						{rows}
					</button>
				))}
			</div>
		</div>
	);
};

export default Pagination;
