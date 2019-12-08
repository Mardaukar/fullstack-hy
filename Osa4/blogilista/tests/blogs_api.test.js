const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'SuperBlog',
    author: 'SuperMan',
    url: 'www.super.com',
    likes: 100
  },
  {
    title: 'Sloppy seconds',
    author: 'Sloppy Joe',
    url: 'www.slop.com',
    likes: 1000
  },
]

const initialUsers = [
  {
    username: "mluukkai",
    name: "lukkainen",
    password: "salainen"
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()

  userObject = new User(initialUsers[0])
  await userObject.save()
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body.length).toBe(initialBlogs.length)
})

test('id is found', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added ', async () => {
    const newBlog = {
        title: 'Added blog',
        author: 'Black Adder',
        url: 'www.ba.com',
        likes: 1
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(r => r.title)
  
    expect(response.body.length).toBe(initialBlogs.length + 1)
    expect(titles).toContain(
      'Added blog'
    )
})

test('likes is set to zero by default ', async () => {
    await Blog.deleteMany({})
    
    const newBlog = {
        title: 'Blog without likes',
        author: 'Sir Noonelikesalot',
        url: 'www.none.com'
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    expect(response.body[0].likes).toBe(0)
})

test('a blog can not be added without title and url ', async () => {
    const noTitleBlog = {
        author: 'Titleless',
        url: 'www.notitle.com',
        likes: 1
    }

    const noUrlBlog = {
        title: 'Blog wihtout URL',
        author: 'Urless',
        likes: 1
    }
  
    await api
      .post('/api/blogs')
      .send(noTitleBlog)
      .expect(400)
    
    await api
      .post('/api/blogs')
      .send(noUrlBlog)
      .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length)
})

test('a valid user can be added ', async () => {
  const newUser = {
    username: "herkules",
    name: "perkules",
    password: "kryptokles"
}

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/users')

  const usernames = response.body.map(r => r.username)

  expect(response.body.length).toBe(initialUsers.length + 1)
  expect(usernames).toContain(
    'herkules'
  )
})

test('a user can not be added without valid username and password ', async () => {
  const noUsernameUser = {
      name: 'No username here',
      password: '12345'
  }

  const noPasswordUser = {
      name: 'No password here',
      username: 'Passwordless'
  }

  const tooShortUsername = {
    username: 'xx',
    name: 'Short username here',
    password: '12345'
  }

  const tooShortPassword = {
    username: 'xxxxx',
    name: 'Short password here',
    password: '12'
  }

  await api
    .post('/api/users')
    .send(noUsernameUser)
    .expect(400)
  
  await api
    .post('/api/users')
    .send(noPasswordUser)
    .expect(400)
  
  await api
    .post('/api/users')
    .send(tooShortUsername)
    .expect(400)
  
  await api
    .post('/api/users')
    .send(tooShortPassword)
    .expect(400)

  const response = await api.get('/api/users')
  expect(response.body.length).toBe(initialUsers.length)
})

test('a user can not be added without unique username ', async () => {
  const notUniqueUser = {
    username: "mluukkai",
    name: "lukkai",
    password: '12345'
  }

  await api
    .post('/api/users')
    .send(notUniqueUser)
    .expect(400)

  const response = await api.get('/api/users')
  expect(response.body.length).toBe(initialUsers.length)
})

afterAll(() => {
  mongoose.connection.close()
})