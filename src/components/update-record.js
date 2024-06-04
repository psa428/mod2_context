import { useRequestUpdateRecord } from "../hooks";

export function UpdateRecord(props) {

    const { requestUpdateRecord } = useRequestUpdateRecord(props.refreshRec, props.isUpdating, props.setIsUpdating);

    return (
        <div className='update-record' hidden={!props.isUpdating}>
            <input 
            value={props.title}
            onChange={event => props.setTitle(event.target.value)}
            type="text" 
            />

            <input 
            value={props.stat}
            onChange={event => props.setStat(event.target.value)}
            type="text" 
            />  

            <button
            //   disabled={props.isCreating}
            onClick={() => {requestUpdateRecord(props.idRec, props.title, props.stat)}}
                >Сохранить
            </button>  
        </div>
    );    
}