import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders name, PIN, and PDF selection fields', async () => {
  render(<App />);

  // Find the name and PIN input fields and enter some text
  const nameInput = screen.getByLabelText('Name:');
  fireEvent.change(nameInput, { target: { value: 'Batu' } });

  const pinInput = screen.getByLabelText('PIN:');
  fireEvent.change(pinInput, { target: { value: '1337' } });

  // Select a PDF file
  const fileInput = screen.getByLabelText('Select PDF file');
  const pdfFile = new File([''], 'test.pdf', { type: 'application/pdf' });
  fireEvent.change(fileInput, { target: { files: [pdfFile] } });

  // Submit the form
  const submitButton = screen.getByText('Submit');
  fireEvent.click(submitButton);

  // Debugging statement
  console.log('Submitting form...');

  // Verify that the form was submitted successfully
  expect(screen.getByText('Form submitted!')).toBeInTheDocument();
});

