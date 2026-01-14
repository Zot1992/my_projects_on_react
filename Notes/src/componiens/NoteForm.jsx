import { useState, useEffect } from 'react'

export const NoteForm = ({ categories = [], editingNote, onAddNote, onUpdateNote, onClose }) => {

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        categoryId: categories.length > 0 ? categories[0].id : '',
        isPinned: false
    });

    const [error, setError] = useState('');

    useEffect(() => {
        if (editingNote) {
            setFormData(prevFormData => ({
                ...prevFormData,
                title: editingNote.title,
                content: editingNote.content,
                categoryId: editingNote.categoryId || (categories.length > 0 ? categories[0].id : ''),
                isPinned: editingNote.isPinned || false
            }))
        } else {
            setFormData({
                title: '',
                content: '',
                categoryId: categories.length > 0 ? categories[0].id : '',
                isPinned: false
            })
        }
    }, [editingNote, categories])

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value     //Квадратные скобки js воспринимает name как имя свойства, а нам нужно что бы оно было динамическим.
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.content.trim()) {
            setError('Пожалуйста, заполните все обязательные поля');
            return;
        }

        if (editingNote) {
            const updatedNote = {
                ...editingNote,  //Копируем все поля
                title: formData.title,
                content: formData.content,
                categoryId: formData.categoryId
            }
            onUpdateNote(updatedNote)
        } else {
            const newNote = {
                id: Date.now().toString(),
                title: formData.title,
                content: formData.content,
                categoryId: formData.categoryId,
                // isPinned: formData.isPinned || false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
            onAddNote(newNote)
        }

        onClose();
    }

    //e.stopPropagation() блокирует всплытие, то есть событие (зыкрыть модальное окно) внутри modal-content не сработает, а сработает только снаружи.
    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4' onClick={onClose}>
            <div className='bg-white p-6 rounded-2xl shadow-xl max-w-md w-full' onClick={(e) => e.stopPropagation()}>
                <div className='flex flex-col items-center gap-4 mb-4'>
                    <button className='px-2 py-0.1 bg-gray-200 border-2 border-transparent rounded-2xl text-gray-600 font-semibold cursor-pointer transition-all duration-300 
    hover:bg-blue-500 hover:text-white hover:border-blue-500' onClick={onClose}>X</button>
                    <h1 className='text-2xl'>{editingNote ? 'Редактировать заметку' : 'Новая заметка'}</h1>
                </div>
                <form className='flex flex-col w-full' action="" onSubmit={handleSubmit}>
                    {error && (<p className='text-2xl text-red-500'>{error}</p>)}
                    <div className='w-full flex justify-center'>

                        <div className='flex flex-col gap-6 w-full max-w-xl items-start'>

                            <div className='flex w-full items-center flex-row'>
                                <label htmlFor="title" className='w-24 shrink-0'>Название:</label>
                                <input className='flex-1 p-2 w-full sm:w-auto sm: h-10 border-2 border-gray-300 rounded-md
  focus:border-blue-500 focus:outline-none transition-colors duration-300' type="text" id='title' name="title" value={formData.title}
                                    onChange={handleChange} placeholder='Название задачи' autoFocus />
                            </div>

                            <div className='flex w-full items-center flex-row'>
                                <label htmlFor="categoryId" className='w-24 shrink-0'>Категория:</label>
                                <select className='flex-1 p-2 border-2 border-gray-300 rounded-md 
  focus:border-blue-500 focus:outline-none transition-colors duration-300' id='categoryId' name="categoryId" value={formData.categoryId || ''}
                                    onChange={handleChange}>
                                    {categories.map(category => {
                                        return <option key={category.id} value={category.id}>{category.name}</option>
                                    })}
                                </select>
                            </div>
                            <div className='flex w-full items-center flex-row'>
                                <label htmlFor="content" className='w-24 shrink-0'>Описание:</label>
                                <textarea className='flex-1 p-2 border-2 border-gray-300 rounded-md 
  focus:border-blue-500 focus:outline-none transition-colors duration-300' id='content' name="content" value={formData.content}
                                    onChange={handleChange} placeholder='Описание задачи' rows="8" />
                            </div>

                            {/* <div className='flex flex-row justify-center gap-4'>
                                <label htmlFor="isPinned" className='w-24 shrink-0'>Свободное размещение заметки:</label>
                                <input type="checkbox" id="isPinned" name="isPinned" checked={formData.isPinned} onChange={(e) => setFormData(prev => ({ ...prev, isPinned: e.target.checked }))} />
                            </div> */}

                            <div className='flex flex-col sm:flex-row gap-4 sm:gap-4 self-center'>
                                <button className='w-48 px-3 py-1 bg-gray-200 border-2 border-transparent rounded-2xl text-gray-600 font-semibold cursor-pointer transition-all duration-300 
    hover:bg-blue-500 hover:text-white hover:border-blue-500' type="button" onClick={onClose}>Отмена</button>
                                <button className='w-48 px-3 py-1 bg-gray-200 border-2 border-transparent rounded-2xl text-gray-600 font-semibold cursor-pointer transition-all duration-300 
    hover:bg-blue-500 hover:text-white hover:border-blue-500' type="submit">{editingNote ? 'Сохранить' : 'Создать'}</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}