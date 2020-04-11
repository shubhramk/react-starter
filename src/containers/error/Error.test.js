import React from 'react';
import { render } from '@testing-library/react';
import Error from './Error';

test('renders learn react link', () => {
	const { getByText } = render(<Error />);
	const linkElement = getByText(/learn react/i);
	expect(linkElement).toBeInTheDocument();
});
