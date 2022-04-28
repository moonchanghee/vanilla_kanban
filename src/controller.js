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
const closeBtn = document.querySelector(".closeBtn")
const upSuccessBtn = document.querySelector(".upSuccessBtn")

import Item from './view/Item'
import Model from './model'

export default class controller {
    constructor() {
        this.model = new Model()
        this.modal_id
        this.drop_id
        this.pre_node
        this.modal_state
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

    //초기 드랍존 이벤트 추가
    addEvent(){
        dropzone.forEach(e => {
            this.dropzoneAddEvent(e)
        })
    }

    //정렬 리스너
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

    //모달 닫기 리스너, 데이터 저장
    closeModal() {
        modal.addEventListener('click',(e) => {
            let state = modal_state.options[modal_state.selectedIndex].value
            if(e.target.className ==  "closeBtn"){
                if(this.checkData()){
                    alert(this.checkData())
                }else{
                    let data = this.getModalData(this.uuid())
                    this.model.insertItems(data[0],state)
                    this.addItems(data[0])
                    modal.classList.add('hidden');
                    closeBtn.classList.add('hidden');
                }
            }
        })
    }

    //수정 버튼 리스너
   updateBtn(){
        kanban_wrap.addEventListener('click',(e) => {
            if(e.target.className ==  "upbtn"){
                modal.classList.remove('hidden');
                upSuccessBtn.classList.remove('hidden');
                let updateData = this.model.selectItem(e.path[1].id)
                title.value = updateData.item_title
                modal_contents.value = updateData.item_content
                date.value = updateData.item_date
                // modal_priority.options[modal_priority.selectedIndex].text = updateData.item_priority
                // modal_state.options[modal_state.selectedIndex].text = updateData.item_state
                this.modal_state = updateData.item_state
                this.modal_id = e.path[1].id
            }
        })
    }

    //수정 완료 이벤트 리스너
    upDateModal(){
        modal.addEventListener('click',(e) => {
            if(e.target.className  == "upSuccessBtn"){
                if(this.checkData()){
                    alert(this.checkData())
                }else{
                    let data = this.getModalData(this.modal_id)
                    if(this.modal_state != data[0].item_state){
                        this.model.deleteItem(this.modal_id)
                        this.model.insertItems(data[0], data[0].item_state)
                    }else{
                        this.model.updateItem(this.modal_id, data[0])
                    }
                    this.onRerender()
                    modal.classList.add('hidden');
                    modal.classList.add('upSuccessBtn');
                }
            }
        })
    }

    //모달 데이터 get
    getModalData(modal_id){
        let data = [{
            id : modal_id,
            item_content : modal_contents.value,
            item_title : title.value,
            item_date :  date.value,
            item_state : modal_state.options[modal_state.selectedIndex].value,
            item_priority : modal_priority.options[modal_priority.selectedIndex].text,
            item_priority_val : modal_priority.options[modal_priority.selectedIndex].getAttribute("value")
        }]

        return data
    }

    //모달 오픈 버튼
    addItemBtn(){
        head_container.addEventListener('click',(e) => {
            if(e.target.className ==  "headBtn"){
                closeBtn.classList.remove('hidden');
                modal.classList.remove('hidden');
                upSuccessBtn.classList.add('hidden');
                modal_contents.value = ""
                title.value = ""
                date.value = ""
                // modal_state.options[modal_state.selectedIndex].text = modal_state.options[0].value
                // modal_priority.options[modal_priority.selectedIndex].text = modal_priority.options[0].value
            }
        })
    }

    //item 삭제 리스너
    deletBtn(){
        kanban_wrap.addEventListener('click',(e) => {
            if(e.target.className ==  "delbtn"){
                this.removeItem(e.path[1].id)
            }})
    }

    //아이템 상태 분리
    addItems(s) {
        if ("ToDo" == s.item_state) {
            this.newTodo(contents_todo, s)
        } else if ("In_progress" == s.item_state) {
            this.newTodo(contents_inprogress, s)
        } else if("Done" == s.item_state) {
            this.newTodo(contents_done, s)
        }
    }

    //new 아이템 생성
    newTodo (state, s) {
        let addItem = document.createElement("div")
        addItem.innerHTML = Item(s, s.item_state)
        state.appendChild(addItem)
        this.dragStart(addItem)
    }

    //드래그 드랍 리스너
    dragStart(node){
        node.addEventListener("dragstart" , (e) => {
            this.pre_node = e.path[1]
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
                //렌더링
                data.item_state = move_state
                this.removeItem(pre_id)
                this.model.dropItemInsert(e.path[1].childNodes[1].getAttribute("id"),data)
                this.onRerender()
            }
        })
    }

    //아이템리스트 렌더링
    getItemList(){
        this.model.getItems().forEach((e) => {
            for(let i =0 ; i<e.items.length; i++){
                this.addItems(e.items[i])
            }
        })
    }

    //아이템리스트  삭제
    removeItem(e){
         let del_parentNode = document.getElementById(e).parentNode
         if(del_parentNode){
             this.model.deleteItem(e)
             del_parentNode.remove()
         }
    }

    //유효성 검사
    checkData(){
        let reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/;
        if (reg.test(title.value)) {
            return "제목에는 특수문자를 사용할 수 없습니다"
        }else if (reg.test(modal_contents.value)) {
            return "내용에는 특수문자를 사용할 수 없습니다"
        }else if (title.value.length > 30) {
            return "제목은 30자를 초과할 수 없습니다"
        }else if (modal_contents.length > 150) {
            return "내용은 150자를 초과할 수 없습니다"
        }else if (modal_priority.options[modal_priority.selectedIndex].text === "선택") {
            return "우선순위를 선택해주세요"
        }else if (modal_state.options[modal_state.selectedIndex].text === "선택") {
            return "상태를 선택해주세요"
        }else{
            return 0
        }
    }

    //유니크 아이디 생성
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