// client/src/__tests__/StoryForm.test.js

import { render, screen, fireEvent } from '@testing-library/react';
import StoryForm from '../components/StoryForm';

test('renders StoryForm and allows user input', () => {
    render(<StoryForm />);

    const titleInput = screen.getByLabelText(/Title/i);
    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    expect(titleInput.value).toBe('Test Title');

    const generateButton = screen.getByRole('button', { name: /Generate Story/i });
    expect(generateButton).toBeInTheDocument();
});