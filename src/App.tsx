import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import useLotteryNumbers from "./hooks/use-lottery-numbers";
import { Copy } from "lucide-react";

export default function App() {
  const { toast } = useToast();
  const {
    numbersPerGame,
    numberOfGames,
    generatedNumbers,
    handleNumbersPerGame,
    handleNumberOfGames,
    generateNumbers,
    handleCopyNumbers,
    totalCost,
    showTotalCoast,
  } = useLotteryNumbers();

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Gerador de números para <br />
            Mega da Virada
            <span className="block text-xs text-gray-500 mt-2 font-bold">
              Atenção: Os números gerados são aleatórios e não garantem
              resultados em sorteios oficiais. Este projeto foi criado
              exclusivamente para fins educacionais.
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="numbersPerGame"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Números por jogo - Máximo de 20 números
              </label>
              <Input
                id="numbersPerGame"
                type="number"
                min="1"
                max="20"
                value={numbersPerGame}
                onChange={(e) => handleNumbersPerGame(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="numberOfGames"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Número de jogos - Máximo de 100 jogos
              </label>
              <Input
                id="numberOfGames"
                type="number"
                min="1"
                max="100"
                value={numberOfGames}
                onChange={(e) => handleNumberOfGames(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <Button onClick={generateNumbers} className="w-full">
              Gerar números
            </Button>
          </div>
          {generatedNumbers.length > 0 && (
            <div className="mt-6">
              {showTotalCoast && (
                <p className="text-sm font-semibold">
                  {`Custo total: ${totalCost.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}`}
                </p>
              )}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold mb-2">Números gerados:</h3>

                <Button onClick={() => handleCopyNumbers(toast)}>
                  Copiar jogos
                </Button>
              </div>

              <ul className="space-y-2">
                {generatedNumbers.map((game, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <p className="font-semibold">
                      Jogo {index + 1}:{" "}
                      <span className="font-normal"> {game.join(", ")}</span>
                    </p>
                    <Button
                      variant={"ghost"}
                      onClick={() => handleCopyNumbers(toast, game, index)}
                    >
                      <Copy />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
