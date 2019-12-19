import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  handleSubmit,
  handleAuthorChange,
  handleTitleChange,
  handleUrlChange,
  title,
  author,
  url
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Create new</h2>
        <p>Title <input
          value={title}
          onChange={handleTitleChange}
        /></p>
        <p>Author <input
          value={author}
          onChange={handleAuthorChange}
        /></p>
        <p>Url <input
          value={url}
          onChange={handleUrlChange}
        /></p>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default BlogForm