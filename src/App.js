import React, { Suspense, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './containers/login/Login';
import Layout from './hoc/layout/Layout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

const Home = React.lazy(() => import('./containers/home/Home'));

function App(props) {
	const { onTryAutoSignup } = props;
	useEffect(() => {
		onTryAutoSignup();
	}, [onTryAutoSignup]);

	let routes = (
		<>
			<Switch>
				<Route exact path={['/', '/login']} component={Login} />
				<Redirect to="/" />
			</Switch>
		</>
	);

	if (props.isAuthenticated) {
		routes = (
			<Layout>
				<Suspense fallback={<p>Loading...</p>}>
					<Switch>
						<Route path="/home" render={props => <Home {...props} />} />
						<Redirect to="/home" />
					</Switch>
				</Suspense>
			</Layout>
		);
	}

	return <>{routes}</>;
}
const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
