import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = () => {
	return (
		<div
			style={{
				minHeight: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<CircularProgress />
		</div>
	);
};

export default Loading;
