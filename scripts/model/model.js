
// import { state, subscribe, publish } from "./store/store.js"

export const fetchAPI = {
    getThoughtById : async function (id) {
        const request = "./scripts/model/store/data.json"
        try {
            const res = await fetch(request)
            const data = await res.json()
            const array = data.filter(obj => obj.id == id)
            return array[0] 
        } catch (error) {
            return error ? error : null
        }
    },
    getThoughtsList : async function (){
        const request = "./scripts/model/store/data.json"
        try {
            const res = await fetch(request)
            return await res.json()
        } catch (error) {
            return error ? error : null
        }
    },
    // read 
    // write 
    // update 
    // delete 
}
