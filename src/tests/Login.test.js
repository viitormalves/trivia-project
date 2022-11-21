import { act, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { fetch as fetchMock } from '../../cypress/mocks/fetch'

describe('Login page', () => {
  beforeEach(() => {
    cleanup();
    global.fetch = jest.fn(fetchMock);
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

    act(() => userEvent.click(configBtn));
    expect(history.location.pathname).toBe('/settings');
  });

  test('if the play button redirects correctly', async () => {
    const { getByTestId, findByTestId, history } = renderWithRouterAndRedux(<App />);

    const nameInput = getByTestId('input-player-name');
    const emailInput = getByTestId('input-gravatar-email');

    const loginBtn = getByTestId('btn-play');
    expect(loginBtn.disabled).toBe(true);

    
    act(() => userEvent.type(emailInput, 'test@email.com'));
    expect(loginBtn.disabled).toBe(true);

    act(() => userEvent.type(nameInput, 'teste'));
    expect(loginBtn.disabled).toBe(false);

    act(() => userEvent.click(loginBtn));
    expect(global.fetch).toHaveBeenCalledTimes(1);
    
    const gravatarImg = await findByTestId('header-profile-picture');
    
    expect(history.location.pathname).toBe('/game')
    expect(gravatarImg).toBeInTheDocument();
  });
});