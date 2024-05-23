import { Routes, Route } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import { useRequestAddRecord, useRequestGetRecords } from './hooks';
// import { MainPage, Edit } from './pages';
import { MainPage } from './pages/main-page';
import { Edit } from './pages/edit';
import { NotFound } from './pages/not-founf';

function App() {
  
  
  const [refreshRecords, setRefreshRecords] = useState(false);
  
  // const [idRec, setIdRec] = useState('');

  const [title, setTitle] = useState("");
  // const [stat, setStat] = useState(false) ;

  const refreshRec = () => setRefreshRecords(!refreshRecords);

  const { isLoading, records, setRecords } = useRequestGetRecords(refreshRecords);
  const { isCreating, requestAddRecord } = useRequestAddRecord(refreshRec, title);
 
  
  // const { isUpdating, requestUpdateRecord } = useRequestUpdateRecord(refreshRec, title, stat);


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
      <div>
        <Routes>
          <Route path='/' element={
            <MainPage 
              title={title} setTitle={setTitle} 
              isCreating={isCreating} 
              requestAddRecord={requestAddRecord} 
              requestSortRecords={requestSortRecords}
              isLoading={isLoading}
              records={records}
            />
          }>
          </Route>
           
          <Route 
              path="edit/:id"
              element={
                <Edit 
                  // isUpdating={isUpdating}
                  refreshRec={refreshRec}
                  // setTitle={setTitle}
                  // setStat={setStat}
                  // requestUpdateRecord={requestUpdateRecord}
                  records={records}
                  
                />}
          />  
          <Route path="*" element={<NotFound />} />

        </Routes>
      
      
      </div>


    )

  // return (
  //   <div className="App">
  //     <input 
  //         value={strSearch}
  //         onChange={event => setStrSearch(event.target.value)}
  //         type="text" 
  //         placeholder='Найти ...' />
  //     <div className='add-record'>
  //       <input 
  //         value={title}
  //         onChange={event => setTitle(event.target.value)}
  //         type="text" 
  //         placeholder='Введите наименование дела' />

  //       <button
  //         disabled={isCreating}
  //         onClick={requestAddRecord}
  //           >Добавить
  //       </button>  
  //     </div>  

  //     <div className="button-panel">
        

        
            
  //       <button 
  //         onClick={requestSortRecords}>
  //                 Сортировка
  //       </button>   
  //     </div>      
  //      <div className='update-record' hidden={!isUpdating}>
  //       <input 
  //         value={title}
  //         onChange={event => setTitle(event.target.value)}
  //         type="text" 
  //       />

  //       <input 
  //         value={stat}
  //         onChange={event => setStat(event.target.value)}
  //         type="text" 
  //       />  

  //       <button
  //         disabled={isUpdating}
  //         onClick={requestUpdateRecord}
  //           >Сохранить
  //       </button>  
  //     </div>  
  //       <h1>To Do List</h1>
  //     <div className='table-panel' >
  //         <table>
  //           <tr>
              
  //               {/* <th scope='col'>id</th> */}
  //               <th scope='col'>Title</th>
  //               {/* <th scope='col'>Completed</th> */}
  //           </tr>
        
  //         {isLoading ? (
  //                 <div className="loader"></div>
  //             ) : (
                
  //                 records.map(({ id, title, completed }) => (
                    
  //                   <tr style= {title.indexOf(strSearch) >= 0 && strSearch !== '' ? {color: "green"} : {color: "black"}}>                    
  //                     {/* <td>{id}</td>   */}
  //                     <td>{title}</td>     
  //                     <td>{String(completed)}</td> 
  //                     <button 
  //                       disabled={isDeleting} 
  //                       onClick={() => {requestDeleteRecord(id)}}>
  //                               Удалить
  //                     </button>
  //                      {/* <button
  //                       disabled={isUpdating}
  //                       onClick={() => {
  //                         // setIsUpdating(true)
  //                         setTitle(title);
  //                         setStat(completed);
  //                         setIdRec(id);

  //                       }
  //                       }>
  //                       Изменить
  //                     </button>  */}
  //                   </tr>
    
  //                 ))
  //             )}
  //         </table>    
  //     </div>
  //   </div>  
       
  // );
}

export default App;
