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
      let  newRecord = prompt("Введите наименование дела");
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
              console.log('Запись добавлена, ответ сервера:', response);
              setRefreshRecords(!refreshRecords);
          })
          .finally(() => setIsCreating(false));
  };
  
  const requestUpdateRecord = () => {
    let idRec = prompt('ВВедите id записи');
    if (!idRec)
      return;

       let newTitle = prompt('Наименование дела' );
       let newStat = prompt('Статус' );
    setIsUpdating(true);

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
            console.log('Запись обновлена, ответ сервера:', response);
            setRefreshRecords(!refreshRecords);
        })
        .finally(() => setIsUpdating(false));
};

const requestDeleteRecord = () => {
  let idRec = prompt('ВВедите id записи');
    if (!idRec)
      return;
  setIsDeleting(true);

  fetch('http://localhost:3005/records/' + idRec, {
      method: 'DELETE',
  })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
          console.log('Запись удалена, ответ сервера: ', response);
          setRefreshRecords(!refreshRecords);
      })
      .finally(() => setIsDeleting(false));
};

    const requestSearchRecord = () => {
      setStrSearch(prompt('Введите строку для поиска'));
    }

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
      <div className="button-panel">
        <button
                disabled={isCreating}
                onClick={requestAddRecord}
            >Добавить
        </button>

        <button
                disabled={isUpdating}
                onClick={requestUpdateRecord}
            >Изменить
        </button>

        <button 
          disabled={isDeleting} 
          onClick={requestDeleteRecord}>
                  Удалить
        </button>
        <button 
          onClick={requestSearchRecord}>
                  Поиск
        </button>      
        <button 
          onClick={requestSortRecords}>
                  Сортировка
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
                    </tr>
    
                  ))
              )}
          </table>    
      </div>
    </div>  
       
  );
}

export default App;
