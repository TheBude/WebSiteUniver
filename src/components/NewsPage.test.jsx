import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, expect, it } from 'vitest';
import NewsPage from './NewsPage';

describe('NewsPage Component', () => {
  it('renders news articles from samdu.uz', () => {
    render(<NewsPage language="uz" onBack={() => {}} />);

    // Check main title
    expect(screen.getByText('Samarqand davlat universiteti yangiliklari')).toBeInTheDocument();

    // Check presence of scraped news titles
    expect(screen.getByText(/Mehnat muhofazasi masalalari muhokama qilindi/i)).toBeInTheDocument();
    expect(screen.getByText(/Millat va mas’uliyat/i)).toBeInTheDocument();
  });

  it('filters news based on search input', () => {
    render(<NewsPage language="uz" onBack={() => {}} />);

    const searchInput = screen.getAllByPlaceholderText(/Yangiliklar bo‘yicha qidirish/i)[0];
    fireEvent.change(searchInput, { target: { value: 'Lazer' } });

    expect(screen.getAllByText(/lazer/i).length).toBeGreaterThan(0);
  });

  it('opens and closes article modal on click', () => {
    render(<NewsPage language="uz" onBack={() => {}} />);

    const articleCard = screen.getAllByText(/Millat va mas’uliyat/i)[0];
    fireEvent.click(articleCard);

    // Modal should be visible
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/Rasmiy saytda ochish/i)).toBeInTheDocument();

    // Close modal
    fireEvent.click(screen.getAllByRole('button', { name: /yopish/i })[0]);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
