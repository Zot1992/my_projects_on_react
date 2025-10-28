export const products = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        price: 89990,
        category: "smartphones",
        image: "https://images.biggeek.ru/1/originals/4632/22686-170t_natural.jpg",
        rating: 4.8,
        inStock: 15,
        brand: "Apple",
        description: "Новейший iPhone с титановым корпусом",
        specs: ["256GB", "Pro Camera", "A17 Pro", "Titanium"]
    },
    {
        id: 2,
        name: "Samsung Galaxy S24 Ultra",
        price: 79990,
        category: "smartphones",
        image: "https://images.biggeek.ru/1/originals/2b7e/24355-981Photoroom_001_20250129_071920.png",
        rating: 4.7,
        inStock: 8,
        brand: "Samsung",
        description: "Флагманский смартфон с S Pen",
        specs: ["512GB", "200MP Camera", "S Pen", "AI Features"]
    },
    {
        id: 3,
        name: "MacBook Pro 16",
        price: 159990,
        category: "laptops",
        image: "https://my-apple-store.ru/wa-data/public/shop/products/69/58/15869/images/32317/32317.500@2x.jpg",
        rating: 4.9,
        inStock: 5,
        brand: "Apple",
        description: "Профессиональный ноутбук для творчества",
        specs: ["M3 Pro", "32GB RAM", "1TB SSD", "Liquid Retina XDR"]
    },
    {
        id: 4,
        name: "iPad Pro 12.9",
        price: 69990,
        category: "tablets",
        image: "https://static.insales-cdn.com/images/products/1/5744/557053552/ipad_pro_2tb.jpg",
        rating: 4.8,
        inStock: 20,
        brand: "Apple",
        description: "Профессиональный планшет",
        specs: ["M2 Chip", "256GB", "Liquid Retina XDR", "Apple Pencil"]
    },
    {
        id: 5,
        name: "AirPods Pro 2",
        price: 19990,
        category: "audio",
        image: "https://images.biggeek.ru/1/424/a242/22739-99718518-503Airpodspro2@2x.png",
        rating: 4.7,
        inStock: 30,
        brand: "Apple",
        description: "Беспроводные наушники с ANC",
        specs: ["ANC", "Spatial Audio", "MagSafe Case", "6h Battery"]
    },
    {
        id: 6,
        name: "Sony WH-1000XM5",
        price: 24990,
        category: "audio",
        image: "https://tehnoyard.ru/image/cache/catalog/04Naushnikiiaudiotehnika/sony/BeigeSilver/6379077532-1000x1000.jpg",
        rating: 4.8,
        inStock: 15,
        brand: "Sony",
        description: "Премиальные наушники с ANC",
        specs: ["30h Battery", "Hi-Res Audio", "Touch Control", "Quick Charge"]
    }
];

export const categories = [
    { id: 'all', name: 'Все товары', icon: '🛍️' },
    { id: 'smartphones', name: 'Смартфоны', icon: '📱' },
    { id: 'laptops', name: 'Ноутбуки', icon: '💻' },
    { id: 'tablets', name: 'Планшеты', icon: '📱' },
    { id: 'audio', name: 'Аудио', icon: '🎧' },
];