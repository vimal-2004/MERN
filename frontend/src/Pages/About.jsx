import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext';

const About = () => {
    const { name } = useContext(UserContext) || {};

    return (
        <div>
            <h1>Hi! {name || 'Guest'}</h1>
            <nav>
                <Link to="/state">UseState Example</Link><br />
                <Link to="/form">Controlled Form</Link><br />
                <Link to="/effect">UseEffect Example</Link>
            </nav>
        </div>
    );
};

export default About;
