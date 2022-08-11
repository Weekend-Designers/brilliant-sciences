const initials = {
    pricing: {
        choose_a_preference: "",
        full_package: "",
        currency: "",
    },
    loggedIn: false,
}

const reducer = (state = initials, action) => {
    switch (action.type) {
        case "init platform":
            return {
                ...state,
                ...action.payload
            }
    
        default:
            return state
    }
}

export default reducer