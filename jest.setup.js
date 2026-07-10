// We are mocking the NetInfo module to avoid errors during testing
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  fetch: jest.fn(() =>
    Promise.resolve({
      isConnected: true,
    }),
  ),
}));