import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useRequestUpdateRecord } from "../hooks";
import { useRequestDeleteRecord } from "../hooks";

export function Edit(props) {
    const { isUpdating, requestUpdateRecord } = useRequestUpdateRecord(props.refreshRec);
    const { isDeleting, requestDeleteRecord } = useRequestDeleteRecord(props.refreshRec);

    const params = useParams();
    let record = props.records.find(item => item.id === params.id);
    const [newTitle, setNewTitle] = useState(record.title);
    const [newStat, setNewStat] = useState(record.completed);
    

    return (
        <div>
            <h3>Редактирование записи</h3>
            <button ><Link to="/">Назад</Link></button>

            <div className='update-record' >
                {/* <label>id: </label>
                <input>
                    value={props.id}
                    type="text"
                </input> <br /><br /> */}
                <label>Наименование:   </label>
                <input  
                    value={newTitle}
                    onChange={event => setNewTitle(event.target.value)}
                    type="text" 
                /> <br /><br />
                <label>Выполнено:      </label>

                <input 
                    value={newStat} 
                    onChange={event => setNewStat(event.target.value)}
                    type="text" 
                /> <br /><br />

                <button
                 disabled={isUpdating}
                 onClick={requestUpdateRecord(params.id, newTitle, newStat)}
                    >Сохранить
                </button> 
                {/* <button
                 disabled={isDeleting}
                 onClick={requestDeleteRecord(params.id)}
                    >Удалить
                </button>  */}
            </div>
        </div>
    );
};