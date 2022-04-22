const modal = document.querySelector('.modal');
const contents_todo = document.querySelector(".todo");
const contents_inprogress = document.querySelector(".inprogress")
const contents_done = document.querySelector(".done")
const headerBtn = document.querySelector(".headBtn")


import Item from './view/Item'

export default class controller {

    constructor() {
        this.addEvent()
        this.render()
    }

    addEvent(){
        headerBtn.addEventListener('click' , () => {
        console.log("asdf")
        })
}


    render(){
        contents_todo.innerHTML =  Item

    }
    // addBtn(){
    //     console.log("모달")
    //     modal.classList.remove('hidden');
    // }
    //
    //
    //
    // closeBtn(){
    //     modal.classList.add('hidden');
    //     let modal_state = target.options[target.selectedIndex].value
    //     addList(modal_state)
    // }
    //
    // addList(s){
    //     if("todo" == s ){
    //         console.log("todo")
    //         contents_todo.appendChild(btnex)
    //     }else if("inprogress" == s){
    //         console.log("inprogress")
    //     }else{
    //         console.log("done")
    //     }
    // }

}

