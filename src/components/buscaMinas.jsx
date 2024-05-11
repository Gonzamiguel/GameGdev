import { useState, useEffect } from "react";
import Title from "./Title";
import confetti from "canvas-confetti";

const GRID_SIZE = 8;
const MATCHES = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

function initializeMatrix() {
  const matrix = Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => 0)
  );

  for (let count = GRID_SIZE; count > 0; count--) {
    const rowRandom = Math.floor(Math.random() * GRID_SIZE);
    const cellRandom = Math.floor(Math.random() * GRID_SIZE);

    matrix[rowRandom][cellRandom] = "B";
  }

  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    for (let cellIndex = 0; cellIndex < matrix[rowIndex].length; cellIndex++) {
      if (matrix[rowIndex][cellIndex] === "B") continue;
      let bombCount = 0;

      for (const match of MATCHES) {
        if (matrix[rowIndex + match[0]]?.[cellIndex + match[1]] === "B") {
          bombCount++;
        }
      }

      matrix[rowIndex][cellIndex] = bombCount;
    }
  }

  return matrix;
}

export function BuscaMinas() {
  const [clicked, setClicked] = useState([]);
  const [status, setStatus] = useState("playing");
  const [matrix, setMatrix] = useState(() => initializeMatrix());

  useEffect(() => {
    if (clicked.length + 1 === GRID_SIZE ** 2 - GRID_SIZE) {
      confetti();
      setStatus("won");
    }
  }, [clicked]);

  function handleClick(rowIndex, cellIndex) {
    setClicked((prevClicked) => prevClicked.concat(`${rowIndex}-${cellIndex}`));

    if (matrix[rowIndex][cellIndex] === "B") {
      setStatus("lost");
    }
  }

  function resetGame() {
    setClicked([]);
    setStatus("playing");
    setMatrix(initializeMatrix());
  }

  return (
    <main className="flex justify-center">
      <section className="grid grid-rows-[auto,1fr,auto] place-items-center px-4">
        <Title title={"Buscaminas"} />
        <section className="mt-10">
          {matrix.map((row, rowIndex) => (
            <article className="flex" key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <div
                  className={`h-8 w-8 border flex justify-center items-center ${
                    clicked.includes(`${rowIndex}-${cellIndex}`)
                      ? "bg-white/20 scale-90"
                      : "bg-transparent"
                  }`}
                  key={`${rowIndex}-${cellIndex}`}
                >
                  {clicked.includes(`${rowIndex}-${cellIndex}`) ? (
                    <span>{cell === "B" ? "💣" : cell === 0 ? null : cell}</span>
                  ) : (
                    <button
                      className="h-full w-full cursor-pointer"
                      type="button"
                      onClick={() =>
                        status === "playing" && handleClick(rowIndex, cellIndex)
                      }
                    />
                  )}
                </div>
              ))}
            </article>
          ))}
        </section>
        <div className="flex justify-center mt-10">
          {status === "lost" && (
            <div className="flex flex-col justify-center items-center border rounded-xl px-2">
              <p className="text-2xl text-[#A52A2A]">Perdiste</p>
              <button
                className="rounded-xl bg-[#228BE6] p-2 cursor-pointer inline-block m-2"
                onClick={resetGame}
              >
                Jugar de nuevo
              </button>
            </div>
          )}
          {status === "won" && (
            <div className="flex flex-col justify-center items-center border rounded-xl px-2">
              <p className="text-2xl text-[#228BE6]">Ganaste</p>
              <button
                className="rounded-xl bg-[#228BE6] p-2 cursor-pointer inline-block m-2"
                onClick={resetGame}
              >
                Jugar de nuevo
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
