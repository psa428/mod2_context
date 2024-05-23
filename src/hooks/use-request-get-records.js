import { useState, useEffect } from "react";


export const useRequestGetRecords = (refreshRecords) => {
    const [records, setRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
    
        fetch('http://localhost:3005/records')
                .then((loadedData) => loadedData.json())
                .then((loadedRecords) => {
                    
                    setRecords(loadedRecords);
                })
                .finally(() => setIsLoading(false));
        }, [refreshRecords]);

    return {
        isLoading,
        records,
        setRecords
    };    
      
};