function addNumberStepper(input, minimum, step) {
  if (!input || input.parentElement.querySelector('.number-stepper')) return;
  const controls = document.createElement('span');
  controls.className = 'number-stepper';
  controls.innerHTML = '<button type="button" data-spin="up" aria-label="Zwiększ wartość">▲</button><button type="button" data-spin="down" aria-label="Zmniejsz wartość">▼</button>';
  controls.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    const current = Number(String(input.value).replace(',', '.')) || 0;
    const next = button.dataset.spin === 'up' ? current + step : Math.max(minimum, current - step);
    input.value = input.id === 'weight' ? String(next).replace('.', ',') : next;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });
  input.parentElement.append(controls);
}

const weightField = document.querySelector('#weight');
const calculatorWeightUnit = document.querySelector('.weight > span');
if (weightField) {
  weightField.type = 'text';
  weightField.inputMode = 'decimal';
  weightField.value = '0';
  calculatorWeightUnit?.classList.add('weight-unit');
  weightField.dispatchEvent(new Event('input', { bubbles: true }));
  weightField.addEventListener('input', () => {
    weightField.value = weightField.value.replace(/[^0-9,.]/g, '').replace(/([,.].*)[,.]/g, '$1');
  });
  document.querySelector('#add-item')?.addEventListener('click', () => {
    weightField.value = weightField.value.replace(',', '.');
    setTimeout(() => {
      if (Number(weightField.value) === 0) weightField.value = '0';
      weightField.dispatchEvent(new Event('input', { bubbles: true }));
    });
  }, true);
}
addNumberStepper(weightField, 0, 1);

const productCalculator = document.querySelector('#product-calculator');
if (productCalculator) {
  const observer = new MutationObserver(() => addNumberStepper(productCalculator.querySelector('#catalog-quantity'), 1, 1));
  observer.observe(productCalculator, { childList: true, subtree: true });
  addNumberStepper(productCalculator.querySelector('#catalog-quantity'), 1, 1);
}
