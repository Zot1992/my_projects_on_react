import { memo } from 'react'

export const NoteCard = memo(function NoteCard({ note, category, onNoteClick, onTogglePin }) {

    const preview = note.content.length > 100 ? note.content.slice(0, 100) + '...' : note.content || '';
    const formattingDate = () => new Date(note.updatedAt).toLocaleDateString('ru-RU');

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm cursor-pointer transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
            onClick={() => onNoteClick(note)}>

            {/* {note.isPinned && (
                <span className="border-2 border-transparent rounded-2xl text-gray-600 font-semibold cursor-pointer transition-all duration-300 hover:bg-blue-500 
       hover:text-white hover:border-blue-500"
                    onClick={(e) => {
                        onTogglePin(note.id);
                        e.stopPropagation();
                    }}>📌</span>
            )} */}

            <header className="flex flex-col items-center gap-4">
                <h3 className="text-2xl">{note.title}</h3>
                {category && (<span className="px-3 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: category.color }}>{category.name}</span>)}
            </header>

            <div className="flex flex-col items-center gap-4">
                <p>{preview}</p>
                <footer className="flex flex-col gap-4">
                    <span className="font-bold">{formattingDate()}</span>
                </footer>
            </div>
        </div>
    )
})