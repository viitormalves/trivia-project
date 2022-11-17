import { act, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fetch as fetchMock } from '../../cypress/mocks/fetch';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { initialState as baseInitialState } from './mocks/mockData';

const { game: { questions } } = baseInitialState;

const initialState = baseInitialState;
initialState.game.count = 0;
initialState.player.assertions = 0;
initialState.player.score = 0;

describe('Game page', () => {
  beforeEach(() => {
    cleanup();
    global.fetch = jest.fn(fetchMock);
    localStorage.setItem('token', 'f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6')
    jest.useRealTimers();
  });
  afterEach(() => {
    global.fetch.mockClear();
    jest.clearAllTimers();
  });

  test('if the page renders correctly', async () => {
    const { getByTestId } = renderWithRouterAndRedux(<App />, initialState, '/game');

    const playerName = getByTestId('header-player-name');
    expect(playerName).toBeInTheDocument();
    expect(playerName.innerHTML).toBe(initialState.player.name);

    const playerPicture = getByTestId('header-profile-picture');
    expect(playerPicture).toBeInTheDocument();
    expect(playerPicture.alt).toBe(initialState.player.name);

    const playerScore = getByTestId('header-score');
    expect(playerScore).toBeInTheDocument();
    expect(Number(playerScore.innerHTML)).toBe(initialState.player.score)

    const questionCategory = getByTestId('question-category');
    expect(questionCategory).toBeInTheDocument();
    expect(questionCategory.innerHTML).toBe(questions[0].category);

    const questionText = getByTestId('question-text');
    expect(questionText).toBeInTheDocument();
    expect(questionText.innerHTML).toBe(questions[0].question);
  });

  test('if the page redirects to login when using an expired token', async () => {
    localStorage.setItem('token', 'INVALID_TOKEN');
    const { history, findByTestId } = renderWithRouterAndRedux(<App />, initialState, '/game');

    expect(history.location.pathname).toBe('/game');

    const configBtn = await findByTestId('btn-settings');
    expect(configBtn).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');
  });

  test('if the score is added correctly when answering easy question', async () => {
    const { getByTestId, findByTestId } = renderWithRouterAndRedux(<App />, initialState, '/game');
    
    const timer = getByTestId('question-timer');
    const initialTimer = 5;

    
    for (let i = initialTimer; i > 0; i -= 1) {
      await waitFor(() => expect(timer.innerHTML).toBe(`${i}`));
    }
    await waitFor(() => expect(timer.innerHTML).toBe('30'));

    const correctAnswer = getByTestId('correct-answer');
    act(() => userEvent.click(correctAnswer));
    
    await waitFor(() => expect(timer.innerHTML).toBe('0'));
    
    const userScore = await findByTestId('header-score');
    await waitFor(() => expect(userScore.innerHTML).toBe('40'));
    
    const nextBtn = await findByTestId('btn-next');
    act(() => userEvent.click(nextBtn));

  }, 10000);

  test('if the score is added correctly when answering medium question', async () => {
    initialState.game.count = 2;
    const { getByTestId, findByTestId } = renderWithRouterAndRedux(<App />, initialState, '/game');
    
    const timer = getByTestId('question-timer');
    const initialTimer = 5;

    
    for (let i = initialTimer; i > 0; i -= 1) {
      await waitFor(() => expect(timer.innerHTML).toBe(`${i}`));
    }
    await waitFor(() => expect(timer.innerHTML).toBe('30'));

    const correctAnswer = getByTestId('correct-answer');
    act(() => userEvent.click(correctAnswer));
    
    await waitFor(() => expect(timer.innerHTML).toBe('0'));
    
    const userScore = await findByTestId('header-score');
    await waitFor(() => expect(userScore.innerHTML).toBe('70'));
    
    const nextBtn = await findByTestId('btn-next');
    act(() => userEvent.click(nextBtn));

  }, 10000);

  test('if the score is added correctly when answering hard question', async () => {
    initialState.game.count = 1;
    const { getByTestId, findByTestId } = renderWithRouterAndRedux(<App />, initialState, '/game');
    
    const timer = getByTestId('question-timer');
    const initialTimer = 5;

    
    for (let i = initialTimer; i > 0; i -= 1) {
      await waitFor(() => expect(timer.innerHTML).toBe(`${i}`));
    }
    await waitFor(() => expect(timer.innerHTML).toBe('30'));

    const correctAnswer = getByTestId('correct-answer');
    act(() => userEvent.click(correctAnswer));
    
    await waitFor(() => expect(timer.innerHTML).toBe('0'));
    
    const userScore = await findByTestId('header-score');
    await waitFor(() => expect(userScore.innerHTML).toBe('100'));
    
    const nextBtn = await findByTestId('btn-next');
    act(() => userEvent.click(nextBtn));

  }, 10000);

  test('if the the page redirects correctly', async () => {
    initialState.game.count = 4;
    const { history, getByTestId, getAllByTestId, findByTestId } = renderWithRouterAndRedux(<App />, initialState, '/game');
    
    const timer = getByTestId('question-timer');
    const initialTimer = 5;
    
    for (let i = initialTimer; i > 0; i -= 1) {
      await waitFor(() => expect(timer.innerHTML).toBe(`${i}`));
    }
    await waitFor(() => expect(timer.innerHTML).toBe('30'));

    const answer = getAllByTestId(/wrong-answer-/i)[0];
    act(() => userEvent.click(answer));
    
    await waitFor(() => expect(timer.innerHTML).toBe('0'));
    
    const nextBtn = await findByTestId('btn-next');
    act(() => userEvent.click(nextBtn));

    await waitFor(() => expect(history.location.pathname).toBe('/feedback'));
  }, 10000);
});
