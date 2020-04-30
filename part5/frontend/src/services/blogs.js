import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

const create = async newObj => {
	const config = {
		headers : { Authorization: token },
	}
	console.log('create running, new obj received',newObj)

	const res = await axios.post(baseUrl, newObj, config)
	return res.data
}

const update = async (id, newObj) => {
	const res = await axios.put(`${baseUrl}/${id}`, newObj)
	return res.data
}

const remove = async (id) => {
	const config = {
		headers : { Authorization: token },
	}
	const res = await axios.delete(`${baseUrl}/${id}`, config)
	return res => res.data
}

export default { getAll, create, update, remove, setToken }