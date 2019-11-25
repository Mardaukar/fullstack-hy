import React from 'react';

const Course = ({course}) => {
    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

const Header = ({name}) => {
    return (
        <>
            <h1>{name}</h1>
        </>
    )
}

const Content = ({parts}) => {
    return (
        <>
            {parts.map(part => <Part key={part.id} part={part} /> )}
        </>
    )
}

const Total = ({parts}) => {
    return(
        <>
            {parts.reduce((t, {exercises}) => t + exercises, 0)}
        </>
    )
}

const Part = ({part}) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

export default Course