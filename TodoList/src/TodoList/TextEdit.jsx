import React, { useState } from 'react'

function TextEdit(props) { //Редактирование задачи

    const [inputValue, setInputValue] = useState('');

    const edit = () => {
        const trimmed = inputValue.trim();

        props.setTasks(prevTasks => prevTasks.map(task => (task.id === props.taskId && trimmed !== '') ? ({ ...task, text: trimmed }) : task))
        props.onClose();
    }

    return (
        <div id='edit'>
            <input type="text"
                placeholder='Введите новую задачу'
                value={inputValue} onChange={(event) => setInputValue(event.target.value)}
                onKeyPress={(event) => event.key === 'Enter' && edit(props.tasks.id)} />
            <button onClick={edit}>Применить</button>
        </div>
    )
}

export default TextEdit