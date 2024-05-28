import { useState } from "react";

// export const useRequestUpdateRecord = (refreshRec, title, stat) => {
    export const useRequestUpdateRecord = (refreshRec) => {

    const [isUpdating, setIsUpdating] = useState(false);
    

    const requestUpdateRecord = (id, title, stat) => {
         console.log(`requestUpdateRecord id= ${id}`);
        if (!id)
          return;
        // console.log(`requestUpdateRecord title = ${title}  stat = ${stat}`)    ;
        let newTitle = title;
        let newStat = stat;
        // setIsUpdating(true);
    
        fetch('http://localhost:3005/records/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                title: newTitle,
                completed: newStat,
            }),
        })
            .then((rawResponse) => rawResponse.json())
            .then((response) => {
                
                // setRefreshRecords(!refreshRecords);
                refreshRec();
            })
            .finally(() => {
              setIsUpdating(false);
            //   setTitle('');
            }  
    
            );
    };

    return {
        isUpdating,
        requestUpdateRecord

    }


}    
