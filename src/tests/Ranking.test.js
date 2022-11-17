import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { mockLocalStorage } from './mocks/mockData';
import initialState from './mocks/mockInitialState';

describe('ranking page', () => {
  beforeEach(() => {
    localStorage.setItem("ranking", JSON.stringify(mockLocalStorage));
  });
  test('if the page renders correctly', () => {
    const { history, getByTestId } = renderWithRouterAndRedux(<App />, initialState, '/ranking');

    expect(history.location.pathname).toBe('/ranking');

    const rankingTitle = getByTestId('ranking-title');
    expect(rankingTitle).toBeInTheDocument();

    const orderedRanking = mockLocalStorage.sort((a, b) => b.score - a.score);
    
    const namePlayer1 = getByTestId('player-name-0');
    expect(namePlayer1).toBeInTheDocument();
    expect(namePlayer1.innerHTML).toBe(orderedRanking[0].name);
    
    const scorePlayer1 = getByTestId('player-score-0');
    expect(scorePlayer1).toBeInTheDocument();
    expect(Number(scorePlayer1.innerHTML)).toBe(orderedRanking[0].score);

    const playAgain = getByTestId('btn-go-home');
    expect(playAgain).toBeInTheDocument();
    act(() => userEvent.click(playAgain));

    expect(history.location.pathname).toBe('/');
  });
});