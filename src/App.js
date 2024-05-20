import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshRecords, setRefreshRecords] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [strSearch, setStrSearch] = useState('');
  const [idRec, setIdRec] = useState('');

  const [title, setTitle] = useState("");
  const [stat, setStat] = useState(false) ;

  

  useEffect(() => {
    setIsLoading(true);

    fetch('http://localhost:3005/records')
            .then((loadedData) => loadedData.json())
            .then((loadedRecords) => {
                
                setRecords(loadedRecords);
            })
            .finally(() => setIsLoading(false));
    }, [refreshRecords]);

    const requestAddRecord = () => {
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
              
              setRefreshRecords(!refreshRecords);
          })
          .finally(() => setIsCreating(false));
  };
  
  const requestUpdateRecord = () => {
    
    if (!idRec)
      return;

    let newTitle = title;
    let newStat = stat;
    // setIsUpdating(true);

    fetch('http://localhost:3005/records/' + idRec, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({
            title: newTitle,
            completed: newStat,
        }),
    })
        .then((rawResponse) => rawResponse.json())
        .then((response) => {
            
            setRefreshRecords(!refreshRecords);
        })
        .finally(() => {
          setIsUpdating(false);
          setTitle('');
        }  

        );
};

const requestDeleteRecord = (id) => {
  console.log(`id= ${id} `);
  
    if (!id)
      return;
  setIsDeleting(true);

  fetch('http://localhost:3005/records/' + id, {
      method: 'DELETE',
  })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
          
          setRefreshRecords(!refreshRecords);
      })
      .finally(() => setIsDeleting(false));
};

    

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
      <div className='update-record' hidden={!isUpdating}>
        <input 
          value={title}
          onChange={event => setTitle(event.target.value)}
          type="text" 
        />

        <input 
          value={stat}
          onChange={event => setStat(event.target.value)}
          type="text" 
        />  

        <button
          disabled={isCreating}
          onClick={requestUpdateRecord}
            >Сохранить
        </button>  
      </div>  
        <h1>To Do List</h1>
      <div className='table-panel' >
          <table>
            <tr>
              
                <th scope='col'>id</th>
                <th scope='col'>Title</th>
                <th scope='col'>Completed</th>
            </tr>
        
          {isLoading ? (
                  <div className="loader"></div>
              ) : (
                
                  records.map(({ id, title, completed }) => (
                    
                    <tr style= {title.indexOf(strSearch) >= 0 && strSearch !== '' ? {color: "green"} : {color: "black"}}>                    
                      <td>{id}</td>  
                      <td>{title}</td>     
                      <td>{String(completed)}</td>
                      <button 
                        disabled={isDeleting} 
                        onClick={() => {requestDeleteRecord(id)}}>
                                Удалить
                      </button>
                      <button
                        disabled={isUpdating}
                        onClick={() => {
                          setIsUpdating(true)
                          setTitle(title);
                          setStat(completed);
                          setIdRec(id);

                        }
                        }>
                        Изменить
                      </button>
                    </tr>
    
                  ))
              )}
          </table>    
      </div>
    </div>  
       
  );
}

export default App;
