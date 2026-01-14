import { useState } from 'react'

export const CategoryManager = ({ categories = [], notes = [], onAddCategory, onUpdateCategory, onDeleteCategory }) => {

    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({});

    const PRESET_COLORS = [
        '#FF6B6B',
        '#4ECDC4',
        '#45B7D1',
        '#96CEB4',
        '#FFEAA7',
        '#DDA0DD',
        '#98D8C8',
        '#F7DC6F',
        '#BB8FCE',
        '#F8C471'
    ]

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.name && formData.name.length > 0) {

            if (editingId !== null) {
                onUpdateCategory(editingId, formData);
                setEditingId(null)
            } else {
                const newCategory = {
                    id: crypto.randomUUID(),
                    name: formData.name,
                    color: formData.color
                }

                onAddCategory(newCategory);
            }
        }

        setFormData({});
        setIsAdding(false);
    }


    const handleEdit = (category) => {
        setEditingId(category.id);
        setFormData({ name: category.name, color: category.color });
        setIsAdding(true)
    }

    const handleDelete = (categoryId) => {
        if (categoryId) {

            const categoryNotes = notes.filter(note => note.categoryId === categoryId);

            if (categoryNotes.length > 0) {
                if (window.confirm('Удалить категорию и все заметки из нее?')) {
                    onDeleteCategory(categoryId);
                } else {
                    return
                }
            } else {
                if (window.confirm('Удалить данную категорию?')) {
                    onDeleteCategory(categoryId);
                }
            }
        }
    }

    return (
        <div className='bg-white mb-4 mt-4 p-4 rounded-2xl'>
            <div className='mb-4 flex flex-col items-center gap-4'>
                <h2 className='text-2xl'>Управление категориями</h2>
                <button type='button' className='p-2 border-2 border-transparent rounded-2xl bg-gray-100 text-gray-600 font-semibold cursor-pointer transition-all duration-300 
    hover:bg-blue-500 hover:text-white hover:border-blue-500' onClick={() => setIsAdding(true)}>Добавить</button>
            </div>
            {isAdding && (
                <form action="" className='flex flex-col gap-4 w-full mb-4 mt-4' onSubmit={handleSubmit}>
                    <input type="text"
                        value={formData.name || ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Название категории"
                        className="border border-gray-300 rounded px-3 py-2"
                    />

                    <div>
                        {PRESET_COLORS.map((col, i) => (
                            <button key={i}
                                className='w-8 h-8 m-2 rounded-full cursor-pointer border-gray-800 transition-transform duration-200 hover:-translate-y-1'
                                style={{ backgroundColor: col }}
                                type="button"
                                onClick={() => setFormData({ ...formData, color: col })}
                            ></button>
                        ))}
                    </div>

                    <div className='flex gap-2'>
                        <button type="submit" className='pr-2 pl-2 bg-gray-100 border-2 border-transparent rounded-2xl text-gray-600 font-semibold cursor-pointer transition-all duration-300 
    hover:bg-blue-500 hover:text-white hover:border-blue-500'>{editingId !== null ? 'Сохранить' : 'Создать'} </button>
                        <button type="button" className='pr-2 pl-2 bg-gray-100 border-2 border-transparent rounded-2xl text-gray-600 font-semibold cursor-pointer transition-all duration-300 
    hover:bg-blue-500 hover:text-white hover:border-blue-500' onClick={() => {
                                setIsAdding(false);
                                setEditingId(null);
                                setFormData({});
                            }}>Отменить</button>
                    </div>
                </form>
            )}

            <div className='flex flex-col gap-4'>
                {categories.map(category => (
                    <div key={category.id} className="flex items-center justify-between p-2 bg-gray-100 rounded transition-shadow duration-300 hover:shadow-md">
                        <div className='flex flex-row items-baseline gap-4 '>
                            <p>{category.name}</p>
                            <span className='w-2 h-2 rounded-full' style={{ backgroundColor: category.color }}></span>
                            <p>{notes.filter(note => note.categoryId === category.id).length}</p>
                        </div>

                        <div className='flex flex-row gap-4'>
                            <button className='border-2 border-transparent rounded-2xl text-gray-600 font-semibold cursor-pointer transition-all duration-300 
    hover:bg-blue-500 hover:text-white hover:border-blue-500'
                                onClick={() => handleEdit(category)}>✏️</button>
                            <button className='border-2 border-transparent rounded-2xl text-gray-600 font-semibold cursor-pointer transition-all duration-300 
    hover:bg-blue-500 hover:text-white hover:border-blue-500'
                                onClick={() => handleDelete(category.id)}>🗑️</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}