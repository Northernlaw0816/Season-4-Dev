//stylesheets
import styles from "../styles/pages/Event.module.scss"
//assets
import AoV from '../public/images/events/aov_logo.png'
import KO from '../public/images/events/ko_logo.png'
import TD from '../public/images/events/td_logo.png'
import LAB from '../public/images/events/lab_logo_2.png'
import OTK from '../public/images/events/otk_logo.png'
import DS from '../public/images/events/ds_logo.png'

const EventsList = [
    {
        title: 'Arena of Valor',
        description: "Lightning-fast reflexes. Split-second decisions. Thousands of hours of practice. You'll need it all to emerge victorious at Arena of Valor, the most intensely competitive gaming event in town.",
        date: '3rd & 4th February',
        time: '4:30 PM to 6:30 PM',
        venue: 'Online',
        grades: '9 - 12',
        link: '/events/arena-of-valor',
        image: AoV,
        accent: 'linear-gradient(to bottom, hsl(180, 100%, 20%) 20%, hsl(0, 0%, 0%) 30%)',
        selector: styles.aov,
    },
    {
        title: 'Knock Out!',
        description: "A battlefield where your words become your weapons. A sudden rush of adrenaline in your veins and a desperate need to protect yourself. Knockout is a debate competition on the best of topics relating to technology and the future. It's not about killing your enemy, it's about making them surrender.",
        date: '3rd February',
        time: 'To Be Announced',
        venue: 'To Be Announced',
        grades: '9 - 12',
        link: '/events/knock-out',
        image: KO,
        accent: 'hsl(243, 32%, 11%)',
        selector: styles.ko,
    },
    {
        title: 'Truth or Debug',
        description: "The pressure builds up as eyes dart from one line to the next, keen eyes trained to spot anomalies as hunters do for prey. Do you have razor sharp instincts to spot the error? Join truth or debug to find out.",
        date: '3rd February',
        time: 'To Be Announced',
        venue: 'To Be Announced',
        grades: '9 - 12',
        link: '/events/truth-or-debug',
        image: TD,
        accent: "black",
        selector: styles.td,
    },
    {
        title: 'Log and Blog',
        description: "Can microchips control us? Is future-tech scary? Log and Blog is an event which lets you ponder upon topics such as these. Join this and find answers for a lot of questions",
        date: '3rd February',
        time: 'To Be Announced',
        venue: 'To Be Announced',
        grades: '9 - 12',
        link: '/events/log-and-blog',
        image: LAB,
        accent: 'hsl(243, 32%, 11%)',  
        selector: styles.lab,
    },
    {
        title: 'Designscape',
        description: "The Designscape event is the perfect opportunity to use your unique magic on a photo and see what comes of it. It's the perfect place to fuse your imagination and reality. So what are you waiting for? Join this event and test your abilities!",
        date: '3rd February',
        time: 'To Be Announced',
        venue: 'To Be Announced',
        grades: '9 - 12',
        link: '/events/designscape',
        image: DS,
        accent: 'hsl(259, 67%, 25%)',
        selector: styles.ds,
    },
    {
        title: 'Otakuiz',
        description: "For all the seasoned anime watchers out there, this this the perfect opportunity for you. Prepare to battle it out in Otakuiz! An event that will test your knowledge in anime every step of the way. Do you have what it takes?",
        date: '3rd February',
        time: 'To Be Announced',
        venue: 'To Be Announced',
        grades: '9 - 12',
        link: '/events/otakuiz',
        image: OTK,
        accent: "hsl(257, 100%, 6%)",
        selector: styles.otk,
    }
]

export default EventsList