// Variables del DOM
const baseAmountInput = document.getElementById('baseAmount');
const calculateBtn = document.getElementById('calculateBtn');
const payBtn = document.getElementById('payBtn');
const resultsDiv = document.getElementById('results');
const baseDisplay = document.getElementById('baseDisplay');
const tipDisplay = document.getElementById('tipDisplay');
const totalDisplay = document.getElementById('totalDisplay');
const messageBox = document.getElementById('messageBox');

// Modal de éxito
const calculatorCard = document.getElementById('calculator-card');
const successModal = document.getElementById('successModal');
const closeModalBtn = document.getElementById('closeModalBtn');

const TIP_RATE = 0.10;

function calculateTip() {
    const amount = parseFloat(baseAmountInput.value);

    successModal.classList.add('hidden');
    messageBox.classList.add('hidden');

    if (isNaN(amount) || amount <= 0) {
        messageBox.textContent = "Por favor, ingrese un monto base válido.";
        messageBox.classList.remove('hidden');
        resultsDiv.classList.add('hidden');
        payBtn.classList.add('hidden');
        payBtn.disabled = true;
        return;
    }

    const tip = amount * TIP_RATE;
    const total = amount + tip;

    const currencyFormat = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    baseDisplay.textContent = currencyFormat.format(amount);
    tipDisplay.textContent = currencyFormat.format(tip);
    totalDisplay.textContent = currencyFormat.format(total);

    resultsDiv.classList.remove('hidden');
    payBtn.classList.remove('hidden');
    payBtn.disabled = false;
}

function handlePayment() {
    calculatorCard.classList.add('hidden');
    successModal.classList.remove('hidden');
    baseAmountInput.value = '';
}

function closeModal() {
    successModal.classList.add('hidden');
    calculatorCard.classList.remove('hidden');
    resultsDiv.classList.add('hidden');
    payBtn.classList.add('hidden');
}

calculateBtn.addEventListener('click', calculateTip);
payBtn.addEventListener('click', handlePayment);
closeModalBtn.addEventListener('click', closeModal);

successModal.addEventListener('click', (e) => {
    if (e.target.id === 'successModal') closeModal();
});

baseAmountInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        calculateTip();
    }
});
