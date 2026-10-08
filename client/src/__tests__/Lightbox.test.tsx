import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Lightbox } from '../components/common/Lightbox';
import { GalleryItem } from '../../types';

const mockItems: GalleryItem[] = [
  {
    id: '1',
    title: 'Anantara Golden Hour',
    category: 'RUNWAY',
    imageUrl: '/images/shoots/shoot-20260403-sd0-8440.jpg',
    aspectRatio: '3:4',
    isFeatured: true,
    displayOrder: 1,
  },
  {
    id: '2',
    title: 'Raj Ghrana Aristocracy',
    category: 'EDITORIAL',
    imageUrl: '/images/runway/runway-vol1-dsc-0004.jpg',
    aspectRatio: '3:4',
    isFeatured: true,
    displayOrder: 2,
  },
];

describe('Lightbox Modal Component', () => {
  it('renders nothing when currentIndex is null', () => {
    const { container } = render(
      <Lightbox items={mockItems} currentIndex={null} onClose={vi.fn()} onNavigate={vi.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders image, title, category, and counter when open', () => {
    render(
      <Lightbox items={mockItems} currentIndex={0} onClose={vi.fn()} onNavigate={vi.fn()} />
    );

    expect(screen.getByText('Anantara Golden Hour')).toBeDefined();
    expect(screen.getByText('RUNWAY')).toBeDefined();
    expect(screen.getByText(/1 of 2/i)).toBeDefined();
  });

  it('triggers onNavigate when Next button is clicked', () => {
    const onNavigate = vi.fn();
    render(
      <Lightbox items={mockItems} currentIndex={0} onClose={vi.fn()} onNavigate={onNavigate} />
    );

    const nextBtn = screen.getByLabelText('Next Image');
    fireEvent.click(nextBtn);
    expect(onNavigate).toHaveBeenCalledWith(1);
  });
});
