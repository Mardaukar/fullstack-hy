import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
//import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value=''
        //const newAnecdote = await anecdoteService.createNew(content)
        props.createAnecdote(content)
        props.setNotification(`created: '${content}'`, 5)
        //props.createNotification(content)
        //setTimeout(() => {
        //    props.removeNotification()
        //}, 5000)
    }
  
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default connect(
    null,
    { createAnecdote, setNotification }
  )(AnecdoteForm)