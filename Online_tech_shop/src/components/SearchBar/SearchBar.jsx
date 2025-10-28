import { useState } from "react";

const SearchBar = ({ searchQuery, onSearchChange, searchResults = [], onSearchResultClick }) => {

    const [showResults, setShowResults] = useState(false)

    return (
        <div className="relative">
            <div>
                <input
                    data-testid="search-bar"
                    className="w-full pl-10 pr-10 h-10 bg-white rounded-2xl"
                    type="text"
                    placeholder="Поиск товаров"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onFocus={() => setShowResults(true)}
                    onBlur={() => setTimeout(() => setShowResults(false), 200)}
                />
            </div>

            {/* Результаты поиска */}
            {showResults && searchResults.length > 0 && (
                <div
                    data-testid="search-results"
                    className="absolute bg-white border border-gray-200 rounded-xl shadow-md mt-2 w-full z-10"
                >
                    {searchResults.map((prod) => (
                        <div
                            data-testid="search-result-item"
                            key={prod.id}
                            onMouseDown={() => onSearchResultClick(prod)} // onMouseDown чтобы не терять фокус
                            className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer rounded-lg"
                        >
                            <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-10 h-10 object-cover rounded-lg"
                            />
                            <div className="text-left">
                                <div className="font-semibold">{prod.name}</div>
                                <div className="text-sm text-gray-500">{prod.brand}</div>
                                <div className="text-sm font-bold">
                                    {prod.price.toLocaleString("ru-RU")} руб.
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
export default SearchBar


// const [isSearchFocus, setIsSearchFocus] = useState(false)