
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
        handleForget,
        handleOpenForm,
        handleCloseForm, } = eventsFactory()
        // 
    /**
     * 
     * @param {String} type 
     * @param {String} markupID 
     * @param {String} text 
     * @returns 
     */
    function createInput(type, markupID, text){
        const wrapper = document.createElement("span")
        const input = document.createElement("input") 
        const label = document.createElement("label")
        wrapper.classList.add("form-floating")
        input.classList.add("form-control", "mb-4")
        label.classList.add("input-group-text")
        input.setAttribute("type", type)
        input.setAttribute("name", markupID)
        input.setAttribute("id", markupID)
        input.setAttribute("required", "")
        
        label.setAttribute("for", markupID)
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
    // 
    function selectSlot(){
        const slots = Array.from(document.querySelectorAll(".thought-slot.empty"))
        const slot = slots
            .sort((a, b) => a.dataset.slotId > b.dataset.slotId)
            .pop()
            // 
        return slot
    }

    // ------ sections -------
    // 
    function createSlotSection(){
        const section = document.createElement("section");
        const container = document.createElement("div")
        const forgetBtn = document.createElement("button")
        section.classList.add( "card")
        container.classList.add( "container", "thought-slots-section")
        forgetBtn.classList.add("btn", "btn-outline-danger", "forget-thought")
        forgetBtn.addEventListener("click", handleForget)
        const slots = []
        for (let i = 0; i < 12; i++) {
            const slot = createSlot()
            slot.classList.add("empty")
            slot.dataset.slotId = i+1
            slot.addEventListener("click", handleSlotClick)
            slots.push(slot)
        }
        slots.forEach(slot => container.appendChild(slot))
        section.appendChild(container)
        section.appendChild(forgetBtn)
        // actions
        function fillSlot({thoughtData}){
            const slot = selectSlot()
            const {image, name, id, bonus} = thoughtData
            // 
            if (!slot) return;
            const item = document.querySelector(`p[data-thought-id="${id}"]`)
            const title = slot.querySelector(".thought-slot-title > h6")
            const btn = document.querySelector("button.thought-info-section")
            title.textContent = name
            item.dataset.status = "disabled"
            btn.dataset.thoughtId = ""
            slot.dataset.thoughtId = id
            slot.dataset.bonus = bonus
            slot.style.backgroundColor = `${image}`    
            slot.classList.remove("empty")
        }
        // 
        function emptySlot({thoughtData}){
            const id = thoughtData.id
            // 
            if (!id) return 
            const slot = document.querySelector(`.thought-slot[data-thought-id="${id}"]`)
            const btn = document.querySelector(`button.forget-thought`)
            const bonus = slot.dataset.bonus
            btn.textContent = "Forget this thought"
            btn.dataset.thoughtId = id
            btn.dataset.bonus = bonus
            slot.dataset.bonus = 0
        }
        // 
        function forget({thoughtData}){
            const forgetBtn = document.querySelector("button.forget-thought")
            const id = forgetBtn.dataset.thoughtId
            // 
            if (!id) return 
            const slot = document.querySelector(`.thought-slot[data-thought-id="${id}"]`)
            const item = document.querySelector(`p[data-thought-id="${id}"]`)
            const title = slot.querySelector(".thought-slot-title > h6")
            const internBtn = document.querySelector("button.thought-info-section")
            forgetBtn.textContent = ""
            internBtn.textContent = ""
            title.textContent = ""
            item.dataset.status = "active"
            forgetBtn.dataset.thoughtId = ""
            forgetBtn.dataset.bonus = 0
            slot.dataset.thoughtId = ""
            slot.style.backgroundColor = `#fff`
            slot.classList.add("empty")
        }
        subscribe("fillSlot", fillSlot)
        subscribe("emptySlot", emptySlot)
        subscribe("forget", forget)
        // 
        return section
    }
    /**
     * 
     * @param {Array} thoughtsList 
     * @returns {HTMLElement} Section
     */ 
    function createListSection(thoughtsList){
        const section = document.createElement("section");
        const list = document.createElement("ul")
        const formBtn = createFormButton()
        formBtn.classList.add("btn", "btn-primary")
        formBtn.textContent = "New"
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
        // -- form-feature
        // list.appendChild(formBtn)
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
        section.classList.add("card", "thought-info-section")
        image.classList.add("card-img-top", "thought-color-block")
        title.classList.add("card-title", "thought-title-block")
        text.classList.add("card-text")
        description.classList.add("thought-info-block")
        btn.classList.add("btn", "btn-outline-warning", "thought-info-section")
        btn.addEventListener("click", handleInternalize)
        description.appendChild(text)
        section.appendChild(image)
        section.appendChild(description)
        section.appendChild(title)
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
        btn.textContent = "Create"
        form.appendChild(title)
        form.appendChild(color)
        form.appendChild(description)
        form.appendChild(btn)
        form.addEventListener("submit", handleSubmit)
        // action
        function submit({thoughtsList}){
            console.log(thoughtsList)
            // 
         }
        subscribe("submit", submit)
        // 
        return form
    }
    // 
    function createFormButton(){
        const button = document.createElement("button")
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
    /**
     * 
     * @param {Array} thoughtsList 
     * @returns {HTMLElement} Main
     */
    function gameUI(thoughtsList){
        const main = document.createElement("main")
        const slots = createSlotSection()
        const list = createListSection(thoughtsList)
        const info = createInfoSection()
        const form = createFormModal()
        info.classList.add("container", "p-5")
        list.classList.add("container", "p-5")
        slots.classList.add("container", "d-flex", "w-50", "flex-wrap")
        main.classList.add("container-fluid", "col-md")
        form.classList.add("container", "col-md")
        main.appendChild(slots)
        main.appendChild(list)
        main.appendChild(info)
        // form-feature 
        // main.appendChild(form)
        // 
        return main
    }
    // 
    function createFormModal(){
        const ui = document.createElement("dialog")
        const closeBtn = document.createElement("button")
        const form = createThoughtForm()
        closeBtn.classList.add("btn", "btn-danger")
        closeBtn.textContent = "Cancel"
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
        gameUI,
    }
}
