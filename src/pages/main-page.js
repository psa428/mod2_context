import { useState } from "react";
import { Link } from "react-router-dom";
// import { Outlet } from "react-router-dom";
import { useRequestGetRecords } from "../hooks";
import { useRequestAddRecord } from "../hooks";

export function MainPage (){

    const refreshRec = () => setRefreshRecords(!refreshRecords);

    const [title, setTitle] = useState("");
    const [refreshRecords, setRefreshRecords] = useState(false);
    const { isLoading, records, setRecords } = useRequestGetRecords(refreshRecords);
    const { isCreating, requestAddRecord } = useRequestAddRecord(refreshRec, title);
    const [strSearch, setStrSearch] = useState('');

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
    <input 
          value={strSearch}
          onChange={event => setStrSearch(event.target.value)}
          type="text" 
          placeholder='Найти ...' />
      <div className='add-record'>
        <input 
          value={title}
          onChange={event => setTitle(event.target.value)}
          type="text" 
          placeholder='Введите наименование дела' />

        <button
          disabled={isCreating}
          onClick={requestAddRecord}
            >Добавить
        </button>  
      </div>  

      <div className="button-panel">     
        <button 
          onClick={requestSortRecords}>
                  Сортировка
        </button>   
      </div>    
      
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
                         
                      <td><Link to={`edit/${id}`}>{title}</Link></td>  
                      
                    </tr>   
                  ))
              )}
          </table>    
      </div>
      
      </div>
    )      
}