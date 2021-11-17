var html = ``

var inputBody = ``

var inputForm = ``

const todoList = JSON.parse(sessionStorage.getItem('todoList')) || []

const id = 0;

function addTodo(event) {
    event.preventDefault();

    id = id + 1;
    let fullname = document.getElementById("fullname").value;
    let classname = document.getElementById("classname").value;
    let status = document.getElementById("status").value;
    let TODO = {
        ID: id,
        'FULLNAME': fullname,
        'CLASS': classname,
        'STATUS': status,
    };

    todoList.push(TODO)
    sessionStorage.setItem('todoList', JSON.stringify(todoList))
    $("#exampleModal").modal("hide");
    document.getElementById('fullname').value = ''
    document.getElementById('classname').value = ''
    document.getElementById('status').value = ''
    inputForm = ''
    showtodoList()
}

function showtodoList() {
    let storage = JSON.parse(sessionStorage.getItem('todoList')) || todoList
    let tableBody = storage.map((todo, index) => {
        return `
        <tr>
            <th scope="row">${index}</th>
            <td>${todo.FULLNAME}</td>
            <td>${todo.CLASS}</td>
            <td>${todo.STATUS}</td>
            <td>
                <button type="button" class="btn btn-success" onclick="showeditTodo('${todo.ID}')">Edit</button>
                <button type="button" class="btn btn-danger" onclick ="deteleTodo('${todo.ID}')">Delete</button>
            </td>
        </tr>
        `
    })
    html = `
    <div class="table-section">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">FullName</th>
                    <th scope="col">Class</th>
                    <th scope="col">Status</th>
                    <th scope="col" style="width: 15%;">Action</th>
                </tr>
            </thead>
            <tbody>
                ${tableBody.join('')}
            </tbody>
        </table>
    </div>

    <div class="modal-section">
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Infomation of Student</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form onsubmit="addTodo(event)">
                            ${inputForm}    
                            <div class="modal-footer">
                                ${inputBody}
                            </div> 
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
    document.getElementById('root').innerHTML = html
}
showtodoList()

//showModal
function showModal() {
    inputForm = `
        <div class="mb-3">
            <label for="fullname" class="col-form-label">FullName:</label>
            <input type="text" class="form-control" id="fullname" required>
        </div>
        <div class="mb-3">
            <label for="classname" class="col-form-label">ClassName:</label>
            <input type="text" class="form-control" id="classname" required>
        </div>
        <div class="mb-3">
            <label for="status" class="col-form-label">Status:</label>
            <input type="text" class="form-control" id="status" required>
        </div>
    `
    inputBody = `
        <button type="button" class="btn btn-secondary" onclick ="closeModal()">Close</button>
        <button type="submit" class="btn btn-primary">Add</button>
    `
    showtodoList()
    $("#exampleModal").modal("show");
}

//Close Modal
function closeModal() {
    $("#exampleModal").modal("hide");
    document.getElementById('fullname').value = ''
    document.getElementById('classname').value = ''
    document.getElementById('status').value = ''
}