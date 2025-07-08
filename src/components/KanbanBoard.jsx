// src/components/KanbanBoard.jsx
import React, { useEffect, useState } from 'react';
import dragula from 'dragula';
import 'dragula/dist/dragula.min.css';
import './KanbanBoard.css';

const initialTasks = [
  { id: 1, title: 'Book container pickup', status: 'backlog' },
  { id: 2, title: 'Send invoice to carrier', status: 'backlog' },
  { id: 3, title: 'Confirm delivery date', status: 'backlog' }
];

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    const containers = [
      document.getElementById('backlog'),
      document.getElementById('in-progress'),
      document.getElementById('complete')
    ];

    const drake = dragula(containers);

    drake.on('drop', (el, target) => {
      const movedTaskId = parseInt(el.dataset.id);
      const newStatus = target.id;

      const updatedTasks = tasks.map(task =>
        task.id === movedTaskId ? { ...task, status: newStatus } : task
      );
      setTasks(updatedTasks);
    });
  }, [tasks]);

  const renderTasks = (status) =>
    tasks
      .filter(task => task.status === status)
      .map(task => (
        <div
          key={task.id}
          data-id={task.id}
          className={`task-card ${status}`}
        >
          {task.title}
        </div>
      ));

  return (
    <div className="kanban-board">
      <div className="Swimlane-column" id="backlog">
        <h3>Backlog</h3>
        {renderTasks('backlog')}
      </div>
      <div className="Swimlane-column" id="in-progress">
        <h3>In Progress</h3>
        {renderTasks('in-progress')}
      </div>
      <div className="Swimlane-column" id="complete">
        <h3>Complete</h3>
        {renderTasks('complete')}
      </div>
    </div>
  );
};

export default KanbanBoard;
