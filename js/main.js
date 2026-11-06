// Fungsi Utama: Mengendalikan Validation & Pengiraan Kos
function validateAndCalculate(event) {
    // 1. Menghalang borang daripada submit/refresh secara automatik
    event.preventDefault();

    // 2. Clear kesemua mesej ralat terdahulu
    document.getElementById('nameError').innerText = "";
    document.getElementById('emailError').innerText = "";
    document.getElementById('destError').innerText = "";
    document.getElementById('weightError').innerText = "";
    document.getElementById('speedError').innerText = "";
    document.getElementById('termsError').innerText = "";

    // 3. Ambil Nilai dari Borang melalui DOM
    const name = document.getElementById('custName').value.trim();
    const email = document.getElementById('custEmail').value.trim();
    const destination = document.getElementById('destination').value;
    const ghostWeightValue = document.getElementById('ghostWeight').value;
    const speed = document.getElementById('speed').value;
    const terms = document.getElementById('terms');
    const resultDiv = document.getElementById('resultDisplay');

    let isValid = true;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 4. CLIENT-SIDE VALIDATION CHECKS
    if (name === "") {
        document.getElementById('nameError').innerText = "Customer Name is required.";
        isValid = false;
    }

    if (email === "") {
        document.getElementById('emailError').innerText = "Email Address is required.";
        isValid = false;
    } else if (!emailPattern.test(email)) {
        document.getElementById('emailError').innerText = "Please enter a valid email format (e.g., name@domain.com).";
        isValid = false;
    }

    if (destination === "") {
        document.getElementById('destError').innerText = "Please select a relocation destination.";
        isValid = false;
    }

    if (ghostWeightValue === "") {
        document.getElementById('weightError').innerText = "Please select a ghost weight tier.";
        isValid = false;
    }

    if (speed === "") {
        document.getElementById('speedError').innerText = "Please select delivery speed.";
        isValid = false;
    }

    if (!terms.checked) {
        document.getElementById('termsError').innerText = "You must agree to the terms and conditions.";
        isValid = false;
    }

    // Jika ada ralat pengesahan, hentikan pemprosesan
    if (!isValid) {
        alert("Invalid input! Please check your form error messages.");
        resultDiv.classList.add("hidden");
        return false;
    }

    // 5. JAVASCRIPT PROCESSING
    let destCost = 0;
    let weightCost = 0;
    let speedCost = 0;
    let destName = "";
    let weightCategory = "";
    let speedName = "";

    // Kirakan Kos Destinasi
    if (destination === "city") {
        destCost = 50.00;
        destName = "City Area";
    } else if (destination === "rural") {
        destCost = 100.00;
        destName = "Rural Area";
    } else if (destination === "haunted") {
        destCost = 200.00;
        destName = "Remote Haunted House";
    }

    // Kirakan Kos Berat Berdasarkan Pilihan Dropdown
    if (ghostWeightValue === "5") {
        weightCost = 20.00;
        weightCategory = "Light Entity (1 - 5 kg)";
    } else if (ghostWeightValue === "20") {
        weightCost = 50.00;
        weightCategory = "Medium Entity (6 - 20 kg)";
    } else if (ghostWeightValue === "50") {
        weightCost = 100.00;
        weightCategory = "Heavy Entity (21 - 50 kg)";
    } else if (ghostWeightValue === "51") {
        weightCost = 150.00;
        weightCategory = "Ultra Heavy Entity (> 50 kg)";
    }

    // Kirakan Kos Kelajuan
    if (speed === "express") {
        speedCost = 100.00;
        speedName = "Emergency Express (1-Hour)";
    } else {
        speedCost = 0.00;
        speedName = "Standard Response (24 Hours)";
    }

    // Pengiraan Jumlah Keseluruhan
    const totalCost = destCost + weightCost + speedCost;

    // Alert Kejayaan
    alert("Calculation complete! Scroll down to view the detailed summary.");

    // 6. PAPARAN KEPUTUSAN DINAMIK PADA DOM (Gunakan CSS Classes)
    resultDiv.classList.remove("hidden");
    resultDiv.innerHTML = `
        <h3>Estimation Result Summary</h3>
        <p><strong>Customer Name:</strong> ${escapeHTML(name)}</p>
        <p><strong>Email:</strong> ${escapeHTML(email)}</p>
        <hr class="result-divider">
        <p>Destination Fee (${destName}): RM ${destCost.toFixed(2)}</p>
        <p>Ghost Handling Fee (${weightCategory}): RM ${weightCost.toFixed(2)}</p>
        <p>Delivery Speed Fee (${speedName}): RM ${speedCost.toFixed(2)}</p>
        <h4 class="total-charge">
            TOTAL ESTIMATED CHARGE: RM ${totalCost.toFixed(2)}
        </h4>
        <br>
        <small class="pricing-note">
            *Pricing Rule Explanation: Tiered rate based on entity weight tier + destination base rate + urgency surcharge.
        </small>
    `;

    return true;
}

// Fungsi Keselamatan untuk Menghalang XSS pada Paparan
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

// Simulasi Teks Radar Status Dinamik
function updateRadarStatus() {
    const statusText = document.getElementById('radarStatus');
    if (!statusText) return;

    const statuses = [
        "Scanning area for paranormal entities...",
        "WARNING: Pocong detected 50m away!",
        "Langsuir signal weak nearby...",
        "Area clear. Ready for exorcism response!"
    ];

    let index = 0;
    setInterval(() => {
        index = (index + 1) % statuses.length;
        statusText.innerText = statuses[index];
    }, 4000);
}

// Jalankan radar apabila halaman dibuka
document.addEventListener("DOMContentLoaded", updateRadarStatus);