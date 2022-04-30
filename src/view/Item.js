export default function Item(e){
    return `
<div class = "todoItem"  draggable="true" >
   <div class = "item_content">
   <p>제목 :  ${e.item_title}</p>
    <p>생성일 : ${e.item_date}</p>
    <p>내용 :${e.item_content}</p>
    </div>
    <div class="item_button">
    <button class = "delbtn">삭제</button>
    <button class = "upbtn">수정</button>
     <p class = "priority"> ${e.item_priority}</p>
     </div>
</div>
`;
}


