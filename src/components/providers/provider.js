import React, { createContext, useEffect, useState } from 'react';
import { db } from "../../firebase";

export const MyContext = createContext(null);

const MyContextProvider = ({ children }) => {
  const [operations, setOperations] = useState([]);
  const [roomItems, setRoomItems] = useState([]);

  const getDataFromDb = (collectionName, setCollection) => {
    const collectionRef = db.collection(collectionName);
    collectionRef.get()
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() })
        })
        setCollection(data);
      })
      .catch(error => {
        console.error('Blad pobierania danych: ', error);
      })
  }

  useEffect(() => {
    getDataFromDb('operations', (data) => {
      setOperations(data)
    });
    getDataFromDb('roomItems', (data) => {
      setRoomItems(data)
    });
  }, []);

  return (
    <MyContext.Provider value={ { operations, setOperations, roomItems, setRoomItems } }>
      { children }
    </MyContext.Provider>
  );
};

export default MyContextProvider;