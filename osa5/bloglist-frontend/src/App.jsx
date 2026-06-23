import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('') 
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

     try {
      const user = await loginService.login({ username, password })
      
      window.localStorage.setItem(
       'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      console.log('wrong credentials')
      setTimeout(() => {
      }, 5000)
    }   
    
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    console.log('logging out the user ', user.name)
    window.localStorage.removeItem('loggedBlogappUser')
  }
 

  const handleCreate = async (event) => {
    event.preventDefault()

    const newBlog = {
      title:  title,
      author: author,
      url: url
    }

    const response = await blogService.create(newBlog)

    setBlogs(blogs.concat(response))
    setTitle('')
    setAuthor('')
    setUrl('')

  }

if (user === null ){
 return (
 <div>
    <h2>Log in to application</h2>
    <LoginForm 
      handleLogin = {handleLogin}
      username = {username}
      password = {password}
      setUsername = {setUsername}
      setPassword = {setPassword}
      />
 </div>
 )
}
  return (
    <div>
      <h2>blogs</h2>
      <>{user.name} logged in</>
      <button onClick={handleLogout}>logout</button>
      <p></p>
      <NewBlogForm
        handleCreate = {handleCreate}
        title = {title}
        author = {author}
        url = {url}
        setTitle = {setTitle}
        setAuthor = {setAuthor}
        setUrl = {setUrl}
        />
      <p></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App