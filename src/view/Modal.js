export default function Modal(e){
    return `
    <div class="modal-title">제목 : <input type="text" id = "title"></div>
    <div class="modal-date">완료일 <input type="text" id = "date"> <button id = selectDate>달력선택</button></div>
    <div class="modal-selectbox">우선순위
        <select id = "modal-priority">
            <option selected>선택</option>
            <option>높은</option>
            <option>중간</option>
            <option>낮음</option>
        </select>
        상태
        <select id = "modal-state">
            <option selected>선택</option>
            <option>ToDo</option>
            <option>In progress</option>
            <option>Done</option>
        </select>
    </div>
    <p><textarea cols="45" rows="10" id = "modal-conents"></textarea></p>
    <div class = "closeBtn" >전송완료</div>
`;


}