import { useState, useEffect, useCallback } from "react";
import words from "./wordList.json";
import HangmanDrawing from "./HangmanDrawing";
import HangmanWord from "./HangmanWord";
import Keyboard from "./Keyboard";

const getWord = () => {
  return words[Math.floor(Math.random() * words.length)];
};

const Hangman = () => {
  const [wordToGuess, setWordToGuess] = useState(getWord);

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isWinner || isLoser) return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };
    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== "Enter") return;

      e.preventDefault();
      setWordToGuess(getWord());
      setGuessedLetters([]);
    };
    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []);

  return (
    <>
      <div
        style={{
          marginTop: "1.5rem",
          fontSize: "2rem",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {isWinner && "Winner!! - Refresh or hit Enter to try again."}
        {isLoser && "Oops, nice try!! - Refresh or hit Enter to try again."}
      </div>
      <div
        style={{
          maxWidth: "100%",
          display: "flex",
          flexDirection: "row",
          margin: "1.5rem auto",
          alignItems: "center",
        }}
      >
        <div style={{ width: "45%", display: "flex",
        flexDirection: "column", gap: "2rem", marginLeft: "3rem"}}>
          <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
          <HangmanWord
            guessedLetters={guessedLetters}
            wordToGuess={wordToGuess}
            revealWord={isLoser}
          />
        </div>
      
      <div style={{ width: "40%" }}>
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
    </>
  );
};

export default Hangman;
