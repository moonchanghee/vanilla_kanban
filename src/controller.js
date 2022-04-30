import Model from './model'
import View from './view'
// import Dz from './dropzone'

export default class controller {
    constructor() {
        this.vc = new View()
        this.model = new Model()
        this.drop_id
        this.dropzone = document.querySelectorAll(".dropzone")
        this.contents_inprogress = document.querySelector(".In_progress");
        this.contents_done = document.querySelector(".Done");
        this.contents_todo = document.querySelector(".ToDo");
        this.addEvent()
        this.getItemList()
        this.onDropzoneAddEvent()
    }
    addEvent(){
        const kanban_wrap = document.querySelector(".kanban_wrap")
        const elOpenButton = document.querySelector('.headBtn');
        const elAddButton = document.querySelector(".closeBtn")
        const elSortButton = document.querySelector(".select")
        const modal = document.querySelector(".modal")

        modal.addEventListener("click" , this.onClickSuccessUpdateItem.bind(this))
        elOpenButton.addEventListener('click', this.onClickOpenModal.bind(this))
        elAddButton.addEventListener('click', this.onClickAddButton.bind(this))
        elSortButton.addEventListener('change', this.onClickSortButton.bind(this))
        kanban_wrap.addEventListener("click" , this.onClickKanbanWrap.bind(this))
        kanban_wrap.addEventListener("dragstart" , this.onDragKanbanItem.bind(this))
    }

    dropzoneAddEvent(d){
        d.addEventListener("drop" , this.onDragDrop.bind(this))
        d.addEventListener("dragover", this.onDragOver.bind(this))
        d.addEventListener("dragleave" ,this.onDragLeave.bind(this))
    }


    insertItem(){
        let item = this.vc.addItem()
        let state = this.vc.renderItem(item[0].item_state)
        let dropzone =  this.vc.newTodo(state ,item[0])
        this.dropzoneAddEvent(dropzone)
        this.model.insertItems(item[0])
    }


    //정렬 리스너
    selectChange(){
        let sortBoolean = this.vc.getSortType()
        this.model.sortItemList(sortBoolean)
        // this.vc.onRerender()
        this.getItemList()
    }


    //수정 완료 이벤트 리스너
    upDateItem(e){
            if(e.target.className  === "upSuccessBtn"){
                    let data = this.vc.getModalData(this.modal_id)
                    this.vc.updateBtn(data)
                    if(this.modal_state !== data[0].item_state){
                        this.model.deleteItem(this.modal_id)
                        this.model.insertItems(data[0], data[0].item_state)
                    }else{
                        this.model.updateItem(this.modal_id, data[0])
                    }
                    // this.getItemList()
            }
    }

    //아이템리스트 렌더링 새로고침시
    getItemList(){
        this.model.getItems().forEach((e) => {
            for(let i =0 ; i<e.items.length; i++){
                let state = this.vc.renderItem(e.items[i].item_state)
               let dropzone =  this.vc.newTodo(state ,e.items[i])
                this.dropzoneAddEvent(dropzone)
            }
        })
    }


    //item 삭제 리스너
    deleteBtn(e) {
        if (e.target.className === "delbtn") {
            e.path[2].remove()
            this.model.deleteItem(e.path[3].id)
        }
    }


    //수정 버튼 리스너
    openUpdateModal(e){
            if(e.target.className ===  "upbtn"){
                let updateData = this.model.selectItem(e.path[2].id)
                this.vc.openModal(updateData)
                this.modal_state = updateData.item_state
                this.modal_id = e.path[2].id
                }
    }

    dragStart(e){
        this.drop_id = e.target.parentNode.id
    }

    dragdrop(e){
        e.preventDefault();
        e.target.classList.remove("dropzone_active")
        const droppedItem = document.querySelector(`[id="${this.drop_id}"]`);
        let data = this.model.selectItem(this.drop_id)
        if(data){
            this.model.deleteItem(this.drop_id)
            droppedItem.childNodes[3].id = e.path[0].id
            data.item_state = e.path[0].id
            this.model.dropItemInsert(e.path[1].id ,data )
            e.path[0].parentNode.after(droppedItem)
        }
    }

    onDropzoneAddEvent(){
        this.dropzone.forEach((e) => {
            this.dropzoneAddEvent(e)
        })
    }


    onClickOpenModal(){
        this.vc.openAddModal();
    }

    onClickAddButton(){
        this.insertItem()
    }

    onClickSortButton(){
        this.selectChange()
    }

    onClickKanbanWrap(e){
        this.openUpdateModal(e)
        this.deleteBtn(e)
    }

    onClickSuccessUpdateItem(e){
        this.upDateItem(e)
    }

    onDragKanbanItem(e){
        this.dragStart(e)
    }

    onDragDrop(e){
        this.dragdrop(e)
    }

    onDragOver(e){
        this.vc.dragover(e)
    }

    onDragLeave(e){
        this.vc.dragleave(e)
    }

}