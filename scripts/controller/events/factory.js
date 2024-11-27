

import { store } from "../../model/store/store.js"
import { fetchAPI } from "../../model/model.js"
// 
export function eventsFactory(){
    const { getThoughtById, } = fetchAPI
    const { state, publish } = store()
        // 
    function handleItemClick(e){
        e.preventDefault()
        const id = e.target.dataset.thoughtId
        console.log("id : ", id)
        const promise = getThoughtById(id)
        // action
        promise.then((info) => {
            publish("itemClick", {...info})
        })
    }
    // 
    function handleSlotClick(e){
        e.preventDefault()
        console.log(e.target)
        // if (slot is empty) return
    }
    // 
    function handleInternalize(e){
        e.preventDefault()
        console.log(e.target)
        // document.querySelector("thought-")
        // e.target.replaceWith() 
    }
    // 
    function handleForget(e){
        e.preventDefault()
        console.log(e.target)
        // document.querySelector("thought-")
        // e.target.replaceWith() 
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
        publish("closeForm", {...state, isFormView : false})
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
