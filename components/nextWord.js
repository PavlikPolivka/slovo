import Countdown from 'react-countdown';
import { nextDate } from '../lib/words';

export const NextWord = () => {

    // Random component
    const Completionist = () => <span>Další slovo</span>;

    // Renderer callback with condition
    const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
        // Render a completed state
        return <Completionist />;
    } else {
        // Render a countdown
        return <span>Nové slovo za: {minutes} min {seconds} sec</span>;
    }
    };

    return (
        <span>
                <Countdown
            date={nextDate()}
            renderer={renderer}
        />
        </span>

    );

}