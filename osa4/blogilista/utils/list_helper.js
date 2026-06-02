const blog = require("../models/blog")


const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    const temp = blogs.reduce((prev, curr) => {
      return (prev.likes > curr.likes ? prev : curr)
    }, {})
    return temp
}


const mostBlogs = (blogs) => {

  if (blogs.length === 0) {
    return ''
  } 

  const authors = blogs.reduce((sum, blog) => {
    if (sum[blog.author]) {
      sum[blog.author] += 1 
    } else {
      sum[blog.author] = 1   
    }    
    return sum
  }, {})

  const sorted = Object.entries(authors)
    .map(([author, count]) => ({ author, blogs: count }))
    .sort((a, b) => b.blogs - a.blogs)

    return sorted[0]

}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}