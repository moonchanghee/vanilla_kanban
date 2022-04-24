const modal = document.querySelector('.modal');
const contents_todo = document.querySelector(".todo");
const contents_inprogress = document.querySelector(".inprogress");
const contents_done = document.querySelector(".done");
const headerBtn = document.querySelector(".headBtn")
const closeBtn = document.querySelector(".closeBtn")
const modal_state = document.querySelector("#modal-state")
const modal_priority = document.querySelector("#modal-priority")


import Item from './view/Item'

export default class controller {

    constructor() {
        this.addEvent()
    }

    addEvent() {
        headerBtn.addEventListener('click', () => {
            modal.classList.remove('hidden');
        })
        closeBtn.addEventListener('click', (e) => {
            console.log(modal_priority.options)
            let state = modal_state.options[modal_state.selectedIndex].value
            let priority = modal_priority.options.selectedIndex
            console.log("priority", priority)
            addItems(state)
        })
        let count = 1
        const addItems = (s) => {
            if ("ToDo" == s) {
                newTodo(contents_todo, count)
            } else if ("In progress" == s) {
                newTodo(contents_inprogress, count)
            } else {
                newTodo(contents_done, count)
            }
            modal.classList.add('hidden');
        }
        const newTodo = (state, id) => {
            console.log("count", count)
            let addItem = document.createElement("div")
            addItem.innerHTML = Item(id)
            state.appendChild(addItem)
            count++
        }

        document.body.onclick = (e) => {
            if (e.target.className == "addbtn") {
                console.log("asdf")
            }
        }

        document.body.addEventListener('mouseover',function(e) {
            if (e.target.className == "add") {
                e.target.addEventListener("dragstart", (e) => {
                    console.log(e)
                    e.dataTransfer.setData("text/plain", e.target.id)
                });
            }
            if (e.target.className == "dropzone") {
                e.target.addEventListener("dragover", e => {
                    console.log("dragover")
                    e.preventDefault();
                    e.target.classList.add("kanban__dropzone--active");
                });
                e.target.addEventListener("dragleave", () => {
                    console.log("dragleave")
                    e.target.classList.remove("kanban__dropzone--active");
                });


                e.target.addEventListener("drop", e => {
                    e.preventDefault();
                    console.log("dragleave")
                    dropZone.classList.remove("kanban__dropzone--active");

                });
            }


        },false);

    }
}

