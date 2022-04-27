export default function Item(e,state){
    return `
<div class = "todoItem" id = ${e.id} draggable="true" >
    제목 :  ${e.item_title}
    생성일 : ${e.item_date}
    내용 :${e.item_content}
    우선순위 : ${e.item_priority}
    <button class = "delbtn">삭제</button>
    <button class = "upbtn">수정</button>
</div>
<div class = "dropzone" id = ${state}> </div>
`;
}


