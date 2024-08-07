import axios from 'axios'
const baseUrl = '/api/persons'

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
    .then(response=>response.data)
}

const update = (id, newObject) => {
    return axios.
    put(`${baseUrl}/${id}`,newObject)
    .then(response=>response.data)
}

export default {getAll, create, deleteRecord, update}