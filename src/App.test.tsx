import { fireEvent, render, screen, within } from '@testing-library/react';
import { vi } from 'vitest';
import App, { particleOptions } from './App';
import { EMAIL, PROFILE, ROLES } from './data/resume';
import { SECTIONS } from './data/sections';

// The boot overlay and particle canvas are effects, not content; disabling them
// keeps these assertions about the resume itself.
vi.mock('./config/site', () => ({
  LAYOUT: 'scroll',
  EFFECTS: {
    bootSequence: false,
    deviceFrame: true,
    runeRail: true,
    scanlines: true,
    particles: false,
    panelSweep: true,
  },
}));

test('keeps the particle canvas inside the slate instead of covering the viewport', () => {
  expect(particleOptions.fullScreen).toEqual({ enable: false });
});

test('leads with the name as the top-level heading', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { level: 1, name: PROFILE.name })
  ).toBeInTheDocument();
});

test('renders a heading for every section', () => {
  render(<App />);

  for (const section of SECTIONS) {
    const heading = section.id === 'profile' ? PROFILE.name : section.label;
    expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
  }
});

test('renders one rune per section in the rail', () => {
  render(<App />);

  const rail = screen.getByRole('navigation', { name: 'Sections' });
  expect(within(rail).getAllByRole('button')).toHaveLength(SECTIONS.length);

  for (const section of SECTIONS) {
    expect(
      within(rail).getByRole('button', { name: section.label })
    ).toBeInTheDocument();
  }
});

test('marks a rune as current when it is chosen', () => {
  render(<App />);

  const rail = screen.getByRole('navigation', { name: 'Sections' });
  const skills = within(rail).getByRole('button', { name: 'Skills' });

  fireEvent.click(skills);

  expect(skills).toHaveAttribute('aria-current', 'true');
  expect(
    within(rail).getByRole('button', { name: 'Profile' })
  ).not.toHaveAttribute('aria-current');
});

test('renders every role from the resume data', () => {
  render(<App />);

  for (const role of ROLES) {
    expect(
      screen.getByRole('heading', { name: role.title })
    ).toBeInTheDocument();
  }
});

test('exposes a mailto link for the contact address', () => {
  render(<App />);

  expect(screen.getByRole('link', { name: EMAIL })).toHaveAttribute(
    'href',
    `mailto:${EMAIL}`
  );
});
