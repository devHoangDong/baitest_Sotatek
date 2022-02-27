import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';


const MyAppContext = React.createContext()

export const MyAppContextProvider = ({ children }) => {
    let OldList = JSON.parse(localStorage.getItem('data'))
    if (OldList) {
        OldList.myData?.map(e => e.date = new Date(e.date))
    }
    const myList = OldList ? OldList.myData : [];
    const [data, setData] = useState();
    const updateMyTodoList = (newData) => {
        setData(newData);
    }
    useEffect(() => {
        localStorage.setItem('data', JSON.stringify({ myData: data }));
    }, [data])
    return (
        <MyAppContext.Provider value={{ myList, updateMyTodoList }}>
            {children}
        </MyAppContext.Provider>
    )
}

export const useMyContext = () => React.useContext(MyAppContext)