// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
Cypress.Commands.add("login", ({username, password}) => {
	cy.request('POST', 'http://localhost:3000/api/login', {username, password})
	.then(({body}) => {
		localStorage.setItem('loggedInBlogUser', JSON.stringify(body))
	})
	cy.visit('http://localhost:3000/')
})

Cypress.Commands.add("newBlog", ({title, author, url, likes}) => {
	cy.request({
		method: 'POST',
		url: 'http://localhost:3000/api/blogs',
		headers: {
      	'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedInBlogUser')).token}`
    	},
    	body: {
		title, author, url, likes
		}})
	cy.visit('http://localhost:3000/')
})
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
