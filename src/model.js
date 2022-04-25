
export default class Model{

    insertItems(d,state){

        const data = this.read();
        const column = data.find(e => e.id == state)
        column.items.push(d)
        this.save(data)
        return d
    }
    getItems(){
        const data = this.read()
        return data
    }
    selectItem(itemId){
        const data = this.read().find(e => e[0].id == itemId)
        return data[0]
    }

    updateItem(itemId , newData){
        const upDateData = this.read().find(e => e[0].id == itemId)
        // upDateData.item_content = newData.item_content
        // upDateData.item_title = newData.item_title
        // upDateData.item_date = newData.item_date
        // upDateData.item_state = newData.item_state
        // upDateData.item_priority = newData.item_priority
    }

    sortItemList(e){
        const data = this.read();

        if(e == "low"){
            data.forEach((e) => {
                e.items.sort((a,b) => {
                    return (Number(a[0].item_priority_val) - Number(b[0].item_priority_val))
                })
            })
        }else if(e == "high"){
            data.forEach((e) => {
                e.items.sort((a,b) => {
                    return (Number(b[0].item_priority_val) - Number(a[0].item_priority_val))
                })
            })
        }

        this.save(data);

    }




    deleteItem(itemId) {
        const data = this.read();

        data.forEach((e) => {
            for(let i =0 ; i<e.items.length; i++){
                if(e.items[i][0].id == itemId ){
                    console.log("d",e.items[i][0].id)
                    e.items.splice(e.items.indexOf(e.items[i][0].id),1)
                    //삭제 수정
                }
            }
        })
        this.save(data);
    }

    read = () => {
        const json = localStorage.getItem("kanban-data");
        if (!json) {
            return [{id : "ToDo" , items: [] } , {id : "In_progress" , items: [] } , {id : "Done" , items: [] }]
        }

        return JSON.parse(json);
    }

    save = (data) => {
        localStorage.setItem("kanban-data", JSON.stringify(data));
        let datas = this.read()
        console.log(datas)
    }
}



