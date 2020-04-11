import React, { Suspense } from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import './Home.scss';
import Dashboard from './../dashboard/Dashboard';
import Loader from './../../common/components/loader/Loader';

const Employee = React.lazy(() => import('./../employee/Employee'));
function Home() {
	let { path } = useRouteMatch();
	return (
		<>
			<Switch>
				<Route exact path={path + '/dashboard'} component={Dashboard} />
				<Route
					path={path + '/employee'}
					render={() => (
						<Suspense fallback={<Loader />}>
							<Employee />
						</Suspense>
					)}
				/>
				<Redirect to={path + '/dashboard'} />
			</Switch>
		</>
	);
}

export default Home;
