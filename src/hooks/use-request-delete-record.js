import { useState } from "react";

export const useRequestDeleteRecord = (refreshRec) => {

    const [isDeleting, setIsDeleting] = useState(false);

    const requestDeleteRecord = (id) => {
        
        if (!id)
            return;
        setIsDeleting(true);
    
        fetch('http://localhost:3005/records/' + id, {
            method: 'DELETE',
        })
            .then((rawResponse) => rawResponse.json())
            .then((response) => {
                
                // setRefreshRecords(!refreshRecords);
                refreshRec();
            })
            .finally(() => setIsDeleting(false));
    };

    return {
        isDeleting,
        requestDeleteRecord
    };
    

};
    