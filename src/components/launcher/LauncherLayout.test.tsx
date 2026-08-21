import { fireEvent, render, screen, within } from '@testing-library/react';
import { beforeEach, expect, test, vi } from 'vitest';
import App from '../../App';
import { PROFILE, ROLES } from '../../data/resume';
import { APP_SECTIONS } from '../../data/sections';

vi.mock('../../config/site', () => ({
  LAYOUT: 'launcher',
  EFFECTS: {
    bootSequence: false,
    deviceFrame: false,
    runeRail: true,
    scanlines: false,
    particles: false,
    panelSweep: false,
  },
}));

/** The print copy of the resume is aria-hidden, so scoping keeps it out. */
const app = () => within(screen.getByRole('main'));

beforeEach(() => {
  window.history.pushState(null, '', '/');
});

test('opens on the profile card above one shortcut per app', () => {
  render(<App />);

  expect(
    app().getByRole('heading', { level: 1, name: PROFILE.name })
  ).toBeInTheDocument();

  const shortcuts = app().getByRole('navigation', { name: 'Applications' });
  expect(within(shortcuts).getAllByRole('button')).toHaveLength(
    APP_SECTIONS.length
  );

  for (const section of APP_SECTIONS) {
    expect(
      within(shortcuts).getByRole('button', { name: new RegExp(section.label) })
    ).toBeInTheDocument();
  }
});

test('opening a shortcut replaces the launcher with that app', () => {
  render(<App />);

  fireEvent.click(
    app().getByRole('button', { name: /Experience/ })
  );

  expect(
    app().getByRole('heading', { level: 1, name: 'Experience' })
  ).toBeInTheDocument();
  expect(
    app().queryByRole('navigation', { name: 'Applications' })
  ).not.toBeInTheDocument();
});

test('an opened app shows a box per entry', () => {
  render(<App />);

  fireEvent.click(app().getByRole('button', { name: /Experience/ }));

  for (const role of ROLES) {
    expect(
      app().getByRole('heading', { name: role.title })
    ).toBeInTheDocument();
  }
});

test('the back button returns to the launcher', () => {
  render(<App />);

  fireEvent.click(app().getByRole('button', { name: /Skills/ }));
  fireEvent.click(app().getByRole('button', { name: 'Back to shortcuts' }));

  expect(
    app().getByRole('navigation', { name: 'Applications' })
  ).toBeInTheDocument();
});

test('escape closes an open app', () => {
  render(<App />);

  fireEvent.click(app().getByRole('button', { name: /Contact/ }));
  fireEvent.keyDown(window, { key: 'Escape' });

  expect(
    app().getByRole('navigation', { name: 'Applications' })
  ).toBeInTheDocument();
});

test('opening an app records it in the url so the link can be shared', () => {
  render(<App />);

  fireEvent.click(app().getByRole('button', { name: /Education/ }));

  expect(window.location.hash).toBe('#education');
});

test('a deep link opens straight into that app', () => {
  window.history.pushState(null, '', '#skills');
  render(<App />);

  expect(
    app().getByRole('heading', { level: 1, name: 'Skills' })
  ).toBeInTheDocument();
});

test('the profile rune returns home from an open app', () => {
  render(<App />);

  fireEvent.click(app().getByRole('button', { name: /Selected Work/ }));

  const rail = screen.getByRole('navigation', { name: 'Sections' });
  fireEvent.click(within(rail).getByRole('button', { name: 'Profile' }));

  expect(
    app().getByRole('navigation', { name: 'Applications' })
  ).toBeInTheDocument();
});
