import { Routes, Route } from 'react-router-dom';
import './App.css';
import { useState } from 'react';

import { MainPage } from './pages/main-page';
import { Edit } from './pages/edit';
import { NotFound } from './pages/not-founf';

function App() {
  
  
   const [refreshRecords, setRefreshRecords] = useState(false);
   const refreshRec = () => setRefreshRecords(!refreshRecords);

    return (
      <div>
        <Routes>
          <Route path='/' element={
            <MainPage 
               refreshRecords
            />
          }>
          </Route>
           
          <Route 
              path="edit/:id"
              element={
                <Edit 
                    refreshRec={refreshRec} 
                />}
          />  
          <Route path="*" element={<NotFound />} />
          <Route path="/404" element={<NotFound />} />

        </Routes>
      
      
      </div>


    )
}

export default App;
