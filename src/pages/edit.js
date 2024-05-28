import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRequestUpdateRecord } from "../hooks";
import { useRequestDeleteRecord } from "../hooks";


export function Edit(props) {
    const { isUpdating, requestUpdateRecord } = useRequestUpdateRecord(props.refreshRec);
    const { isDeleting, requestDeleteRecord } = useRequestDeleteRecord(props.refreshRec);
    

    const params = useParams();

    const [newTitle, setNewTitle] = useState('');
    const [newStat, setNewStat] = useState('');
    const navigate = useNavigate();
    

    useEffect(() => {
        // setIsLoading(true);
        if (params.id === undefined ) return;
    
        fetch('http://localhost:3005/records/' + params.id)
                .then((loadedData) => loadedData.json())
                .then((loadedRecord) => {
                    if (loadedRecord.title === undefined)
                        navigate('/404');
                    setNewTitle(loadedRecord.title);
                    setNewStat(loadedRecord.completed);

                })
                
        }, [params.id, navigate]);

    return (
        <div>
            <h3>Редактирование записи</h3>
            {/* <button ><Link to="/">Назад</Link></button> */}
            <button
                onClick={() => {navigate('/')}}
            >Назад</button>

            <div className='update-record' >
                {/* <label>id: </label>
                <input>
                    value={props.id}
                    type="text"
                </input> <br /><br /> */}
                <label>Наименование:   </label>
                <input  
                    value={newTitle}
                    onChange={(event) => setNewTitle(event.target.value)}
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
                 onClick={() => {requestUpdateRecord(params.id, newTitle, newStat)
                    navigate('/');
                 }}
                    >Сохранить
                </button> 
                <button
                 disabled={isDeleting}
                 onClick={() => {requestDeleteRecord(params.id)
                    navigate('/');
                 }}
                    >Удалить
                </button>  
            </div>
        </div>
    );
};