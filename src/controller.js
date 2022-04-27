const modal = document.querySelector('.modal');
const contents_todo = document.querySelector(".ToDo");
const head_container = document.querySelector(".head-container")
const contents_inprogress = document.querySelector(".In_progress");
const contents_done = document.querySelector(".Done");
const modal_state = document.querySelector("#modal-state")
const modal_priority = document.querySelector("#modal-priority")
const modal_contents = document.querySelector("#modal-conents")
const title = document.querySelector("#title")
const date = document.querySelector("#date")
const kanban_wrap = document.querySelector(".kanban_wrap")
const select = document.querySelector(".select")
const dropzone = document.querySelectorAll(".dropzone")

import Item from './view/Item'
import Model from './model'
import Modal from './view/Modal'

export default class controller {
    constructor() {
        this.model = new Model()
        this.modal_id
        this.drop_id
        this.addEvent()
        this.onClickAddButton()
        this.onClickUpdateButton()
        this.onChangeSortSelect()
        this.onClickCloseModal()
        this.upDateModal()
        this.onClickDeleteButton()
        this.getItemList()
        this.onRerender()
    }


    addEvent(){
        dropzone.forEach(e => {
            this.dropzoneAddEvent(e)
        })
    }

    selectChange(){
        select.addEventListener('change',(e) => {
            let sort_name = select.options[select.selectedIndex].getAttribute("class")
            if(sort_name == "sel_high"){
                this.model.sortItemList("high")

            }else if(sort_name == "sel_low"){
                this.model.sortItemList("low")
            }
            this.onRerender()
        })
    }

    closeModal() {
        modal.addEventListener('click',(e) => {
            let state = modal_state.options[modal_state.selectedIndex].value
            let data = [{
                id : this.uuid(),
                item_content : modal_contents.value,
                item_title : title.value,
                item_date :  date.value,
                item_state : modal_state.options[modal_state.selectedIndex].value,
                item_priority : modal_priority.options[modal_priority.selectedIndex].text,
                item_priority_val : modal_priority.options[modal_priority.selectedIndex].getAttribute("value")
            }]

            if(e.target.className ==  "closeBtn"){
                this.model.insertItems(data[0],state)
                this.addItems(data[0])
                modal.classList.add('hidden');
            }
        })
    }

    updateBtn(){
        kanban_wrap.addEventListener('click',(e) => {
            if(e.target.className ==  "upbtn"){
                modal.classList.remove('hidden');
                let updateData = this.model.selectItem(e.path[1].id)
                title.value = updateData.item_title
                modal_contents.value = updateData.item_content
                date.value = updateData.item_date
                modal_priority.options[modal_priority.selectedIndex].text = updateData.item_priority
                modal_state.options[modal_state.selectedIndex].text = updateData.item_state
                this.modal_id = e.path[1].id
            }
        })
    }

    upDateModal(){
        modal.addEventListener('click',(e) => {
            let data = [{
                id : this.modal_id,
                item_content : modal_contents.value,
                item_title : title.value,
                item_date :  date.value,
                item_state : modal_state.options[modal_state.selectedIndex].value,
                item_priority : modal_priority.options[modal_priority.selectedIndex].text,
                item_priority_val : modal_priority.options[modal_priority.selectedIndex].getAttribute("value")
            }]
            if(e.target.className  == "testUpBtn"){
                this.model.updateItem(this.modal_id, data[0])
                this.onRerender()
                modal.classList.add('hidden');

            }
        })
    }

    addItemBtn(){
        head_container.addEventListener('click',(e) => {
            if(e.target.className ==  "headBtn"){
                modal.classList.remove('hidden');
            }
        })
    }


    deletBtn(){
            kanban_wrap.addEventListener('click',(e) => {
                    if(e.target.className ==  "delbtn"){
                        this.removeItem(e.path[1].id)
                    }})
    }

    dragStart(node){
        node.childNodes[1].addEventListener("dragstart" , (e) => {
            this.drop_id = e.target.id
        })
        this.dropzoneAddEvent(node.childNodes[3])
    }


    dropzoneAddEvent(e){
        e.addEventListener("dragover" , (e) => {
            e.preventDefault();
            e.target.classList.add("dropzone_active")
        })
        e.addEventListener("dragleave" , (e) => {
            e.target.classList.remove("dropzone_active")
        })
        e.addEventListener("drop" , (e) => {
            e.preventDefault();
            e.target.classList.remove("dropzone_active")
            var move_state = e.path[0].id
            let pre_id = this.drop_id
            let data = this.model.selectItem(pre_id)
            if(data){
                this.removeItem(pre_id)
                data.item_state = move_state
                this.model.insertItems(data, move_state)
                this.addItems(data)
            }
        })

    }


    getItemList(){
        this.model.getItems().forEach((e) => {
            for(let i =0 ; i<e.items.length; i++){
                this.addItems(e.items[i])
            }
        })
    }

    removeItem(e){
         let del_parentNode = document.getElementById(e).parentNode
         if(del_parentNode){
             this.model.deleteItem(e)
             del_parentNode.remove()
         }
    }
    addItems(s) {
        if ("ToDo" == s.item_state) {
            this.newTodo(contents_todo, s)
        } else if ("In_progress" == s.item_state) {
            this.newTodo(contents_inprogress, s)
        } else if("Done" == s.item_state) {
            this.newTodo(contents_done, s)
        }
    }

    newTodo (state, s) {
        let addItem = document.createElement("div")
        addItem.innerHTML = Item(s, s.item_state)
        state.appendChild(addItem)
        this.dragStart(state.appendChild(addItem))
    }

    uuid () {
        return 'xx'.replace(/[xy]/g, function(c) {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }



    onClickAddButton(){
        this.addItemBtn()
    }

    onClickUpdateButton(){
        this.updateBtn()
    }

    onChangeSortSelect(){
        this.selectChange()
    }

    onClickCloseModal(){
        this.closeModal()
    }

    onClickDeleteButton(){
        this.deletBtn()
    }

    onRerender(){
        contents_todo.innerHTML = ""
        contents_done.innerHTML = ""
        contents_inprogress.innerHTML = ""
        this.getItemList()
    }
}