import { memo } from 'react'

export const CategoryFilter = memo(function CategoryFilter({ categories = [], notes = [], selectedCategory, onSelectCategory }) {

    const getCategoryCount = (categoryId) => notes.filter(note => note.categoryId === categoryId).length;



    return (
        <div className="bg-white rounded-2xl mb-4 mt-4 p-2">
            <div className="flex flex-col items-center gap-4">
                <h2 className="text-2xl">Категории</h2>
                <div className="flex flex-wrap flex-row justify-center gap-4">
                    <div className="bg-gray-100 rounded-2xl p-3 flex flex-row items-baseline gap-2 cursor-pointer transition-shadow duration-300 hover:shadow-md">
                        <button className="border-2 pr-2 pl-2 border-transparent rounded-2xl text-gray-600 font-semibold cursor-pointer transition-all duration-300 
    hover:bg-blue-500 hover:text-white hover:border-blue-500"
                            onClick={() => onSelectCategory('all')}>Все {notes.length}</button>
                        <span>📝</span>
                    </div>
                    {categories.map((category) => (
                        <div key={category.id} className="bg-gray-100 rounded-2xl p-3 flex flex-row items-baseline gap-2 cursor-pointer transition-shadow duration-300 hover:shadow-md">
                            <button className="border-2 pr-2 pl-2 border-transparent rounded-2xl text-gray-600 font-semibold cursor-pointer transition-all duration-300 
    hover:bg-blue-500 hover:text-white hover:border-blue-500"
                                onClick={() => onSelectCategory(category.id)}>{category.name} {getCategoryCount(category.id)}</button>
                            <span className='w-2 h-2 rounded-full' style={{ backgroundColor: category.color }}></span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
})