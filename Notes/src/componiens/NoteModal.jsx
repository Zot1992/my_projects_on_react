
export const NoteModal = ({ note, category, onClose, onEdit, onDelete }) => {

    const formatedDate = new Date(note.updatedAt).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={onClose}>
            <div className='bg-white p-6 rounded-2xl shadow-xl max-w-md w-full' onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-col items-center gap-4">
                    <button className="px-2 py-0.1 bg-gray-200 border-2 border-transparent rounded-2xl text-gray-600 font-semibold cursor-pointer transition-all duration-300 
    hover:bg-blue-500 hover:text-white hover:border-blue-500"
                        onClick={onClose}>X</button>
                    <div className="flex gap-8">
                        <div className="flex flex-col items-center gap-4">
                            <h2 className="text-2xl">{note.title}</h2>
                            <span className="px-3 py-1 rounded-full text-xs font-medium text-white"
                                style={{ backgroundColor: category.color }}><strong>{category.name}</strong></span>
                        </div>
                    </div>
                    <div>
                        <p>{note.content}</p>
                    </div>
                    <div>
                        <span>Изменено: <strong>{formatedDate}</strong></span>
                    </div>
                    <div className="flex flex-row gap-4">
                        <button className="border-2 border-transparent rounded-2xl text-gray-600 font-semibold cursor-pointer transition-all duration-300 
    hover:bg-blue-500 hover:text-white hover:border-blue-500"
                            onClick={() => {
                                onEdit(note)
                                onClose()
                            }}>✏️</button>
                        <button className="border-2 border-transparent rounded-2xl text-gray-600 font-semibold cursor-pointer transition-all duration-300 
    hover:bg-blue-500 hover:text-white hover:border-blue-500"
                            onClick={() => {
                                onDelete(note.id)
                                onClose()
                            }}>🗑️</button>
                    </div>
                </div>
            </div>
        </div>
    )
}