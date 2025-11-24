// Masukkan Access Key dari Unsplash API
const accessKey = "v2_5YkYlFQZnlu9kuE2ZiN5jWHM-EDeIwB9vAqUEsPQ";

// ==========================================
// Fungsi mengambil gambar random dari Unsplash API
// ==========================================
async function getRandomPhotos(count = 9) {
    const url = `https://api.unsplash.com/photos/random?count=${count}&client_id=${accessKey}`;
    const response = await fetch(url);

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) throw new Error('Data yang diterima bukan array');

    return data;
}

// ==========================================
// Pemetaan bahasa → region/country
// ==========================================
const regionMap = {
    id: "Indonesia",
    en: "United States",
    es: "Spain",
    fr: "France",
    de: "Germany",
    jp: "Japan",
    kr: "Korea",
    cn: "China"
};

// ==========================================
// Translations
// ==========================================
const translations = {
    id: {
        home: "Beranda",
        trending: "Populer",
        search: "Cari",
        language: "Bahasa",
        darkMode: "Mode Gelap",
        lightMode: "Mode Terang",
        loading: "Memuat gambar...",
        loadMore: "Muat Lebih Banyak Gambar",
        awesome: "Seni Keren",
        defaultPhotoText: "Foto indah dari Unsplash"
    },
    en: {
        home: "Home",
        trending: "Trending",
        search: "Search",
        language: "Language",
        darkMode: "Dark Mode",
        lightMode: "Light Mode",
        loading: "Loading images...",
        loadMore: "Load More Images",
        awesome: "Awesome Art",
        defaultPhotoText: "Beautiful photo from Unsplash"
    },
    es: {
        home: "Inicio",
        trending: "Tendencias",
        search: "Buscar",
        language: "Idioma",
        darkMode: "Modo Oscuro",
        lightMode: "Modo Claro",
        loading: "Cargando imágenes...",
        loadMore: "Cargar más imágenes",
        awesome: "Arte Genial",
        defaultPhotoText: "Hermosa foto de Unsplash"
    },
    fr: {
        home: "Accueil",
        trending: "Tendance",
        search: "Recherche",
        language: "Langue",
        darkMode: "Mode Sombre",
        lightMode: "Mode Clair",
        loading: "Chargement des images...",
        loadMore: "Charger plus d'images",
        awesome: "Art Génial",
        defaultPhotoText: "Belle photo de Unsplash"
    },
    de: {
        home: "Startseite",
        trending: "Beliebt",
        search: "Suche",
        language: "Sprache",
        darkMode: "Dunkelmodus",
        lightMode: "Hellmodus",
        loading: "Bilder werden geladen...",
        loadMore: "Weitere Bilder laden",
        awesome: "Tolle Kunst",
        defaultPhotoText: "Schönes Foto von Unsplash"
    },
    jp: {
        home: "ホーム",
        trending: "人気",
        search: "検索",
        language: "言語",
        darkMode: "ダークモード",
        lightMode: "ライトモード",
        loading: "画像を読み込み中...",
        loadMore: "さらに画像を読み込む",
        awesome: "素晴らしいアート",
        defaultPhotoText: "Unsplashの美しい写真"
    },
    kr: {
        home: "홈",
        trending: "인기",
        search: "검색",
        language: "언어",
        darkMode: "다크 모드",
        lightMode: "라이트 모드",
        loading: "이미지 로딩 중...",
        loadMore: "더 많은 이미지 불러오기",
        awesome: "멋진 아트",
        defaultPhotoText: "Unsplash의 아름다운 사진"
    },
    cn: {
        home: "首页",
        trending: "热门",
        search: "搜索",
        language: "语言",
        darkMode: "深色模式",
        lightMode: "浅色模式",
        loading: "正在加载图片...",
        loadMore: "加载更多图片",
        awesome: "精彩艺术",
        defaultPhotoText: "来自Unsplash的美丽照片"
    }
};


let currentLang = localStorage.getItem("appLang") || "id";
let isDarkMode = localStorage.getItem("darkMode") === "true";

// ==========================================
// Fungsi render foto ke gallery
// ==========================================
async function displayPhotos() {
    const loadingEl = document.getElementById('loading');
    const errorEl = document.getElementById('error');
    const galleryEl = document.getElementById('gallery');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    loadingEl.style.display = 'block';
    errorEl.style.display = 'none';
    loadMoreBtn.style.display = 'none';

    try {
        const photos = await getRandomPhotos(9);

        loadingEl.style.display = 'none';
        loadMoreBtn.style.display = 'block';
        loadMoreBtn.disabled = false;
        loadMoreBtn.textContent = translations[currentLang].loadMore;

        photos.forEach(photo => {
            const photoCard = document.createElement('div');
            photoCard.className = 'photo-card';
        
            // Gunakan alt_description jika ada, kalau tidak pakai defaultPhotoText
            const desc = photo.alt_description || translations[currentLang].defaultPhotoText;
            
            photoCard.innerHTML = `
            <img src="${photo.urls.small}" alt="${desc}">
            <div class="photo-info">
            <div class="author">📷 ${photo.user.name}</div>
            <div class="description">${desc}</div>
        </div>
    `;

    photoCard.addEventListener('click', () => window.open(photo.links.html, '_blank'));
    galleryEl.appendChild(photoCard);
});


    } catch (err) {
        loadingEl.style.display = 'none';
        errorEl.style.display = 'block';
        errorEl.textContent = '❌ Gagal memuat gambar: ' + err.message;
        console.error(err);
        loadMoreBtn.disabled = false;
        loadMoreBtn.textContent = 'Coba Lagi';
    }
}

// ==========================================
// Fungsi ganti bahasa
// ==========================================
function applyLanguage() {
    const t = translations[currentLang];

    document.querySelector("#homeBtn .feature-name").textContent = t.home;
    document.querySelector("#trendingBtn .feature-name").textContent = t.trending;
    document.querySelector("#searchBtn .feature-name").textContent = t.search;
    document.querySelector("#languageBtn .feature-name").textContent = t.language;
    document.getElementById("subtitle").textContent = t.awesome;
    document.getElementById("loading").textContent = t.loading;
    document.getElementById("loadMoreBtn").textContent = t.loadMore;
    updateThemeButton();
}

// ==========================================
// Fungsi toggle dark mode
// ==========================================
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    localStorage.setItem("darkMode", isDarkMode);
    applyTheme();
}

function applyTheme() {
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
    updateThemeButton();
}

function updateThemeButton() {
    const t = translations[currentLang];
    const themeBtn = document.querySelector("#themeBtn .feature-name");
    const themeIcon = document.querySelector("#themeBtn .feature-icon");
    
    if (isDarkMode) {
        themeBtn.textContent = t.lightMode;
        themeIcon.textContent = "☀️";
    } else {
        themeBtn.textContent = t.darkMode;
        themeIcon.textContent = "🌙";
    }
}

// ==========================================
// Event listeners
// ==========================================
document.getElementById('loadMoreBtn').addEventListener('click', displayPhotos);

document.getElementById('homeBtn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    location.reload();
});

document.getElementById('trendingBtn').addEventListener('click', () => {
    alert('Fitur Trending akan segera hadir! 🔥');
});

document.getElementById('searchBtn').addEventListener('click', () => {
    alert('Fitur Search akan segera hadir! 🔍');
});

document.getElementById('languageBtn').addEventListener('click', () => {
    const box = document.getElementById("languageBox");
    box.style.display = box.style.display === "none" ? "block" : "none";
});

document.getElementById("languageSelect").addEventListener("change", (e) => {
    currentLang = e.target.value;
    localStorage.setItem("appLang", currentLang);
    applyLanguage();

    // Update deskripsi foto tanpa reload
    document.querySelectorAll(".photo-card").forEach(card => {
        const descEl = card.querySelector(".description");
        const alt = card.dataset.alt; // ambil alt_description asli
        descEl.textContent = alt || translations[currentLang].defaultPhotoText;

        // Update alt pada <img>
        const imgEl = card.querySelector("img");
        imgEl.alt = alt || translations[currentLang].defaultPhotoText;
    });
});

document.getElementById('themeBtn').addEventListener('click', toggleDarkMode);

// ==========================================
// Jalankan pertama kali
// ==========================================
applyTheme();
applyLanguage();
displayPhotos();
