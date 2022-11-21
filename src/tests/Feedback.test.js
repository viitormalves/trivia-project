import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { initialState } from './mocks/mockData';

describe('Feedback page', () => {
  test('if the page reders correctly', () => {
    const { history, getByTestId } = renderWithRouterAndRedux(<App />, initialState, '/feedback');

    expect(history.location.pathname).toBe('/feedback');

    const feedbackText = getByTestId('feedback-text');
    expect(feedbackText).toBeInTheDocument();
    expect(feedbackText.innerHTML).toBe('Well Done!');

    const playAgain = getByTestId('btn-play-again');
    expect(playAgain).toBeInTheDocument();

    const rankingBtn = getByTestId('btn-ranking');
    expect(rankingBtn).toBeInTheDocument();
  })

  test('if the button play again redirects correctly', () => {
    const initialState2 = initialState;
    initialState2.player.assertions = 2;
    const { history, getByTestId } = renderWithRouterAndRedux(<App />, initialState2, '/feedback');
    
    const playAgain = getByTestId('btn-play-again');
    expect(playAgain).toBeInTheDocument();

    act(() => userEvent.click(playAgain));
    expect(history.location.pathname).toBe('/');
  });

  test('if the button ranking redirects correctly', () => {
    const { history, getByTestId } = renderWithRouterAndRedux(<App />, initialState, '/feedback');

    const rakingBtn = getByTestId('btn-ranking');
    expect(rakingBtn).toBeInTheDocument();

    act(() => userEvent.click(rakingBtn));
    expect(history.location.pathname).toBe('/ranking');
  });
})