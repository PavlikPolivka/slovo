import { WORDS } from './wordList';

export const isWordInWordList = (word) => {
  return WORDS.includes(word.toLowerCase());
};

export const isWinningWord = (word) => {
  return solution === word;
};

var m_w = 123456789;
var m_z = 987654321;
var mask = 0xffffffff;

// Takes any integer
function seed(i) {
    m_w = (123456789 + i) & mask;
    m_z = (987654321 - i) & mask;
}

// Returns number between 0 (inclusive) and 1.0 (exclusive),
// just like Math.random().
function random()
{
    m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
    m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
    var result = ((m_z << 16) + (m_w & 65535)) >>> 0;
    result /= 4294967296;
    return result;
}

export function nextDate() {
  let d = new Date();
  let ye = d.getFullYear();
  let mo = d.getMonth();
  let da = d.getDate();
  let time = 6;
  let hours = d.getHours();
  if (hours < 6) {
    time = 6;
  } else if (hours < 12) {
    time = 12;
  } else if (hours < 18) {
    time = 18;
  } else {
    time = 24
  }

  return new Date(ye, mo, da, time);
}

export function generateSeed() {
  let d = new Date();
  let ye = d.getFullYear();
  let mo = d.getMonth();
  let da = d.getDate();
  let time = 0;
  let hours = d.getHours();
  if (hours < 6) {
    time = 0;
  } else if (hours < 12) {
    time = 1;
  } else if (hours < 18) {
    time = 2;
  } else {
    time = 3
  }

  return Number(""+ ye + mo + da + time);

}

function randomInRange(min, max) {
  seed(generateSeed());
  return random() * (max - min) + min;
}

const clamp = (min, max) => (value) =>
    value < min ? min : value > max ? max : value;

export const getWordOfDay = () => {
  // January 1, 2022 Game Epoch
  const epochMs = 1641013200000;
  const now = Date.now();
  const msInDay = 86400000;
  // let index = Math.floor((now - epochMs) / msInDay);
  let index = Math.floor(randomInRange(0, WORDS.length - 1));
  // index = clamp(0, WORDS.length - 1)(index);
  console.log(index);
  return WORDS[index].toUpperCase();
};

export const solution = getWordOfDay();
