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
  let hours = d.getHours();
  let minutes = d.getMinutes() < 30 ? 30 : 0;
  

  return new Date(ye, mo, da, hours + 1, minutes);
}

export function generateSeed() {
  let d = new Date();
  let ye = d.getFullYear();
  let mo = d.getMonth();
  let da = d.getDate();
  let hours = d.getHours();
  let minutes = d.getMinutes() <= 30 ? 0 : 1;

  return Number(""+ ye + mo + da + hours + minutes);

}

function randomInRange(min, max) {
  seed(generateSeed());
  return random() * (max - min) + min;
}

const clamp = (min, max) => (value) =>
    value < min ? min : value > max ? max : value;

export const getWordOfDay = () => {
  let index = Math.floor(randomInRange(0, WORDS.length - 1));
  return WORDS[index].toUpperCase();
};

export const solution = getWordOfDay();
