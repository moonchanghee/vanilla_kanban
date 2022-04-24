export default function Item(e){
    return `
<div class = "add" id = ${e} draggable="true" >
    제목 : 제목
    생성일 : 생성일
    완료일 :완료일ㅇㄹㅇ 
    <button class = "addbtn">버튼</button>
    <button class = "upbtn">수정</button>
</div>
<div class = "dropzone"> </div>
`;


}