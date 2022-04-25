const head_container = document.querySelector(".head-container")
const modal = document.querySelector('.modal');
const select = document.querySelector(".select")
const contents_todo = document.querySelector(".todo");
const contents_inprogress = document.querySelector(".inprogress");
const contents_done = document.querySelector(".done");
const dropzone = document.querySelectorAll(".dropzone")
const dynamicNList = document.body.childNodes;

import Item from "./Item";
import Modal from "./Modal"



export default class Vc{
    constructor() {
        this.addItemBtn()
    }


    addItemBtn(){
        head_container.addEventListener('click',(e) => {
            if(e.target.className ==  "headBtn"){
                modal.classList.remove('hidden');
            }
        })
    }

    // selectChange(){
    //     select.addEventListener('change',(e) => {
    //         let sort_name = select.options[select.selectedIndex].getAttribute("class")
    //         if(sort_name == "sel_high"){
    //             console.log("sel_high")
    //         }else if(sort_name == "sel_low"){
    //             console.log("sel_low")
    //         }
    //     })
    // }

    addItems(s){
        console.log(s)
        // if ("ToDo" == s.item_state) {
        //     this.newTodo(contents_todo, s)
        // } else if ("In progress" == s.item_state) {
        //     this.newTodo(contents_inprogress, s)
        // } else if("Done" == s.item_state) {
        //     this.newTodo(contents_done, s)
        // }
        // modal.classList.add('hidden');
    }

    // newTodo(state, s){
    //     let addItem = document.createElement("div")
    //     addItem.innerHTML = Item(s)
    //     state.appendChild(addItem)
    // }

    //         e.target.addEventListener("dragstart", (e) => {
    //             e.dataTransfer.setData("text/plain", e.target.id)
    //         });


    // drag_drop(){
    //     document.body.childNodes[3].querySelectorAll(".dropzone").forEach((e) => {
    //         e.addEventListener("dragover" , (e) => {
    //             e.preventDefault();
    //             e.target.classList.add("dropzone_active")
    //         })
    //         e.addEventListener("dragleave" , (e) => {
    //             e.target.classList.remove("dropzone_active")
    //         })
    //         e.addEventListener("drop" , (e) => {
    //             e.preventDefault();
    //             console.log("drop")
    //             e.target.classList.remove("dropzone_active")
    //             console.log(e.path[1].querySelector(".itemTodo"))
    //             console.log(e.path[1].childNodes[1].id)
    //
    //         })
    //     })
    //
    // }
}
