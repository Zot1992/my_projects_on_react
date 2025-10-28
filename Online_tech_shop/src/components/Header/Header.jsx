import { useState } from "react";
import { categories } from "../../data/products"

const Header = ({ onCategoryChange, checkCategoryClick, isOnClickCategory }) => {

    // Добавляем состояние для хранения активной категории
    const [activeId, setActiveId] = useState(null);

    const handleCategoryClick = (categoryId) => {

        setActiveId(categoryId);
        onCategoryChange(categoryId);
        checkCategoryClick();
    };

    return (
        <header data-testid="header">
            <h1 className="mb-5 text-6xl text-gray-600 ">TechStore</h1>
            <nav className="bg-white rounded-2xl text-gray-600">
                {categories.map(category => (
                    <button className={`m-1 p-3 rounded-2xl cursor-pointer bg-gray-100  hover:bg-gray-200  ${isOnClickCategory && activeId === category.id ? 'bg-gray-300' : ''}`} key={category.id}
                        onClick={() => (handleCategoryClick(category.id))}>{category.name}</button>
                ))}
            </nav>
        </header>
    )
}

export default Header
