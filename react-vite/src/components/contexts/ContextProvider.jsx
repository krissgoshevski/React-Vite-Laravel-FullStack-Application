import { createContext, useContext, useState } from "react";
//createContext moze da prima default values,
// jas go kreirav

const StateContext = createContext({

    user: null, // propertija
    token: null,
    setUser: () => { }, // funkcii
    setToken: () => { }, // funkcii 
});

// gi imamte informaciite za userot vo contextProviderot 
// ovie informacii treba da bidat prikazani na DefaultLayoutot 

export const ContextProvider = ({ children }) => {
    //  _setToken -> gotova funkcija 
    const [user, setUser] = useState({
        name: 'John',


    });

    // go zimame tokenot 
    const [token, _setToken] = useState(123); // default value ke bide null
    // 123
    // localStorage.getItem('ACESS_TOKEN')

    // ovaa f-ja prima token arg, ke go povika _setToken
    // za da go setirame toj token vo ramkite na stejtot 
    // setToken e f-ja od nas so ja kreirame druga
    const setToken = (token) => {
        // treba da go setirame sega kotenok vo sesion storage ili local storage

        // ako tokenot postoi 
        if (token) {
            localStorage.setItem('ACESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACESS_TOKEN');
        }
    }

    return (
        <StateContext.Provider value={{
            // ovde ke gi stavime/pratime informaciite za userot
            // gi zimam od StateContext
            user,
            token,
            setUser,
            setToken,
        }}>
            {children}
        </StateContext.Provider>
    )
}


export const useStateContext = () => useContext(StateContext)

