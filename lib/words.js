import { WORDS } from './wordList';

export const isWordInWordList = (word) => {
  return WORDS.includes(word.toLowerCase());
};

export const isWinningWord = (word) => {
  return solution === word;
};

const clamp = (min, max) => (value) =>
    value < min ? min : value > max ? max : value;

export const getWordOfDay = () => {
  // January 1, 2022 Game Epoch
  const epochMs = 1641013200000;
  const now = Date.now();
  const msInDay = 86400000;
  let index = Math.floor((now - epochMs) / msInDay);
  index = clamp(0, WORDS.length - 1)(index);
  console.log(index);
  return WORDS[index].toUpperCase();
};

export const solution = getWordOfDay();
