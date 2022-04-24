const modal = document.querySelector('.modal');
const contents_todo = document.querySelector(".todo");
const contents_inprogress = document.querySelector(".inprogress");
const contents_done = document.querySelector(".done");
const modal_state = document.querySelector("#modal-state")
const modal_priority = document.querySelector("#modal-priority")
const modal_contents = document.querySelector("#modal-conents")
const title = document.querySelector("#title")
const date = document.querySelector("#date")
const kanban_wrap = document.querySelector(".kanban_wrap")
const head_container = document.querySelector(".head-container")
const select = document.querySelector(".select")
import Item from './view/Item'
import Modal from './view/Modal'
import Model from './model'

export default class controller {
    constructor() {
        this.model = new Model()
        this.getItemList()
        this.addEvent()
    }

    getItemList(){
        this.model.getItems().forEach((e) => {
            addItems(e[0])
        })
    }
    addEvent() {
        head_container.addEventListener('click',(e) => {
            if(e.target.className ==  "headBtn"){
                modal.classList.remove('hidden');
            }
        })
        kanban_wrap.addEventListener('click',(e) => {
            if(e.target.className ==  "upbtn"){
                modal.classList.remove('hidden');
                let updateData = this.model.selectItem(e.path[1].id)
                console.log(updateData)
                title.value = updateData.item_title
                modal_contents.value = updateData.item_content
                date.value = updateData.item_date

                let newData = [{
                    id : updateData.id,
                    item_content : modal_contents.value,
                    item_title : title.value,
                    item_date :  date.value,
                    item_state : modal_state.options[modal_state.selectedIndex].value,
                    item_priority : modal_priority.options.selectedIndex
                }]
                console.log(newData)
                // this.model.updateItem(updateData.id , newData)
            }
                else if(e.target.className ==  "delbtn"){
                this.model.deleteItem(e.path[1].id)
                let del_node = document.getElementById(e.path[1].id);
                del_node.remove()

            }
        })
        modal.addEventListener('click',(e) => {
            if(e.target.className ==  "closeBtn"){
                let state = modal_state.options[modal_state.selectedIndex].value
                let priority = modal_priority.options[modal_priority.selectedIndex].text
                let priority_val = modal_priority.options[modal_priority.selectedIndex].getAttribute("value")

                let data = [{
                    id : uuid(),
                    item_content : modal_contents.value,
                    item_title : title.value,
                    item_date :  date.value,
                    item_state : state,
                    item_priority : priority,
                    item_priority_val : priority_val
                }]
                const newItem = this.model.insertItems(data)
                addItems(newItem[0])
            }
        })
        select.addEventListener('change',(e) => {
            let sort_name = select.options[select.selectedIndex].getAttribute("class")
            if(sort_name == "sel_high"){
                console.log("sel_high")
            }else if(sort_name == "sel_low"){
                console.log("sel_low")
            }
        })

            // document.body.addEventListener('mouseover',function(e) {
            //     if (e.target.className == "todoItem") {
            //         e.target.addEventListener("dragstart", (e) => {
            //             e.dataTransfer.setData("text/plain", e.target.id)
            //         });
            //     }
            //     if (e.target.className == "dropzone") {
            //         console.log("dropzone")
            //         e.target.addEventListener("dragover", e => {
            //             console.log("dragover")
            //             e.preventDefault();
            //             e.target.classList.add("dropzone_active");
            //         });
            //         e.target.addEventListener("dragleave", () => {
            //             console.log("dragleave")
            //             e.target.classList.remove("dropzone_active");
            //         });
            //         e.target.addEventListener("drop", e => {
            //             e.preventDefault();
            //             console.log("drop")
            //             e.target.classList.remove("dropzone_active");
            //         });
            //     }
            // },false);
    }
}
const addItems = (s) => {
    if ("ToDo" == s.item_state) {
        newTodo(contents_todo, s)
    } else if ("In progress" == s.item_state) {
        newTodo(contents_inprogress, s)
    } else if("Done" == s.item_state) {
        newTodo(contents_done, s)
    }
    modal.classList.add('hidden');
}
const newTodo = (state, s) => {
    let addItem = document.createElement("div")
    addItem.innerHTML = Item(s)
    state.appendChild(addItem)
}
const uuid = () => {
    return 'xx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

















