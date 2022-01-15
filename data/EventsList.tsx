import AoV from '../public/images/events/aov_logo.png'
import TD from '../public/images/events/td_logo.png'
import LAB from '../public/images/events/lab_logo.png'
import OTK from '../public/images/events/otk_logo.png'
import styles from "../styles/Event.module.scss"

const EventsList = [
    {
        title: 'Arena of Valor',
        description: "Lightning-fast reflexes. Split-second decisions. Thousands of hours of practice. You'll need it all to emerge victorious at Arena of Valor, the most intensely competitive gaming event in town.",
        date: '2nd & 3rd February',
        time: '4:30 PM to 6:30 PM',
        venue: 'Online',
        grades: '8 - 12',
        link: '/events/arena-of-valor',
        image: AoV,
        accent: 'black',
        selector: styles.aov,
    },
    {
        title: 'Knock Out!',
        description: "A battlefield where your words become your weapons. A sudden rush of adrenaline in your veins and a desperate need to protect yourself. Knockout is a debate competition on the best of topics relating to technology and the future. It's not about killing your enemy, it's about making them surrender.",
        date: '4th February',
        time: '2:30 PM to 3:30 PM',
        venue: 'School Auditorium',
        grades: '9 - 12',
        link: '/events/knock-out',
        image: AoV,
        accent: 'hsl(174, 100%, 20%)',
        selector: styles.ko,
    },
    {
        title: 'Truth or Debug',
        description: "The pressure builds up as eyes dart from one line to the next, keen eyes trained to spot anomalies as hunters do for prey. Do you have razor sharp instincts to spot the error? Join truth or debug to find out.",
        date: '4th February',
        time: 'Evening',
        venue: 'School Auditorium',
        grades: '9 - 12',
        link: '/events/truth-or-debug',
        image: TD,
        accent: "black",
        selector: styles.td,
    },
    {
        title: 'Log and Blog',
        description: "Can microchips control us? Is future-tech scary? Log and Blog is an event which lets you ponder upon topics such as these. Join this and find answers for a lot of questions",
        date: '4th February',
        time: 'Time',
        venue: 'School Auditorium',
        grades: '9 - 12',
        link: '/events/log-and-blog',
        image: LAB,
        accent: 'hsl(30, 18%, 9%)',  
        selector: styles.lab,
    },
    {
        title: 'Designscape',
        description: "The Designscape event is the perfect opportunity to use your unique magic on a photo and see what comes of it. It's the perfect place to fuse your imagination and reality. So what are you waiting for? Join this event and test your abilities!",
        date: '4th February',
        time: 'Time',
        venue: 'School Auditorium',
        grades: '9 - 12',
        link: '/events/designscape',
        image: OTK,
        accent: 'green',
        selector: styles.ds,
    },
    {
        title: 'Otakuiz',
        description: "For all the seasoned anime watchers out there, this this the perfect opportunity for you. Prepare to battle it out in Otakuiz! An event that will test your knowledge in anime every step of the way. Do you have what it takes?",
        date: 'Day Month',
        venue: 'Time',
        grades: '9 - 12',
        link: '/events/otakuiz',
        image: OTK,
        accent: "#09001F",
        selector: styles.otk,
    }
]

export default EventsList