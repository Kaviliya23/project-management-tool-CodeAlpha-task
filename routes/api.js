const express = require('express');
const router = express.Router();

let projects = [];

// Create a new project
router.post('/projects', (req, res) => {
    const project = { id: Date.now(), ...req.body, tasks: [] };
    projects.push(project);
    res.status(201).json(project);
});

// Get all projects
router.get('/projects', (req, res) => {
    res.json(projects);
});

// Update a project
router.put('/projects/:projectId', (req, res) => {
    const projectId = parseInt(req.params.projectId);
    const project = projects.find(p => p.id === projectId);
    if (project) {
        project.name = req.body.name;
        res.json(project);
    } else {
        res.status(404).json({ message: 'Project not found' });
    }
});

// Delete a project
router.delete('/projects/:projectId', (req, res) => {
    projects = projects.filter(p => p.id !== parseInt(req.params.projectId));
    res.status(204).end();
});

// Create a new task inside a project
router.post('/projects/:projectId/tasks', (req, res) => {
    const projectId = parseInt(req.params.projectId);
    const project = projects.find(p => p.id === projectId);
    if (project) {
        const task = { id: Date.now(), ...req.body, comments: [] };
        project.tasks.push(task);
        res.status(201).json(task);
    } else {
        res.status(404).json({ message: 'Project not found' });
    }
});

// Update a task
router.put('/projects/:projectId/tasks/:taskId', (req, res) => {
    const projectId = parseInt(req.params.projectId);
    const taskId = parseInt(req.params.taskId);
    const project = projects.find(p => p.id === projectId);
    if (project) {
        const task = project.tasks.find(t => t.id === taskId);
        if (task) {
            task.name = req.body.name;
            res.json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } else {
        res.status(404).json({ message: 'Project not found' });
    }
});

// Delete a task
router.delete('/projects/:projectId/tasks/:taskId', (req, res) => {
    const projectId = parseInt(req.params.projectId);
    const taskId = parseInt(req.params.taskId);
    const project = projects.find(p => p.id === projectId);
    if (project) {
        project.tasks = project.tasks.filter(t => t.id !== taskId);
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Project not found' });
    }
});

// Add a comment to a task
router.post('/projects/:projectId/tasks/:taskId/comments', (req, res) => {
    const projectId = parseInt(req.params.projectId);
    const taskId = parseInt(req.params.taskId);
    const project = projects.find(p => p.id === projectId);
    if (project) {
        const task = project.tasks.find(t => t.id === taskId);
        if (task) {
            const comment = { id: Date.now(), ...req.body };
            task.comments.push(comment);
            res.status(201).json(comment);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } else {
        res.status(404).json({ message: 'Project not found' });
    }
});


// Update a comment
router.put('/projects/:projectId/tasks/:taskId/comments/:commentId', (req, res) => {
    const projectId = parseInt(req.params.projectId);
    const taskId = parseInt(req.params.taskId);
    const commentId = parseInt(req.params.commentId);
    const project = projects.find(p => p.id === projectId);
    if (project) {
        const task = project.tasks.find(t => t.id === taskId);
        if (task) {
            const comment = task.comments.find(c => c.id === commentId);
            if (comment) {
                comment.text = req.body.text;
                res.json(comment);
            } else {
                res.status(404).json({ message: 'Comment not found' });
            }
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } else {
        res.status(404).json({ message: 'Project not found' });
    }
});

// Delete a comment
router.delete('/projects/:projectId/tasks/:taskId/comments/:commentId', (req, res) => {
    const projectId = parseInt(req.params.projectId);
    const taskId = parseInt(req.params.taskId);
    const commentId = parseInt(req.params.commentId);
    const project = projects.find(p => p.id === projectId);
    if (project) {
        const task = project.tasks.find(t => t.id === taskId);
        if (task) {
            task.comments = task.comments.filter(c => c.id !== commentId);
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } else {
        res.status(404).json({ message: 'Project not found' });
    }
});

module.exports = router;
