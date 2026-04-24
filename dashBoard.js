// Render tasks from localStorage
function renderTasks() {
    const tasksContainer = document.querySelector('.card-container');
    const showMoreBtn = document.getElementById('show-more-tasks');
    const tasks = JSON.parse(localStorage.getItem('tasks:')) || [];
    
    // Check expanded state
    let isExpanded = tasksContainer.dataset.expanded === 'true';
    let visibleTasks = isExpanded ? tasks : tasks.slice(0, 3);
    
    tasksContainer.innerHTML = '';
    let taskHTML = '';
    visibleTasks.forEach((task, index) => {
        taskHTML += `
<div class="group bg-surface-container-lowest hover:bg-white rounded-xl p-6 flex items-center justify-between transition-all duration-300 border border-transparent hover:border-outline-variant/30 shadow-sm hover:shadow-md">
<div class="flex items-center space-x-6">
<button class="w-7 h-7 rounded-full border-2 border-outline-variant group-hover:border-primary flex items-center justify-center transition-colors">
<div class="w-3 h-3 bg-primary rounded-sm opacity-0 group-hover:opacity-10 scale-0 group-hover:scale-100 transition-all"></div>
</button>
<div>
<h4 class="font-body text-lg font-bold text-on-surface pt-4 task-title ">${task.title}</h4>
<p class="font-body text-sm text-on-surface-variant task-description">
${
    task.priority ? `<span class="font-body text-xs text-slate-600 dark:text-slate-400">Priority:${task.priority}</span> ` : ''
}
${
    task.status ? `<br><span class="font-body text-xs text-slate-600 dark:text-slate-400">Status:${task.status}</span> ` : ''
}</p>
</div>
</div>
<div class="flex items-center space-x-3">
<button onclick="editTask(${index})" class="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider Edit-Button hover:bg-secondary-container/80">Edit</button>
<span class="material-symbols-outlined text-on-surface-variant/40 cursor-pointer hover:text-blue-500 transition delete-icon" onclick="deleteTask(${index})" style="font-size: 24px;">delete</span>
</div>
`
    })     
    tasksContainer.innerHTML = taskHTML;
    
    // Show/Hide Show More button
    if (tasks.length > 3) {
        showMoreBtn.style.display = 'flex';
        if (isExpanded) {
            showMoreBtn.innerHTML = '<span>Show Less</span><span class="material-symbols-outlined text-sm">expand_less</span>';
        } else {
            showMoreBtn.innerHTML = '<span>Show More</span><span class="material-symbols-outlined text-sm">expand_more</span>';
        }
    } else {
        showMoreBtn.style.display = 'none';
    }
}


// Delete task
function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks:')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks:', JSON.stringify(tasks));
    
    // Color change animation
    event.target.style.color = '#040a35'; 
    setTimeout(() => {
        event.target.style.color = ''; 
    }, 300);
    
    // Reset expanded state
    document.querySelector('.card-container').dataset.expanded = 'false';
    
    renderTasks();
}

let EditIndex = null ;

function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks:')) || [];
    const task = tasks[index];  
    document.querySelector('.task-Title').value = task.title;
    document.querySelector('.task-description').value = task.description;
    
    // Set priority radio button
    if (task.priority) {
        document.querySelector(`input[name="priority"][value="${task.priority}"]`).checked = true;
    }
    
    // Set status radio button
    if (task.status) {
        document.querySelector(`input[name="status"][value="${task.status}"]`).checked = true;
    }
    
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
    const cardContainer = document.querySelector('.card-container');

    // Render tasks on page load
    renderTasks();

    // Show More button click handler
    const showMoreBtn = document.getElementById('show-more-tasks');
    showMoreBtn.addEventListener('click', () => {
        const isExpanded = cardContainer.dataset.expanded === 'true';
        cardContainer.dataset.expanded = isExpanded ? 'false' : 'true';
        renderTasks();
    });

    AddButton.addEventListener('click', () => {
        EditIndex = null;
        TaskForm.reset();
        TaskModel.style.display = 'flex';
    });

    CancelButton.addEventListener('click', () => {
        EditIndex = null;
        TaskForm.reset();
        TaskModel.style.display = 'none';
    });

    // Save task
    SaveTaskButton.addEventListener('click', () => {
        const formData = new FormData(TaskForm);
        const TaskTitle = formData.get('task-Title');
        const TaskDescription = formData.get('task-description');
        const priority = formData.get('priority');
        const status = formData.get('status');

        if (TaskTitle.trim() === '') {
            alert('Please enter a task title');
            return;
        }

        // Get existing tasks
        let tasks = JSON.parse(localStorage.getItem('tasks:')) || [];
        
        // Create new task object
        const newTask = {
            title: TaskTitle,
            description: TaskDescription,
            priority: priority,
            status: status

        };

        // Check if it's an edit or new task
        if (EditIndex !== null) {
            // Update existing task
            tasks[EditIndex] = newTask;
            EditIndex = null;
        } else {
            // Add new task to array
            tasks.push(newTask);
        }
        
        // Save to localStorage
        localStorage.setItem('tasks:', JSON.stringify(tasks));
        
        // Reset form
        TaskForm.reset();
        
        // Close modal
        TaskModel.style.display = 'none';
        
        // Reset expanded state
        cardContainer.dataset.expanded = 'false';
        
        // Render updated tasks
        renderTasks();
    });
});







    
        