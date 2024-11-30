
import { store } from "../../model/store/store.js"
import { eventsFactory } from "../../controller/events/factory.js"
// 
export function componentsFactory(){
    const { subscribe } = store()
        // 
    const { 
        handleSubmit, 
        handleInternalize, 
        handleItemClick, 
        handleSlotClick,
        handleOpenForm,
        handleCloseForm, } = eventsFactory()
        // 
    function createInput(type, nameid, text){
        const wrapper = document.createElement("span")
        const input = document.createElement("input") 
        const label = document.createElement("label")
        wrapper.classList.add("form-floating")
        input.classList.add("form-control", "mb-4")
        label.classList.add("input-group-text")
        input.setAttribute("type", type)
        input.setAttribute("name", nameid)
        input.setAttribute("id", nameid)
        input.setAttribute("required", "")
        
        label.setAttribute("for", nameid)
        label.textContent = text
        wrapper.appendChild(label)
        wrapper.appendChild(input)
        // 
        return wrapper
    }
    // 
    function createSlot(){
        const slot = document.createElement("article")
        const span = document.createElement("div")
        const title = document.createElement("h6")
        slot.classList.add("thought-slot")
        span.classList.add("thought-slot-title")
        span.appendChild(title)
        slot.appendChild(span)
        // 
        return slot
    }
    function selectSlot(){
        const slots = Array.from(document.querySelectorAll(".thought-slot.empty"))
        const slot = slots
            .sort((a, b) => a.dataset.slotId > b.dataset.slotId)
            .pop()
        return slot
    }

    // ------ sections -------
    // 
    function createSlotSection(){
        const section = document.createElement("section");
        section.classList.add("thought-slots-section")
        const slots = []
        for (let i = 0; i < 8; i++) {
            const slot = createSlot()
            slot.classList.add("empty")
            slot.dataset.slotId = i+1
            // event 
            slot.addEventListener("click", handleSlotClick)
            slots.push(slot)
        }
        slots.forEach(slot => section.appendChild(slot))
        // action
        function fillSlot({thoughtData, slotsList}){
            const {image, name, id} = thoughtData
            const slot = selectSlot()
            console.log(slotsList.includes(id))
            if (!slot) return;
            // if (slotsList.includes(id)) return;
            const title = slot.querySelector(".thought-slot-title > h6")
            title.textContent = name
            // slot.dataset.id = id
            slot.style.backgroundColor = `${image}`    
            slot.classList.remove("empty")
        }
        subscribe("fillSlot", fillSlot)
        // 
        return section
    }
    // 
    function createListSection(thoughtsList){
        const section = document.createElement("section");
        const list = document.createElement("ul")
        list.classList.add("list-group", "thoughts-list")
        thoughtsList.forEach((thought) => {
            const item = document.createElement("li")
            const title = document.createElement("p")
            title.textContent = thought.name
            item.appendChild(title)
            item.classList.add("list-group-item", "thoughts-list-item")
            // event 
            title.dataset.thoughtId = thought.id
            title.addEventListener("click", handleItemClick)
            list.appendChild(item)
        })
        // action 
        function itemClick({thoughtData}){
            const {image, id, description, name} = thoughtData
            const img = document.querySelector(".thought-color-block")
            const button = document.querySelector("button.thought-info-section")
            const title = document.querySelector(".thought-info-block")
            const text = document.querySelector(".thought-title-block")
            button.textContent = "Internalize this thought."
            button.dataset.thoughtId = id
            img.style.backgroundColor = `${image}`
            title.textContent = name
            text.textContent = description
        }
        subscribe("itemClick", itemClick)
        section.appendChild(list)
        // 
        return section
    }
    // 
    function createInfoSection(){
        const section = document.createElement("section");
        const image = document.createElement("div")
        const title = document.createElement("h3")
        const text = document.createElement("p")
        const description = document.createElement("div")
        const btn = document.createElement("button")
        // action 
        subscribe("internalize", (state)=> {
            // 
        })
        section.classList.add("card", "thought-info-section")
        image.classList.add("card-img-top", "thought-color-block")
        title.classList.add("card-title", "thought-title-block")
        description.classList.add("card-text", "thought-info-block")
        btn.classList.add("btn", "btn-outline-warning", "thought-info-section")
        // 
        btn.addEventListener("click", handleInternalize)
        description.appendChild(text)
        section.appendChild(image)
        section.appendChild(title)
        section.appendChild(description)
        section.appendChild(btn)
        // 
        return section
    }

    // --------- form --------
    // 
    function createThoughtForm(){
        const form = document.createElement("form");
        const btn = document.createElement("button");
        const title = createInput("text", "thoughtTitle", "Give a title to your thought.") 
        const description = createInput("textarea", "thoughtDescription", "Describe your thought.") 
        const color = createInput("color", "thoughtColor", "Choose a color for your thought.") 
        btn.setAttribute("type", "submit")
        form.classList.add("container",  "new-thought-form")
        btn.classList.add("btn", "btn-outline-primary", "new-thought-btn")
        title.classList.add("container")
        color.classList.add("container")
        description.classList.add("container")
        form.appendChild(title)
        form.appendChild(color)
        form.appendChild(description)
        form.appendChild(btn)
        // event 
        form.addEventListener("submit", handleSubmit)
        // action
        function submit(state){
            // if (formData)
         }
        subscribe("submit", submit)
        // 
        return form
    }
    // 
    function createFormButton(){
        const button = document.createElement("button")
        // event
        button.addEventListener("click", handleOpenForm)
        // action 
        function openForm(currentState){
            const dialog = document.querySelector("dialog")
            dialog.setAttribute("open", "")
            currentState = true
        }
        subscribe("openForm", openForm)
        // 
        return button 
    }
    // 
    function gameUI(thoughtsList){
        const main = document.createElement("main")
        const slots = createSlotSection()
        const list = createListSection(thoughtsList)
        const info = createInfoSection()
        const button = createFormButton()
        const form = createFormModal()
        button.classList.add("btn", "btn-outline-primary")
        info.classList.add("container", "p-5")
        list.classList.add("container", "p-5")
        slots.classList.add("container", "d-flex", "w-50", "flex-wrap")
        main.classList.add("container-fluid", "col-md")
        list.appendChild(button)
        main.appendChild(slots)
        main.appendChild(list)
        main.appendChild(info)
        main.appendChild(form)
        // 
        return main
    }
    // 
    function createFormModal(){
        const ui = document.createElement("dialog")
        const closeBtn = document.createElement("button")
        const form = createThoughtForm()
        closeBtn.classList.add("btn", "btn-danger")
        closeBtn.addEventListener("click", handleCloseForm)
        ui.appendChild(closeBtn)
        ui.appendChild(form)
        // action
        function closeForm(currentState){
            const dialog = document.querySelector("dialog[open]")
            dialog.removeAttribute("open")
            currentState = false
        }
        subscribe("closeForm", closeForm)
        // 
        return ui
    }
    // 
    return {
        createSlotSection, 
        createListSection, 
        createInfoSection,
        createThoughtForm,
        createFormButton,
        // createFormModal,
        gameUI,
    }
}
