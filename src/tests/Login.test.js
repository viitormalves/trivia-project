import { cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import mockFetchToken from './mocks/mockFetch';

describe('Login page', () => {
  beforeEach(() => {
    cleanup();
    global.fetch = jest.fn(mockFetchToken);
  });
  afterEach(() => {
    global.fetch.mockClear();
  });
  
  test('if the page renders correctly', () => {
    const { getByTestId } = renderWithRouterAndRedux(<App />);

    const nameInput = getByTestId('input-player-name');
    expect(nameInput).toBeInTheDocument();

    const emailInput = getByTestId('input-gravatar-email');
    expect(emailInput).toBeInTheDocument();

    const loginBtn = getByTestId('btn-play');
    expect(loginBtn).toBeInTheDocument();
  });

  test('if the page redirects correctly', () => {
    const { getByTestId } = renderWithRouterAndRedux(<App />);

    const nameInput = getByTestId('input-player-name');
    const emailInput = getByTestId('input-gravatar-email');

    const loginBtn = getByTestId('btn-play');
    expect(loginBtn.disabled).toBe(true);

    
    userEvent.type(emailInput, 'test@email.com');
    expect(loginBtn.disabled).toBe(true);
    userEvent.type(nameInput, 'teste');
    expect(loginBtn.disabled).toBe(false);

    userEvent.click(loginBtn);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});