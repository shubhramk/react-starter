import React from 'react';
import { render } from '@testing-library/react';
import Employee from './Employee';

test('renders learn react link', () => {
	const { getByText } = render(<Employee />);
	const linkElement = getByText(/learn react/i);
	expect(linkElement).toBeInTheDocument();
});
