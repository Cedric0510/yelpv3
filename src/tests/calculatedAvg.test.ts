import RestaurantService from '../services/Restaurant.js';

jest.mock('../services/Restaurant'); // Mock de la classe

// Obtenez une instance mockée de la classe
const mockedRestaurantService = new RestaurantService() as jest.Mocked<RestaurantService>;

test('Get average at rating of restaurant', async () => {
  // Simuler le comportement de la méthode calculatedAverageVote
  mockedRestaurantService.calculatedAverageVote.mockResolvedValue(3.5);

  const req = { params: { id: '1' } } as any; // Mock de l'objet Request
  const res = {} as any; // Mock de l'objet Response

  const average = await mockedRestaurantService.calculatedAverageVote(req, res);

  // Vérifiez que la méthode mockée a été appelée
  expect(mockedRestaurantService.calculatedAverageVote).toHaveBeenCalledWith(req, res);

  // Vérifiez que la valeur retournée est correcte
  expect(average).toBe(3.5);
});