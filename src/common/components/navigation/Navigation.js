import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import './Navigation.scss';

class Navigation extends Component {
	render() {
		return (
			<div className="navigation-container">
				<ul>
					<li>
						<Link to="/home/dashboard">Dashboard</Link>
					</li>
					<li>
						{' '}
						<Link to="/home/employee">Employee</Link>
					</li>
				</ul>
			</div>
		);
	}
}

export default withRouter(Navigation);
