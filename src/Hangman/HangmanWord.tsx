type HangmanWordProps = {
  guessedLetters: string[];
  wordToGuess: string;
  revealWord?: boolean;
};

const HangmanWord = ({
  guessedLetters,
  wordToGuess,
  revealWord = false,
}: HangmanWordProps) => {
  console.log(wordToGuess);
  return (
    <div
      style={{
        display: "flex",
        gap: ".25em",
        fontSize: "5rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "monospace",
      }}
    >
      {wordToGuess.split("").map((letter, index) => (
        <span style={{ borderBottom: ".1em solid black", width: "60px", textAlign: "center" }} key={index}>
          <span
            style={{
              visibility:
                guessedLetters.includes(letter) || revealWord
                  ? "visible"
                  : "hidden",
              color:
                !guessedLetters.includes(letter) && revealWord
                  ? "red"
                  : "black",
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
};
export default HangmanWord;
