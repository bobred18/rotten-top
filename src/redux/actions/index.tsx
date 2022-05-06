export function setVanish(boolean: boolean) {
    return {
        type: 'SETVANISH',
        payload: boolean
    }
}

export function setCurrentId(string: string) {
    return {
        type: 'SETCURRENTID',
        payload: string
    }
}

export function setSubtitle(string: string) {
    return {
        type: 'SETSUBTITLE',
        payload: string
    }
}