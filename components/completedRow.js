import { Cell } from "./Cell";
import { getGuessStatuses } from '../lib/statuses';

export const CompletedRow = ({ guess }) => {
  const statuses = getGuessStatuses(guess);

  return (
    <div className="flex justify-center mb-1">
      {guess.split("").map((letter, i) => (
        <Cell key={i} value={letter} status={statuses[i]} />
      ))}
    </div>
  );
};
