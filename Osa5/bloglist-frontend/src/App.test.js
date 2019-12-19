import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,  waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  let component

  beforeEach(() => {
    component = render(
      <App />
    )
  })

  test('if no user logged, notes are not rendered', async () => {
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    expect(component.container).toHaveTextContent('Log in')
    expect(component.container).not.toHaveTextContent(
      'Url of blog'
    )
  })

  test('renders all blogs when logged in', async () => {

    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    component.rerender(<App />)

    component.debug()

    await waitForElement(
      () => component.getByText('create')
    )

    const blogs = component.container.querySelectorAll('.blogContent')
    expect(blogs.length).toBe(2)

    expect(component.container).toHaveTextContent(
      'Author of blog'
    )
    expect(component.container).toHaveTextContent(
      'Title of blog 2'
    )
  })
})