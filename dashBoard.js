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
    visibleTasks.forEach((task, visibleIndex) => {
        // Get actual index from full tasks array
        const actualIndex = tasks.indexOf(task);
        
        taskHTML += `
<div class="group bg-surface-container-lowest editorial-shadow rounded-xl p-6 flex items-center gap-6 transition-all duration-300 hover:bg-surface-container-low">
  <div class="flex-shrink-0">
    <button id ="completedTask" class="w-8 h-8 rounded-full border-2 border-outline-variant group-hover:border-primary flex items-center justify-center transition-colors cursor-pointer" title="Mark as Completed" onclick="completeTask(${actualIndex})">
    </button>
  </div>
  <div class="flex-grow">
    <h4 class="font-body text-lg font-semibold text-on-surface group-hover:text-primary transition-colors task-title">${task.title}</h4>
    <div class="flex items-center gap-4 mt-2 flex-wrap">
      ${task.status ? `<span class="px-2 py-0.5 rounded bg-primary-fixed/30 text-on-primary-fixed-variant font-label text-[10px] uppercase tracking-wider">${task.status}</span>` : ''}
      ${task.priority ? `<span class="px-2 py-0.5 rounded bg-secondary-container/30 text-on-secondary-container font-label text-[10px] uppercase tracking-wider">${task.priority}</span>` : ''}
    </div>
    <textarea class="task-description" style="display:none;">${task.description || ''}</textarea>
  </div>
  <div class="flex items-center gap-2 flex-shrink-0">
    <button onclick="editTask(${actualIndex})" class="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider Edit-Button hover:bg-secondary-container/80">Edit</button>
    <span class="material-symbols-outlined text-on-surface-variant/40 cursor-pointer hover:text-error transition delete-icon" onclick="deleteTask(${actualIndex})" style="font-size: 24px;">delete</span>
  </div>
</div>`; 
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
    
    
    // Reset expanded state
    document.querySelector('.card-container').dataset.expanded = 'false';
    
    renderTasks();
}

// Complete task - Move to completed tasks
function completeTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks:')) || [];
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks:')) || [];
   completedTaskBtn =  document.getElementById('completedTask');
   completedTaskBtn.appendChild(document.createElement('div')).className = 'w-3 h-3 bg-primary rounded-sm opacity-0 group-hover:opacity-10 scale-0 group-hover:scale-100 transition-all';
    
    // Get the task that's being completed
    const completedTask = tasks[index];
    
    // Add timestamp to completed task
    completedTask.completedAt = new Date().toISOString();
    
    // Move task to completed tasks
    completedTasks.push(completedTask);
    
    // Remove from active tasks
    tasks.splice(index, 1);
    
    // Save to localStorage
    localStorage.setItem('tasks:', JSON.stringify(tasks));
    localStorage.setItem('completedTasks:', JSON.stringify(completedTasks));
    
    // Reset expanded state
    document.querySelector('.card-container').dataset.expanded = 'false';
    
     Swal.fire({
    title: "Done!",
    text: "Task completed successfully!",
    icon: "success",
    confirmButtonText: "OK"
  });
    renderTasks();
}

let EditIndex = null ;

function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks:')) || [];
    const task = tasks[index];  
    document.querySelector('input[name="task-Title"]').value = task.title;
    document.querySelector('textarea[name="task-description"]').value = task.description || '';
    
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

    // Overlay click handler - close modal when clicking outside
    TaskModel.addEventListener('click', (event) => {
        // Check if the click is on the modal container itself (not on children)
        if (event.target !== TaskModel) {
            EditIndex = null;
            TaskForm.reset();
            TaskModel.style.display = 'none';
        }
    });

    // Prevent modal from closing when clicking inside the modal content
    const modalContent = TaskModel.querySelector('.relative');
    if (modalContent) {
        modalContent.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    }

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







    
        