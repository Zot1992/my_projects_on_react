const NOTES_KEY = 'notes-app-notes';
const CATEGORIES_KEY = 'notes-app-categories';

export function saveNotes(notes) {
    try {
        localStorage.setItem(NOTES_KEY, JSON.stringify(notes))
    }
    catch (error) {
        console.error('Ошибка сохранения заметок:', error)
    }
}

export function loadNotes() {
    try {
        const storedNotes = localStorage.getItem(NOTES_KEY);
        return storedNotes ? JSON.parse(storedNotes) : [];
    }
    catch (error) {
        console.error('Ошибка загрузки заметок:', error);
        return []
    }
}

export function saveCategories(categories) {
    try {
        localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories))
        console.log('Категории сохранены:', categories);
    }
    catch (error) {
        console.error('Ошибка сохранения категории:', error)
    }
}

export function loadCategories() {
    try {
        const storedCategories = localStorage.getItem(CATEGORIES_KEY);
        return storedCategories ? JSON.parse(storedCategories) : [];
    }
    catch (error) {
        console.error('Ошибка загрузки категории:', error);
        return []
    }
}