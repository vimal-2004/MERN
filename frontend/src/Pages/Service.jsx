import { useContext } from 'react';
import { InfoContext } from '../hooks/InfoContext';

const Service = () => {
    const info = useContext(InfoContext)
    return(
        <>
           <h1>Service</h1>
           <h1>I am {info.name} and my age is {info.age} from {info.dept}</h1>
        </>
    )
}
export default Service