import { tokenResponse, questionsResponse } from './mockData';

export const mockFetchToken = () => Promise.resolve({
  json: () => Promise.resolve(tokenResponse),
});

export const mockFetchQuestions = () => Promise.resolve({
  json: () => Promise.resolve(questionsResponse)
});
