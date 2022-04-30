
import Item from "./view/Item";

export default class View {

    constructor() {
        this.modal_contents = document.querySelector("#modal-conents")
        this.title = document.querySelector("#title")
        this.date = document.querySelector("#date")
        this.closeBtn = document.querySelector(".closeBtn")
        this.upSuccessBtn = document.querySelector(".upSuccessBtn")
        this.modal = document.querySelector('.modal');
        this.modal_state = document.querySelector("#modal-state")
        this.modal_priority = document.querySelector("#modal-priority")
        this.contents_inprogress = document.querySelector(".In_progress");
        this.contents_done = document.querySelector(".Done");
        this.contents_todo = document.querySelector(".ToDo");
        this.select = document.querySelector(".select")
    }

    openAddModal() {
        this.closeBtn.classList.remove('hidden');
        this.modal.classList.remove('hidden');
        this.upSuccessBtn.classList.add('hidden');
        this.modal_contents.modal_contentsmodal_contentsvalue = ""
        this.title.value = ""
        this.date.value = ""
    }

    //모달 닫기 리스너, 데이터 저장
    addItem() {
        if(this.checkData()){
            alert(this.checkData())
        }else{
            let data = this.getModalData(this.uuid())
            this.modal.classList.add('hidden');
            this.closeBtn.classList.add('hidden');
            return data
        }
    }

    openModal(e){
        this.modal.classList.remove('hidden');
        this.upSuccessBtn.classList.remove('hidden');
        this.title.value = e.item_title
        this.modal_contents.value = e.item_content
        this.date.value = e.item_date
        // modal_priority.options[modal_priority.selectedIndex].text = updateData.item_priority
        // modal_state.options[modal_state.selectedIndex].text = updateData.item_state
    }

    //유효성 검사
    checkData(){
        let reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/;
        if (reg.test(this.title.value)) {
            return "제목에는 특수문자를 사용할 수 없습니다"
        }else if (reg.test(this.modal_contents.value)) {
            return "내용에는 특수문자를 사용할 수 없습니다"
        }else if (this.title.value.length > 30) {
            return "제목은 30자를 초과할 수 없습니다"
        }else if (this.modal_contents.length > 150) {
            return "내용은 150자를 초과할 수 없습니다"
        }else if (this.modal_priority.options[this.modal_priority.selectedIndex].text === "선택") {
            return "우선순위를 선택해주세요"
        }else if (this.modal_state.options[this.modal_state.selectedIndex].text === "선택") {
            return "상태를 선택해주세요"
        }else{
            return 0
        }
    }


    getSortType(){
        let sort_name = this.select.options[this.select.selectedIndex].getAttribute("class")
        if(sort_name === "sel_high"){
            return 1
        }else if(sort_name === "sel_low"){
            return 0
        }
    }


    //모달 데이터 get
    getModalData(modal_id){

        return [{
            id : modal_id,
            item_content : this.modal_contents.value,
            item_title : this.title.value,
            item_date :  this.date.value,
            item_state : this.modal_state.options[this.modal_state.selectedIndex].value,
            item_priority : this.modal_priority.options[this.modal_priority.selectedIndex].text,
            item_priority_val : this.modal_priority.options[this.modal_priority.selectedIndex].getAttribute("value")
        }]
    }


    //new 아이템 생성
    newTodo (state, data) {
        let addItem = document.createElement("div")
        addItem.setAttribute("id" , data.id)
        addItem.innerHTML = Item(data)

        let dropZone = this.newDropzone(data.item_state)
        addItem.appendChild(dropZone)
        state.appendChild(addItem)
        return dropZone
    }


    newDropzone(e){
        const range = document.createRange();
        const dropZone = range.createContextualFragment(`
	 <div class = "dropzone" id = ${e}> </div>`).children[0];
        return dropZone
    }


    //유니크 아이디 생성
    uuid () {
        return 'xx'.replace(/[xy]/g, function(c) {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }


    //아이템 상태 분리
    renderItem(s) {
        if ("ToDo" === s) {
            return this.contents_todo
        } else if ("In_progress" === s) {
            return this.contents_inprogress
        } else if("Done" === s) {
            return this.contents_done
        }
    }

    updateBtn(){
        if(this.checkData()){
            alert(this.checkData())
        }else{
            this.modal.classList.add('hidden');
            this.modal.classList.add('upSuccessBtn');
            // this.onRerender()
        }
    }



    dragover(e){
        e.preventDefault();
        e.target.classList.add("dropzone_active")
    }
    dragleave(e){
        e.target.classList.remove("dropzone_active")
    }


}





