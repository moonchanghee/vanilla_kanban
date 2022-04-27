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

import Item from './view/Item'
import Model from './model'
import Modal from './view/Modal'

export default class controller {
    constructor() {
        this.model = new Model()
        this.onClickAddButton()
        this.onClickUpdateButton()
        this.onChangeSortSelect()
        this.onClickCloseModal()
        this.onClickUpdateModal()
        this.onClickDeleteButton()
        this.getItemList()
    }



    selectChange(){
        select.addEventListener('change',(e) => {
            let sort_name = select.options[select.selectedIndex].getAttribute("class")
            if(sort_name == "sel_high"){
                this.model.sortItemList("high")

            }else if(sort_name == "sel_low"){
                this.model.sortItemList("low")
            }
            location.reload()
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


    upDateModal(id){
        modal.addEventListener('click',(e) => {
            let data = [{
                id : id,
                item_content : modal_contents.value,
                item_title : title.value,
                item_date :  date.value,
                item_state : modal_state.options[modal_state.selectedIndex].value,
                item_priority : modal_priority.options[modal_priority.selectedIndex].text,
                item_priority_val : modal_priority.options[modal_priority.selectedIndex].getAttribute("value")
            }]

            if(e.target.className  == "succBtn"){
                this.model.updateItem(id, data[0])
                modal.classList.add('hidden');
                location.reload()
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

    updateBtn(){
        kanban_wrap.addEventListener('click',(e) => {
            if(e.target.className ==  "upbtn"){
                modal.classList.remove('hidden');
                let updateData = this.model.selectItem(e.path[1].id)
                title.value = updateData.item_title
                modal_contents.value = updateData.item_content
                date.value = updateData.item_date
                this.upDateModal(e.path[1].id)
            }
    })
    }

    deletBtn(){
            kanban_wrap.addEventListener('click',(e) => {
                    if(e.target.className ==  "delbtn"){
                        this.removeItem(e.path[1].id)
                    }})
        }

    drag_drop(){
        var pre_id
        document.body.childNodes[3].querySelectorAll(".dropzone").forEach((e) => {
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
                let data = this.model.selectItem(pre_id)
                if(data){
                    this.removeItem(pre_id)
                    data.item_state = move_state
                    this.model.insertItems(data,move_state)
                    location.reload()
                }
            })
        })
        document.body.childNodes[3].querySelectorAll(".todoItem").forEach((e) => {
            e.addEventListener("dragstart" , (e) => {
                pre_id = e.target.id
            })
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
        this.drag_drop()
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

    onClickUpdateModal(){
        this.upDateModal()
    }

    onClickDeleteButton(){
        this.deletBtn()
    }
}


























