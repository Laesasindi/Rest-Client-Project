// Masukkan Access Key dari Unsplash API
// Dapatkan di: https://unsplash.com/developers
const accessKey = "v2_5YkYlFQZnlu9kuE2ZiN5jWHM-EDeIwB9vAqUEsPQ";

// Fungsi mengambil gambar random dari Unsplash API
async function getRandomPhotos(count = 9) {
    try {
        const url = `https://api.unsplash.com/photos/random?count=${count}&client_id=${accessKey}`;
        console.log('Fetching from:', url);
        
        const response = await fetch(url);
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error:', errorText);
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }
        
        const data = await response.json();
        console.log('Data received:', data);
        
        // Pastikan data adalah array
        if (!Array.isArray(data)) {
            console.error('Data is not an array:', data);
            throw new Error('Data yang diterima bukan array');
        }
        
        return data;
    } catch (error) {
        console.error('Error fetching photos:', error);
        throw error;
    }
}
