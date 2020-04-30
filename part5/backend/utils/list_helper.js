const totalLikes = (blogs) => {
	const reducer = (sum, item) => {
		return sum + item.likes
	}
	if (blogs.length === 0	) {return 0}
	else{
		return blogs.reduce(reducer, 0)
	}
}

const favBlog = (blogs) => {
	let fav = {}
	let max = 0
	if (blogs.length === 1) {return blogs[0]}
	else{
		blogs.forEach((b) => {
			if (b.likes > max){
				fav = {...b}
				max = b.likes
			}
		})
		return fav
	}
}

const mostBlogs = (blogs) => {
	if (blogs.length === 0) {return {}}
	if (blogs.length === 1) {return {"author": blogs[0].author, "blogs": 1}}
	else{
		let countAuthors = blogs.reduce( (allAuthors, blog) => {
			if (blog.author in allAuthors){
				allAuthors[blog.author]++
			}
			else{
				allAuthors[blog.author] = 1
			}
			return allAuthors
		},{})
		// example of allAuthors
		// { 'Michael Chan': 1, 'Edsger W. Dijkstra': 2, 'Robert C. Martin': 3 }
		let author = {}
		let max = 0
		Object.keys(countAuthors).forEach((a) => {
			if (countAuthors[a] > max){
				max = countAuthors[a]
				author = {"author": a, "blogs": max}
			}
		})
		return author
	}
}

const mostLikes = (blogs) => {
	if (blogs.length === 0) {return {}}
	if (blogs.length === 1) {return {"author": blogs[0].author, "likes": blogs[0].likes}}
	else{
		let countAuthors = blogs.reduce( (allAuthors, blog) => {
			if (blog.author in allAuthors){
				allAuthors[blog.author] += blog.likes
			}
			else{
				allAuthors[blog.author] = blog.likes
			}
			return allAuthors
		},{})

		let author = {}
		let max = 0
		Object.keys(countAuthors).forEach((a) => {
			if (countAuthors[a] > max){
				max = countAuthors[a]
				author = {"author": a, "likes": max}
			}
		})
		return author
	}
}

module.exports = {
	totalLikes,
	favBlog,
	mostBlogs,
	mostLikes
}