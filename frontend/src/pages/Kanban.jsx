import React, { useState, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Plus, MoreVertical, X, Edit, Trash2, Image as ImageIcon } from 'lucide-react';

const ItemTypes = {
  CARD: 'card'
};

const initialColumns = {
  todo: {
    id: 'todo',
    title: 'To Do',
    color: 'bg-blue-500',
    cards: [
      { 
        id: '1', 
        title: 'Research market trends', 
        description: 'Analyze current market trends and competitors', 
        priority: 'high',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      { 
        id: '2', 
        title: 'Update documentation', 
        description: 'Review and update project documentation', 
        priority: 'medium' 
      }
    ]
  },
  inProgress: {
    id: 'inProgress',
    title: 'In Progress',
    color: 'bg-amber-500',
    cards: [
      { 
        id: '3', 
        title: 'Implement new feature', 
        description: 'Add drag and drop functionality to the board', 
        priority: 'high',
        image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  review: {
    id: 'review',
    title: 'Review',
    color: 'bg-purple-500',
    cards: []
  },
  done: {
    id: 'done',
    title: 'Done',
    color: 'bg-green-500',
    cards: [
      { 
        id: '6', 
        title: 'Setup project', 
        description: 'Initial project setup and configuration', 
        priority: 'medium' 
      }
    ]
  }
};

const NewCardForm = ({ onSubmit, onCancel, editCard = null }) => {
  const [title, setTitle] = useState(editCard?.title || '');
  const [description, setDescription] = useState(editCard?.description || '');
  const [priority, setPriority] = useState(editCard?.priority || 'medium');
  const [imageUrl, setImageUrl] = useState(editCard?.image || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onSubmit({
      id: editCard?.id || Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      priority,
      image: imageUrl.trim()
    });

    setTitle('');
    setDescription('');
    setPriority('medium');
    setImageUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-sm mb-3">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-medium text-gray-900">{editCard ? 'Edit Card' : 'New Card'}</h4>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={16} />
        </button>
      </div>
      <input
        type="text"
        placeholder="Card title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full mb-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="2"
      />
      <input
        type="url"
        placeholder="Image URL (optional)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="w-full mb-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex justify-between items-center">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {editCard ? 'Save Changes' : 'Add Card'}
        </button>
      </div>
    </form>
  );
};

const Card = ({ id, title, description, priority, image, columnId, moveCard, onEdit, onDelete }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { id, columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const priorityColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };

  return (
    <div
      ref={drag}
      className={`bg-white rounded-lg shadow-sm mb-3 cursor-move ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {image && (
        <div className="relative h-40 rounded-t-lg overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium text-gray-900">{title}</h4>
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <MoreVertical size={16} />
            </button>
            {showDropdown && (
              <div 
                ref={dropdownRef}
                className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-10 border"
              >
                <button
                  onClick={() => {
                    onEdit();
                    setShowDropdown(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Edit size={14} className="mr-2" />
                  Edit Card
                </button>
                <button
                  onClick={() => {
                    onDelete();
                    setShowDropdown(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  <Trash2 size={14} className="mr-2" />
                  Delete Card
                </button>
              </div>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-3">{description}</p>
        <div className="flex items-center justify-between">
          <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[priority]}`}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

const Column = ({ id, title, color, cards, moveCard }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item) => moveCard(item.id, item.columnId, id),
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }));

  const [isAddingCard, setIsAddingCard] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  const handleEditCard = (card) => {
    setEditingCard(card);
  };

  const handleDeleteCard = (cardId) => {
    moveCard(cardId, id, null);
  };

  const handleCardUpdate = (updatedCard) => {
    if (editingCard) {
      // Update existing card
      moveCard(updatedCard.id, id, id, updatedCard);
      setEditingCard(null);
    } else {
      // Add new card
      moveCard(updatedCard.id, null, id, updatedCard);
      setIsAddingCard(false);
    }
  };

  return (
    <div
      ref={drop}
      className={`bg-gray-100 rounded-lg w-80 flex-shrink-0 flex flex-col ${
        isOver ? 'bg-gray-200' : ''
      }`}
    >
      <div className={`${color} text-white p-4 rounded-t-lg`}>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{title}</h3>
          <div className="flex items-center space-x-2">
            <span className="bg-white bg-opacity-30 text-white text-sm px-2 py-1 rounded">
              {cards.length}
            </span>
            <button
              onClick={() => setIsAddingCard(true)}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className="p-4 flex-1 overflow-y-auto">
        {(isAddingCard || editingCard) && (
          <NewCardForm
            onSubmit={handleCardUpdate}
            onCancel={() => {
              setIsAddingCard(false);
              setEditingCard(null);
            }}
            editCard={editingCard}
          />
        )}
        <div className="space-y-3">
          {cards.length > 0 ? (
            cards.map((card) => (
              <Card
                key={card.id}
                {...card}
                columnId={id}
                moveCard={moveCard}
                onEdit={() => handleEditCard(card)}
                onDelete={() => handleDeleteCard(card.id)}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-gray-400">
              <ImageIcon size={48} className="mb-2" />
              <p className="text-sm">No cards yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const KanbanBoard = () => {
  const [columns, setColumns] = useState(initialColumns);

  const moveCard = (cardId, sourceColumnId, targetColumnId, updatedCard = null) => {
    setColumns(prev => {
      const newColumns = { ...prev };
      
      if (sourceColumnId === null && targetColumnId && updatedCard) {
        // Adding a new card
        newColumns[targetColumnId].cards.push(updatedCard);
      } else if (sourceColumnId && targetColumnId === null) {
        // Deleting a card
        newColumns[sourceColumnId].cards = newColumns[sourceColumnId].cards.filter(c => c.id !== cardId);
      } else if (sourceColumnId === targetColumnId && updatedCard) {
        // Updating an existing card
        newColumns[sourceColumnId].cards = newColumns[sourceColumnId].cards.map(c =>
          c.id === cardId ? updatedCard : c
        );
      } else if (sourceColumnId && targetColumnId) {
        // Moving a card between columns
        const card = newColumns[sourceColumnId].cards.find(c => c.id === cardId);
        newColumns[sourceColumnId].cards = newColumns[sourceColumnId].cards.filter(c => c.id !== cardId);
        newColumns[targetColumnId].cards.push(card);
      }
      
      return newColumns;
    });
  };

  return (
    <div className="h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Kanban Board</h2>
        <p className="mt-2 text-gray-600">Manage your tasks and projects with drag and drop functionality.</p>
      </div>
      
      <DndProvider backend={HTML5Backend}>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {Object.values(columns).map((column) => (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              color={column.color}
              cards={column.cards}
              moveCard={moveCard}
            />
          ))}
        </div>
      </DndProvider>
    </div>
  );
};

export default KanbanBoard;