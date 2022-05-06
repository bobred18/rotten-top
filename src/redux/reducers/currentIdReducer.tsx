function currentIdReducer(state = '', action: any) {
    switch (action.type) {
        case 'SETCURRENTID':
            return action.payload;
        default:
            return state;
    }
}

export default currentIdReducer;