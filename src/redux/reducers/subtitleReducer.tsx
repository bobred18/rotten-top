function subtitleReducer(state = '', action: any) {
    switch (action.type) {
        case 'SETSUBTITLE':
            return action.payload;
        default:
            return state;
    }
}

export default subtitleReducer;