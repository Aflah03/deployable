const Notification = ({message})=>{
    const style = {
        color:'green',
        fontSize: '20px' ,
        borderStyle: 'solid',
        borderRadius:'5px',
        borderColor: 'green',
        backgroundColor: 'lightgrey',
        padding:'10px',
        margin: '10px'



    }
    if(message !=''){
        return (
            <div style={style}>
                {message}
            </div>
        )
    }
    return (
        <>
        </>
    )
}
export default Notification