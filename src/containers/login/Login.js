import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	FormControlLabel,
	Checkbox,
	Box,
	Typography,
	makeStyles,
	Container,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Loader from '../../common/components/loader/Loader';
import { httpInstance } from '../../common/services/http.service';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			React Starter {new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

function Login(props) {
	const classes = useStyles();
	const [userName, setName] = useState('eve.holt@reqres.in');
	const [userPwd, setPwd] = useState('cityslicka');

	let authRedirect = null;
	if (props.isAuthenticated) {
		authRedirect = <Redirect to={props.authRedirectPath} />;
	}
	function handleSubmit(e) {
		e.preventDefault();
		props.onAuth(userName, userPwd);
	}

	return (
		<Container component="main" maxWidth="xs">
			{authRedirect}

			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						value={userName}
						onChange={e => setName(e.target.value)}
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={userPwd}
						onChange={e => setPwd(e.target.value)}
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						disabled={props.loading ? true : false}
					>
						{props.loading ? <Loader /> : 'Sign In'}
					</Button>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		authRedirectPath: state.auth.authRedirectPath,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password) => dispatch(actions.auth(email, password)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Login, httpInstance));
