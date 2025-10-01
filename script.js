// script.js

let currentInput = ''; // Untuk menampung input pengguna
let history = []; // Menyimpan riwayat perhitungan
const MAX_INPUT_LENGTH = 15; // Membatasi panjang input maksimal 15 karakter

// Menambahkan angka ke input
function appendNumber(number) {
    if (currentInput.length < MAX_INPUT_LENGTH) { // Memeriksa apakah panjang input sudah mencapai batas
        currentInput += number;
        updateScreen();
        scrollToBottom(); // Menjaga agar input ter-scroll ke bawah
    } else {
        showNotification("Max 15 digit yang dapat diisi kawan.");
    }
}

// Menambahkan operator ke input (ganti operator jika sudah ada)
function appendOperator(operator) {
    // Cek apakah operator sudah ada di akhir input dan ganti
    if (currentInput.length > 0 && /[\+\-\*\/]$/.test(currentInput)) {
        currentInput = currentInput.slice(0, -1) + operator; // Ganti operator terakhir
    } else if (currentInput.length < MAX_INPUT_LENGTH) { // Memeriksa apakah panjang input sudah mencapai batas
        currentInput += ' ' + operator + ' ';
    }
    updateScreen();
    scrollToBottom(); // Menjaga agar input ter-scroll ke bawah
}

// Menghapus input
function clearScreen() {
    currentInput = '';
    updateScreen();
    scrollToBottom(); // Menjaga agar input ter-scroll ke bawah
}

// Mengupdate layar kalkulator dengan input terbaru
function updateScreen() {
    document.getElementById('result').value = currentInput;
}

// Menghitung hasil dari input
function calculateResult() {
    try {
        // Evaluasi ekspresi matematika (gunakan eval dengan hati-hati)
        let result = eval(currentInput).toString();
        // Simpan hasil ke dalam riwayat
        history.push(currentInput + ' = ' + result);
        updateHistory(); // Update riwayat di layar
        currentInput = result; // Tampilkan hasil di layar kalkulator
        updateScreen();
        scrollToBottom(); // Menjaga agar input ter-scroll ke bawah
    } catch (error) {
        currentInput = 'Error';
        updateScreen();
    }
}

// Menampilkan riwayat
function updateHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = ''; // Kosongkan daftar riwayat

    // Tambahkan setiap riwayat ke dalam daftar
    history.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        historyList.appendChild(listItem);
    });
}

// Fungsi untuk scroll ke bawah pada input
function scrollToBottom() {
    const inputField = document.getElementById('result');
    inputField.scrollTop = inputField.scrollHeight;
}

// Toggle untuk menampilkan atau menyembunyikan riwayat
function toggleHistory() {
    const historyList = document.getElementById('history-list');
    historyList.style.display = historyList.style.display === 'none' || historyList.style.display === '' ? 'block' : 'none';
}

// Fungsi untuk menampilkan notifikasi
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';

    // Sembunyikan notifikasi setelah 3 detik
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}
