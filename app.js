
import { store } from './scripts/model/store/store.js'
import { authAdminUser } from './utils/auth.js'
import {componentsFactory} from './scripts/views/components/factory.js'
import { fetchAPI } from './scripts/model/model.js'
//
export default function app() {
    const { publish, subscribe, dispatch, state } = store()
    // const { infoData, isFormView, } = state
    const { gameUI } = componentsFactory()
    const { getThoughtsList } = fetchAPI
    const root = document.getElementById("root")
    // console.log(authAdminUser("user"))
    // 
    function initState({thoughtsList}){
        thoughtsList.forEach((obj) => {
            localStorage.setItem(obj.id, JSON.stringify(obj))
        })
    }
    const promise = getThoughtsList()
    promise.then( (value) => {
        subscribe("initState", initState)
        publish("initState", dispatch("initState", [...value]))
        // 
        return root.appendChild(gameUI(value)) 
    })
}
