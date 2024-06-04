import { useRequestAddRecord } from "../hooks"; 
export function AddRecord(props) {
    const { isCreating, requestAddRecord } = useRequestAddRecord(props.refreshRec, props.title);
    return (
        <div className='add-record'>
        <input 
          value={props.title}
          onChange={event => props.setTitle(event.target.value)}
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