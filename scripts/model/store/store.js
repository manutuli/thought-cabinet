

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
            // 
            return ({...state, thoughtData})
        }
        case "fillSlot" : {
            let [...slotsList] = state.slotsList
            console.log({...state, slotsList})
            // 
            let temp;
             !slotsList.includes(parseInt(newState.id))  
            ? temp = parseInt(newState.id)
            : temp = null
            // slotsList.push(temp) 
            slotsList = slotsList.map((n) => n === parseInt(newState.id) ? n = temp : n = n)
            console.log({...state, slotsList})
            // 
            return ({...state, slotsList})
        }
    }
}


export function store(){
    function dispatch(type, action){
        const newState = reducer(type, action)
        state = newState
        // console.log(type, state)
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

