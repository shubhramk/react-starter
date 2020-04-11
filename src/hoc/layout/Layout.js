import React from 'react';

import classes from './Layout.module.scss';
import Header from './../../common/components/header/Header';
import Navigation from './../../common/components/navigation/Navigation';

const layout = props => {
	return (
		<>
			<div className="container-fluid">
				<div className="row">
					<Header />
				</div>
				<div className="row">
					<div className="col-2">
						<Navigation />
					</div>
					<div className="col-10">
						<main className={classes.Content}>{props.children}</main>
					</div>
				</div>
			</div>
		</>
	);
};

export default layout;
