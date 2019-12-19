const blogs = [
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'Title of blog',
    author: 'Author of blog',
    url: 'Url of blog',
    likes: 1,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  },
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'Title of blog 2',
    author: 'Author of blog 2',
    url: 'Url of blog 2',
    likes: 2,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  },
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }