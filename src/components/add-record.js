import { useContext } from "react";
import { useRequestAddRecord } from "../hooks"; 
import { AppContext } from "../context";

export function AddRecord() {
    const { refreshRec, title, setTitle} = useContext(AppContext);
    const { isCreating, requestAddRecord } = useRequestAddRecord(refreshRec, title);
    return (
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
    )
}