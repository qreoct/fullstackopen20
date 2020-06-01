import { useState } from 'react'

export const useField = (type, text = '') => {
	const [value, setVal] = useState('')

	const onChange = (e) => {
		setVal(e.target.value)
	}

	const reset = (e) => {
		setVal('')
	}

	return {
		type,
		value,
		onChange,
		reset
	}
}
