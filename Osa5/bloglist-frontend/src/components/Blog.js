import React, { useState } from 'react'

const Blog = ({ blog, clickHandler, belongsToUser, removeHandler }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const showIfUser = { display: belongsToUser ? '' : 'none' }

  if (blogVisible === true) {
    return (
      <div className="blogContent">
        <p>----------</p>
        <h3 onClick={() => setBlogVisible(false)}>{blog.title}</h3>
        <p>{blog.author}</p>
        <p className='blogurl'>{blog.url}</p>
        <p className='bloglikes'>{blog.likes} <button onClick={clickHandler}>like</button></p>
        <p>added by {blog.user.name}</p>
        <p style={showIfUser}><button onClick={removeHandler}>remove</button></p>
        <p>----------</p>
      </div>
    )
  }

  return (
    <div className='title' onClick={() => setBlogVisible(true)}>
      {blog.title} {blog.author}
    </div>
  )
}

export default Blog