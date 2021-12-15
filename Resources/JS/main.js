//SVG
removeSVG = '<svg t="1637580995052" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M689.257 279.687l-95.113 0c-4.745-41.142-39.749-73.208-82.146-73.208-42.392 0-77.393 32.064-82.139 73.208l-95.118 0c-38.493 0-69.803 31.321-69.803 69.811l0 3.581c0 29.413 18.316 54.591 44.116 64.848l0 329.782c0 38.493 31.314 69.811 69.804 69.811l266.283 0c38.49 0 69.802-31.322 69.802-69.811l0-329.781c25.799-10.26 44.116-35.436 44.116-64.848l0-3.581c0-38.493-31.313-69.813-69.802-69.813zM512 239.587c24.112 0 44.238 17.283 48.692 40.1l-97.375 0c4.452-22.819 24.579-40.1 48.682-40.1zM681.838 747.709c0 20.239-16.465 36.705-36.697 36.705l-266.283 0c-20.23 0-36.697-16.469-36.697-36.705l0-324.818 339.677 0 0 324.818zM725.953 353.08c0 20.239-16.465 36.705-36.697 36.705l-354.514 0c-20.23 0-36.697-16.467-36.697-36.705l0-3.581c0-20.239 16.465-36.705 36.697-36.705l354.515 0c20.23 0 36.697 16.467 36.697 36.705l0 3.581zM423.251 742.074c9.142 0 16.553-7.414 16.553-16.553l0-186.382c0-9.141-7.412-16.554-16.553-16.554s-16.553 7.415-16.553 16.554l0 186.382c-0.002 9.142 7.41 16.553 16.552 16.553zM512 742.074c9.143 0 16.554-7.415 16.554-16.553l0-186.382c0-9.141-7.415-16.554-16.554-16.554-9.142 0-16.553 7.415-16.553 16.554l0 186.382c0 9.142 7.41 16.553 16.552 16.553zM600.749 742.074c9.142 0 16.552-7.414 16.552-16.553l0-186.382c0-9.141-7.412-16.554-16.552-16.554-9.143 0-16.553 7.415-16.553 16.554l0 186.382c-0.002 9.142 7.414 16.553 16.553 16.553z"></path></svg>';
completeSVG = '<svg t="1637582301103" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M396.8 680.362667l-181.418667-180.224-72.362666 72.490666 236.458666 255.573334L880.938667 343.466667 808.618667 270.933333z"></path></svg>';

// Data Initialization
// Load Data from LocalStorage
var data = (localStorage.getItem('todoList')) ? 
JSON.parse(localStorage.getItem('todoList')) : 
{
    todo : [],
    completed : []
} 

console.log(data);
renderTodoList();

// Save Data from LocalStorage
function DataObjectUpdate(){
    var item = JSON.stringify(data);
    // here's print!!!!
    console.log(item);
    localStorage.setItem('todoList', item);
}

function renderTodoList(){
    if(!data.todo.length && !data.completed.length) return;

    for(var i = 0; i < data.todo.length; i++){
        var key = data.todo[i];
        addItemToDOM(key);
    }

    for(var i = 0; i < data.completed.length; i++){
        var key = data.completed[i];
        addItemToDOM(key, true);
    }
}

// User Click the Add Button to Add To-do Event.
document.getElementById('add').addEventListener('click', function(){
    var key = document.getElementById('item').key;
    if(key) {
        addItem(key);
    }  
});

document.getElementById('item').addEventListener('keydown', function(e){
    var key = this.key;
    if(e.code === 'Enter' && key){
        addItem(key);
    }
});

function addItem(key){
    data.todo.push(key);
    addItemToDOM(key);
    document.getElementById('item').key = '';
    DataObjectUpdate();
}

function removeItem(){
    var item = this.parentNode.parentNode;
    var list = item.parentNode;
    var id = list.id;


    var key = item.innerText;
    if(id === 'todo'){
        data.todo.splice(data.todo.indexOf(key), 1);
    }
    else{
        data.completed.splice(data.completed.indexOf(key), 1);
    }
    DataObjectUpdate();
    
    
    list.removeChild(item);
}

function completeItem(){
    var item = this.parentNode.parentNode;
    var list = item.parentNode;
    var id = list.id;
    // check the task should be placed in completed list or to-do list;
    var targetList = document.getElementById((id === 'todo') ? 'completed' : 'todo');

    // in the future, I'm gonna push more key->key into the 'key', so we gonna change this pos.
    key = item.innerText;
    if(id === 'todo'){
        data.todo.splice(data.todo.indexOf(key), 1);
        data.completed.push(key);    
    }
    else {
        data.completed.splice(data.completed.indexOf(key), 1);
        data.todo.push(key);    
    }
    DataObjectUpdate();

    list.removeChild(item);
    targetList.insertBefore(item, targetList.childNodes[0]);

}

function addItemToDOM(text, completed){
    console.log(text);

    var list = (completed) ? document.getElementById('completed'): document.getElementById('todo');

    var item = document.createElement('li');
    item.innerText = text;

    var buttons = document.createElement('div');
    buttons.classList.add('buttons');

    var remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = removeSVG;

    remove.addEventListener('click', removeItem);

    var complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = completeSVG;

    complete.addEventListener('click', completeItem);

    buttons.appendChild(remove);
    buttons.appendChild(complete);
    item.appendChild(buttons);

    list.insertBefore(item, list.childNodes[0]);

}