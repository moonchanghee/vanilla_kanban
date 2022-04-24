
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