import React from 'react'

import {Link} from "react-router-dom"
import '../styles/users.css'

const User = ({ acc }) => {

	return(
		<tr>
		<td>
			<Link to={`/users/${acc.id}`}> {acc.name} </Link>
		</td>
		<td>
			{acc.blogs.length}
		</td>
		</tr>
	)
}

export default User