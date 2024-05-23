import { useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export function MainPage (props){
    const [strSearch, setStrSearch] = useState('');
    return (
        <div className="App">
    <input 
          value={strSearch}
          onChange={event => setStrSearch(event.target.value)}
          type="text" 
          placeholder='Найти ...' />
      <div className='add-record'>
        <input 
          value={props.title}
          onChange={event => props.setTitle(event.target.value)}
          type="text" 
          placeholder='Введите наименование дела' />

        <button
          disabled={props.isCreating}
          onClick={props.requestAddRecord}
            >Добавить
        </button>  
      </div>  

      <div className="button-panel">     
        <button 
          onClick={props.requestSortRecords}>
                  Сортировка
        </button>   
      </div>    
      <Outlet />  
        <h1>To Do List</h1>
      <div className='table-panel' >
          <table>
            <tr>
              
                {/* <th scope='col'>id</th> */}
                <th scope='col'>Title</th>
                {/* <th scope='col'>Completed</th> */}
            </tr>
        
          {props.isLoading ? (
                  <div className="loader"></div>
              ) : (
                
                  props.records.map(({ id, title, completed }) => (
                    
                    <tr style= {title.indexOf(strSearch) >= 0 && strSearch !== '' ? {color: "green"} : {color: "black"}}>                    
                      <td><Link to={`edit/${id}`}>{title}</Link></td>      
                    </tr>   
                  ))
              )}
          </table>    
      </div>
      
      </div>
    )      
}