const Person = ({person, handleDelete})=>{
    return (
        <>
          <p>
            {person.name}  <span> {' '} </span> 
            {person.number}  
            <button onClick={handleDelete}>delete</button>
          </p>
        </>
    )
}
export default Person