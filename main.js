const api = "https://api.genderize.io";

function showResult(name, gender, probability) {
    const predic = document.getElementById('predic');
    const procen = (probability * 100).toFixed(2);
    let genderDec = "";

    if (gender === "male") {
        genderDec = "cowok";
    } else if (gender === "female") {
        genderDec = "cewek";
    } else {
        genderDec = "tidak diketahui"; 
    }

    predic.textContent = `Halo ${name}, sistem memprediksi jenis kelamin kamu sebagai ${genderDec} dengan kemungkinan ${procen}%. Namun, ini hanya prediksi berdasarkan data statistik dan bisa saja tidak akurat.`;

async function predict(event) { 
    if (event.key === "Enter") {
        const user = event.target.value.trim(); 
        const predic = document.getElementById('predic');

        if (user) {
            predic.textContent = "Sedang memproses...";

            const QueryUrl = `${api}/?name=${user}`;

            try {
                const res = await fetch(QueryUrl);
                if (!res.ok) { 
                    throw new Error('Respons jaringan tidak baik');
                }
                const result = await res.json();

                if (result.gender) {
                    showResult(result.name, result.gender, result.probability);
                } else {
                    predic.textContent = `Tidak dapat menentukan gender untuk nama "${user}"`;
                }
            } catch (error) {
                console.error('Ada masalah dengan operasi fetch:', error);
                predic.textContent = "Terjadi kesalahan saat mengambil data. Silakan coba lagi.";
            }
        } else {
            predic.textContent = "Silakan masukkan nama.";
        }
    }
}
document.getElementById("nameInput").addEventListener("keydown", predict);
