const modal = document.querySelector('.modal');
const contents_todo = document.querySelector(".Todo");
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
import Modal from './view/Modal'
import Model from './model'
import Vc from './view/Vc'

export default class controller {
    constructor() {
        this.model = new Model()
        this.vc = new Vc()
        this.getItemList()
        this.onClickAddButton()
        this.onClickUpdateButton()
        this.onChangeSortSelect()
        this.onClickCloseModal()
    }

    getItemList(){
        this.model.getItems().forEach((e) => {
            for(let i =0 ; i<e.items.length; i++){
                this.addItems(e.items[i][0])
            }
        })
    }

    selectChange(){
        select.addEventListener('change',(e) => {
            let sort_name = select.options[select.selectedIndex].getAttribute("class")
            if(sort_name == "sel_high"){
                console.log("sel_high")
                this.model.sortItemList("high")

            }else if(sort_name == "sel_low"){
                console.log("sel_low")
                this.model.sortItemList("low")
            }
            // let removeItems = document.getElementsByClassName("todoItem")
            // for (var i = 0; i < removeItems.length; i++) {
            //     removeItems[i].remove();
            // }

            // this.getItemList()
        })
    }

    closeModal() {
        modal.addEventListener('click',(e) => {
            if(e.target.className ==  "closeBtn"){
                console.log("closeBtn")
                let state = modal_state.options[modal_state.selectedIndex].value
                let priority_val = modal_priority.options[modal_priority.selectedIndex].getAttribute("value")
                let priority = modal_priority.options[modal_priority.selectedIndex].text
                let data = [{
                    id : this.uuid(),
                    item_content : modal_contents.value,
                    item_title : title.value,
                    item_date :  date.value,
                    item_state : state,
                    item_priority : priority,
                    item_priority_val : priority_val
                }]
                const newItem = this.model.insertItems(data,state  )

                this.addItems(newItem[0])
            }else if(e.target.className ==  "updateSuccess"){
                    console.log("updatesuccess")
            }
        })
    }

    successBtn(){
        modal.addEventListener('click',(e) => {
            if(e.target.className  == "successBtn"){
                console.log("successBtn")
            }
        })
    }

    updateItem(){
        kanban_wrap.addEventListener('click',(e) => {
            if(e.target.className ==  "upbtn"){
                // modal.innerHTML = Modal(0)
                // modal.appendChild()
                // modal.classList.remove('hidden');
                let updateData = this.model.selectItem(e.path[1].id)
                title.value = updateData.item_title
                modal_contents.value = updateData.item_content
                date.value = updateData.item_date

                // let newData = [{
                //     id : updateData.id,
                //     item_content : modal_contents.value,
                //     item_title : title.value,
                //     item_date :  date.value,
                //     item_state : modal_state.options[modal_state.selectedIndex].value,
                //     item_priority : modal_priority.options.selectedIndex
                // }]
            }
            else if(e.target.className ==  "delbtn"){
                console.log(e.path[3].childNodes[1])
                // console.log("e.path[1].id",e.path[1].id)
                this.model.deleteItem(e.path[1].id)
                let del_node = document.getElementById(e.path[1].id);
                del_node.remove()
            }})
            }

    addItems(s) {
        if ("ToDo" == s.item_state) {
            this.newTodo(contents_todo, s)
        } else if ("In progress" == s.item_state) {
            this.newTodo(contents_inprogress, s)
        } else if("Done" == s.item_state) {
            this.newTodo(contents_done, s)
        }
        modal.classList.add('hidden');
    }

    newTodo (state, s) {
        let addItem = document.createElement("div")
        addItem.innerHTML = Item(s)
        state.appendChild(addItem)
        this.drag_drop()
    }

    uuid () {
        return 'xx'.replace(/[xy]/g, function(c) {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }


    drag_drop(){
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
                console.log(e)
                console.log(e.path[2].className)
                console.log(e.path[1].childNodes[1].id)
                let move_chId = e.path[1].childNodes[1].id
                let move_state = e.path[2].className

                // let pre_id =
            })
            // e.addEventListener("dragstart" , (e) => {
            //     console.log("dragstart")
            //     console.log(e.target.id)
            // })
        })

    }



    onClickAddButton(){
        this.vc.addItemBtn()
    }
    onClickUpdateButton(){
        this.updateItem()
    }
    onChangeSortSelect(){
        this.selectChange()
    }
    onClickCloseModal(){
        this.closeModal()
    }


}


























