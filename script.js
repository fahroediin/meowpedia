document.addEventListener('DOMContentLoaded', () => {
    // Pastikan API_KEY sudah dimuat dari config.js
    if (typeof API_KEY === 'undefined' || API_KEY === 'MASUKKAN_API_KEY_ANDA_DI_SINI') {
        alert('Peringatan: API Key TheCatAPI belum diatur di file config.js!');
        console.error("API Key tidak ditemukan. Harap buat file config.js dan masukkan API Key Anda.");
        return;
    }

    // Konstanta untuk URL API
    const API_URL_BREEDS = 'https://api.thecatapi.com/v1/breeds';
    const API_URL_IMAGES = 'https://api.thecatapi.com/v1/images/search';

    // Elemen DOM
    const breedSelect = document.getElementById('breed-select');
    const contentContainer = document.getElementById('content-container');
    const loader = document.getElementById('loader');
    const langControls = document.getElementById('language-controls');
    const langSelect = document.getElementById('lang-select');

    // State Management
    let currentBreedData = null;
    const translationCache = {};

    // Fungsi untuk menampilkan/menyembunyikan loader
    function toggleLoader(show) {
        loader.classList.toggle('hidden', !show);
    }

    // ... (Fungsi fetchBreeds dan populateBreedSelect tetap sama persis) ...
    async function fetchBreeds() {
        toggleLoader(true);
        try {
            const response = await fetch(API_URL_BREEDS, { headers: { 'x-api-key': API_KEY } });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const breeds = await response.json();
            populateBreedSelect(breeds);
        } catch (error) {
            console.error("Gagal mengambil daftar ras:", error);
            contentContainer.innerHTML = `<p style="color:red;">Maaf, terjadi kesalahan saat memuat data ras kucing.</p>`;
        } finally {
            toggleLoader(false);
        }
    }

    function populateBreedSelect(breeds) {
        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.textContent = breed.name;
            breedSelect.appendChild(option);
        });
    }
    
    // ... (Fungsi fetchBreedInfo tetap sama persis) ...
    async function fetchBreedInfo(breedId) {
        if (!breedId) {
            langControls.style.display = 'none';
            currentBreedData = null;
            contentContainer.innerHTML = `<div class="welcome-message"><h2>Selamat Datang di Meowpedia!</h2><p>Pilih salah satu ras kucing dari daftar di atas untuk melihat informasi detail, temperamen, dan foto lucunya.</p><img src="https://cdn2.thecatapi.com/images/MTYwODg1OQ.jpg" alt="Kucing lucu" class="welcome-cat"></div>`;
            return;
        }
        toggleLoader(true);
        contentContainer.innerHTML = '';
        try {
            const response = await fetch(`${API_URL_IMAGES}?breed_ids=${breedId}`, { headers: { 'x-api-key': API_KEY } });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            if (data.length > 0 && data[0].breeds.length > 0) {
                currentBreedData = data[0];
                langControls.style.display = 'block';
                langSelect.value = 'en';
                await displayBreedInfo();
            } else {
                 contentContainer.innerHTML = `<p>Maaf, tidak ada informasi untuk ras ini.</p>`;
                 langControls.style.display = 'none';
            }
        } catch (error) {
            console.error("Gagal mengambil info ras:", error);
            contentContainer.innerHTML = `<p style="color:red;">Maaf, terjadi kesalahan saat memuat data kucing.</p>`;
        } finally {
            toggleLoader(false);
        }
    }

    // ========================================================================
    // PEMBARUAN UTAMA DI SINI: Menggunakan MyMemory API untuk Terjemahan Gratis
    // ========================================================================
    /**
     * Fungsi untuk menerjemahkan teks menggunakan MyMemory API.
     * @param {string} text - Teks yang akan diterjemahkan.
     * @param {string} targetLang - Kode bahasa tujuan (misal: 'id', 'de').
     * @returns {Promise<string>} Teks yang sudah diterjemahkan.
     */
    async function translateText(text, targetLang) {
        if (targetLang === 'en') {
            return text;
        }

        const cacheKey = `${targetLang}-${text}`;
        if (translationCache[cacheKey]) {
            return translationCache[cacheKey];
        }

        // Format bahasa untuk MyMemory adalah 'en|id' (dari|ke)
        const langPair = `en|${targetLang}`;
        // URL encode teks untuk memastikan karakter khusus aman dikirim
        const encodedText = encodeURIComponent(text);
        
        // Opsional: berikan email untuk mendapatkan kuota yang lebih tinggi
        // const myEmail = "emailanda@contoh.com"; 
        // const url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${langPair}&de=${myEmail}`;
        const url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${langPair}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Gagal menghubungi API terjemahan.');
            }
            const data = await response.json();

            // Cek apakah API memberikan respons yang valid
            if (data.responseStatus !== 200) {
                console.error('MyMemory API error:', data.responseDetails);
                throw new Error(data.responseDetails);
            }

            const translatedText = data.responseData.translatedText;
            translationCache[cacheKey] = translatedText; // Simpan ke cache
            return translatedText;

        } catch (error) {
            console.error('Error saat menerjemahkan:', error);
            // Jika gagal, kembalikan teks asli dengan penanda
            return `[Gagal menerjemahkan] ${text}`;
        }
    }

    // ... (Fungsi displayBreedInfo tetap sama persis) ...
    async function displayBreedInfo() {
        if (!currentBreedData) return;
        const breed = currentBreedData.breeds[0];
        const targetLang = langSelect.value;
        toggleLoader(true);
        const [translatedTemperament, translatedDescription] = await Promise.all([
            translateText(breed.temperament, targetLang),
            translateText(breed.description, targetLang)
        ]);
        toggleLoader(false);
        const breedHTML = `<div class="breed-info"><div class="breed-image"><img src="${currentBreedData.url}" alt="Foto ${breed.name}"></div><div class="breed-details"><h2>${breed.name}</h2><p><strong>Asal:</strong> ${breed.origin}</p><p><strong>Temperamen:</strong> ${translatedTemperament}</p><p>${translatedDescription}</p><div><span class="tag">Berat: ${breed.weight.metric} kg</span><span class="tag">Harapan Hidup: ${breed.life_span} tahun</span></div><a href="${breed.wikipedia_url}" target="_blank">Baca lebih lanjut di Wikipedia</a></div></div>`;
        contentContainer.innerHTML = breedHTML;
    }

    // --- Event Listeners ---
    breedSelect.addEventListener('change', (event) => {
        fetchBreedInfo(event.target.value);
    });

    langSelect.addEventListener('change', () => {
        if (currentBreedData) {
            displayBreedInfo();
        }
    });

    // --- Inisialisasi Aplikasi ---
    fetchBreeds();
});