import { useState, useEffect } from "react";
import useModal from "./MyHooks/useModal";
import { products } from "./data/products";
import ProductCart from "./components/ProductCart/ProductCart";
import MobileVersion from "./components/MobileVersion/MobileVersion";
import DesktopVersion from "./components/DesktopVersion/DesktopVersion";

function App() {

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isOnClickCategory, setIsOnClickCategory] = useState(true);
  const [isOnClickBrand, setIsOnClickBrand] = useState(false);
  const [isOnClickPrice, setIsOnClickPrice] = useState(false);
  const [isPromoCode, setIsPromoCode] = useState(false); //Проверка на наличие промокода в promoCodes
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); //Состояние для выбранного товара

  const [messages, setMessages] = useState([]); //Массив оповещений

  const [filtres, setFiltres] = useState({
    maxPrice: 200000,
    minRaiting: 0,
    brand: [],
    inStock: false
  });

  const promoCodes = {
    'SAVE10': {
      discaunt: 0.1,
      description: 'Скидка 10 процентов'
    },

    'FREESHIP': {
      discaunt: 0,
      description: 'Бесплатная доставка',
      freeShiping: true
    },

    'SALE20': {
      discaunt: 0.2,
      description: 'Скидка 20 процентов',
    }
  };

  // Создаем единый объект состояний для корзины и избранного
  const [storageData, setStorageData] = useState(() => {
    try {

      const savedCard = localStorage.getItem('cardItems');
      const savedFavorites = localStorage.getItem('favoriteItems');

      return {
        cardItems: savedCard ? JSON.parse(savedCard) : [],
        favoriteItems: savedFavorites ? JSON.parse(savedFavorites) : []
      };
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
      return {
        cardItems: [],
        favoriteItems: []
      };
    }
  });

  // Создаем геттеры для удобного доступа
  const { cardItems, favoriteItems } = storageData;

  // Функция для обновления состояния
  const updateStorage = (newData) => {
    setStorageData(prev => ({
      ...prev,
      ...newData
    }));
  };

  //Для модальных окон
  const { isOpen: isCartOpen, openModal: openCart, closeModal: closeCart } = useModal();
  const { isOpen: isFavoritesOpen, openModal: openFavorites, closeModal: closeFavorites } = useModal();

  //Для работы с поиском
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery === '') {
        setSearchResults([]);
      } else {
        const results = products.filter(prod => prod.name.toLowerCase().includes(searchQuery.toLowerCase()));
        setSearchResults(results);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // При изменении избранного сохраняем в LS корзины
  useEffect(() => {
    try {
      localStorage.setItem('cardItems', JSON.stringify(cardItems));
    } catch (error) {
      console.error('Ошибка при сохранении корзины в localStorage:', error);
    }
  }, [cardItems]);

  // При изменении избранного сохраняем в LS избранного
  useEffect(() => {
    try {
      localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
    } catch (error) {
      console.error('Ошибка при сохранении избранного в localStorage:', error);
    }
  }, [favoriteItems]);

  // Массив избранного id 
  const favoriteIds = favoriteItems.reduce((acc, item) => {
    if (item.id) {
      acc.push(item.id);
    }
    return acc;
  }, []);

  // Фильтрация товаров по категории
  let filteredProducts = selectedCategory === 'all' ? products : products.filter(product => product.category === selectedCategory);

  //Фильтрация товара по бренду
  let filteredBrands = filtres.brand.length === 0 ? products : products.filter(product => filtres.brand.includes(product.brand));

  //Фильтрация товара по цене
  let filteredPrices = filtres.maxPrice === 0 ? products : products.filter(product => filtres.maxPrice >= product.price);

  // Функция обновления количества в корзине
  const updateCardQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCard(productId);
      return;
    }

    updateStorage({
      cardItems: cardItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    });

    addMessage('cart', 'Количесво текущего товара обновлено');
  };

  const assignUniqueId = (arr) => {
    // Находим максимальный существующий id или начинаем с 0
    const maxId = arr.length > 0
      ? Math.max(...arr.map(item => item.id)) //...arr разворачиваем что бы был именно массив чисел, а не массив с массивами.
      : 0;

    let newId = maxId + 1;

    // Проверяем уникальность id
    while (arr.some(item => item.id === newId)) {
      newId++;
    }

    return newId;
  };

  //Удаление товара из корзины
  const removeFromCard = (productId) => {
    updateStorage({
      cardItems: cardItems.filter(item => item.id !== productId)
    });
  };

  //Полная очистка корзины
  const cleaningShoppingCart = () => {
    if (confirm('Вы уверены, что хотите очистить корзину?')) {
      updateStorage({ cardItems: [] });
      addMessage('cart', 'Корзина очищена');
    }
  }

  //Удаление товара из избранного
  const removeFromFavorite = (productId) => {
    updateStorage({
      favoriteItems: favoriteItems.filter(item => item.id !== productId)
    });
  };

  //Полная очистка избранного
  const cleaningFavorites = () => {
    if (confirm('Вы уверены, что хотите очистить избранное?')) {
      updateStorage({ favoriteItems: [] });
      addMessage('favorite', 'Избранное очищена');
    }
  }

  //Функция по добавлению товара в корзину
  const handleAddToCart = (product, quantity = 1) => {
    // Проверяем, есть ли уже такой товар в корзине
    const existingItem = cardItems.find(item => item.product.id === product.id);

    if (existingItem) {
      // Если товар уже есть и количество совпадает
      if (existingItem.quantity === quantity) {
        addMessage('cart', 'Товар уже в корзине с таким количеством');
      } else {
        // Если количество отличается - обновляем
        updateCardQuantity(product.id, quantity);
      }
    } else {
      // Если товара нет в корзине - добавляем
      const newItem = {
        id: assignUniqueId(cardItems),
        image: product.image,
        product: product,
        quantity: quantity,
        addedAt: Date.now()
      };
      updateStorage({
        cardItems: [...cardItems, newItem]
      });
      addMessage('cart', 'Товар добавлен в корзину');
    }
  };

  const handleToggleFavorite = (product) => {
    // Проверяем, есть ли уже такой товар в избранном
    const existingItem = favoriteItems.find(item => item.product.id === product.id);

    if (existingItem) {

      if (existingItem.product.id === product.id) {
        addMessage('favorite', 'Товар уже в избранном');
      }
    } else {
      // Если товара нет в избранном - добавляем
      const newItem = {
        id: assignUniqueId(favoriteItems),
        image: product.image,
        product: product,
        addedAt: Date.now()
      };
      updateStorage({
        favoriteItems: [...favoriteItems, newItem]
      });
      addMessage('favorite', 'Товар добавлен в избранное');
    }
  };

  const handleSearchResultsClick = (product) => { //Поиск по категориям
    setSearchQuery(''); // очистка поля
    setSearchResults([]); // скрываем подсказки
    setSelectedProduct(product); // сохраняем выбранный товар
    setSelectedCategory('all'); // сбрасываем фильтры
  };


  //Функция по рендерингу товаров на экран взависимости от выбранного фильтра
  function filter(filterArr) {

    return (
      filterArr.length === 0 ? (
        <p className="text-2xl text-gray-600 font-bold">Товары не найдены</p>
      ) : (
        filterArr.map(prod => (
          <ProductCart
            key={prod.id}
            product={prod}
            isFavorite={favoriteIds.includes(prod.id)}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
          />
        ))
      )
    )
  }

  // Функции для проверки нажатия кнопок нужного фильтра
  const handleCategoryClick = () => {
    setIsOnClickCategory(true);
    setIsOnClickBrand(false);
    setIsOnClickPrice(false);
    setSelectedProduct(null);
  };

  const handleBrandClick = () => {
    setIsOnClickBrand(true);
    setIsOnClickCategory(false);
    setIsOnClickPrice(false);
    setSelectedProduct(null);
  };

  const handlePriceClick = () => {
    setIsOnClickPrice(true);
    setIsOnClickCategory(false);
    setIsOnClickBrand(false);
    setSelectedProduct(null);
  };

  //Показывает количество найденных товаров
  const getFilteredCount = () => {
    if (selectedProduct) return 1;
    if (isOnClickPrice) return filteredPrices.length;
    if (isOnClickBrand) return filteredBrands.length;
    if (isOnClickCategory) return filteredProducts.length;

    return products.length;
  };

  const getPromoCode = (prCode) => {
    const upperCode = prCode.toUpperCase();
    if (promoCodes[upperCode]) {
      setAppliedPromo(promoCodes[upperCode]);
      setIsPromoCode(true);
      addMessage('cart', `Промокод: ${upperCode} применен`);
    } else {
      setIsPromoCode(false);
      addMessage('cart', 'Промокод неверный!');
    }
  }

  const calculateTotal = () => {
    const subTotal = cardItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const newPrice = appliedPromo ? subTotal * appliedPromo.discaunt : 0;
    const total = subTotal - newPrice

    return {
      subTotal,
      newPrice,
      total
    }
  }

  // Функция для добавления сообщения
  const addMessage = (type, text) => {
    const newMessage = {
      id: Date.now(),
      type: type,
      text: text,
      visible: true
    };

    setMessages([...messages, newMessage]);

    // Создаем новую функцию для каждого сообщения
    const removeMessage = () => {
      setMessages(prevMessages =>
        prevMessages.filter(msg => msg.id !== newMessage.id)
      );
    };

    setTimeout(removeMessage, 1500);
  };

  return (
    <div>
      <div className="hidden md:block">
        <DesktopVersion
          openCart={openCart}
          handleAddToCart={handleAddToCart}
          openFavorites={openFavorites}
          isCartOpen={isCartOpen}
          isFavoritesOpen={isFavoritesOpen}
          closeCart={closeCart}
          closeFavorites={closeFavorites}
          cardItems={cardItems}
          favoriteItems={favoriteItems}
          removeFromCard={removeFromCard}
          removeFromFavorite={removeFromFavorite}
          isPromoCode={isPromoCode}
          calculateTotal={calculateTotal}
          getPromoCode={getPromoCode}
          cleaningShoppingCart={cleaningShoppingCart}
          cleaningFavorites={cleaningFavorites}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchResults={searchResults}
          handleSearchResultsClick={handleSearchResultsClick}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          handleCategoryClick={handleCategoryClick}
          handleBrandClick={handleBrandClick}
          handlePriceClick={handlePriceClick}
          filtres={filtres}
          setFiltres={setFiltres}
          isOnClickCategory={isOnClickCategory}
          isOnClickBrand={isOnClickBrand}
          isOnClickPrice={isOnClickPrice}
          filter={filter}
          filteredProducts={filteredProducts}
          filteredBrands={filteredBrands}
          filteredPrices={filteredPrices}
          selectedProduct={selectedProduct}
          favoriteIds={favoriteIds}
          handleToggleFavorite={handleToggleFavorite}
          getFilteredCount={getFilteredCount}
          messages={messages}
          addMessage={addMessage}
        />
      </div>

      <div className="block md:hidden">
        <MobileVersion
          openCart={openCart}
          handleAddToCart={handleAddToCart}
          openFavorites={openFavorites}
          isCartOpen={isCartOpen}
          isFavoritesOpen={isFavoritesOpen}
          closeCart={closeCart}
          closeFavorites={closeFavorites}
          cardItems={cardItems}
          favoriteItems={favoriteItems}
          removeFromCard={removeFromCard}
          removeFromFavorite={removeFromFavorite}
          isPromoCode={isPromoCode}
          calculateTotal={calculateTotal}
          getPromoCode={getPromoCode}
          cleaningShoppingCart={cleaningShoppingCart}
          cleaningFavorites={cleaningFavorites}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchResults={searchResults}
          handleSearchResultsClick={handleSearchResultsClick}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          handleCategoryClick={handleCategoryClick}
          handleBrandClick={handleBrandClick}
          handlePriceClick={handlePriceClick}
          filtres={filtres}
          setFiltres={setFiltres}
          isOnClickCategory={isOnClickCategory}
          isOnClickBrand={isOnClickBrand}
          isOnClickPrice={isOnClickPrice}
          filter={filter}
          filteredProducts={filteredProducts}
          filteredBrands={filteredBrands}
          filteredPrices={filteredPrices}
          selectedProduct={selectedProduct}
          favoriteIds={favoriteIds}
          handleToggleFavorite={handleToggleFavorite}
          getFilteredCount={getFilteredCount}
          messages={messages}
          addMessage={addMessage}
        />
      </div>
    </div>
  )
}

export default App;
