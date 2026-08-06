// Drobne ulepszenia interfejsu i zachowania widoków.
const uxWeight=document.querySelector('#weight');
if(uxWeight){
  uxWeight.addEventListener('focus',()=>{if(Number(uxWeight.value)===0){uxWeight.value='';uxWeight.dispatchEvent(new Event('input',{bubbles:true}))}});
  uxWeight.addEventListener('blur',()=>{if(uxWeight.value===''){uxWeight.value='0';uxWeight.dispatchEvent(new Event('input',{bubbles:true}))}});
}

document.querySelectorAll('[data-footer-metal]').forEach(link=>link.addEventListener('click',event=>{
  event.preventDefault();event.stopImmediatePropagation();const metal=link.dataset.footerMetal;location.hash='prices';
  setTimeout(()=>{
    document.querySelector('[data-catalog-tabs="prices"] [data-kind="purities"]')?.click();
    activeMetal=metal;zoomRange=null;
    document.querySelectorAll('[data-metal-tab]').forEach(button=>button.classList.toggle('active',button.dataset.metalTab===metal));
    const chart=document.querySelector('#chart-metal');if(chart)chart.value=metal;
    renderPriceTable();drawChart();window.scrollTo({top:0,behavior:'smooth'});
  },40);
},true));

const footerCall=document.querySelector('.footer-call');
if(footerCall&&!document.querySelector('.footer-social-actions'))footerCall.insertAdjacentHTML('afterend',`<div class="footer-social-actions"><a class="footer-whatsapp" href="https://wa.me/48601775146?text=Dzie%C5%84%20dobry%2C%20chc%C4%99%20zapyta%C4%87%20o%20wycen%C4%99." target="_blank" rel="noopener" aria-label="Napisz na WhatsApp"><b>WA</b><span>WhatsApp</span></a><a href="https://www.facebook.com/" target="_blank" rel="noopener" aria-label="Facebook" title="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3c-3 0-5 2-5 5v2H6v4h3v7h4v-7h3l1-4h-4V9c0-.7.3-1 1-1z"/></svg></a><a href="https://www.messenger.com/" target="_blank" rel="noopener" aria-label="Messenger" title="Messenger"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c-5 0-9 3.7-9 8.3 0 2.6 1.3 4.8 3.4 6.3V21l3.1-1.7c.8.2 1.7.3 2.5.3 5 0 9-3.7 9-8.3S17 3 12 3zm1 11-2.3-2.4L6.3 14l4.8-5.1 2.3 2.4 4.3-2.4L13 14z"/></svg></a></div>`);

const sellIcons=[
  `<svg viewBox="0 0 160 100" aria-hidden="true"><circle cx="48" cy="55" r="22"/><path d="M32 43l9-14h14l9 14-16 12zM41 29l7 26 7-26M32 43h32"/><path d="M88 18c1 34 10 55 27 55s26-21 27-55M102 69l13-18 13 18-13 13zM102 69h26"/></svg>`,
  `<svg viewBox="0 0 160 100" aria-hidden="true"><circle cx="43" cy="51" r="30"/><circle cx="43" cy="51" r="24"/><path d="M43 31l4 9 8-4-3 9 9 3-8 6 4 9-10-3-4 12-4-12-10 3 4-9-8-6 9-3-3-9 8 4z"/><path d="M88 28h43l13 48H76zM95 38h29l8 28H85zM94 48h32M91 57h38"/></svg>`,
  `<svg viewBox="0 0 160 100" aria-hidden="true"><path d="M25 18h38l7 18v30l-7 18H25l-7-18V36zM33 18V7h22v11M33 84v9h22v-9"/><circle cx="44" cy="51" r="18"/><path d="M44 39v13l9 5M82 78l34-49 10 7-35 49-12 5zM116 29l5-8 10 7-5 8M87 75l8 6"/><path d="M132 44h18v40h-18zM135 44v-7h12v7"/></svg>`,
  `<svg viewBox="0 0 160 100" aria-hidden="true"><path d="M24 47h112l11 39H13zM13 86h134M31 39h98v9H31z"/><path d="M39 38l12-21h30L70 38zM76 38l14-23h32l-12 23zM51 28h22M92 26h22"/><circle cx="80" cy="67" r="10"/><path d="M80 60v14M73 67h14"/></svg>`
];
document.querySelectorAll('.sell-visual').forEach((box,index)=>{if(sellIcons[index])box.innerHTML=sellIcons[index]});

const valueIcons=[
  `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M11 24l8 8 18-19M24 5l16 7v11c0 10-6 17-16 21C14 40 8 33 8 23V12z"/></svg>`,
  `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 38h28M15 38V20h18v18M19 20l4-8h6l4 8M20 28h8M24 24v8"/></svg>`,
  `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 5l15 6v11c0 10-6 18-15 22C15 40 9 32 9 22V11zM18 24h12M21 19h6M20 29h8"/></svg>`
];
document.querySelectorAll('.values article').forEach((article,index)=>{if(!article.querySelector('.value-icon'))article.insertAdjacentHTML('afterbegin',`<div class="value-icon">${valueIcons[index]}</div>`)});

let uxProductContext='',uxSelectedProduct='';
renderProductCalculator=function(){
  const card=document.querySelector('.calc-card'),view=card.querySelector('#product-calculator'),standard=[card.querySelector('.metal-selector'),card.querySelector('.field-row'),card.querySelector('.calc-live'),card.querySelector('.calc-hint'),card.querySelector('#add-item')],showProducts=calcKind!=='purities';standard.forEach(element=>element.hidden=showProducts);view.hidden=!showProducts;if(!showProducts){uxProductContext='';uxSelectedProduct='';return}
  const context=`${calcKind}:${calcProductMetal}`;if(context!==uxProductContext){uxProductContext=context;uxSelectedProduct=''}
  const list=productGroup(calcProductMetal,calcKind),selected=list.find(item=>item.id===uxSelectedProduct),label=calcKind==='coin'?'monetę':'sztabkę';
  view.innerHTML=`${metalSwitch('calculator',calcProductMetal)}<p class="product-picker-label">Najpierw wybierz ${label} z listy</p><div class="product-calc-layout ${selected?'has-selection':'awaiting-selection'}"><div class="product-preview">${selected?`<div class="product-photo" style="${productImageStyle(selected)}"></div>`:`<div class="product-empty"><span>${calcKind==='coin'?'◯':'▭'}</span><strong>Wybierz ${label}</strong><small>Zdjęcie i cena pojawią się po wyborze produktu.</small></div>`}</div><div class="product-fields"><label>Wybierz ${label}<select id="catalog-product" class="${selected?'':'attention-select'}"><option value="">— Wybierz ${label} —</option>${list.map(product=>`<option value="${product.id}" ${product.id===uxSelectedProduct?'selected':''}>${product.name} — próba ${String(product.purity).replace('.',',')}</option>`).join('')}</select></label>${selected?`<div class="product-facts"><span>Czysty metal <b>${formatProductWeight(selected.fineWeight)}</b></span><span>Cena za sztukę <b>${productMoney(productPrice(selected))}</b></span></div><label>Liczba sztuk<input id="catalog-quantity" type="number" min="1" step="1" value="1"></label><button type="button" id="add-product" class="btn dark-btn">+ Dodaj do wyceny</button>`:`<div class="product-choice-hint">Wybór produktu jest wymagany przed dodaniem pozycji do wyceny.</div>`}</div></div>`;
  view.querySelector('[data-catalog-metal="calculator"]').addEventListener('click',event=>{const button=event.target.closest('button');if(!button||button.disabled)return;calcProductMetal=button.dataset.productMetal;uxSelectedProduct='';renderProductCalculator()});
  view.querySelector('#catalog-product').addEventListener('change',event=>{uxSelectedProduct=event.target.value;renderProductCalculator()});
  view.querySelector('#add-product')?.addEventListener('click',()=>{const product=productGroup(calcProductMetal,calcKind).find(item=>item.id===uxSelectedProduct),quantity=Math.max(1,Math.floor(Number(view.querySelector('#catalog-quantity').value)||1));if(!product)return;items.push({type:'product',productId:product.id,metal:product.metal,quantity,product});renderItems();view.querySelector('#catalog-quantity').value='1'});
};
renderProductCalculator();
