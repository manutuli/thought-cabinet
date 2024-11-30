

let state = {
    isFormView : false,
    isDarkmode : false,
    thoughtsList : [],
    slotsList : [],
    thoughtData : {},
}

let observers = {}

function reducer(type, newState){
    switch (type) {
        case "itemClick" : {
            const {...thoughtData} = newState
            return ({...state, thoughtData})
        }
        case "internalize" : {
            const [...slotsList] = state.slotsList
            ! slotsList.includes(newState.id)  
            ? slotsList.push(newState.id)
            : null
            return ({...state, slotsList})
        }
        case "fillSlot" : {
            const [...thoughtsList] = state.thoughtsList
            ! thoughtsList.includes(newState.id)  
            ? thoughtsList.push(newState.id)
            : null
            return ({...state, thoughtsList})
        }
    }
}


export function store(){
    function dispatch(type, action){
        const newState = reducer(type, action)
        state = newState
        console.log(type, state)
        return state
    }
    // 
    function subscribe(type, subscriber){
        if (!observers[type]) {
            observers[type] = []
        }
        observers[type].push(subscriber)
    }
    // 
    // function unsubscribe(action){
    //     if (!observers[action] || observers[action].length < 3) return
    //     const func = observers[action].shift()
    // }
    // 
    function publish(type, newState){
        if (!observers[type]) return
        observers[type].forEach(observer => observer(newState))
    }
    // 
    return { publish, subscribe, dispatch, state }
}

