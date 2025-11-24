// ==========================================
// SEARCH MODULE - Fitur pencarian gambar
// ==========================================

// Variabel global untuk search (diakses dari unsplash.js)
window.currentSearchQuery = "";
window.currentPage = 1;
window.isSearchMode = false;

// ==========================================
// Quick Search Tags - Multi-bahasa
// ==========================================
const quickSearchTags = {
    id: [
        { emoji: "🐱", text: "Kucing", query: "cat" },
        { emoji: "🌅", text: "Sunset", query: "sunset" },
        { emoji: "🌲", text: "Alam", query: "nature" },
        { emoji: "🏙️", text: "Kota", query: "city" },
        { emoji: "☕", text: "Kopi", query: "coffee" },
        { emoji: "🌸", text: "Bunga", query: "flower" },
        { emoji: "🏖️", text: "Pantai", query: "beach" },
        { emoji: "🌌", text: "Langit", query: "sky" },
        { emoji: "🐕", text: "Anjing", query: "dog" },
        { emoji: "🍕", text: "Makanan", query: "food" },
        { emoji: "🚗", text: "Mobil", query: "car" },
        { emoji: "🎨", text: "Seni", query: "art" }
    ],
    en: [
        { emoji: "🐱", text: "Cat", query: "cat" },
        { emoji: "🌅", text: "Sunset", query: "sunset" },
        { emoji: "🌲", text: "Nature", query: "nature" },
        { emoji: "🏙️", text: "City", query: "city" },
        { emoji: "☕", text: "Coffee", query: "coffee" },
        { emoji: "🌸", text: "Flower", query: "flower" },
        { emoji: "🏖️", text: "Beach", query: "beach" },
        { emoji: "🌌", text: "Sky", query: "sky" },
        { emoji: "🐕", text: "Dog", query: "dog" },
        { emoji: "🍕", text: "Food", query: "food" },
        { emoji: "🚗", text: "Car", query: "car" },
        { emoji: "🎨", text: "Art", query: "art" }
    ],
    es: [
        { emoji: "🐱", text: "Gato", query: "cat" },
        { emoji: "🌅", text: "Atardecer", query: "sunset" },
        { emoji: "🌲", text: "Naturaleza", query: "nature" },
        { emoji: "🏙️", text: "Ciudad", query: "city" },
        { emoji: "☕", text: "Café", query: "coffee" },
        { emoji: "🌸", text: "Flor", query: "flower" },
        { emoji: "🏖️", text: "Playa", query: "beach" },
        { emoji: "🌌", text: "Cielo", query: "sky" },
        { emoji: "🐕", text: "Perro", query: "dog" },
        { emoji: "🍕", text: "Comida", query: "food" },
        { emoji: "🚗", text: "Coche", query: "car" },
        { emoji: "🎨", text: "Arte", query: "art" }
    ],
    fr: [
        { emoji: "🐱", text: "Chat", query: "cat" },
        { emoji: "🌅", text: "Coucher", query: "sunset" },
        { emoji: "🌲", text: "Nature", query: "nature" },
        { emoji: "🏙️", text: "Ville", query: "city" },
        { emoji: "☕", text: "Café", query: "coffee" },
        { emoji: "🌸", text: "Fleur", query: "flower" },
        { emoji: "🏖️", text: "Plage", query: "beach" },
        { emoji: "🌌", text: "Ciel", query: "sky" },
        { emoji: "🐕", text: "Chien", query: "dog" },
        { emoji: "🍕", text: "Nourriture", query: "food" },
        { emoji: "🚗", text: "Voiture", query: "car" },
        { emoji: "🎨", text: "Art", query: "art" }
    ],
    de: [
        { emoji: "🐱", text: "Katze", query: "cat" },
        { emoji: "🌅", text: "Sonnenuntergang", query: "sunset" },
        { emoji: "🌲", text: "Natur", query: "nature" },
        { emoji: "🏙️", text: "Stadt", query: "city" },
        { emoji: "☕", text: "Kaffee", query: "coffee" },
        { emoji: "🌸", text: "Blume", query: "flower" },
        { emoji: "🏖️", text: "Strand", query: "beach" },
        { emoji: "🌌", text: "Himmel", query: "sky" },
        { emoji: "🐕", text: "Hund", query: "dog" },
        { emoji: "🍕", text: "Essen", query: "food" },
        { emoji: "🚗", text: "Auto", query: "car" },
        { emoji: "🎨", text: "Kunst", query: "art" }
    ],
    jp: [
        { emoji: "🐱", text: "猫", query: "cat" },
        { emoji: "🌅", text: "夕日", query: "sunset" },
        { emoji: "🌲", text: "自然", query: "nature" },
        { emoji: "🏙️", text: "都市", query: "city" },
        { emoji: "☕", text: "コーヒー", query: "coffee" },
        { emoji: "🌸", text: "花", query: "flower" },
        { emoji: "🏖️", text: "ビーチ", query: "beach" },
        { emoji: "🌌", text: "空", query: "sky" },
        { emoji: "🐕", text: "犬", query: "dog" },
        { emoji: "🍕", text: "食べ物", query: "food" },
        { emoji: "🚗", text: "車", query: "car" },
        { emoji: "🎨", text: "アート", query: "art" }
    ],
    kr: [
        { emoji: "🐱", text: "고양이", query: "cat" },
        { emoji: "🌅", text: "일몰", query: "sunset" },
        { emoji: "🌲", text: "자연", query: "nature" },
        { emoji: "🏙️", text: "도시", query: "city" },
        { emoji: "☕", text: "커피", query: "coffee" },
        { emoji: "🌸", text: "꽃", query: "flower" },
        { emoji: "🏖️", text: "해변", query: "beach" },
        { emoji: "🌌", text: "하늘", query: "sky" },
        { emoji: "🐕", text: "개", query: "dog" },
        { emoji: "🍕", text: "음식", query: "food" },
        { emoji: "🚗", text: "자동차", query: "car" },
        { emoji: "🎨", text: "예술", query: "art" }
    ],
    cn: [
        { emoji: "🐱", text: "猫", query: "cat" },
        { emoji: "🌅", text: "日落", query: "sunset" },
        { emoji: "🌲", text: "自然", query: "nature" },
        { emoji: "🏙️", text: "城市", query: "city" },
        { emoji: "☕", text: "咖啡", query: "coffee" },
        { emoji: "🌸", text: "花", query: "flower" },
        { emoji: "🏖️", text: "海滩", query: "beach" },
        { emoji: "🌌", text: "天空", query: "sky" },
        { emoji: "🐕", text: "狗", query: "dog" },
        { emoji: "🍕", text: "食物", query: "food" },
        { emoji: "🚗", text: "汽车", query: "car" },
        { emoji: "🎨", text: "艺术", query: "art" }
    ]
};

// ==========================================
// Fungsi mencari gambar berdasarkan keyword
// ==========================================
async function searchPhotos(query, page = 1, perPage = 9) {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&client_id=${accessKey}`;
    const response = await fetch(url);

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data;
}

// ==========================================
// Fungsi untuk melakukan pencarian
// ==========================================
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    
    if (query === '') {
        alert('Masukkan kata kunci pencarian!');
        return;
    }
    
    window.currentSearchQuery = query;
    window.currentPage = 1;
    window.isSearchMode = true;
    displayPhotos(false);
}

// ==========================================
// Fungsi untuk menutup search dan kembali ke random
// ==========================================
function closeSearch() {
    const searchContainer = document.getElementById('searchContainer');
    const searchInput = document.getElementById('searchInput');
    const searchInfo = document.getElementById('searchInfo');
    
    searchContainer.style.display = 'none';
    searchInput.value = '';
    searchInfo.style.display = 'none';
    
    window.currentSearchQuery = '';
    window.currentPage = 1;
    window.isSearchMode = false;
    
    document.getElementById('gallery').innerHTML = '';
    displayPhotos(false);
}

// ==========================================
// Fungsi toggle search box
// ==========================================
function toggleSearchBox() {
    const searchContainer = document.getElementById('searchContainer');
    searchContainer.style.display = searchContainer.style.display === 'none' ? 'block' : 'none';
    
    if (searchContainer.style.display === 'block') {
        document.getElementById('searchInput').focus();
        renderQuickSearchBubbles();
    }
}

// ==========================================
// Render Quick Search Bubbles
// ==========================================
function renderQuickSearchBubbles() {
    const bubblesContainer = document.getElementById('quickSearchBubbles');
    const currentLang = localStorage.getItem("appLang") || "id";
    const tags = quickSearchTags[currentLang] || quickSearchTags.id;
    
    bubblesContainer.innerHTML = '';
    
    tags.forEach(tag => {
        const bubble = document.createElement('button');
        bubble.className = 'quick-search-bubble';
        bubble.innerHTML = `${tag.emoji} ${tag.text}`;
        bubble.dataset.query = tag.query;
        
        bubble.addEventListener('click', () => {
            document.getElementById('searchInput').value = tag.query;
            performSearch();
        });
        
        bubblesContainer.appendChild(bubble);
    });
}

// ==========================================
// Event listeners untuk search - Langsung dijalankan saat DOM ready
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('searchBtn');
    const searchSubmitBtn = document.getElementById('searchSubmitBtn');
    const searchInput = document.getElementById('searchInput');
    const closeSearchBtn = document.getElementById('closeSearchBtn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', toggleSearchBox);
    }
    
    if (searchSubmitBtn) {
        searchSubmitBtn.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    if (closeSearchBtn) {
        closeSearchBtn.addEventListener('click', closeSearch);
    }
});
