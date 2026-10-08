import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';

describe('Navbar Component', () => {
  it('renders the VOGUE brand title and SOA Fashion Club label', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText('VOGUE')).toBeDefined();
    expect(screen.getByText('SOA Fashion Club')).toBeDefined();
  });

  it('renders navigation links to core sections', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText('About')).toBeDefined();
    expect(screen.getByText('Themes')).toBeDefined();
    expect(screen.getByText('Achievements')).toBeDefined();
    expect(screen.getByText('Gallery')).toBeDefined();
    expect(screen.getByText('Activities')).toBeDefined();
  });

  it('renders the "Join the Movement" CTA button linking to /apply', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const cta = screen.getByText('Join the Movement');
    expect(cta).toBeDefined();
  });
});
