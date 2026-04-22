document.addEventListener('DOMContentLoaded', () => {
    const AddButton = document.querySelector('.AddButton');
    const TaskModel = document.querySelector('.task-model');
    const CancelButton = document.querySelector('.Cancel-Button');
    const SaveTaskButton = document.querySelector('.SaveTask-Button');


    AddButton.addEventListener('click', () => {
        
        TaskModel.style.display = 'flex';
    });

    CancelButton.addEventListener('click', () => {
         TaskModel.style.display = 'none';
    });

    // Save task
    SaveTaskButton.addEventListener('click', () => {
        localStorage.setItem(`tasks:`, JSON.stringify(tasks) || '[]');
        TaskModel.style.display = 'none';
        // TODO: Implement task saving functionality
    });
});

function renderTasks() {
    const tasksContainer = document.querySelector('.tasks-container');
    const tasks = JSON.parse(localStorage.getItem('tasks:')) || [];
    tasksContainer.innerHTML = '';}