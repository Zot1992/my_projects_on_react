import { products } from "../../data/products";


const FilterSetBar = ({
    filtres = { maxPrice: 0, brand: [] },
    onFiltresChange = () => { },
    checkBrandClick = () => { },
    checkPriceClick = () => { }
}) => {

    const getBrands = (products) => {
        return [...new Set(products.map(prod => prod.brand))]
    }

    return (
        <div data-testid="filter-set-bar" className="p-4 bg-gray-100 rounded-2xl h-fit min-h-0 text-gray-600">
            <div className="m-5 flex flex-col">
                <label className="text-2xl">Максимальная цена:</label>
                <input type="range" min='1000' max='200000' step='1000' value={filtres.maxPrice} onChange={(e) => {
                    onFiltresChange({
                        ...filtres, maxPrice: Number(e.target.value)
                    });
                    checkPriceClick();
                }} />
                <span data-testid="price-display" className="font-bold text-2xl">
                    {(filtres?.maxPrice ?? 0).toLocaleString()} ₽</span>
            </div>
            <div className="flex justify-center">
                <div className="mb-5 flex flex-col">
                    <label className="text-2xl">Бренды:</label>
                    {getBrands(products).map(brand => (
                        <label key={brand} className="ml-2 text-left hover:text-orange-400">
                            <input type="checkbox" checked={filtres?.brand?.includes(brand) ?? false} onChange={(e) => e.target.checked
                                ? (onFiltresChange({ // Если чекбокс нажат, то бренд попадает массив брендов
                                    ...filtres, brand: [...filtres.brand, brand]
                                }), checkBrandClick())
                                : onFiltresChange({ // Если чекбокс не нажат, то бренд удаляется из массива
                                    ...filtres,
                                    brand: filtres.brand.filter(b => b !== brand)
                                })} />
                            <span className="text-[20px]">{brand}</span>
                        </label>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default FilterSetBar