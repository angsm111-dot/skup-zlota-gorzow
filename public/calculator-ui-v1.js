function addNumberStepper(input, minimum, step) {
  if (!input || input.parentElement.querySelector('.number-stepper')) return;
  const controls = document.createElement('span');
  controls.className = 'number-stepper';
  controls.innerHTML = '<button type="button" data-spin="up" aria-label="Zwiększ wartość">▲</button><button type="button" data-spin="down" aria-label="Zmniejsz wartość">▼</button>';
  controls.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    const current = Number(input.value) || 0;
    input.value = button.dataset.spin === 'up' ? current + step : Math.max(minimum, current - step);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });
  input.parentElement.append(controls);
}

addNumberStepper(document.querySelector('#weight'), 0, 1);

const productCalculator = document.querySelector('#product-calculator');
if (productCalculator) {
  const observer = new MutationObserver(() => addNumberStepper(productCalculator.querySelector('#catalog-quantity'), 1, 1));
  observer.observe(productCalculator, { childList: true, subtree: true });
  addNumberStepper(productCalculator.querySelector('#catalog-quantity'), 1, 1);
}
