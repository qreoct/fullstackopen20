import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog /> component', () => {
	let component
	const blog = {
		title: 'Blog component testing',
		url: 'test.com',
		author: 'ophelia hamlet',
		likes: 15
	}
	const likeHandler = jest.fn()
	beforeEach(() => {
		component = render(
			<Blog blog={blog} likeHandler = {likeHandler}/>
		)
	})

	test('title is rendered', () => {
		expect(component.container).toHaveTextContent(
			'Blog component testing'
		)
	})
	test('no. of likes is rendered', () => {
		expect(component.container).toHaveTextContent(
			'15'
		)
	})
	test('author is NOT visible at the start', () => {
		const div = component.container.querySelector('.blogauthoruser')
		expect(div).toHaveStyle('display: none')
	})
	test('after clicking the button, author is displayed', () => {
		const button = component.getByText('+')
		fireEvent.click(button)

		const div = component.container.querySelector('.blogauthoruser')
		expect(div).not.toHaveStyle('display: none')
	})
	test('when clicking like button twice, fn is called twice', () => {
		const button = component.container.querySelector('.bloglikes')
		fireEvent.click(button)
		expect(likeHandler.mock.calls).toHaveLength(1)
		fireEvent.click(button)
		expect(likeHandler.mock.calls).toHaveLength(2)
	})

})