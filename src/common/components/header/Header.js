import React, { Component } from 'react';
import './Header.scss';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class Header extends Component {
	render() {
		return (
			<div className="container-fluid header-container">
				<div className="row">
					<div className="col-10"> Welcome , {this.props.userInfo.email}</div>
					<div className="col-2">
						{' '}
						<div className="btn-logout" onClick={this.props.onLogout}>
							Log out
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		userInfo: state.auth.userInfo,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onLogout: () => dispatch(actions.logout()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
