import { MiniCompletedRow } from "./miniCompleted";


export const MiniGrid = ({ guesses }) => {
  return (
    <div className="pb-6">
      {guesses.map((guess, i) => (
        <MiniCompletedRow key={i} guess={guess} />
      ))}
    </div>
  );
};
