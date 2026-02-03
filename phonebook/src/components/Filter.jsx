const Filter = ({searchTerm, handleSearchTerm, searchResult})=>{
    return (
        <>
        filter shown with : <input value={searchTerm} onChange={handleSearchTerm} />
          {searchResult.map((item)=>{
            return <p key={item.name}>{item.name} {item.number}</p>
          })}
        </>
    )
}

export default  Filter