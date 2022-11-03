var taskName = document.getElementById("todoInput");
var taskbody = document.getElementById("taskBody");
var btn = document.getElementById("todobtn");
var tasks = [];
var currentIndex = 0;

if (localStorage.getItem("TODO liST") != null) {
    tasks = JSON.parse(localStorage.getItem("TODO liST"));//convert string to json "array of objects"
    displayTask();
    NumberOfTasks()
}

// add tasks___________________________________________________________

function addTask() {
    if (btn.innerHTML == "+") {
        var task = {
            nameOfTask: taskName.value,
        };
        tasks.push(task);
        localStorage.setItem("TODO liST", JSON.stringify(tasks));//convert json"array of objects to string 
        console.log(tasks)
        displayTask();
        clearInput();
        NumberOfTasks();
    }
    else {
        save();
    }

}

btn.addEventListener("click", function () {
    addTask();
})



// display tasks ___________________________________________________
function displayTask() {
    var trs = "";
    for (var i = 0; i < tasks.length; i++) {
        trs += `<tr>
        <td>${tasks[i].nameOfTask}</td>
        <td><button class="btn btn-warning"onclick="update(${i})">Edit</button></td>
        <td><button class="btn btn-danger" onclick="deleteTask(${i})">Delete</button></td>
        </tr>`
    }
    // console.log(trs);
    taskbody.innerHTML = trs;

}

// clear input after writing task______________________________________
function clearInput() {
    taskName.value = "";
}

// delete task____________________________________
function deleteTask(deleteIndex) {
    tasks.splice(deleteIndex, 1);
    displayTask();
    localStorage.setItem("TODO liST", JSON.stringify(tasks));
    NumberOfTasks();
}

// clear tasks __________________________________________
function clearAll() {
    tasks = [];
    localStorage.setItem("TODO liST", JSON.stringify(tasks));
    displayTask();
    NumberOfTasks()
}

// update task________________________
function update(updateindex) {
    currentIndex = updateindex;
    btn.innerHTML = `<i class="fas fa-edit"></i>`;
    taskName.value = tasks[currentIndex].nameOfTask;
}

function save() {
    tasks[currentIndex].nameOfTask = taskName.value;
    localStorage.setItem("TODO liST", JSON.stringify(tasks));
    displayTask();
    btn.innerHTML = "+";
    clearInput();
}

// number of Tasks_____________________________________________
function NumberOfTasks() {
    var NumberOfTasks = tasks.length;
    document.getElementById("taskpending").innerHTML = NumberOfTasks;
}

// *************************dark and light mode***********************

$(".dark").click(function () {
    $("#home").css({ "background": `#fff url(images/bg-desktop-light.jpg) no-repeat 0 0`, "transition": "all 1s" })
    $(".light").css("display", "block");
    $(".dark").css("display", "none");
});

$(".light").click(function () {
    $("#home").css({ "background": `hsl(235, 21%, 11%) url(images/bg-desktop-dark.jpg) no-repeat 0 0 `, "transition": "all 1s" })
    $(".light").css("display", "none");
    $(".dark").css("display", "block");
});
