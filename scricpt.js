 const coinBoxes = document.querySelectorAll('.coin-box');
  const customBox = document.querySelector('.custom-trigger');
  const customModal = document.getElementById('customModal');
  const closeBtn = document.querySelector('.close-btn');
  const customInput = document.getElementById('customAmountInput');
  const customTotal = document.getElementById('customTotal');
  const keypadButtons = document.querySelectorAll('.custom-keypad button');

  const coinRate = 0.0105714; // TikTok: 70 coins = $0.74

  // Format number with commas (1,000, 25,500 etc.)
  function formatWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Extract raw number from input (remove commas)
  function extractRawNumber(str) {
    return str.replace(/[^0-9]/g, "");
  }

  // Update input field and total
  function updateCustomInput(raw) {
    const cleanNum = extractRawNumber(raw);
    const number = parseInt(cleanNum || '0', 10);
    customInput.value = formatWithCommas(number);
    customTotal.textContent = (number * coinRate).toFixed(2);
  }

  // Keypad click handling
  keypadButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      let current = extractRawNumber(customInput.value);

      if (action === "backspace" || btn.textContent === '⌫') {
        current = current.slice(0, -1);
      } else if (btn.textContent === "Clear") {
        current = "";
      } else {
        current += btn.textContent;
      }

      updateCustomInput(current);
    });
  });

  // Coin box selection
  coinBoxes.forEach(box => {
    box.addEventListener('click', () => {
      coinBoxes.forEach(b => b.classList.remove('selected'));
      box.classList.add('selected');

      if (box.classList.contains('custom-trigger')) {
        customModal.style.display = 'flex';
      } else {
        customModal.style.display = 'none';
        customInput.value = '';
        customTotal.textContent = '0.00';
      }
    });
  });

  // Modal close
  closeBtn.addEventListener('click', () => {
    customModal.style.display = 'none';
    customInput.value = '';
    customTotal.textContent = '0.00';
    customBox.classList.remove('selected');
  });