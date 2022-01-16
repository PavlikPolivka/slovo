import { InformationCircleIcon } from "@heroicons/react/outline";
import { useState, useEffect, componentDidMount } from "react";
import { InfoModal } from "../components/InfoModal";
import { WinModal } from "../components/winModal";
import { Alert } from "../components/alert";
import Grid from "../components/grid";
import Keyboard from "../components/keyboard";
import { isWordInWordList, isWinningWord, solution, generateSeed } from "../lib/words";
import { Loading } from '../components/loading';
import { data } from "autoprefixer";
import { getGuessStatuses } from '../lib/statuses';
import { LostModal } from '../components/lostModal';



export default function Home() {

  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameWon, setIsGameWon] = useState(false);
  const [isWinModalOpen, setIsWinModalOpen] = useState(false);
  const [isLostModalOpen, setIsLostModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);


  useEffect(() => {
    
    const seed = generateSeed();
    console.log("d")
    let data = localStorage.getItem('data');
    data = JSON.parse(data);
    if (data && data.seed === seed) {
      setGuesses(data.guesses);

      if (isWinningWord(data.guesses[data.guesses.length - 1])) {
        setIsGameWon(true)
      } else {
        if (data.guesses.length >= 5) {
          setIsGameLost(true);
        }
      }
    }

    setLoading(false);
    if (isGameWon) {
      setIsWinModalOpen(true);
    }
    if (isGameLost) {
      setIsLostModalOpen(true);
    }
  }, [isGameWon, isGameLost]);

  const onChar = (value) => {
    if (currentGuess.length < 5 && guesses.length < 6) {
      setCurrentGuess(`${currentGuess}${value}`);
    }
  };

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const onEnter = () => {
    if (!isWordInWordList(currentGuess)) {
      setIsWordNotFoundAlertOpen(true);
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false);
      }, 2000);
    }

    const winningWord = isWinningWord(currentGuess);

    if (currentGuess.length === 5 && guesses.length < 6 && !isGameWon) {
      setGuesses([...guesses, currentGuess]);
      const data = {
        seed: generateSeed(),
        guesses: [...guesses, currentGuess]
      }
      localStorage.setItem('data', JSON.stringify(data));
      setCurrentGuess("");

      if (winningWord) {
        return setIsGameWon(true);
      }

      if (guesses.length === 5) {
        return setIsGameLost(true);
      }
    }
  };

  if (isLoading) {
    return (
      <Loading/>
    );
  }


  return (
    <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
    <Alert message="Slovo není ve slovníku" isOpen={isWordNotFoundAlertOpen} />
    <div className="flex w-80 mx-auto items-center mb-8">
      <h1 className="text-xl grow font-bold">SLOVO</h1>
      <InformationCircleIcon
        className="h-6 w-6 cursor-pointer"
        onClick={() => setIsInfoModalOpen(true)}
      />
    </div>
    <Grid guesses={guesses} currentGuess={currentGuess} />
    <Keyboard
      onChar={onChar}
      onDelete={onDelete}
      onEnter={onEnter}
      guesses={guesses}
    />
    <LostModal
      isOpen={isLostModalOpen}
      handleClose={() => window.location.reload()}
      guesses={guesses}
    />
    <WinModal
      isOpen={isWinModalOpen}
      handleClose={() => window.location.reload()}
      guesses={guesses}
    />
    <InfoModal
      isOpen={isInfoModalOpen}
      handleClose={() => setIsInfoModalOpen(false)}
    />
  </div>
  )
}
