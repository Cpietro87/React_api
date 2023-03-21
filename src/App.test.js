import { render, screen } from '@testing-library/react';
import App from './App';
import data from './data.json';

describe("Start Wars APP", () => {
  beforeAll(() => jest.spyOn(window, "fetch"));
  
//   it('deberia traer una lista de caracteres incluyendo Luke Skywalker ', () => {
//     render(<App />);
//     expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
//  });
//   it('deberia traer una lista de caracteres desde un archivo JSON', () => {
//     render(<App />);
//     for (let character of data.results){
//       expect(screen.getByText(character.name)).toBeInTheDocument();
//     }
//   })
  it("should show a list of characters from the API", async () => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => data,
    });

    render(<App />);
    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith(
    "http://swapi.dev/api/people"
  );

  for (let character of data.results) {
    expect(await screen.findByText(character.name)).toBeInTheDocument();
  }
  });
  it("should show an error message when has a network error", async () => {
    window.fetch.mockRejectedValueOnce(new Error("Network error"));

    render(<App />);

    expect(await screen.findByText("Network error")).toBeInTheDocument();
  });
});
