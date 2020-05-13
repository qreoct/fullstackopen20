import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
	console.log('creating new for ',content)
	const obj = { content, votes: 0 }
	const res = await axios.post(baseUrl, obj)
	return res.data 
}

const addVote = async (id) => {
	const toVote = await axios.get(`${baseUrl}/${id}`)
	console.log(toVote.data)
	const newObj = {
		...toVote.data,
		votes: toVote.data.votes + 1
	}
	const res = await axios.put(`${baseUrl}/${id}`, newObj)
	return res.data
}

export default { getAll, createNew, addVote }