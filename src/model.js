
export default class Model{

    insertItems(d){
        const data = read();
        data.push(d)
        save(data)
        return d
    }

    getItems(){
        const data = read()
        return data
    }

    selectItem(itemId){
        const data = read().find(e => e[0].id == itemId)

        return data[0]
    }


    updateItem(itemId , newData){
        const upDateData = read().find(e => e[0].id == itemId)
        // upDateData.item_content = newData.item_content
        // upDateData.item_title = newData.item_title
        // upDateData.item_date = newData.item_date
        // upDateData.item_state = newData.item_state
        // upDateData.item_priority = newData.item_priority


    }

    deleteItem(itemId) {
        const data = read();
        let newData = []
        data.forEach((e) => {
            if(e[0].id !== itemId){
                newData.push(e)
            }
        })

        console.log("newData",newData)
        save(newData);
    }

}

const read = () => {
    const json = localStorage.getItem("kanban-data");
    if (!json) {
        return [];
    }
    return JSON.parse(json);
}

const save = (data) => {
    localStorage.setItem("kanban-data", JSON.stringify(data));
    let datas = read()
    console.log(datas)
}


