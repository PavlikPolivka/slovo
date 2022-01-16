import Countdown from 'react-countdown';
import { nextDate } from '../lib/words';

export const NextWord = () => {

    // Random component
    const Completionist = () => <span><a href="/">Hrej</a></span>;

    // Renderer callback with condition
    const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
        // Render a completed state
        return <Completionist />;
    } else {
        // Render a countdown
        return <span>{hours}:{minutes}:{seconds}</span>;
    }
    };

    return (
        <Countdown
            date={nextDate()}
            renderer={renderer}
        />
    );

}