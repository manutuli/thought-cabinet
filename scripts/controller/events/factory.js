

import { store } from "../../model/store/store.js"
import { fetchAPI } from "../../model/model.js"
// 
export function eventsFactory(){
    const { getThoughtById, } = fetchAPI
    const { publish, dispatch } = store()
    // 
    function handleItemClick(e){
        e.preventDefault()
        const id = e.target.dataset.thoughtId
        const status = e.target.dataset.status
        // 
        if (status === "disabled") return
        const promise = getThoughtById(id)
        promise.then((info) => {
            // 
            if (!info) return
            publish("itemClick", dispatch("itemClick", {...info}))
        })
    }
    // 
    function handleSlotClick(e){
        e.preventDefault()
        const id = e.target.dataset.thoughtId
        // 
        if (!id) return
        const promise = getThoughtById(id)
        promise.then((info) => {
            // 
            if (!info) return
            publish("emptySlot", dispatch("emptySlot", {...info}))
        })
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
        const bonus = e.target.dataset.bonus
        // 
        if (!id) return
        publish("forget", dispatch("forget", {id, bonus}))
    }
    // 
    function handleSubmit(e){
        e.preventDefault()
        const formData = new FormData(e.target)
        const thought = {
            id : 2,
            name : formData.get("thoughtTitle"),
            description : formData.get("thoughtDescription"),
            image : formData.get("thoughtColor"),
            bonus : 200,
        }
        // createThought(thought)
        publish("submit", dispatch("submit", thought))
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
