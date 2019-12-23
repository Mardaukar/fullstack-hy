export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: content,
    })
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
      })
    }, time*1000)
  }
}
/*
const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}
*/
const notificationReducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.data
      case 'REMOVE_NOTIFICATION':
        return ""
      default:
        return state
    }
}
  
export default notificationReducer