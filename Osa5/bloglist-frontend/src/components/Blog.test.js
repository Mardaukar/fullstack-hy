import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

test('at start info not shown', () => {
  const blog = {
    title: 'Blog title',
    author: 'Blog author',
    url: 'Blog url',
    likes: 10
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Blog title'
  )

  expect(component.container).toHaveTextContent(
    'Blog title'
  )

  expect(component.container).not.toHaveTextContent(
    'Blog url'
  )

  expect(component.container).not.toHaveTextContent(
    'Blog has 10 likes'
  )
})

test('info shown when clicked', () => {
  const blog = {
    title: 'Blog title',
    author: 'Blog author',
    url: 'Blog url',
    likes: 10,
    user: {
      name: 'user'
    }
  }

  const component = render(
    <Blog blog={blog} belongsToUser={false} />
  )

  const button = component.container.querySelector('.title')
  fireEvent.click(button)

  const url = component.container.querySelector('.blogurl')
  const likes = component.container.querySelector('.bloglikes')

  expect(url).toHaveTextContent(
    'Blog url'
  )

  expect(likes).toHaveTextContent(
    '10 '
  )
})