const initials = {
    username: '',
    email: '',
    theme: '',
    loggedIn: false,
}

const reducer = (state = initials, action) => {
    switch (action.type) {
        case "init user":
            return {
                ...state,
                ...action.payload
            }
    
        default:
            return state
    }
}

export default reducer