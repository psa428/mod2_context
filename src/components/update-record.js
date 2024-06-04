import { useRequestUpdateRecord } from "../hooks";
import { useContext } from "react";
import { AppContext } from "../context";

export function UpdateRecord(props) {
    const {refreshRec, isUpdating, setIsUpdating, title, setTitle, stat, setStat} = useContext(AppContext);

    const { requestUpdateRecord } = useRequestUpdateRecord(refreshRec, isUpdating, setIsUpdating);

    return (
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
            //   disabled={props.isCreating}
            onClick={() => {requestUpdateRecord(props.idRec, title, stat)}}
                >Сохранить
            </button>  
        </div>
    );    
}