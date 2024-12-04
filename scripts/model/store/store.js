

let state = {
    isFormView : false,
    isDarkmode : false,
    thoughtsList : [],
    slotsList : [],
    thoughtData : {},
    score : 0
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
            let score = state.score
            score += newState.bonus
            let [...slotsList] = state.slotsList
            let temp;
             !slotsList.includes(parseInt(newState.id))  
            ? temp = parseInt(newState.id)
            : temp = null
            slotsList = slotsList.map(
                (n) => n === parseInt(newState.id) 
                ? n = temp 
                : n = n
            )
            // 
            console.log("score : ", score)
            return ({...state, slotsList, score})
        }
        case "emptySlot" : {
            // return 
            return ({...state})
        }
        case "forget" : {
            let score = state.score
            score = score - parseInt(newState.bonus)
            let [...slotsList] = state.slotsList
            // 
            console.log("score : ", score)
            return ({...state, slotsList, score})
        }
        case "submit" : {
            let [...thoughtsList] = state.thoughtsList
            newState.id += thoughtsList.length 
            thoughtsList.push(newState)
            // 
            return ({...state, thoughtsList})
        }
    }
}


export function store(){
    // 
    function dispatch(type, data){
        const newState = reducer(type, data)
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

