// Trending page script - fetch and render popular photos from Unsplash
let trendingPage = 1;
const trendingPerPage = 9;

async function fetchTrending(page = 1, append = false) {
	const loadingEl = document.getElementById('loading');
	const errorEl = document.getElementById('error');
	const galleryEl = document.getElementById('gallery');
	const loadMoreBtn = document.getElementById('loadMoreBtn');

	if (!append) galleryEl.innerHTML = '';

	loadingEl.style.display = 'block';
	errorEl.style.display = 'none';
	loadMoreBtn.style.display = 'none';

	try {
		const url = `https://api.unsplash.com/photos?page=${page}&per_page=${trendingPerPage}&order_by=popular&client_id=${accessKey}`;
		const res = await fetch(url);
		if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

		const photos = await res.json();
		loadingEl.style.display = 'none';

		if (Array.isArray(photos) && photos.length > 0) {
			loadMoreBtn.style.display = 'block';
			loadMoreBtn.disabled = false;
			loadMoreBtn.textContent = translations[currentLang]?.loadMore || 'Muat Lebih Banyak Gambar';
		}

		photos.forEach(photo => {
			const photoCard = document.createElement('div');
			photoCard.className = 'photo-card';

			const desc = photo.alt_description || translations[currentLang]?.defaultPhotoText || 'Foto dari Unsplash';

			photoCard.innerHTML = `
				<img src="${photo.urls.small}" alt="${desc}">
				<div class="photo-info">
					<div class="author">📷 ${photo.user.name}</div>
					<div class="description">${desc}</div>
				</div>
			`;

			// store original alt for later language switch
			photoCard.dataset.alt = photo.alt_description || '';

			photoCard.addEventListener('click', () => window.open(photo.links.html, '_blank'));
			galleryEl.appendChild(photoCard);
		});

	} catch (err) {
		loadingEl.style.display = 'none';
		errorEl.style.display = 'block';
		errorEl.textContent = '❌ ' + (translations[currentLang]?.searchError || 'Gagal memuat') + ': ' + err.message;
		console.error(err);
		loadMoreBtn.style.display = 'block';
		loadMoreBtn.disabled = false;
		loadMoreBtn.textContent = 'Coba Lagi';
	}
}

// Wire up buttons/navigation specifically for the trending page
document.addEventListener('DOMContentLoaded', () => {
	const loadMoreBtn = document.getElementById('loadMoreBtn');

	if (loadMoreBtn) {
		loadMoreBtn.addEventListener('click', () => {
			trendingPage++;
			fetchTrending(trendingPage, true);
		});
	}

	const homeBtn = document.getElementById('homeBtn');
	const searchBtn = document.getElementById('searchBtn');
	const trendingBtn = document.getElementById('trendingBtn');

	if (homeBtn) homeBtn.addEventListener('click', () => { location.href = 'index.html'; });
	if (searchBtn) searchBtn.addEventListener('click', () => { location.href = 'search.html'; });
	if (trendingBtn) trendingBtn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });

	// Re-apply translations & theme (unsplash.js may have run earlier)
	try { applyTheme(); } catch (e) { /* ignore if not available */ }
	try { applyLanguage(); } catch (e) { /* ignore if not available */ }

	// Initial fetch
	fetchTrending(trendingPage, false);
});

