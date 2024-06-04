import { useState } from "react";
import { useContext } from 'react';
import { AppContext } from "../context";

import { useRequestGetRecords } from "../hooks";
import { useRequestDeleteRecord } from "../hooks";

import { Search } from "./search";
import { AddRecord } from "./add-record";
import { UpdateRecord } from "./update-record";

export function MainPage (){

  const { refreshRecords, refreshRec, title, setTitle, isUpdating, setIsUpdating, setStat } = useContext(AppContext);

    
    const { isLoading, records, setRecords } = useRequestGetRecords(refreshRecords);
    const { isDeleting, requestDeleteRecord} = useRequestDeleteRecord(refreshRec);
    
    
    
    const [strSearch, setStrSearch] = useState('');
    
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
          <AddRecord />

      <div className="button-panel">     
        <button 
          onClick={requestSortRecords}>
                  Сортировка
        </button>   
      </div>  
        <UpdateRecord idRec={idRec}  />

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