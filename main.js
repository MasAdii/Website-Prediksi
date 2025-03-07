
const api = "https://api.genderize.io";

function showResult(name, gender, probability) {
    const predic = document.getElementById('predic');
    const procen = probability * 100
    let genderDec = "";
    
    if (gender === "male") {
        genderDec = "cowok";
    } else if (gender === "female") {
        genderDec = "cewek";
    } else {
        genderDec = "tidak terdefinisi"; 
    }

    const preText = `Halo ${name}, jenis kelamin kamu kemungkinan adalah ${genderDec} sebesar ${procen}%`;
    predic.textContent = preText;
}

async function predict(event) { 
    if (event.key === "Enter") {
        const user = event.target.value.trim(); 
        if (user) {
            const QueryUrl = `${api}/?name=${user}&country_id=ID`;

            try {
                const res = await fetch(QueryUrl);
                if (!res.ok) { 
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
