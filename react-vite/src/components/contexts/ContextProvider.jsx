import { createContext, useContext, useState } from "react";
//createContext moze da prima default values,
// jas go kreirav

const StateContext = createContext({

    user: null, // propertija
    token: null,
    notification: null,
    setUser: () => { }, // funkcii
    setToken: () => { }, // funkcii
    setNotification: () => { }
});

// gi imamte informaciite za userot vo contextProviderot 
// ovie informacii treba da bidat prikazani na DefaultLayoutot 

export const ContextProvider = ({ children }) => {
    //  _setToken -> gotova funkcija 
    const [user, setUser] = useState({});
    const [notification, _setNotification] = useState('')

    const setNotification = (message) => {
        _setNotification(message);

        setTimeout(() => {
            _setNotification('') // posle 3 sekundi notifikaciajta da ja snema 
        }, 3000)
    }

    // go zimame tokenot 
    const [token, _setToken] = useState(localStorage.getItem('ACESS_TOKEN'));
    // za da bideme authorizirani, da immame acces vo aplikaciajta, da ne sme na login/signup page

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
            notification,
            setNotification
        }}>
            {children}
        </StateContext.Provider>
    )
}


export const useStateContext = () => useContext(StateContext)

