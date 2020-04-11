import React from 'react';
import Modal from './../../common/components/ui/modal/Modal';
import useHttpErrorHandler from './../../common/hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
	return props => {
		const [error, clearError] = useHttpErrorHandler(axios);

		return (
			<>
				{error}
				<Modal show={error} modalClosed={clearError}>
					{error ? error.message : null}
				</Modal>
				<WrappedComponent {...props} />
			</>
		);
	};
};

export default withErrorHandler;
