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

export default {getAll, create}