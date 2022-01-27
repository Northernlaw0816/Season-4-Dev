
import eventStyles from '../../../styles/pages/Events.module.scss'
import { EventCoordinators } from '../../EventCoordinators';

const TruthOrDebug = {
    tagline: (<><span className={eventStyles.grey}>{`print(`}</span>{`"`}I have not failed, I have found 10,000 ways how not to solve a problem{`"`}<span className={eventStyles.grey}>{`);`}</span></>),
    
    headings: {
        about: "Are you Sherlock Holmes when it comes to spotting coding errors? then this competition is for you! prepare to put your skills to test in this exciting event!",
        
        rules: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum nulla quasi esse illo dolores ipsa ipsum? Odio unde repellat assumenda nulla laborum nesciunt quos illum ad sed explicabo, quam asperiores?",
        
        eventCoordinators: EventCoordinators.filter(coordinator => coordinator.event === "Truth or Debug"),

        registration: [
            "This is a Duo (2 member) event."
        ]
    }
}

export default TruthOrDebug;