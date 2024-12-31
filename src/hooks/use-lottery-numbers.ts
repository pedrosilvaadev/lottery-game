import { useState } from "react";

const useLotteryNumbers = (
  minNumberPerGame = 6,
  maxNumbersPerGame = 20,
  maxNumberOfGames = 100,
  maxNumber = 60
) => {
  const [numbersPerGame, setNumbersPerGame] = useState(minNumberPerGame);
  const [numberOfGames, setNumberOfGames] = useState(1);
  const [generatedNumbers, setGeneratedNumbers] = useState<number[][]>([]);
  const [showTotalCoast, setShowTotalCoast] = useState(false);
  const gameCosts = [
    { games: 6, cost: 5.0 },
    { games: 7, cost: 35.0 },
    { games: 8, cost: 140.0 },
    { games: 9, cost: 420.0 },
    { games: 10, cost: 1050.0 },
    { games: 11, cost: 2310.0 },
    { games: 12, cost: 4620.0 },
    { games: 13, cost: 8580.0 },
    { games: 14, cost: 15015.0 },
    { games: 15, cost: 25025.0 },
    { games: 16, cost: 40040.0 },
    { games: 17, cost: 61880.0 },
    { games: 18, cost: 92820.0 },
    { games: 19, cost: 135660.0 },
    { games: 20, cost: 193800.0 },
  ];

  const gameCoast = gameCosts.find((game) => game.games === numbersPerGame);
  const totalCost = gameCoast ? gameCoast.cost * numberOfGames : 0;

  const generateNumbers = () => {
    const games: number[][] = [];
    for (let i = 0; i < numberOfGames; i++) {
      let game: number[] = [];
      do {
        game = [];
        while (game.length < numbersPerGame) {
          const num = Math.floor(Math.random() * maxNumber) + 1;
          if (!game.includes(num)) {
            game.push(num);
          }
        }
        game.sort((a, b) => a - b);
      } while (
        games.some(
          (existingGame) =>
            JSON.stringify(existingGame) === JSON.stringify(game)
        )
      );
      games.push(game);
    }
    setGeneratedNumbers(games);
    setShowTotalCoast(true);
  };

  const handleNumbersPerGame = (value: number) => {
    setShowTotalCoast(false);
    if(value <= minNumberPerGame) {
      return setNumbersPerGame(minNumberPerGame)
    }
    setNumbersPerGame(value > maxNumbersPerGame ? maxNumbersPerGame : value);
  };

  const handleNumberOfGames = (value: number) => {
    setShowTotalCoast(false);
    setNumberOfGames(value > maxNumberOfGames ? maxNumberOfGames : value);
  };

  const handleCopyNumbers = (
    toast: (args: { title: string; description: string }) => void,
    game?: number[],
    index?: number
  ) => {
    if (index !== undefined && index >= 0) {
      if (game && game.length > 0) {
        const text = `Jogo ${index + 1}: ${game.join(", ")}`;
        navigator.clipboard.writeText(text);
        toast({
          title: "Números copiados",
          description:
            "Os números gerados foram copiados para a área de transferência",
        });
      }
      return;
    }

    const text = generatedNumbers
      .map((game, index) => `Jogo ${index + 1}: ${game.join(", ")}`)
      .join("\n");
    navigator.clipboard.writeText(text);
    toast({
      title: "Números copiados",
      description:
        "Os números gerados foram copiados para a área de transferência",
    });
  };

  return {
    numbersPerGame,
    numberOfGames,
    generatedNumbers,
    handleNumbersPerGame,
    handleNumberOfGames,
    generateNumbers,
    handleCopyNumbers,
    totalCost,
    showTotalCoast,
  };
};

export default useLotteryNumbers;
