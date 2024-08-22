// context/FirebaseContext.jsx
import { createContext, useState, useCallback } from 'react';
import { db, collection, getDocs, query, orderBy, limit, addDoc } from '../../firebase/config';
import PropTypes from 'prop-types';

const FirebaseContext = createContext("");

const FirebaseProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [score, setScore] = useState(0);

    const fetchData = useCallback(async (collectionName) => {
        try {
            const colRef = collection(db, collectionName);
            const q = query(colRef, orderBy('score', 'desc'), limit(20));
            const snapshot = await getDocs(q);
            const fetchedData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setData(fetchedData);
            console.log(fetchedData); // Log para verificar os dados
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    }, []);

    const saveScore = useCallback(async (newScore) => {
        try {
            // Substitua 'scores' pelo nome da sua coleção no Firestore
            const colRef = collection(db, 'Data');
            await addDoc(colRef, newScore);
            console.log("Pontuação salva com sucesso!");
            // Opcional: atualizar a lista de dados após salvar uma nova pontuação
            fetchData('scores');
        } catch (error) {
            console.error("Erro ao salvar a pontuação:", error);
        }
    }, [fetchData]);

    return (
        <FirebaseContext.Provider
            value={{
                data,
                fetchData,
                score,
                setScore,
                saveScore
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
