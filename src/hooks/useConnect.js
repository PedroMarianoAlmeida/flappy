// useFirestoreCollection.js
import { useState, useEffect, useCallback } from 'react';
import { db, getDocs, collection, query, orderBy, limit, addDoc } from '../../firebase/config';

const useConnect = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, collectionName),
          orderBy('score', 'desc'), 
          limit(20) 
        );

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName]);

  // Função para adicionar um novo documento
  const addDocument = useCallback(async (newDoc) => {
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, collectionName), newDoc);
      console.log("Document written with ID: ", docRef.id);
      // Optionally, fetch the updated data
      fetchData(); // Optional: refresh data after adding
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  return { data, loading, error, addDocument };
};

export default useConnect;
