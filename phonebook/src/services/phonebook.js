import axios from "axios";
const baseUrl = 'http://localhost:3001/api/persons'

const getAll =  ()=>{
    return axios.get(baseUrl).then(res=>{
        return res.data
    })
}

const update = (id, newObj)=>{
    return axios.put(`${baseUrl}/${id}`, newObj)
    .then(res =>{
        return res.data
    })
}

const create = (newObj)=>{
    return axios.post(baseUrl, newObj)
    .then(res=> res.data)
}

const deleteData = id=>{
    return axios.delete(`${baseUrl}/${id}`)
    .then(response =>{
        return response.data
    })
}

export default {create, update,getAll, deleteData}