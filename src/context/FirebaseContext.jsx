// context/FirebaseContext.jsx
import { createContext, useState, useCallback } from 'react';
import { db, collection, getDocs, query, orderBy, limit } from '../../firebase/config';
import PropTypes from 'prop-types';

const FirebaseContext = createContext("");

const FirebaseProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [score, setScore] = useState(0);
    const fetchData = useCallback(async (collectionName) => {
        try {


            
            const colRef = collection(db, collectionName);
            // Crie uma consulta para ordenar pelos maiores scores e limitar o número de documentos retornados
            const q = query(colRef, orderBy('score', 'desc'), limit(20)); // Ajuste o limite conforme necessário
            const snapshot = await getDocs(q);
            const fetchedData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setData(fetchedData);
            console.log(fetchedData); // Log para verificar os dados
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    }, []);

    return (
        <FirebaseContext.Provider
            value={{
                data,
                fetchData,
                score, 
                setScore
            }}
        >
            {children}
        </FirebaseContext.Provider>
    );
};

FirebaseProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { FirebaseProvider, FirebaseContext };
