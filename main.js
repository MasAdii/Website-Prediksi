
const api = "https://api.genderize.io";

function showResult(name, gender, probability) {
    const predic = document.getElementById('predic');
    const procen = probability * 100 // Format probabilitas menjadi 2 angka desimal
    let genderDec = ""; // Variabel untuk menyimpan hasil gender yang lebih ramah pengguna

    // Mengganti istilah gender dari API dengan istilah yang lebih sesuai
    if (gender === "male") {
        genderDec = "cowok";
    } else if (gender === "female") {
        genderDec = "cewek";
    } else {
        genderDec = "tidak terdefinisi"; // Tangani kasus di mana gender tidak terdefinisi
    }

    const preText = `Halo ${name}, jenis kelamin kamu kemungkinan adalah ${genderDec} sebesar ${procen}%`;
    predic.textContent = preText; // Tampilkan hasil
}

async function predict(event) { 
    if (event.key === "Enter") {
        const user = event.target.value.trim(); // Hapus spasi dari input
        if (user) { // Cek jika input pengguna tidak kosong
            const QueryUrl = `${api}/?name=${user}&country_id=ID`;

            try {
                const res = await fetch(QueryUrl);
                if (!res.ok) { // Cek jika respons OK
                    throw new Error('Respons jaringan tidak baik');
                }
                const result = await res.json();
                console.log(result);
                showResult(result.name, result.gender, result.probability);
            } catch (error) {
                console.error('Ada masalah dengan operasi fetch:', error);
                const predic = document.getElementById('predic');
                predic.textContent = "Terjadi kesalahan saat mengambil data. Silakan coba lagi.";
            }
        } else {
            const predic = document.getElementById('predic');
            predic.textContent = "Silakan masukkan nama.";
        }
    }
}