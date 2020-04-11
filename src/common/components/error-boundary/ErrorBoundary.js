import React, { Component } from 'react';
import errorLog from './../../services/error-log.service';

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
		};
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error, info) {
		/* You can also change the `hasError` state to this method also
          this.setState({hasError: true})
     /* no need to use `getDerivedStateFromError */
		/* This information will be send into error reporting service */
		/* this.props.customErrorReportingService(error, info) */
		errorLog.log(error, info);
	}

	render() {
		if (this.state.hasError) {
			return <div>Something went wrong</div>;
		} else {
			return this.props.children;
		}
	}
}

export default ErrorBoundary;
