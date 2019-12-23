import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
    return (
        <ul>
            {props.visibleAnecdotes.sort(function(a,b){return b.votes - a.votes}).map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => {
                        return (
                            props.vote(anecdote.id),
                            props.setNotification(`you voted '${anecdote.content}'`, 5)
                            //props.voteNotification(anecdote.content),
                            //setTimeout(() => {
                            //    props.removeNotification()
                            //}, 5000)
                        )
                    }
                    }
                />
            )}
        </ul>
    )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
    if ( filter === '' ) {
      return anecdotes
    }
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
}

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <li>
            {anecdote.content} has {anecdote.votes}<button onClick={handleClick}>vote</button>
        </li>
    )
}

const mapStateToProps = (state) => {
    return {
      visibleAnecdotes: anecdotesToShow(state), 
    }
  }
  
  const mapDispatchToProps = {
    vote,
    setNotification
    //voteNotification,
    //removeNotification
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AnecdoteList)