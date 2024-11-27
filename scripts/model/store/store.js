

let state = {
    isFormView : false,
    isDarkmode : false,
    thoughtsList : [],
    infoData : {
        image : "ff0011",
        title : "thought name",
        description : 
        `long formatted description 
         of the thought`,
    },
}

let observers = {}

export function store(){
    // 
    function subscribe(action, subscriber){
        if (!observers[action]) {
            observers[action] = []
        }
        observers[action].push(subscriber)
    }
    // 
    // function unsubscribe(action){
    //     if (!observers[action] || observers[action].length < 3) return
    //     const func = observers[action].shift()
    // }
    // 
    function publish(action, newState){
        if (!observers[action]) return
        observers[action].forEach(observer => observer(newState))
        // state = {...state, ...newState}
        console.log(action, state)
    }
    return { publish, subscribe, state }
}

