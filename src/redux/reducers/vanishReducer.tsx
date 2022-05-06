function vanishReducer(state = false, action: any) {
    switch (action.type) {
        case 'SETVANISH':
            return action.payload
        default:
            return state
    }
}

export default vanishReducer;