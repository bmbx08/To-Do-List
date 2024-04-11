//유저가 값을 입력한다
//'+' 버튼을 클릭하면, 할일이 추가된다
// delete 버튼을 누르면 할일이 삭제된다.
// check 버튼을 누르면 할일이 끝나면서 밑줄이 간다
// 1. check 버튼을 클릭하는 순간 false => true
// 2. true이면 끝난걸로 간주하고 밑줄 보여주기
// 3. false이면 안 끝난걸로 간주하고 그대로 있기

// 진행중 끝남 탭을 누르면, 언더바가 이동한다.
// 끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만 표시된다.
// 전쳅탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = []
addButton.addEventListener("click",addTask)

function addTask(){
    let task = {        //각 task가 끝났는지 표시하기 위해서 객체를 쓴다.
        id: randomIDGenerate(),  //구글에서 generate random id javascript 검색해서 코드 가져오기, Check함수를 만들기 위해 객체에 id 추가
        taskContent: taskInput.value,
        isComplete: false,
        isDeleted: false
    }
    taskList.push(task);
    console.log(taskList);
    render();
}

function render(){
    let resultHTML = '';
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].isDeleted == true){
            resultHTML += '';
        } else{
            if(taskList[i].isComplete == true){
                resultHTML+=`<div class="task-done-background">
                <div class = "task-done">${taskList[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-backward"></i></button>
                    <button onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-eraser"></i></button>
                </div>
            </div>`
            } else {
                resultHTML += `<div class="task">
                <div>${taskList[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${taskList[i].id}')"><i class="fa-regular fa-thumbs-up"></i></button> 
                    <button onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-eraser"></i></button>
                </div>
            </div>` //객체의 taskContent 값만 필요하기 때문에 .taskContent를 쓴다
            } //onclick과 addEventListener의 차이는 코딩누나님이 자료로 정리해주신다했음.
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
    console.log("id:",id)
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete; //!연산을 쓰면 true=>false, false=>true 둘 다 할 수 있다.
            break;
        }
    }
    render(); //값을 바꾼 후 render() 함수를 불러와서 UI도 최신화한다.
    console.log(taskList)
}

function deleteTask(id) {
    for(let i=0;i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isDeleted = true
        }
    }
    render();
    console.log("삭제하자");
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

