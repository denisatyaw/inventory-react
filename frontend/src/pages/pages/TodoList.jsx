import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, MoreVertical, Calendar, Clock, Tag, CheckCircle, AlertCircle, Timer, X } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import { useNotification } from '../../context/NotificationContext';

const initialData = {
  tasks: {
    'task-1': { 
      id: 'task-1', 
      title: 'Create new homepage design',
      description: 'Design a modern homepage layout with improved UX',
      category: 'Design',
      priority: 'High',
      dueDate: '2024-03-20',
      assignee: 'John Doe'
    },
    'task-2': { 
      id: 'task-2', 
      title: 'Implement authentication',
      description: 'Add user authentication using JWT',
      category: 'Development',
      priority: 'Medium',
      dueDate: '2024-03-22',
      assignee: 'Jane Smith'
    },
    'task-3': { 
      id: 'task-3', 
      title: 'Write API documentation',
      description: 'Document all API endpoints and their usage',
      category: 'Documentation',
      priority: 'Low',
      dueDate: '2024-03-25',
      assignee: 'Bob Johnson'
    },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2'],
      color: 'bg-red-500'
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: ['task-3'],
      color: 'bg-yellow-500'
    },
    'column-3': {
      id: 'column-3',
      title: 'Review',
      taskIds: [],
      color: 'bg-blue-500'
    },
    'column-4': {
      id: 'column-4',
      title: 'Done',
      taskIds: [],
      color: 'bg-green-500'
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
};

const TodoList = () => {
  const [data, setData] = useState(initialData);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'Medium',
    dueDate: '',
    assignee: ''
  });
  const { success } = useNotification();

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newState);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newState);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    
    const taskId = `task-${Object.keys(data.tasks).length + 1}`;
    const newTaskData = {
      id: taskId,
      ...newTask
    };

    const newState = {
      ...data,
      tasks: {
        ...data.tasks,
        [taskId]: newTaskData
      },
      columns: {
        ...data.columns,
        'column-1': {
          ...data.columns['column-1'],
          taskIds: [...data.columns['column-1'].taskIds, taskId]
        }
      }
    };

    setData(newState);
    setIsAddModalOpen(false);
    setNewTask({
      title: '',
      description: '',
      category: '',
      priority: 'Medium',
      dueDate: '',
      assignee: ''
    });
    success('Task added successfully!');
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getColumnIcon = (columnId) => {
    switch (columnId) {
      case 'column-1':
        return <AlertCircle size={20} className="text-white" />;
      case 'column-2':
        return <Timer size={20} className="text-white" />;
      case 'column-3':
        return <CheckCircle size={20} className="text-white" />;
      case 'column-4':
        return <CheckCircle size={20} className="text-white" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Todo List</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your tasks and projects</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <Plus size={20} />
          <span>Add Task</span>
        </button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4">
        <DragDropContext onDragEnd={onDragEnd}>
          {data.columnOrder.map(columnId => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map(taskId => data.tasks[taskId]);

            return (
              <div key={column.id} className="flex-1 min-w-[320px]">
                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="bg-gray-50 rounded-lg"
                    >
                      <div className={`${column.color} p-4 rounded-t-lg`}>
                        <div className="flex items-center justify-between text-white">
                          <div className="flex items-center gap-2">
                            {getColumnIcon(column.id)}
                            <h2 className="font-medium">{column.title}</h2>
                            <span className="text-white/80">({tasks.length})</span>
                          </div>
                          <button className="p-1 hover:bg-white/10 rounded-lg">
                            <MoreVertical size={16} className="text-white" />
                          </button>
                        </div>
                      </div>

                      <div className="p-4 space-y-3">
                        {tasks.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`bg-white p-4 rounded-lg shadow-sm ${
                                  snapshot.isDragging ? 'shadow-lg' : ''
                                }`}
                                style={{
                                  ...provided.draggableProps.style,
                                }}
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <h3 className="font-medium">{task.title}</h3>
                                  <button className="p-1 hover:bg-gray-100 rounded-lg">
                                    <MoreVertical size={16} className="text-gray-400" />
                                  </button>
                                </div>
                                <p className="text-sm text-gray-500 mb-3">{task.description}</p>
                                <div className="flex flex-wrap gap-2 mb-3">
                                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                    {task.category}
                                  </span>
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                                    {task.priority}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                  <div className="flex items-center gap-2">
                                    <Calendar size={14} />
                                    <span>{task.dueDate}</span>
                                  </div>
                                  <span>{task.assignee}</span>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </DragDropContext>
      </div>

      {/* Add Task Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Task"
      >
        <form onSubmit={handleAddTask} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              rows="3"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Due Date</label>
              <input
                type="date"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Assignee</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                value={newTask.assignee}
                onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Add Task
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TodoList;