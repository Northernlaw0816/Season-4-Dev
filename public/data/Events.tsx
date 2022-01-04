import AoV from '../images/events/aov_logo.png';
import TD from '../images/events/td_logo.png';
import OTK from '../images/events/otk_logo.png';
import styles from "../../styles/Event.module.scss"
import OTK_BG from '../images/events/otk_background.png';

const Events = [
    {
        title: 'Arena of Valor',
        description: "Lightning-fast reflexes. Split-second decisions. Thousands of hours of practice. You'll need it all to emerge victorious at Arena of Valor, the most intensely competitive gaming event in town.",
        date: '2nd & 3rd February',
        time: '4:30 PM to 6:30 PM',
        venue: 'Online',
        grades: '8 - 12',
        link: '/events/arena-of-valor',
        image: AoV,
        width: 1920,
        height: 1080,
        accent: 'linear-gradient(to bottom, hsl(174, 100%, 20%), black)',
        selector: styles.aov,
        background: 'aov'
    },
    {
        title: 'Knock Out!',
        description: "AAAAAAAA",
        date: '4th February',
        time: '2:30 PM to 3:30 PM',
        venue: 'School Auditorium',
        grades: '9 - 12',
        link: '/events/knock-out',
        image: AoV,
        width: 1920,
        height: 1080,
        accent: 'hsl(174, 100%, 20%)',
        selector: styles.ko,
        background: 'ko'
    },
    {
        title: 'Truth or Debug',
        description: "AAAAAAAA",
        date: '4th February',
        time: 'Evening',
        venue: 'School Auditorium',
        grades: '9 - 12',
        link: '/events/truth-or-debug',
        image: TD,
        width: 1920,
        height: 1080,
        accent: "none",
        selector: styles.td,
        background: 'td'
    },
    {
        title: 'Log and Blog',
        description: "AAAAAAAA",
        date: '4th February',
        time: 'Time',
        venue: 'School Auditorium',
        grades: '9 - 12',
        link: '/events/log-and-blog',
        image: TD,
        width: 1920,
        height: 1080,
        accent: 'hsl(0, 0%, 14%)',  
        selector: styles.lab,
        background: 'lab'
    },
    {
        title: 'Designscape',
        description: "AAAAAAAA",
        date: '4th February',
        time: 'Time',
        venue: 'School Auditorium',
        grades: '9 - 12',
        link: '/events/designscape',
        image: OTK,
        width: 1710,
        height: 288,
        accent: 'white',
        selector: styles.ds,
        background: 'ds'
    },
    {
        title: 'Otakuiz',
        description: "AAAAAAAA",
        date: 'Day Month',
        venue: 'Time',
        grades: '9 - 12',
        link: '/events/otakuiz',
        image: OTK,
        width: 1710,
        height: 288,
        accent: "none",
        selector: styles.otk,
        background: ""
    }
]

export default Events