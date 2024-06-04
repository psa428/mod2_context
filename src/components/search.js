export function Search(props) {
    return (
        <div>
          <input 
            value={props.strSearch}
            onChange={event => props.setStrSearch(event.target.value)}
            type="text" 
            placeholder='Найти ...' />
        </div>
        
    );
};