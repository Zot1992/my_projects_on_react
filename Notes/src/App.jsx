import { useState, useEffect, useMemo, useCallback } from 'react'
import './App.css'
import { NoteForm } from './componiens/NoteForm';
import { NoteCard } from './componiens/NoteCard';
import { NoteModal } from './componiens/NoteModal';
import { EmptyState } from './componiens/EmptyState';
import { ConfirmDialog } from './componiens/ConfirmDialog';
import { CategoryFilter } from './componiens/CategoryFilter';
import { CategoryManager } from './componiens/CategoryManager';
import { SearchBar } from './componiens/SearchBar';
import { Statistics } from './componiens/Statistics';
import { saveNotes, saveCategories, loadNotes, loadCategories } from '../utils/localStorage';

const DEFAULT_CATEGORIES = [
  { id: 'work', name: 'Работа', color: '#3498db' },
  { id: 'personal', name: 'Личное', color: '#2ecc71' },
  { id: 'ideas', name: 'Идеи', color: '#f39c12' },
  { id: 'important', name: 'Важное', color: '#e74c3c' },
  { id: 'other', name: 'Разное', color: '#95a5a6' }
];

function App() {

  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteToDelete, setNoteToDelete] = useState(null);

  useEffect(() => {
    const loadedNotes = loadNotes();
    setNotes(loadedNotes);

    const loadedCategories = loadCategories();
    console.log('Загруженные категории:', loadedCategories);
    setCategories(loadedCategories.length > 0 ? loadedCategories : DEFAULT_CATEGORIES);
  }, [])

  useEffect(() => {
    if (notes.length > 0) {
      saveNotes(notes);
    }
  }, [notes])

  useEffect(() => {
    if (categories.length > 0) {
      saveCategories(categories);
    }
  }, [categories])

  const sortedNotes = useMemo(() => {

    function compare(a, b) {
      if (a.isPinned && !b.isPinned) {
        return -1;
      }
      if (b.isPinned && !a.isPinned) {
        return 1;
      }

      return new Date(b.updatedAt) - new Date(a.updatedAt);
    }

    return [...notes].sort(compare);
  }, [notes])

  const filteredNotes = useMemo(() => {
    if (selectedCategory !== 'all') {
      return sortedNotes.filter(note => note.categoryId === selectedCategory)
    }

    return sortedNotes

  }, [sortedNotes, selectedCategory])

  const displayedNotes = useMemo(() => {

    let result = [...notes].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (b.isPinned && !a.isPinned) return 1;
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    if (selectedCategory !== 'all') {
      result = result.filter(note => note.categoryId === selectedCategory);
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter(note =>
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
      )
    }

    return result
  }, [notes, selectedCategory, searchQuery])

  const handleAddNote = useCallback((newNote) => {
    setNotes(prevNotes => {
      const newNotes = [newNote, ...prevNotes];
      saveNotes(newNotes); // Сохраняем обновленные заметки
      setIsFormOpen(false);
      return newNotes;
    });
  }, []);

  const handleUpdateNote = useCallback((updatedNote) => {
    setNotes(prevNotes => {
      const newNotes = prevNotes.map(note =>
        note.id === updatedNote.id
          ? { ...note, ...updatedNote, updatedAt: new Date().toISOString() }
          : note
      );
      saveNotes(newNotes);
      return newNotes;
    });
    setEditingNote(null);
  }, []);

  const handleEditNote = useCallback((note) => {
    setEditingNote(note);
    setIsFormOpen(true);
  }, [])

  const handleDeleteNote = (noteId) => {
    if (window.confirm("Вы уверены что хотите удалить даную заметку?")) {
      setNoteToDelete(noteId);
    }
  }

  const handleDeleteConfirm = useCallback(() => {
    setNotes(prevNotes => {
      const newNotes = prevNotes.filter(note => note.id !== noteToDelete);
      saveNotes(newNotes);
      setNoteToDelete(null);
      return newNotes;
    });
  }, [noteToDelete]);

  // const handleTogglePin = useCallback((noteId) => {
  //   setNotes(prevNotes => {
  //     const newNotes = prevNotes.map(note =>
  //       note.id === noteId
  //         ? { ...note, isPinned: !note.isPinned, updatedAt: new Date().toISOString() }
  //         : note
  //     );
  //     saveNotes(newNotes);
  //     return newNotes;
  //   });
  // }, []);

  const handleAddCategory = useCallback((newCategory) => {
    setCategories(prevCategories => {
      const newCat = [newCategory, ...prevCategories];
      saveCategories(newCat);
      return newCat
    })
  }, [])

  const handleUpdateCategory = useCallback((categoryId, updates) => {
    setCategories(prevCategories => {
      const newCat = prevCategories.map(cat => cat.id === categoryId ? { ...cat, ...updates } : cat)
      saveCategories(newCat);
      return newCat
    })
  }, [])

  const handleDeleteCategory = useCallback((categoryId) => {
    setNotes(prevNotes => {
      const newNotes = prevNotes.map(note =>
        note.categoryId === categoryId ? { ...note, categoryId: 'other' } : note
      );
      saveNotes(newNotes);
      setCategories(prevCategories => prevCategories.filter(category => category.id !== categoryId));
      return newNotes;
    });
  }, []);

  return (
    <div className='min-h-screen bg-gray-100 py-8'>
      <div className='max-w-7xl m-auto px-4'>
        <header className='flex flex-col justify-center items-center gap-4'>
          <h1 className='text-4xl'>Заметки</h1>
          <button className='w-48 px-3 py-1 bg-gray-200 border-2 border-transparent rounded-2xl text-gray-600 font-semibold cursor-pointer transition-all duration-300 
    hover:bg-blue-500 hover:text-white hover:border-blue-500' onClick={() => setIsFormOpen(true)}>Новая заметка</button>
        </header>
        <div className='w-full mt-4 mb-4'>
          {isFormOpen === true && (
            <NoteForm
              categories={categories}
              editingNote={editingNote}
              onAddNote={handleAddNote}
              onUpdateNote={handleUpdateNote}
              onClose={() => { setIsFormOpen(false), setEditingNote(null) }}
            />
          )}
        </div>
        <div className='w-full'>
          {notes.length === 0
            ? <EmptyState
              icon="📝"
              message="Нет заметок!"
            /> :
            (<div>
              <CategoryFilter
                categories={categories}
                notes={notes}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />

              <Statistics
                notes={notes}
                categories={categories}
              />

              <CategoryManager
                categories={categories}
                notes={notes}
                onAddCategory={handleAddCategory}
                onUpdateCategory={handleUpdateCategory}
                onDeleteCategory={handleDeleteCategory}
              />

              <SearchBar
                onSearch={setSearchQuery}
              />

              {displayedNotes.length === 0 && searchQuery && (
                <EmptyState message={`Ничего не найдено по запросу "${searchQuery}"`} />
              )}

              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4'>
                {displayedNotes.map(note => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    category={categories.find(c => c.id === note.categoryId)}
                    onNoteClick={setSelectedNote}
                  // onEdit={handleEditNote}
                  // onDelete={handleDeleteNote}
                  // onTogglePin={handleTogglePin}
                  />
                ))}
              </div>

              {selectedNote && (
                <NoteModal
                  note={selectedNote}
                  category={categories.find(c => c.id === selectedNote.categoryId)}
                  onClose={() => setSelectedNote(null)}
                  onEdit={handleEditNote}
                  onDelete={handleDeleteNote}
                />)}

              {noteToDelete && (
                <ConfirmDialog
                  title="Удалить заметку?"
                  message="Это действие нельзя отменить!"
                  onConfirm={handleDeleteConfirm}
                  onCancel={() => setNoteToDelete(null)}
                />
              )}
            </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default App
