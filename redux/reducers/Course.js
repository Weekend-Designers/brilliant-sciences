const initials = {
    id: "",
    preview: "",
    price: "",
    published: true,
    reviews: "pysViWHMQksO0KM79HxX",
    subject: "",
    tags: [],
    thumbnail: "",
    title: "Title",
    traffic: "",
    author: "Admin",
    biography: "Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing",
    video: "/spykids4.mp4",
    sections: [{
        stamp: 1,
        title: "Section One",
    },{
        stamp: 33,
        title: "Section Two",
    },{
        stamp: 77,
        title: "Section Three",
    },{
        stamp: 95,
        title: "Section Four",
    }],
    description: [{
        title: "About the Video",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing",
    },{
        title: "Notes",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing",
    },{
        title: "Reference",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing",
    }],
    assesment: [{
        question: "Hello, world",
        options: ["hi", "hey", "what up?", "hello"]
    },{
        question: "Hi there, world",
        options: ["hello", "hey", "greetings"]
    }],
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