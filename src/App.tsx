import React, { useState, useEffect } from 'react';
import Todo from './components/Todo';
import './App.scss';

const App: React.FC = () => {
	const [theme, setTheme] = useState<'light' | 'dark'>('light');

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
	};

	return (
		<div className='App'>
			{/* Передаем функцию переключения темы в Todo */}
			<Todo onThemeToggle={toggleTheme} />
		</div>
	);
};

export default App;
