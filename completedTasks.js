
function getTaskKey() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        return 'tasks:' + currentUser.email;
    }
    return 'tasks:';
}

//Render completed tasks
function renderCompletedTasks() {
    const container = document.querySelector('.completed-tasks-container');
    const completedKey = getTaskKey() + 'completed';
    const completedTasks = JSON.parse(localStorage.getItem(completedKey)) || [];
    
    // Keep the header
    const header = container.querySelector('.flex');
    
    container.innerHTML = '';
    container.appendChild(header);
    
    if (completedTasks.length === 0) {
        const emptyState = document.createElement('p');
        emptyState.className = 'text-center text-on-surface-variant py-8';
        emptyState.textContent = 'No completed tasks yet. Get started with your tasks!';
        container.appendChild(emptyState);
        return;
    }
    
    // Render each completed task
    completedTasks.forEach((task, index) => {
        const article = document.createElement('article');
        article.className = 'bg-surface-container-lowest editorial-shadow rounded-xl p-6 flex items-center gap-6 group hover:bg-surface-container-low transition-all duration-300';
        
        // Check mark
        const checkDiv = document.createElement('div');
        checkDiv.className = 'flex-shrink-0';
        const checkCircle = document.createElement('div');
        checkCircle.className = 'w-8 h-8 rounded-full bg-primary flex items-center justify-center';
        const checkIcon = document.createElement('span');
        checkIcon.className = 'material-symbols-outlined text-white text-lg';
        checkIcon.textContent = 'check';
        checkCircle.appendChild(checkIcon);
        checkDiv.appendChild(checkCircle);
        
        // Task info
        const infoDiv = document.createElement('div');
        infoDiv.className = 'flex-grow';
        
        const title = document.createElement('h5');
        title.className = 'font-body text-lg font-semibold text-on-surface-variant line-through decoration-1 opacity-70 group-hover:opacity-100 transition-opacity';
        title.textContent = task.title;
        
        const metaDiv = document.createElement('div');
        metaDiv.className = 'flex items-center gap-4 mt-1';
        
        // Date completed
        const dateSpan = document.createElement('span');
        dateSpan.className = 'flex items-center gap-1 font-label text-xs text-outline';
        const dateIcon = document.createElement('span');
        dateIcon.className = 'material-symbols-outlined text-[14px]';
        dateIcon.textContent = 'event_available';
        const dateText = document.createElement('span');
        const completedDate = new Date(task.completedAt);
        dateText.textContent = completedDate.toLocaleDateString() + ', ' + completedDate.toLocaleTimeString();
        dateSpan.appendChild(dateIcon);
        dateSpan.appendChild(dateText);
        
        // Priority badge
        if (task.priority) {
            const prioritySpan = document.createElement('span');
            prioritySpan.className = 'px-2 py-0.5 rounded bg-secondary-container/30 text-on-secondary-container font-label text-[10px] uppercase tracking-wider';
            prioritySpan.textContent = task.priority;
            metaDiv.appendChild(prioritySpan);
        }
        
        metaDiv.appendChild(dateSpan);
        infoDiv.appendChild(title);
        infoDiv.appendChild(metaDiv);
        
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'opacity-0 group-hover:opacity-100 p-2 text-outline hover:text-error transition-all';
        deleteBtn.onclick = () => deleteCompletedTask(index);
        const deleteIcon = document.createElement('span');
        deleteIcon.className = 'material-symbols-outlined';
        deleteIcon.textContent = 'delete';
        deleteBtn.appendChild(deleteIcon);
        
        article.appendChild(checkDiv);
        article.appendChild(infoDiv);
        article.appendChild(deleteBtn);
        
        container.appendChild(article);
    });
}

// Delete completed task
function deleteCompletedTask(index) {
    const completedKey = getTaskKey() + 'completed';
    const completedTasks = JSON.parse(localStorage.getItem(completedKey)) || [];
    completedTasks.splice(index, 1);
    localStorage.setItem(completedKey, JSON.stringify(completedTasks));
    renderCompletedTasks();
}

// Clear all completed tasks
function clearAllCompleted() {
        const completedKey = getTaskKey() + 'completed';
        localStorage.setItem(completedKey, JSON.stringify([]))
        Swal.fire({
  title: "All Clear!",
  icon: "success",
  draggable: true
});
        renderCompletedTasks();
    }


function setActiveSidebarLink() {
  const sidebarNav = document.querySelector('nav.space-y-1');
  if (!sidebarNav) return;
  
  const links = sidebarNav.querySelectorAll('a');
  const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
  
  // Reset all links
  links.forEach(link => {
    link.classList.remove(
      "bg-indigo-100/50",
      "dark:bg-indigo-900/30",
      "text-indigo-800",
      "dark:text-indigo-200",
      "font-bold"
    );
    link.classList.add(
      "text-slate-600",
      "dark:text-slate-400",
      "hover:bg-slate-200",
      "dark:hover:bg-slate-800"
    );
  });
  
  // Activate matching link only
  links.forEach(link => {
    const linkPage = link.getAttribute('href').replace('.html', '');
    if (linkPage === currentPage) {
      link.classList.add(
        "bg-indigo-100/50",
        "dark:bg-indigo-900/30",
        "text-indigo-800",
        "dark:text-indigo-200",
        "font-bold"
      );
      link.classList.remove(
        "text-slate-600",
        "dark:text-slate-400",
        "hover:bg-slate-200",
        "dark:hover:bg-slate-800"
      );
    }
  });
}

// Run sidebar logic
setActiveSidebarLink();


// Render on page load
document.addEventListener('DOMContentLoaded', () => {
    renderCompletedTasks();
});

