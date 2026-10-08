import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { JoinForm } from '../components/sections/JoinForm';

vi.mock('../../services/api', () => ({
  api: {
    submitApplication: vi.fn().mockResolvedValue({
      success: true,
      data: { id: 'app-123', fullName: 'Ananya Mishra' },
    }),
  },
}));

describe('JoinForm (Audition Registration)', () => {
  it('renders all required form fields with labels', () => {
    render(<JoinForm />);

    expect(screen.getByText(/Full Name \*/i)).toBeDefined();
    expect(screen.getByText(/SOA Registration Number \*/i)).toBeDefined();
    expect(screen.getByText(/Student Email Address \*/i)).toBeDefined();
    expect(screen.getByText(/WhatsApp \/ Phone Number \*/i)).toBeDefined();
    expect(screen.getByText(/Branch, Department & Academic Year \*/i)).toBeDefined();
    expect(screen.getByText(/Role You are Auditioning For \*/i)).toBeDefined();
    expect(screen.getByText(/Select Audition Time Slot \*/i)).toBeDefined();
  });

  it('renders submit button with icon and text', () => {
    render(<JoinForm />);
    const submitBtn = screen.getByRole('button', { name: /Submit Audition Registration/i });
    expect(submitBtn).toBeDefined();
  });
});
