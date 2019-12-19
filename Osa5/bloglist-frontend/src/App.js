import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import  { useField } from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([])
  //const [newTitle, setNewTitle] = useState('')
  const title = useField('text')
  //const [newAuthor, setNewAuthor] = useState('')
  const author = useField('text')
  //const [newUrl, setNewUrl] = useState('')
  const url = useField('text')
  const [errorMessage, setErrorMessage] = useState(null)
  //const [username, setUsername] = useState('')
  const username = useField('text')
  //const [password, setPassword] = useState('')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogappUser')

    } catch (exception) {
      setErrorMessage('logout failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
      //setUsername('')
      //setPassword('')
    } catch (exception) {
      username.reset()
      password.reset()
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const rows = () => blogs.sort((a, b) => a.likes - b.likes).map(blog => {
    return (
      <Blog
        key={blog.id}
        blog={blog}
        clickHandler={() => addLike(blog.id)}
        removeHandler={() => handleRemove(blog)}
        belongsToUser={blog.user.username === user.username}
      />
    )
  })

  const addLike = id => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
        console.log(returnedBlog)
      })
      .catch(() => {
        setErrorMessage(
          `Error in adding like to '${blog.title}'!`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        //setBlogs(blogs.filter(n => n.id !== id))
      })
  }

  const handleRemove = blog => {
    const confirmed = window.confirm(`Remove ${blog.title}`)

    if (confirmed) {
      blogService
        .remove(blog.id)
        .then( () => {
          blogService
            .getAll()
            .then(remainingBlogs => {
              setBlogs(remainingBlogs)
            })
          setErrorMessage(
            `${blog.title} removed succesfully`
          )
          setTimeout(() => {
            setErrorMessage('')
          }, 2000)
        })
    }
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      //title: newTitle,
      title: title.value,
      //author: newAuthor,
      author: author.value,
      //url: newUrl,
      url: url.value,
      id: blogs.length + 1,
    }

    blogService
      .create(blogObject)
      .then(data => {
        setBlogs(blogs.concat(data))
        //setNewTitle('')
        title.reset()
        //setNewAuthor('')
        author.reset()
        //setNewUrl('')
        url.reset()
        setErrorMessage('A new blog added!')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          //type="text"
          type={username.type}
          //value={username}
          value={username.value}
          //name="Username"
          //onChange={({ target }) => setUsername(target.value)}
          onChange={username.onChange}
        />
      </div>
      <div>
        password
        <input
          type={password.type}
          value={password.value}
          onChange={password.onChange}
          //type="password"
          //value={password}
          //name="Password"
          //onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>create new</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            //title={newTitle}
            title={title.value}
            //author={newAuthor}
            author={author.value}
            //url={newUrl}
            url={url.value}
            //handleTitleChange={({ target }) => setNewTitle(target.value)}
            handleTitleChange={title.onChange}
            //handleAuthorChange={({ target }) => setNewAuthor(target.value)}
            handleAuthorChange={author.onChange}
            //handleUrlChange={({ target }) => setNewUrl(target.value)}
            handleUrlChange={url.onChange}
            handleSubmit={addBlog}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  if (user === null) {
    return (
      <div className='login'>
        <Notification message={errorMessage} />
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div className='logged'>
      <Notification message={errorMessage} />
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      {blogForm()}
      <h2>Blogs</h2>
      <ul>
        {rows()}
      </ul>
    </div>
  )
}

export default App