import React, { useState, FormEvent } from 'react';
import ThemeToggle from './ThemeToggle';
import './Todo.scss';

interface Task {
	id: number;
	text: string;
	completed: boolean;
	date: string; //добавляем дату
}

interface TodoProps {
	onThemeToggle: () => void;
}

const Todo: React.FC<TodoProps> = ({ onThemeToggle }) => {
	const [inputValue, setInputValue] = useState<string>('');
	const [tasks, setTasks] = useState<Task[]>([]); //массив задач

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Здесь добавить логику добавления задачи
		if (inputValue.trim() === '') {
			return;
		}

		const newTask: Task = {
			id: Date.now(), // уникальный id
			text: inputValue,
			completed: false,
			date: new Date().toLocaleDateString(), // текущая дата
		};

		setTasks([...tasks, newTask]);
		setInputValue('');
	};

	const toggleComplete = (id: number) => {
		const updatedTasks = tasks.map((task) => {
			if (task.id === id) {
				return {
					...task,
					completed: !task.completed,
				};
			}
			return task;
		});

		setTasks(updatedTasks);
	};

	const deleteTask = (id: number) => {
		const updatedTasks = tasks.filter((task) => task.id !== id);
		setTasks(updatedTasks);
	};

	return (
		<div className='todo-container'>
			<div className='todo-header'>
				<h1>Список задач</h1>
				<ThemeToggle onClick={onThemeToggle} />
			</div>

			<form className='input-section' onSubmit={handleSubmit}>
				<input
					type='text'
					className='task-input'
					placeholder='Введите новую задачу'
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
				/>
				<button type='submit' className='add-button'>
					Добавить
				</button>
			</form>

			<div className='tasks-list'>
				{
					/* Здесь должны отображаться задачи */
					tasks.map((task) => (
						<div
							key={task.id}
							className={`task-item ${task.completed ? 'completed' : ''}`}>
							<div
								onClick={() => toggleComplete(task.id)}
								className='task-text'>
								{task.text}
							</div>
							<div className='task-date'>{task.date}</div>
							<button
								onClick={() => deleteTask(task.id)}
								className='delete-button'>
								Удалить
							</button>
						</div>
					))
				}
			</div>
		</div>
	);
};

export default Todo;
