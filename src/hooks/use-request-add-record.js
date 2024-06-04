import { useState } from "react";

export const useRequestAddRecord = (refreshRec, title) => {
    const [isCreating, setIsCreating] = useState(false);

    const requestAddRecord = () => {
        // console.log(`requestAddRecord title = ${title}`);
        let  newRecord = title;
        if (!newRecord) 
          return;
    
        setIsCreating(true);
    
        fetch('http://localhost:3005/records', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                title: newRecord,
                completed: false,
            }),
        })
            .then((rawResponse) => rawResponse.json())
            .then((response) => {
                
                // setRefreshRecords(!refreshRecords);
                refreshRec();
            })
            .finally(() => {
                setIsCreating(false);
               
            }    
            );
            
            ;
    };

    return {
        isCreating,
        requestAddRecord
    };
};   



