// Render tasks from localStorage
function renderTasks() {
    const tasksContainer = document.querySelector('.card-container');
    const tasks = JSON.parse(localStorage.getItem('tasks:')) || [];
    tasksContainer.innerHTML = '';
    let taskHTML = '';
    tasks.forEach((task, index) => {
        taskHTML += `
<div class="group bg-surface-container-lowest hover:bg-white rounded-xl p-6 flex items-center justify-between transition-all duration-300 border border-transparent hover:border-outline-variant/30 shadow-sm hover:shadow-md">
<div class="flex items-center space-x-6">
<button class="w-7 h-7 rounded-full border-2 border-outline-variant group-hover:border-primary flex items-center justify-center transition-colors">
<div class="w-3 h-3 bg-primary rounded-sm opacity-0 group-hover:opacity-10 scale-0 group-hover:scale-100 transition-all"></div>
</button>
<div>
<h4 class="font-body text-lg font-bold text-on-surface task-title ">${task.title}</h4>
<p class="font-body text-sm text-on-surface-variant task-description">${task.description}</p>
</div>
</div>
<div class="flex items-center space-x-3">
<button onclick="editTask(${index})" class="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider Edit-Button hover:bg-secondary-container/80">Edit</button>
<button onclick="deleteTask(${index})" class="material-symbols-outlined text-on-surface-variant/40 cursor-pointer hover:hover:bg-red-100 transition" data-icon="delete">Delete</button>
</div>
</div>`
    })     
    tasksContainer.innerHTML = taskHTML;
}

// Delete task
function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks:')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks:', JSON.stringify(tasks));
    renderTasks();
}

let EditIndex = null ;

function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks:')) || [];
    const task = tasks[index];  
    document.querySelector('.task-Title').value = task.title;
    document.querySelector('.task-description').value = task.description;
    EditIndex = index;
    document.querySelector('.task-model').style.display = 'flex';
}


// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const AddButton = document.querySelector('.AddButton');
    const TaskModel = document.querySelector('.task-model');
    const CancelButton = document.querySelector('.Cancel-Button');
    const SaveTaskButton = document.querySelector('.SaveTask-Button');
    const TaskForm = document.querySelector('.task-form');

    // Render tasks on page load
    renderTasks();

    AddButton.addEventListener('click', () => {
        TaskModel.style.display = 'flex';
    });

    CancelButton.addEventListener('click', () => {
        TaskModel.style.display = 'none';
    });

    // Save task
    SaveTaskButton.addEventListener('click', () => {
        const formData = new FormData(TaskForm);
        const TaskTitle = formData.get('task-Title');
        const TaskDescription = formData.get('task-description');

        if (TaskTitle.trim() === '') {
            alert('Please enter a task title');
            return;
        }

        // Get existing tasks
        let tasks = JSON.parse(localStorage.getItem('tasks:')) || [];
        
        // Create new task object
        const newTask = {
            title: TaskTitle,
            description: TaskDescription
        };

        // Add new task to array
        tasks.push(newTask);
        
        // Save to localStorage
        localStorage.setItem('tasks:', JSON.stringify(tasks));
        
        // Reset form
        TaskForm.reset();
        
        // Close modal
        TaskModel.style.display = 'none';
        
        // Render updated tasks
        renderTasks();
    });
});







    
        