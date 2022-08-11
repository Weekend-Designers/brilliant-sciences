const initials = {
    id: "",
    preview: "",
    price: "",
    published: true,
    reviews: "",
    subject: "",
    tags: [],
    thumbnail: "",
    title: "",
    traffic: "",
    author: "",
    biography: "",
    video: "",
    sections: [],
    description: [],
    assesment: [],
}

const reducer = (state = initials, action) => {
    switch (action.type) {
        case "init course":
            return {
                ...state,
                ...action.payload
            }
    
        default:
            return state
    }
}

export default reducer