import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DeleteOutlined } from '@ant-design/icons';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const TodoInputWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

const TodoInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const AddButton = styled.button`
  padding: 8px 16px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 4px;
`;

const FilterWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

const FilterButton = styled.button`
  background: none;
  border: none;
  color: black;
  position: relative;
  cursor: pointer;
`;

const FilterLine = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: ${({ active }) => active ? 'blue' : 'transparent'};
`;

const ClearAllTodo = styled.button`
  padding: 8px 16px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
`;

const TodoList = styled.ul`
  list-style: none;
  padding: 0;
  width: 50%;
`;

const TodoItem = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
`;

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const completeTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const deleteAllCompletedTasks = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'active') {
      return !task.completed;
    } else if (filter === 'completed') {
      return task.completed;
    }
    return true;
  });

  return (
    <Container>
      <h1>#todo</h1>

      <TodoInputWrapper>
        <TodoInput
          type="text"
          placeholder="Add details"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') addTask();
          }}
        />
        <AddButton onClick={addTask}>Add</AddButton>
      </TodoInputWrapper>

      <FilterWrapper>
        <FilterButton onClick={() => handleFilterChange('all')}>
          All
          <FilterLine active={filter === 'all'} />
        </FilterButton>
        <FilterButton onClick={() => handleFilterChange('active')}>
          Active
          <FilterLine active={filter === 'active'} />
        </FilterButton>
        <FilterButton onClick={() => handleFilterChange('completed')}>
          Completed
          <FilterLine active={filter === 'completed'} />
        </FilterButton>
      </FilterWrapper>

      <TodoList>
        {filteredTasks.map(task => (
          <TodoItem key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => completeTask(task.id)}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.text}</span>
            {filter === 'completed' && (
              <button onClick={() => deleteTask(task.id)}><DeleteOutlined /></button>
            )}
          </TodoItem>
        ))}
      </TodoList>

      {filter === 'completed' && tasks.some(task => task.completed) && (
        <ClearAllTodo onClick={deleteAllCompletedTasks}>Delete All</ClearAllTodo>
      )}
    </Container>
  );
}

export default App;
