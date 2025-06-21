import { createContext } from 'react';
export const InfoContext = createContext();
export const InfoProvider = ({ children }) => {
    const info = { name: 'xabi', age: 40, dept: 'IT' };
    return (
        <InfoContext.Provider value={info}>
            {children}
        </InfoContext.Provider>
    );
};
export default InfoContext;