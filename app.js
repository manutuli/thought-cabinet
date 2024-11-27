
import { store } from './scripts/model/store/store.js'
import { authAdminUser } from './utils/auth.js'
import {componentsFactory} from './scripts/views/components/factory.js'
import { fetchAPI } from './scripts/model/model.js'
//
export default function app() {
    const { publish, subscribe, state } = store()
    const { infoData, isFormView, } = state
    const { gameUI } = componentsFactory()
    const { getThoughtsList } = fetchAPI
    // 
    const root = document.getElementById("root")
    const promise = getThoughtsList()
    promise.then( (value) => {
        // subscribe("initState", (state) => null)
        // publish("initState", {...state, thoughtsList : [...value]})
        // console.log(value)
        return root.appendChild(gameUI(value)) 
    })
}
