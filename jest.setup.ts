// Configurer l'environnement de test
process.env.NODE_ENV = 'test';

// Augmenter le timeout pour les tests
beforeAll(() => {
  jest.setTimeout(10000);
});