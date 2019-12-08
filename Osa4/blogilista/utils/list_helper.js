const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    function reducer(total, blog) {
        return total + blog.likes;
    } 
    
    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
} 

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    
    let index = 0
    let maxLikes = 0

    for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].likes > maxLikes) {
            index = i
            maxLikes = blogs[i].likes
        }
    }
    
    return {
        title: blogs[index].title,
        author: blogs[index].author,
        likes: blogs[index].likes
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    let most_blogs = 1;
    let match = 0;
    let name;

    for (let i = 0; i < blogs.length; i++)
    {
            for (var j = i; j < blogs.length; j++)
            {
                    if (blogs[i].author === blogs[j].author)
                        match++;
                    if (most_blogs < match)
                    {
                        most_blogs = match; 
                        name = blogs[i].author;
                    }
            }
            match = 0;
    }

    return {
        author: name,
        blogs: most_blogs
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    let most_likes = 0;
    let likes = 0;
    let name;

    for (let i = 0; i < blogs.length; i++)
    {
            for (var j = i; j < blogs.length; j++)
            {
                    if (blogs[i].author === blogs[j].author)
                        likes += blogs[j].likes;
                    if (most_likes < likes)
                    {
                        most_likes = likes; 
                        name = blogs[i].author;
                    }
            }
            likes = 0;
    }

    return {
        author: name,
        likes: most_likes
    }
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}