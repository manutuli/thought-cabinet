

import { store } from "../../model/store/store.js"
import { fetchAPI } from "../../model/model.js"
// 
export function eventsFactory(){
    const { getThoughtById, } = fetchAPI
    const { state, publish, dispatch } = store()
    // 
    function handleItemClick(e){
        e.preventDefault()
        const id = e.target.dataset.thoughtId
        const status = e.target.dataset.status 
        // 
        if (!id || status === "disabled") return
        const promise = getThoughtById(id)
        promise.then((info) => {
            // 
            if (!info || status === "disabled") return
            publish("itemClick", dispatch("itemClick", {...info}))
        })
    }
    // 
    function handleSlotClick(e){
        e.preventDefault()
        const id = e.target.dataset.thoughtId
        // 
        if (!id) return
        publish("emptySlot", id)
    }
    // 
    function handleInternalize(e){
        e.preventDefault()
        const id = e.target.dataset.thoughtId
        // 
        if (!id) return
        const promise = getThoughtById(id)
        promise.then((info) => {
            // 
            if (!info) return
            publish("fillSlot", dispatch("fillSlot", {...info}))
        })
    }
    // 
    function handleForget(e){
        e.preventDefault()
        const id = e.target.dataset.thoughtId
        // 
        if (!id) return
        publish("forget", id)
    }
    // 
    function handleSubmit(e){
        e.preventDefault()
        const formData = new FormData(e.target)
        console.log(formData)
        // const thought = {
        //     name : formData.get("thoughtTitle"),
        //     description : formData.get("thoughtDescription"),
        //     image : formData.get("thoughtColor"),
        // }
        // const thoughtsList = []
        // thoughtsList.push(thought)
        // publish("submit", {thoughtsList : thoughtsList})
        publish("closeForm", {isFormView : false})
    }
    // 
    function handleCloseForm(e){
        e.preventDefault()
        publish("closeForm", {isFormView : false})
    }
    // 
    function handleOpenForm(e){
        e.preventDefault()
        publish("openForm", {isFormView : true})
    }
    // 
    return {
        handleItemClick,
        handleSlotClick, 
        handleInternalize, 
        handleForget, 
        handleSubmit,
        handleOpenForm,
        handleCloseForm,
    }
}
