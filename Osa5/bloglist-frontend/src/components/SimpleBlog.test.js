import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const simpleblog = {
    title: 'Simpleblog title',
    author: 'Simpleblog author',
    likes: 0
  }

  const component = render(
    <SimpleBlog blog={simpleblog} />
  )

  expect(component.container).toHaveTextContent(
    'Simpleblog title'
  )

  expect(component.container).toHaveTextContent(
    'Simpleblog author'
  )

  expect(component.container).toHaveTextContent(
    'blog has 0 likes'
  )
})

test('clicking likes twice inceases likes by two', async () => {
  const simpleblog = {
    title: 'Simpleblog title',
    author: 'Simpleblog author',
    likes: 0
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={simpleblog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})