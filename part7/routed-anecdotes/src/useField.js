import React, { useState } from 'react'

export const useField = (type) => {
	const [value, setVal] = useState('')

	const onChange = (e) => {
		setVal(e.target.value)
	}

	return {
		type,
		value,
		onChange
	}
}
