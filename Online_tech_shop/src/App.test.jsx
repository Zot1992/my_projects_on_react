import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import DesktopVersion from './components/DesktopVersion/DesktopVersion';
import MobileVersion from './components/MobileVersion/MobileVersion';
import FilterSetBar from './components/FilterSetBar/FilterSetBar';
import Header from './components/Header/Header';
import { categories } from "./data/products"
import ProductCart from './components/ProductCart/ProductCart';
import SearchBar from './components/SearchBar/SearchBar';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import Favorites from './components/Favorites/Favorites';

test('Рендерит основной компонент без ошибок', () => {
  const mockProps = {
    openCart: vi.fn(),
    handleAddToCart: vi.fn(),
    openFavorites: vi.fn(),
    isCartOpen: false,
    isFavoritesOpen: false,
    closeCart: vi.fn(),
    closeFavorites: vi.fn(),
    cardItems: [],
    favoriteItems: [],
    removeFromCard: vi.fn(),
    removeFromFavorite: vi.fn(),
    isPromoCode: false,
    calculateTotal: vi.fn(),
    getPromoCode: vi.fn(),
    cleaningShoppingCart: vi.fn(),
    cleaningFavoritest: vi.fn(),
    searchQuery: '',
    setSearchQuery: vi.fn(),
    searchResults: [],
    handleSearchResultsClick: vi.fn(),
    selectedCategory: '',
    setSelectedCategory: vi.fn(),
    handleCategoryClick: vi.fn(),
    handleBrandClick: vi.fn(),
    handlePriceClick: vi.fn(),
    filtres: {},
    setFiltres: vi.fn(),
    isOnClickCategory: false,
    isOnClickBrand: false,
    isOnClickPrice: false,
    filter: vi.fn(),
    filteredProducts: [],
    filteredBrands: [],
    filteredPrices: [],
    getFilteredCount: vi.fn(() => 0),
    messages: []
  };

  render(<DesktopVersion {...mockProps} />);

  // Проверяем наличие основных элементов
  expect(screen.getByTestId('search-bar')).toBeInTheDocument();
  expect(screen.getByTestId('cart-button')).toBeInTheDocument();
  expect(screen.getByTestId('favorites-button')).toBeInTheDocument();
  expect(screen.getByTestId('header')).toBeInTheDocument();
  expect(screen.getByTestId('filter-set-bar')).toBeInTheDocument();
});

test('Рендерит панель фильтров без ошибок', () => {
  const mockProps = {
    filtres: {
      maxPrice: 10000,
      brand: []
    },
    onFiltresChange: vi.fn(),
    checkBrandClick: vi.fn(),
    checkPriceClick: vi.fn()
  };

  render(<FilterSetBar {...mockProps} />);

  // Проверяем наличие всех элементов
  expect(screen.getByText(/Максимальная цена:/i)).toBeInTheDocument();
  expect(screen.getByRole('slider')).toBeInTheDocument();

  // Используем data-testid для проверки цены
  const priceDisplay = screen.getByTestId('price-display');

  // Получаем отформатированное значение
  const formattedPrice = new Intl.NumberFormat('ru-RU').format(10000);

  // Проверяем текст с учетом форматирования
  expect(priceDisplay.textContent).toBe(`${formattedPrice} ₽`);

  expect(screen.getByText(/Бренды:/i)).toBeInTheDocument();
});

test('Проверяет работу слайдера цены', async () => {
  const mockProps = {
    filtres: {
      maxPrice: 10000,
      brand: []
    },
    onFiltresChange: vi.fn(),
    checkBrandClick: vi.fn(),
    checkPriceClick: vi.fn()
  };

  render(<FilterSetBar {...mockProps} />);

  const slider = screen.getByRole('slider');

  // Имитируем реальную работу слайдера
  fireEvent.change(slider, { target: { value: 50000 } });

  // Проверяем, что коллбек вызвался с новым значением
  expect(mockProps.onFiltresChange).toHaveBeenCalledWith({
    maxPrice: 50000,
    brand: []
  });
  expect(mockProps.checkPriceClick).toHaveBeenCalledTimes(1);

  // 💡 Проверяем DOM не напрямую, а через мок:
  await waitFor(() => {
    expect(mockProps.onFiltresChange).toHaveBeenCalled();
  });
});

test('Проверяет работу фильтров брендов', async () => {
  const mockProps = {
    filtres: {
      maxPrice: 10000,
      brand: ['Apple']
    },
    onFiltresChange: vi.fn(),
    checkBrandClick: vi.fn(),
    checkPriceClick: vi.fn()
  };

  const products = [
    { brand: 'Apple' },
    { brand: 'Samsung' }
  ];

  render(<FilterSetBar {...mockProps} products={products} />);

  // Используем более надежный способ поиска чекбоксов
  const appleCheckbox = await screen.findByRole('checkbox', {
    name: /Apple/i
  });
  expect(appleCheckbox.checked).toBe(true);

  const samsungCheckbox = await screen.findByRole('checkbox', {
    name: /Samsung/i
  });
  expect(samsungCheckbox.checked).toBe(false);

  fireEvent.click(samsungCheckbox);
  expect(mockProps.onFiltresChange).toHaveBeenCalledTimes(1);
  expect(mockProps.checkBrandClick).toHaveBeenCalledTimes(1);
});

test('Проверяет корректность отображения уникальных брендов', () => {
  const mockProps = {
    filtres: {
      maxPrice: 10000,
      brand: []
    },
    onFiltresChange: vi.fn(),
    checkBrandClick: vi.fn(),
    checkPriceClick: vi.fn()
  };

  // Продукты с повторяющимися брендами
  const products = [
    { brand: 'Apple' },
    { brand: 'Apple' },
    { brand: 'Samsung' },
    { brand: 'Samsung' }
  ];

  render(<FilterSetBar {...mockProps} products={products} />);

  // Проверяем, что бренды отображаются уникально
  expect(screen.getAllByText(/Apple/i).length).toBe(1);
  expect(screen.getAllByText(/Samsung/i).length).toBe(1);
});

describe('Тестирование MobileVersion', () => {
  const mockProps = {
    openCart: vi.fn(),
    handleAddToCart: vi.fn(),
    openFavorites: vi.fn(),
    isCartOpen: false,
    isFavoritesOpen: false,
    closeCart: vi.fn(),
    closeFavorites: vi.fn(),
    cardItems: [],
    favoriteItems: [],
    removeFromCard: vi.fn(),
    removeFromFavorite: vi.fn(),
    isPromoCode: false,
    calculateTotal: vi.fn(() => ({
      subTotal: 10000,
      newPrice: 9000,
      total: 9000
    })),
    getPromoCode: vi.fn(),
    cleaningShoppingCart: vi.fn(),
    cleaningFavoritest: vi.fn(),
    searchQuery: '',
    setSearchQuery: vi.fn(),
    searchResults: [],
    handleSearchResultsClick: vi.fn(),
    selectedCategory: '',
    setSelectedCategory: vi.fn(),
    handleCategoryClick: vi.fn(),
    handleBrandClick: vi.fn(),
    handlePriceClick: vi.fn(),
    filtres: {},
    setFiltres: vi.fn(),
    isOnClickCategory: false,
    isOnClickBrand: false,
    isOnClickPrice: false,
    filter: vi.fn(),
    filteredProducts: [],
    filteredBrands: [],
    filteredPrices: [],
    getFilteredCount: vi.fn(() => 0),
    messages: []
  }


  test('Рендерит MobileVersion без ошибок', () => {
    render(<MobileVersion {...mockProps} />)

    // Проверяем, что основные элементы есть
    expect(screen.getByTestId('cart-button')).toBeInTheDocument()
    expect(screen.getByTestId('favorites-button')).toBeInTheDocument()
    expect(screen.getByTestId('search-bar')).toBeInTheDocument()
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('filter-set-bar')).toBeInTheDocument()
  })

  test('Открытие корзины вызывает openCart', () => {
    render(<MobileVersion {...mockProps} />)

    const cartButton = screen.getByTestId('cart-button')
    fireEvent.click(cartButton)

    expect(mockProps.openCart).toHaveBeenCalledTimes(1)
  })

  test('Открытие избранного вызывает openFavorites', () => {
    render(<MobileVersion {...mockProps} />)

    const favoritesButton = screen.getByTestId('favorites-button')
    fireEvent.click(favoritesButton)

    expect(mockProps.openFavorites).toHaveBeenCalledTimes(1)
  })

  test('Рендерит модалку корзины, если isCartOpen = true', () => {
    render(<MobileVersion {...mockProps} isCartOpen={true} />)

    // Проверяем, что компонент корзины отображается
    expect(screen.getByRole('heading', { name: /Корзина/i })).toBeInTheDocument()
  })

  test('Рендерит модалку избранного, если isFavoritesOpen = true', () => {
    render(<MobileVersion {...mockProps} isFavoritesOpen={true} />)

    expect(screen.getByRole('heading', { name: /Избранное/i })).toBeInTheDocument()
  })

  test('При вводе текста в поиск вызывается setSearchQuery', () => {
    render(<MobileVersion {...mockProps} />)

    const searchInput = screen.getByPlaceholderText(/Поиск товаров/i)
    fireEvent.change(searchInput, { target: { value: 'iPhone' } })

    expect(mockProps.setSearchQuery).toHaveBeenCalledWith('iPhone')
  })

  test('Кнопки категорий корректно рендерятся и вызывают обработчики', () => {
    render(<MobileVersion {...mockProps} />)

    const categoryButtons = screen.getAllByRole('button', { name: /Смартфоны|Ноутбуки/i })
    expect(categoryButtons.length).toBeGreaterThan(0)

    fireEvent.click(categoryButtons[0])
    expect(mockProps.setSelectedCategory).toHaveBeenCalled()
    expect(mockProps.handleCategoryClick).toHaveBeenCalled()
  })


  test('Закрывает модальное окно избранного при isFavoritesOpen = false', () => {
    const { rerender } = render(<MobileVersion {...mockProps} isFavoritesOpen={true} />)

    // Проверяем, что модальное окно есть
    expect(screen.getByRole('heading', { name: /Избранное/i })).toBeInTheDocument()

    // Перерисовываем компонент с isFavoritesOpen = false
    rerender(<MobileVersion {...mockProps} isFavoritesOpen={false} />)

    // Проверяем, что модальное окно исчезло
    expect(screen.queryByRole('heading', { name: /Избранное/i })).toBeNull()
  })
})

describe("Header component", () => {
  it("рендерит заголовок TechStore", () => {
    render(<Header onCategoryChange={() => { }} checkCategoryClick={() => { }} />)
    expect(screen.getByText("TechStore")).toBeInTheDocument()
  })

  it("рендерит все категории из data/products", () => {
    render(<Header onCategoryChange={() => { }} checkCategoryClick={() => { }} />)

    categories.forEach(category => {
      expect(screen.getByText(category.name)).toBeInTheDocument()
    })
  })

  it("вызывает onCategoryChange и checkCategoryClick при клике на кнопку категории", () => {
    const onCategoryChange = vi.fn()
    const checkCategoryClick = vi.fn()

    render(
      <Header
        onCategoryChange={onCategoryChange}
        checkCategoryClick={checkCategoryClick}
      />
    )

    const firstCategoryButton = screen.getByText(categories[0].name)
    fireEvent.click(firstCategoryButton)

    expect(onCategoryChange).toHaveBeenCalledWith(categories[0].id)
    expect(checkCategoryClick).toHaveBeenCalled()
  })
})

describe("ProductCart component", () => {
  const mockProduct = {
    id: 1,
    name: "iPhone 15 Pro",
    price: 129990,
    inStock: 5,
    image: "https://example.com/iphone.jpg"
  }

  const onAddToCart = vi.fn()
  const onToggleFavorite = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("рендерит информацию о продукте", () => {
    render(
      <ProductCart
        product={mockProduct}
        onAddToCart={onAddToCart}
        onToggleFavorite={onToggleFavorite}
      />
    )

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument()
    expect(screen.getByText(/₽/)).toBeInTheDocument()
    expect(screen.getByText(/В наличии:/)).toHaveTextContent(
      `В наличии:${mockProduct.inStock}шт.`
    )
  })

  it("увеличивает и уменьшает количество товара", () => {
    render(
      <ProductCart
        product={mockProduct}
        onAddToCart={onAddToCart}
        onToggleFavorite={onToggleFavorite}
      />
    )

    const plusButton = screen.getByText("+")
    const minusButton = screen.getByText("-")

    // По умолчанию quantity = 1
    expect(screen.getByText(/Количество:/)).toHaveTextContent("Количество: 1")

    // Нажимаем +
    fireEvent.click(plusButton)
    expect(screen.getByText(/Количество:/)).toHaveTextContent("Количество: 2")

    // Нажимаем -
    fireEvent.click(minusButton)
    expect(screen.getByText(/Количество:/)).toHaveTextContent("Количество: 1")
  })

  it("не позволяет увеличить количество выше, чем inStock", () => {
    render(
      <ProductCart
        product={mockProduct}
        onAddToCart={onAddToCart}
        onToggleFavorite={onToggleFavorite}
      />
    )

    const plusButton = screen.getByText("+")

    // Жмем + до максимума
    for (let i = 0; i < 10; i++) fireEvent.click(plusButton)

    // Должно остаться 5
    expect(screen.getByText(/Количество:/)).toHaveTextContent("Количество: 5")
  })

  it("не позволяет уменьшить количество ниже 1", () => {
    render(
      <ProductCart
        product={mockProduct}
        onAddToCart={onAddToCart}
        onToggleFavorite={onToggleFavorite}
      />
    )

    const minusButton = screen.getByText("-")
    fireEvent.click(minusButton)
    expect(screen.getByText(/Количество:/)).toHaveTextContent("Количество: 1")
  })

  it("вызывает onAddToCart с правильными аргументами", () => {
    render(
      <ProductCart
        product={mockProduct}
        onAddToCart={onAddToCart}
        onToggleFavorite={onToggleFavorite}
      />
    )

    const addButton = screen.getAllByRole("button")[2] // 3-я кнопка — "добавить в корзину"
    fireEvent.click(addButton)

    expect(onAddToCart).toHaveBeenCalledWith(mockProduct, 1)
  })

  it("вызывает onToggleFavorite при клике на иконку избранного", () => {
    render(
      <ProductCart
        product={mockProduct}
        onAddToCart={onAddToCart}
        onToggleFavorite={onToggleFavorite}
      />
    )

    const favoriteButton = screen.getAllByRole("button")[3] // 4-я кнопка — избранное
    fireEvent.click(favoriteButton)

    expect(onToggleFavorite).toHaveBeenCalledWith(mockProduct)
  })
})

describe("SearchBar component", () => {
  const mockSearchChange = vi.fn()
  const mockResultClick = vi.fn()

  const mockResults = [
    { id: 1, name: "iPhone 15", brand: "Apple", price: 120000, image: "iphone.jpg" },
    { id: 2, name: "Galaxy S24", brand: "Samsung", price: 110000, image: "galaxy.jpg" },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("рендерит поле поиска", () => {
    render(
      <SearchBar
        searchQuery=""
        onSearchChange={mockSearchChange}
        searchResults={[]}
        onSearchResultClick={mockResultClick}
      />
    )

    const input = screen.getByTestId("search-bar")
    expect(input).toBeInTheDocument()
    expect(input.placeholder).toBe("Поиск товаров")
  })

  it("реагирует на ввод текста и вызывает onSearchChange", () => {
    render(
      <SearchBar
        searchQuery=""
        onSearchChange={mockSearchChange}
        searchResults={[]}
        onSearchResultClick={mockResultClick}
      />
    )

    const input = screen.getByTestId("search-bar")
    fireEvent.change(input, { target: { value: "iphone" } })

    expect(mockSearchChange).toHaveBeenCalledWith("iphone")
  })

  it("показывает результаты поиска, если они есть", () => {
    render(
      <SearchBar
        searchQuery="iphone"
        onSearchChange={mockSearchChange}
        searchResults={mockResults}
        onSearchResultClick={mockResultClick}
      />
    )

    const input = screen.getByTestId("search-bar")
    fireEvent.focus(input) // <--- добавь это

    expect(screen.getByTestId("search-results")).toBeInTheDocument()

    const items = screen.getAllByTestId("search-result-item")
    expect(items.length).toBe(2)
    expect(screen.getByText("iPhone 15")).toBeInTheDocument()
  })

  it("вызывает onSearchResultClick при клике на результат", () => {
    render(
      <SearchBar
        searchQuery="iphone"
        onSearchChange={mockSearchChange}
        searchResults={mockResults}
        onSearchResultClick={mockResultClick}
      />
    )

    const input = screen.getByTestId("search-bar")
    fireEvent.focus(input) // <--- добавь это

    const firstResult = screen.getAllByTestId("search-result-item")[0]
    fireEvent.mouseDown(firstResult) // или fireEvent.click(firstResult)

    expect(mockResultClick).toHaveBeenCalledWith(mockResults[0])
  })
})

describe('Тестирование компонента ShoppingCart', () => {
  const mockCardItems = [
    {
      id: 1,
      image: 'test.jpg',
      quantity: 2,
      product: { name: 'iPhone 15', price: 1000 },
    },
  ]

  const mockProps = {
    cardItems: mockCardItems,
    removeFromCard: vi.fn(),
    isPromoCode: false,
    calculateTotal: vi.fn(() => ({
      subTotal: 2000,
      newPrice: 1800,
      total: 1800,
    })),
    getPromoCode: vi.fn(),
    cleaningShoppingCart: vi.fn(),
    setPromoCode: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('Рендерит пустую корзину', () => {
    render(<ShoppingCart {...mockProps} cardItems={[]} />)

    expect(screen.getByText(/Корзина пуста/i)).toBeInTheDocument()
    expect(mockProps.calculateTotal).toHaveBeenCalled()
  })

  test('Отображает товар в корзине', () => {
    render(<ShoppingCart {...mockProps} />)

    expect(screen.getByText(/iPhone 15/i)).toBeInTheDocument()

    // Проверяем, что цена встречается хотя бы один раз
    const prices = screen.getAllByText(/2000 ₽/i)
    expect(prices.length).toBeGreaterThan(0)
  })

  test('Удаление товара вызывает removeFromCard', () => {
    render(<ShoppingCart {...mockProps} />)

    const removeButton = screen.getByRole('button', { name: '' })
    fireEvent.click(removeButton)

    expect(mockProps.removeFromCard).toHaveBeenCalledWith(1)
  })

  test('Отображает сумму без промокода', () => {
    render(<ShoppingCart {...mockProps} isPromoCode={false} />)

    const totalTexts = screen.getAllByText(/Общая сумма/i)
    expect(totalTexts.length).toBeGreaterThan(0)

    expect(screen.getAllByText(/2000 ₽/i).length).toBeGreaterThan(0)
  })

  test('Отображает сумму с промокодом', () => {
    render(<ShoppingCart {...mockProps} isPromoCode={true} />)

    const totalTexts = screen.getAllByText(/Общая сумма/i)
    expect(totalTexts.length).toBeGreaterThan(0)

    expect(screen.getAllByText(/1800 ₽/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Ваша скидка/i).length).toBeGreaterThan(0)
  })

  test('Ввод промокода и клик вызывает getPromoCode', () => {
    render(<ShoppingCart {...mockProps} />)

    const input = screen.getByPlaceholderText(/Введите промокод/i)
    const button = screen.getByText(/Применить промокод/i)

    fireEvent.change(input, { target: { value: 'SALE2025' } })
    fireEvent.click(button)

    expect(mockProps.getPromoCode).toHaveBeenCalledWith('SALE2025')
  })

  test('Очистка корзины вызывает cleaningShoppingCart', () => {
    render(<ShoppingCart {...mockProps} />)

    const clearButton = screen.getByText(/Очистить корзину/i)
    fireEvent.click(clearButton)

    expect(mockProps.cleaningShoppingCart).toHaveBeenCalledTimes(1)
  })
})

describe("Тестирование компонента Favorites", () => {
  const mockRemoveFromFavorite = vi.fn()
  const mockOpenCart = vi.fn()
  const mockOnAddToCart = vi.fn()
  const mockCleaningFavorites = vi.fn()

  const mockItems = [
    {
      id: 1,
      image: "test.jpg",
      product: { name: "iPhone 15", price: 2000 },
    },
    {
      id: 2,
      image: "test2.jpg",
      product: { name: "MacBook Air", price: 3000 },
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test("Отображает сообщение, если избранных товаров нет", () => {
    render(
      <Favorites
        favoriteItems={[]}
        removeFromFavorite={mockRemoveFromFavorite}
        openCart={mockOpenCart}
        onAddToCart={mockOnAddToCart}
        cleaningFavorites={mockCleaningFavorites}
      />
    )

    expect(
      screen.getByText(/в списке пока нет ни одного избранного товара/i)
    ).toBeInTheDocument()
  })

  test("Отображает товары и общую сумму", () => {
    render(
      <Favorites
        favoriteItems={mockItems}
        removeFromFavorite={mockRemoveFromFavorite}
        openCart={mockOpenCart}
        onAddToCart={mockOnAddToCart}
        cleaningFavorites={mockCleaningFavorites}
      />
    )

    // Проверяем названия товаров
    expect(screen.getByText(/iPhone 15/i)).toBeInTheDocument()
    expect(screen.getByText(/MacBook Air/i)).toBeInTheDocument()

    // Проверяем, что цена присутствует хотя бы один раз
    const prices = screen.getAllByText(/₽/i)
    expect(prices.length).toBeGreaterThan(0)

    // Проверяем общую сумму
    const totalBlocks = screen.getAllByText(/Общая сумма/i)
    expect(totalBlocks.length).toBeGreaterThan(0)

    const container = totalBlocks[0].closest("p")
    expect(within(container).getByText(/5000 ₽/i)).toBeInTheDocument()
  })

  test("Работают кнопки: удалить, добавить в корзину и очистить", () => {
    render(
      <Favorites
        favoriteItems={mockItems}
        removeFromFavorite={mockRemoveFromFavorite}
        openCart={mockOpenCart}
        onAddToCart={mockOnAddToCart}
        cleaningFavorites={mockCleaningFavorites}
      />
    )

    // Удаление
    const removeButtons = screen.getAllByRole("button", { name: "" })
    fireEvent.click(removeButtons[0])
    expect(mockRemoveFromFavorite).toHaveBeenCalledTimes(1)

    // Добавление в корзину
    fireEvent.click(removeButtons[1])
    expect(mockOnAddToCart).toHaveBeenCalledTimes(1)

    // Перейти в корзину
    fireEvent.click(screen.getByText(/перейти в корзину/i))
    expect(mockOpenCart).toHaveBeenCalledTimes(1)

    // Очистить избранное
    fireEvent.click(screen.getByText(/очистить избранное/i))
    expect(mockCleaningFavorites).toHaveBeenCalledTimes(1)
  })
})