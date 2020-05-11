describe('Blog app', function() {

  beforeEach(function() {
  	cy.request('POST', 'http://localhost:3000/api/testing/reset')
  	const user = { name:'test man', username:'newb', password:'hunter2'}
  	cy.request('POST', 'http://localhost:3000/api/users',user)
  	cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Please log in')
  })
  describe('Login test', function() {
  	it('unsuccessful login', function() {
	  	cy.get('#user').type('abc')
	  	cy.get('#pw').type('wrong')
	  	cy.get('#login-btn').click()
	  	cy.contains('ERROR')
  		cy.get('.notification_err').should('have.css', 'border-color', 'rgb(255, 0, 0)')
  	})
  	it('successful login', function() {
	  	cy.get('#user').type('newb')
	  	cy.get('#pw').type('hunter2')
	  	cy.get('#login-btn').click()
	  	cy.contains('Currently logged in as')
  	})  	
  	describe('When logged in', function() {
	  	beforeEach(function() {
	  		cy.login({username: 'newb', password: 'hunter2'})
	  	}) 	
	  	it('new blog post can be created', function() {
	  		cy.contains("submit new blog").click()
	  		cy.get('#title').type('test title')
	  		cy.get('#author').type('authest')
	  		cy.get('#url').type('www.test.com')
	  		cy.get('#likes').type(15)
	  		cy.get('#newblog-btn').click()
	  		cy.contains('test title')
  		})
  		describe('With new blog created', function() {
  			beforeEach(function() {
  				cy.newBlog({title: 'toy story', author: 'pixar', url: 'g.com', likes: 12})
  			})
  			it('like functionality works', function() {
  				cy.get('.bloglikes').click()
  					.contains('13')
  					.click()
  					.contains('14')
  			})
  			it('the current user can delete the blog', function() {
  				cy.get('.blogdelete').click()
  				cy.get('html').should('not.contain', 'toy story')
  			})
  			it('a new user cannot see the delete button', function() {
			  	const user2 = { name:'evilguy', username:'evil', password:'destroy'}
			  	cy.request('POST', 'http://localhost:3000/api/users',user2)
			  	cy.get('.logout').click()
	  			cy.login({username: 'evil', password: 'destroy'})
	  			cy.contains('Currently logged in as')
	  			cy.get('html').should('contain', 'toy story')
	  			cy.get('.blogwrapper').should('not.contain', 'x')
  			})
  			it('expanding the blogposts work correctly', function() {
  				cy.get('.blogauthoruser').should('have.css', 'display','none')
  				cy.get('.blogmaximise').click()
  				cy.get('.blogauthoruser').should('not.have.css', 'display','none')
  			})
  			describe('With multiple blog posts already', function() {
  				beforeEach(function() {
  					cy.newBlog({title: 'ratattouille', author: 'pixar', url: 'imdb.org', likes: 17})
  					cy.newBlog({title: 'frozen 2', author: 'disney', url: 'rt.net', likes: 8})
  				})
  				it('the first blog post should be ratattouille', function() {
  					cy.get('.blogwrapper:first').should('contain', 'ratattouille')
  					cy.get('.blogwrapper:last').should('contain', 'frozen 2')
  				})
  				it('adding 5 to frozen, the new last is toy story', function() {
  					cy.contains('frozen').parent().find('.bloglikes').click().click().click().dblclick()
  					cy.get('.blogwrapper:last').should('contain', 'toy')
  				})
  				it('adding 6 to toy story, the new first is toy story', function() {
  					cy.contains('toy').parent().find('.bloglikes').dblclick().dblclick().dblclick()
  					cy.get('.blogwrapper:first').should('contain', 'toy')
  				})
  			})
  		})
  	})

  })

})