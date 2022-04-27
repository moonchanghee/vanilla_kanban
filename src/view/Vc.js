// // const head_container = document.querySelector(".head-container")
// // const modal = document.querySelector('.modal');
// // const select = document.querySelector(".select")
// // const contents_todo = document.querySelector(".todo");
// // const contents_inprogress = document.querySelector(".inprogress");
// // const contents_done = document.querySelector(".done");
// // const dropzone = document.querySelectorAll(".dropzone")
// // const dynamicNList = document.body.childNodes;
//
//
// import Item from "./Item";
//
// export default class Vc{
//
//     constructor() {
//         this.onClickDeleteButton()
//         this.onClickAddButton()
//     }
//
//     newTodo (state, s) {
//         let addItem = document.createElement("div")
//         addItem.classList.add('ItemDiv');
//         addItem.innerHTML = Item(s)
//         state.appendChild(addItem)
//         this.drag_drop()
//     }
//
//
//     addItemBtn(){
//         head_container.addEventListener('click',(e) => {
//             if(e.target.className ==  "headBtn"){
//                 modal.classList.remove('hidden');
//             }
//         })
//     }
//
//     deletBtn(){
//         kanban_wrap.addEventListener('click',(e) => {
//             if(e.target.className ==  "delbtn"){
//                 this.removeItem(e.path[1].id)
//             }
//         })
//     }
//
//
//     addItems(s) {
//         if ("ToDo" == s.item_state) {
//             this.newTodo(contents_todo, s)
//         } else if ("In_progress" == s.item_state) {
//             this.newTodo(contents_inprogress, s)
//         } else if("Done" == s.item_state) {
//             this.newTodo(contents_done, s)
//         }
//         modal.classList.add('hidden');
//     }
//
//
//     uuid () {
//         return 'xx'.replace(/[xy]/g, function(c) {
//             let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
//             return v.toString(16);
//         });
//     }
//
//     onClickDeleteButton(){
//         this.deletBtn()
//     }
//     onClickAddButton(){
//         this.addItemBtn()
//     }
//
// }
