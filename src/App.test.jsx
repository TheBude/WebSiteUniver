import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('Sidebar toggle', () => {
  it('opens the sidebar when the menu button is clicked', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /menyu/i }));

    expect(screen.getByText('Universitet tuzilmasi')).toBeInTheDocument();
  });
});
