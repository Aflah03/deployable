const PersonForm = ({newNumber, handleSubmit, newName, handleNumberChange, handleChange})=>{
    return (
        <>
        <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange} />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button  type="submit">add</button>
        </div>
      </form>
        </>
    )
}
export default PersonForm