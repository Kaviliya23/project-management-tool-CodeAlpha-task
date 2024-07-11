async function createProject() {
    const name = document.getElementById('projectName').value;
    if (name) {
        const response = await fetch('/api/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
        const project = await response.json();
        displayProject(project);
    }
}

async function updateProject(projectId, newName) {
    const response = await fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName })
    });
    const updatedProject = await response.json();
    document.getElementById(`project-name-${projectId}`).innerText = updatedProject.name;
}

async function deleteProject(projectId) {
    await fetch(`/api/projects/${projectId}`, { method: 'DELETE' });
    document.getElementById(`project-${projectId}`).remove();
}

function displayProject(project) {
    const projectsDiv = document.getElementById('projects');
    const projectDiv = document.createElement('div');
    projectDiv.className = 'project';
    projectDiv.id = `project-${project.id}`;
    projectDiv.innerHTML = `
        <h3 id="project-name-${project.id}">${project.name}</h3>
        <input type="text" placeholder="Edit Project Name" onkeypress="if(event.keyCode == 13) updateProject(${project.id}, this.value)">
        <button onclick="deleteProject(${project.id})">Delete Project</button>
        <input type="text" placeholder="Task Name" onkeypress="if(event.keyCode == 13) createTask(${project.id}, this)">
        <div class="tasks" id="tasks-${project.id}"></div>
    `;
    projectsDiv.appendChild(projectDiv);
}

async function createTask(projectId, input) {
    const name = input.value;
    if (name) {
        const response = await fetch(`/api/projects/${projectId}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
        const task = await response.json();
        displayTask(projectId, task);
        input.value = '';
    }
}

async function updateTask(projectId, taskId, newName) {
    const response = await fetch(`/api/projects/${projectId}/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName })
    });
    const updatedTask = await response.json();
    document.getElementById(`task-name-${taskId}`).innerText = updatedTask.name;
}

async function deleteTask(projectId, taskId) {
    await fetch(`/api/projects/${projectId}/tasks/${taskId}`, { method: 'DELETE' });
    document.getElementById(`task-${taskId}`).remove();
}

function displayTask(projectId, task) {
    const tasksDiv = document.getElementById(`tasks-${projectId}`);
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    taskDiv.id = `task-${task.id}`;
    taskDiv.innerHTML = `
        <h4 id="task-name-${task.id}">${task.name}</h4>
        <input type="text" placeholder="Edit Task Name" onkeypress="if(event.keyCode == 13) updateTask(${projectId}, ${task.id}, this.value)">
        <button onclick="deleteTask(${projectId}, ${task.id})">Delete Task</button>
        <input type="text" placeholder="Comment" onkeypress="if(event.keyCode == 13) addComment(${projectId}, ${task.id}, this)">
        <div class="comments" id="comments-${task.id}"></div>
    `;
    tasksDiv.appendChild(taskDiv);
    // Display existing comments
    task.comments.forEach(comment => displayComment(projectId, task.id, comment));
}

async function addComment(projectId, taskId, input) {
    const text = input.value;
    if (text) {
        const response = await fetch(`/api/projects/${projectId}/tasks/${taskId}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
        const comment = await response.json();
        displayComment(projectId, taskId, comment);
        input.value = '';
    }
}

async function updateComment(projectId, taskId, commentId, newText) {
    const response = await fetch(`/api/projects/${projectId}/tasks/${taskId}/comments/${commentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newText })
    });
    const updatedComment = await response.json();
    document.getElementById(`comment-text-${commentId}`).innerText = updatedComment.text;
}

async function deleteComment(projectId, taskId, commentId) {
    await fetch(`/api/projects/${projectId}/tasks/${taskId}/comments/${commentId}`, { method: 'DELETE' });
    document.getElementById(`comment-${commentId}`).remove();
}

function displayComment(projectId, taskId, comment) {
    const commentsDiv = document.getElementById(`comments-${taskId}`);
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.id = `comment-${comment.id}`;
    commentDiv.innerHTML = `
        <p id="comment-text-${comment.id}">${comment.text}</p>
        <input type="text" placeholder="Edit Comment" onkeypress="if(event.keyCode == 13) updateComment(${projectId}, ${taskId}, ${comment.id}, this.value)">
        <button onclick="deleteComment(${projectId}, ${taskId}, ${comment.id})">Delete Comment</button>
    `;
    commentsDiv.appendChild(commentDiv);
}
