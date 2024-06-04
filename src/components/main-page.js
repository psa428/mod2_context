import { useState } from "react";

import { useRequestGetRecords } from "../hooks";
import { useRequestDeleteRecord } from "../hooks";
// import { useRequestUpdateRecord } from "../hooks";
// import { useRequestAddRecord } from "../hooks";
import { Search } from "./search";
import { AddRecord } from "./add-record";
import { UpdateRecord } from "./update-record";

export function MainPage (){

    const refreshRec = () => setRefreshRecords(!refreshRecords);

    const [title, setTitle] = useState("");
    const [refreshRecords, setRefreshRecords] = useState(false);
    const { isLoading, records, setRecords } = useRequestGetRecords(refreshRecords);
    const { isDeleting, requestDeleteRecord} = useRequestDeleteRecord(refreshRec);
    // const {isUpdating, requestUpdateRecord, setIsUpdating} = useRequestUpdateRecord(refreshRec);
    // const [isCreating, setIsCreating] = useState(false);
    const [ isUpdating, setIsUpdating] = useState(false);
    
    const [strSearch, setStrSearch] = useState('');
    const [stat, setStat] = useState(false) ;
    const [idRec, setIdRec] = useState('');

    const requestSortRecords = () => {
      let arr = [...records];
      arr.sort(function(a, b) {
        if (a.title < b.title)
          return -1;
        if (a.title > b.title)
          return 1;
        return 0;
      });
      
      setRecords(arr);

    };

    return (
        <div className="App">
          <Search strSearch={strSearch} setStrSearch={setStrSearch}/>
          <AddRecord title={title} setTitle={setTitle} refreshRec={refreshRec}/>

      <div className="button-panel">     
        <button 
          onClick={requestSortRecords}>
                  Сортировка
        </button>   
      </div>  
        <UpdateRecord refreshRec={refreshRec} title={title} setTitle={setTitle} stat={stat} setStat={setStat} idRec={idRec} isUpdating={isUpdating} setIsUpdating={setIsUpdating} />

        <h1>To Do List</h1>
        
      <div className='table-panel' >
          <table>
            <tr>
              
                {/* <th scope='col'>id</th> */}
                <th scope='col'>Title</th>
                {/* <th scope='col'>Completed</th> */}
            </tr>
        
          {isLoading ? (
                  <div className="loader">Load...</div>
              ) : (
                
                  records.map(({ id, title, completed }) => (
                    
                    <tr style= {title.indexOf(strSearch) >= 0 && strSearch !== '' ? {backgroundColor: "yellow"} : {backgroundColor: "#efefef"}}>                    
                         
                      <td>{title}</td>  
                      <button 
                        disabled={isDeleting} 
                        onClick={() => {requestDeleteRecord(id)}}>
                                Удалить
                      </button>
                      <button
                        disabled={isUpdating}
                         onClick={() => {
                            setIsUpdating(true)
                            setIdRec(id);
                            setTitle(title);
                            setStat(completed);
                        }  
                        }   
                        >
                        Изменить
                      </button>
                      
                    </tr>   
                  ))
              )}
          </table>    
      </div>
      
      </div>
    )      
}