import React from 'react';
import { render } from '@testing-library/react';
import Navigation from './Navigation';

test('renders learn react link', () => {
	const { getByText } = render(<Navigation />);
	const linkElement = getByText(/learn react/i);
	expect(linkElement).toBeInTheDocument();
});
