import tokenResponse from './mockData';

const mockFetchToken = () => Promise.resolve({
  json: () => Promise.resolve(tokenResponse),
});

export default mockFetchToken;