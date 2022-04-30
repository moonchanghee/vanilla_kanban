
export default class Model{

    insertItems(d){
        const data = this.read();
        const item = data.find(e => e.id == d.item_state)
        item.items.push(d)
        this.save(data)
    }

    dropItemInsert(move_id,d){
        const data = this.read()
        let ch
        const item = data.find(e => e.id == d.item_state)

            data.forEach((e) => {
                for (let i = 0; i < e.items.length; i++) {
                    if (e.items[i].id == move_id) {
                        ch = i
                    }}
            }
            )
        item.items.splice(ch + 1, 0, d)
        this.save(data)
    }


    getItems(){
        const data = this.read()
        return data
    }

    selectItem(itemId){
        const data = this.read()
        let selectData

        data.forEach((e) => {
            for(let i =0 ; i<e.items.length; i++){
                if(e.items[i].id == itemId ){
                    selectData = e.items[i]
                    return
                }
            }
        })
    return selectData
    }

    //코드 수정
    updateItem(itemId , newData){
        const data = this.read()

        data.forEach((e) => {
            for(let i =0 ; i<e.items.length; i++){
                if(e.items[i].id == itemId ){
                    e.items[i].item_content = newData.item_content
                    e.items[i].item_title = newData.item_title
                    e.items[i].item_date = newData.item_date
                    e.items[i].item_priority = newData.item_priority
                    e.items[i].item_priority_val = newData.item_priority_val
                }
            }
        })

        this.save(data)
    }

    sortItemList(s){
        const data = this.read();
            data.forEach((e) => {
                e.items.sort((a,b) => {
                    if(s){
                        return (Number(b.item_priority_val) - Number(a.item_priority_val))
                    }else{
                        return (Number(a.item_priority_val) - Number(b.item_priority_val))
                    }
                })
            })
        this.save(data);
    }

    deleteItem(itemId) {
        const data = this.read();
        let chData
        for (const item of data) {
            chData = item.items.find(e => e.id == itemId);
            if (chData) {
                item.items.splice(item.items.indexOf(chData), 1);
            }
        }
        this.save(data);
    }

    read(){
        const json = localStorage.getItem("kanban-data");
        if (!json) {
            return [{id : "ToDo" , items: [] } , {id : "In_progress" , items: [] } , {id : "Done" , items: [] }]
        }

        return JSON.parse(json);
    }

    save(data){
        localStorage.setItem("kanban-data", JSON.stringify(data));
    }
}



