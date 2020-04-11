import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import classes from './Loader.module.scss';

const loader = () => (
	<div className={classes.Loader}>
		<CircularProgress color="secondary" size={24} />
	</div>
);

export default loader;
