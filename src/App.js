import React from 'react';
// Redux
import { fetchUsers } from './redux/actions';
import { useDispatch, useSelector } from 'react-redux';
// Components
import Table from './components/Table';
import FilterUsers from './components/FilterUsers';
import SortUsers from './components/SortUsers';
import Pagination from './components/Pagination';
import Loading from './components/Loading';

const App = () => {
	const dispatch = useDispatch();
	React.useEffect(() => {
		dispatch(fetchUsers());
	}, []);
	const isFetching = useSelector((state) => state.isFetching);
	if (isFetching) return <Loading />;
	return (
		<>
			<FilterUsers />
			<SortUsers />
			<Pagination />
			<Table />
		</>
	);
};

export default App;
