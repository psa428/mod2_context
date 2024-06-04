

// export const useRequestUpdateRecord = (refreshRec, title, stat) => {
    export const useRequestUpdateRecord = (refreshRec, isUpdating, setIsUpdating) => {

    
    

    const requestUpdateRecord = (id, title, stat) => {
         
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
        
        requestUpdateRecord,
        
    }


}    
