
export default class Model{
    constructor() {
        this.controller = controller
        this.title = title
        this.content = content
        this.createAt = createAt
        this.endAt = endAt
        this.priority = priority
        this.state = state

    }



    updateStorage(){

    }
    deleteStorage(){

    }
    insertStorage(key,item){
    localStorage.setItem(key , item)
    }

}