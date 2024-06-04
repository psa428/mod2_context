import './App.css';
import { MainPage } from './components/main-page';
import { AppContext } from './context';
import { useState } from 'react';

function App() {

  
  const [title, setTitle] = useState("");
  const [refreshRecords, setRefreshRecords] = useState(false);
  const [ isUpdating, setIsUpdating] = useState(false);
  const [stat, setStat] = useState(false) ;

  const refreshRec = () => setRefreshRecords(!refreshRecords);
 
    return (
      <AppContext.Provider value={{title, setTitle, refreshRecords, refreshRec, isUpdating, setIsUpdating, stat, setStat}}>
      <div>
        <MainPage />
        
      </div>
      </AppContext.Provider>


    )
}

export default App;
