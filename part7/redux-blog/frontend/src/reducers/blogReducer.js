import blogService from '../services/blogs'

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type:'INIT_BLOGS',
      data: blogs
    })
  }
}

export const newBlog = (newObj) => {
	return async dispatch => {
		const newB = await blogService.create(newObj)
	    dispatch({
	      type:'NEW_BLOG',
	      data: newB
	    })
	}
}

export const newComment = ({id, comment}) => {
	console.log('recvd id:', id)
	console.log('recvd comment:', comment)
	return async dispatch => {
		const newB = await blogService.addComment({id, comment})
		dispatch({
			type:'NEW_COMMENT',
			data: newB
		})
	}
}

export const likeBlog = (id, newObj) => {
  return async dispatch => {
    const blogs = await blogService.update(id, newObj)
    dispatch({
      type:'LIKE_BLOG',
      data: blogs,
      id
    })
  }
}

export const delBlog = (id) => {
	return async dispatch => {
		await blogService.remove(id)
		dispatch({
			type:'DEL_BLOG',
			id
		})
	}
}

const blogReducer = (state = [], action) => {
  // sorting function
  const compareLikes = (a,b) => {
    if (a.likes > b.likes) return -1
    else if (b.likes > a.likes) return 1
    else return 0
  }
  switch (action.type) {
    case 'NEW_BLOG': {
      return [...state, action.data].sort(compareLikes)
    }
    case 'LIKE_BLOG': {
    	const blogs = state.map(b => (
    		b.id === action.id ? action.data : {...b}
    	)).sort(compareLikes)
    	return blogs
    }
    case 'NEW_COMMENT':{
    	const blogs = state.map(b => (
    		b.id === action.id ? action.data : {...b}
    	)).sort(compareLikes)
    	return blogs
    }
    case 'DEL_BLOG': {
    	return state.filter(b => b.id !== action.id)
    }
    case 'INIT_BLOGS': {
      return action.data.sort(compareLikes)
    }
    default:
      return state
  }
}

export default blogReducer