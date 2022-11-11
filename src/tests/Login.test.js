import { cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
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

    const configBtn = getByTestId('btn-settings');
    expect(configBtn).toBeInTheDocument();
  });

  test('if the config button redirects correctly', () => {
    const { getByTestId, history } = renderWithRouterAndRedux(<App />);
  
    const configBtn = getByTestId('btn-settings');
    expect(configBtn).toBeInTheDocument();

    userEvent.click(configBtn);
    expect(history.location.pathname).toBe('/settings');
  });

  test('if the play button redirects correctly', async () => {
    const { getByTestId, findByTestId, history } = renderWithRouterAndRedux(<App />);

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
    
    const gravatarImg = await findByTestId('header-profile-picture');
    
    expect(history.location.pathname).toBe('/game')
    expect(gravatarImg).toBeInTheDocument();
  });
});