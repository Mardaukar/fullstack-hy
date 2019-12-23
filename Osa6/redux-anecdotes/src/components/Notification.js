import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  console.log(props)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const getNotification = ({ notification }) => {
  return notification
}

const mapStateToProps = (state) => {
  return {
    notification: getNotification(state), 
  }
}

export default connect(
  mapStateToProps
)(Notification)