const addName = (name) => {
  return {
    type: 'ADD_NAME',
    payload: name
  }
}

export default {
  addName
}