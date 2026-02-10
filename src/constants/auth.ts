export const AUTH_STORAGE_KEYS = {
  USER_SESSION: "user_session",
};

/* 
  In a production app, the name and token would come from the server, 
  but here we are simulating with fixed data to facilitate testing.
**/
export const AUTH_FAKE_DATA = {
  DEFAULT_USER_NAME: "Usuário Teste",
  DEFAULT_TOKEN: "token-jwt-real-123",
  TEST_EMAIL: "user@email.com",
  TEST_PASSWORD: "123123",
};
