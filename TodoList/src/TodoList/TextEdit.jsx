import React, { useState } from 'react';

const TextEdit = ({ task, onUpdate }) => {

    const [editText, setEditText] = useState(task.text);

    const handleSave = () => {
        const trimmed = editText.trim();
        if (trimmed && trimmed !== task.text) {
            onUpdate(task.id, trimmed);
        }

    }

    const KeyboardTrig = (e) => {

        switch (e.key) {
            case 'Enter':
                handleSave();
                break;
            case 'Escape':

                setEditText(task.text);
                break;

            default:
                break;
        }
    }

    return (
        <div className="edit">
            <input
                type="text"
                placeholder="Введите новую задачу"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={KeyboardTrig}
            />
            <button onClick={handleSave}>Сохранить</button>
        </div>
    )
}

export default TextEdit