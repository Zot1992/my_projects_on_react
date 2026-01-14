import { useState, useEffect, memo } from 'react'

export const Statistics = memo(function Statistics({ notes = [], categories = [] }) {

    const [fixedNotes, setFixedNotes] = useState(0);
    const [todayNotes, setToday] = useState(0);

    useEffect(() => {
        const fixed = notes.filter(note => note.isPinned === true).length;
        const today = new Date().toDateString();
        const toDayNotes = notes.filter(n => new Date(n.createdAt).toDateString() === today).length;

        setFixedNotes(fixed);
        setToday(toDayNotes);
    }, [notes])


    return (
        <div className="p-4 bg-white rounded-2xl">
            <div className="flex flex-col items-center gap-4">
                <div className="p-4 w-full bg-gray-100 rounded-2xl flex flex-row justify-center gap-4 transition-shadow duration-300 hover:shadow-md">
                    <span>📝</span>
                    <p>Всего заметок: <strong>{notes.length}</strong></p>
                </div>
                <div className="p-4 w-full bg-gray-100 rounded-2xl flex flex-row justify-center gap-4 transition-shadow duration-300 hover:shadow-md">
                    <span>📁</span>
                    <p>Категории: <strong>{categories.length}</strong></p>
                </div>
                {/* <div className="p-4 w-full bg-gray-100 rounded-2xl flex flex-row justify-center gap-4 transition-shadow duration-300 hover:shadow-md">
                    <span>📌</span>
                    <p>Закрепленных: <strong>{fixedNotes}</strong></p>
                </div> */}
                <div className="p-4 w-full bg-gray-100 rounded-2xl flex flex-row justify-center gap-4 transition-shadow duration-300 hover:shadow-md">
                    <span>📅</span>
                    <p>Созданные сегодня: <strong>{todayNotes}</strong></p>
                </div>
            </div>
        </div>
    )
})