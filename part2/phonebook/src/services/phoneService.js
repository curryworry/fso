import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios
    .get(baseUrl)
    .then(response=>response.data)
}

const create = (phoneRecord) => {
    return axios
    .post(baseUrl,phoneRecord)
    .then(response=>response.data)
}

const deleteRecord = (id) => {
    return axios
    .delete(`${baseUrl}/${id}`)
    //.then(response=>console.log(response.data))
}

const update = (id, newObject) => {
    return axios.
    put(`${baseUrl}/${id}`,newObject)
    .then(response=>console.log(response))
}

export default {getAll, create, deleteRecord, update}