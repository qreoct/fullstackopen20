import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blogform from './Blogform'

describe('<Blogform /> component', () => {
	let component

	const handleBlog = jest.fn()

	beforeEach(() => {
		component = render(
			<Blogform createHandler = {handleBlog}/>
		)
	})

	test('<Blogform /> updates parent state and calls onSubmit', () => {
		const title = component.container.querySelector('#title')
		const author = component.container.querySelector('#author')
		const url = component.container.querySelector('#url')
		const likes = component.container.querySelector('#likes')
		const button = component.getByText('create')

		fireEvent.change(title, {
			target: { value: 'this is test title' }
		})
		fireEvent.change(author, {
			target: { value: 'this is test author' }
		})
		fireEvent.change(url, {
			target: { value: 'testurl.com' }
		})
		fireEvent.change(likes, {
			target: { value: 15 }
		})
		fireEvent.click(button)

		expect(handleBlog.mock.calls).toHaveLength(1)
		expect(handleBlog.mock.calls[0][0].title).toBe('this is test title')
		expect(handleBlog.mock.calls[0][0].author).toBe('this is test author')
	})
})
