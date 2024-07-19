import React, { useState } from 'react';
import styles from '../styles/components/RegistrationForm.module.scss';

const EventSelection: React.FC = () => {
    const [groupA, setGroupA] = useState<string>('');
    const [groupB, setGroupB] = useState<string>('');
    const [groupC, setGroupC] = useState<string>('');
    const [groupD, setGroupD] = useState<string>('');

    const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>, groupSetter: React.Dispatch<React.SetStateAction<string>>) => {
        groupSetter(e.target.value);
    };

    const showAvailableOptions = () => {
        let combinations: string[] = [];

        if (groupA) {
            combinations.push(`Group A (${groupA}) only`);
            if (groupB) {
                combinations.push(`Group A (${groupA}) + Group B (${groupB})`);
                if (groupD) combinations.push(`Group A (${groupA}) + Group B (${groupB}) + Group D (${groupD})`);
            }
            if (groupD) combinations.push(`Group A (${groupA}) + Group D (${groupD})`);
        }

        if (groupB) {
            combinations.push(`Group B (${groupB}) only`);
            if (groupD) combinations.push(`Group B (${groupB}) + Group D (${groupD})`);
        }

        if (groupC) {
            combinations.push(`Group C (${groupC}) only`);
            if (groupD) combinations.push(`Group C (${groupC}) + Group D (${groupD})`);
        }

        if (groupD) {
            combinations.push(`Group D (${groupD}) only`);
        }

        return combinations;
    };

    const combinations = showAvailableOptions();

    return (
        <div className={styles.registration_form}>
            <h1>Event Combination Checker</h1>
            <div className={styles.form_fields}>
                <div className={styles.form_input}>
                    <label htmlFor="groupA">Group A:</label>
                    <select id="groupA" value={groupA} onChange={(e) => handleGroupChange(e, setGroupA)}>
                        <option value="">None</option>
                        <option value="Truth or Debug">Truth or Debug</option>
                        <option value="Log and Blog">Log and Blog</option>
                        <option value="Pitstop">Pitstop</option>
                    </select>
                </div>
                <div className={styles.form_input}>
                    <label htmlFor="groupB">Group B:</label>
                    <select id="groupB" value={groupB} onChange={(e) => handleGroupChange(e, setGroupB)}>
                        <option value="">None</option>
                        <option value="Code Klash!">Code Klash!</option>
                        <option value="Designscape">Designscape</option>
                    </select>
                </div>
                <div className={styles.form_input}>
                    <label htmlFor="groupC">Group C:</label>
                    <select id="groupC" value={groupC} onChange={(e) => handleGroupChange(e, setGroupC)}>
                        <option value="">None</option>
                        <option value="Minecraft">Minecraft</option>
                        <option value="Otakuiz">Otakuiz</option>
                        <option value="Knockout">Knockout</option>
                        <option value="FIFA">FIFA</option>
                    </select>
                </div>
                <div className={styles.form_input}>
                    <label htmlFor="groupD">Group D:</label>
                    <select id="groupD" value={groupD} onChange={(e) => handleGroupChange(e, setGroupD)}>
                        <option value="">None</option>
                        <option value="BGMI">BGMI</option>
                        <option value="COD">COD</option>
                        <option value="FF">FF</option>
                        <option value="Valorant">Valorant</option>
                    </select>
                </div>
            </div>
            <div className={styles.result}>
                <h2>Available Combinations</h2>
                <ul>
                    {combinations.map((combination, index) => (
                        <li key={index}>{combination}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default EventSelection;
