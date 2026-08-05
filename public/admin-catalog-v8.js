let catalogEditId=null,catalogImageData='',catalogEditingBuiltIn=false;
const catalogPurities=[900,916,916.7,917,925,950,986,995,999,999.9];
const catalogGroup=product=>`${product.metal}${product.kind==='coin'?'Coins':'Bars'}`;

function ensureCatalogManager(){
  let section=document.querySelector('#catalog-manager');if(section)return section;
  section=document.createElement('section');section.id='catalog-manager';section.className='catalog-manager';section.hidden=true;
  section.innerHTML=`<div class="catalog-manager-head"><div><small>KATALOG PRODUKTÓW</small><h2>Monety i sztabki</h2></div><button type="button" id="catalog-toggle">+ Dodaj produkt</button></div><form id="catalog-form" hidden><input type="hidden" id="catalog-id"><label>Nazwa produktu<input id="catalog-name" required maxlength="100" placeholder="np. Dukat austriacki"></label><label class="catalog-description-field">Opis produktu<textarea id="catalog-description" maxlength="300" rows="3" placeholder="Krótki opis widoczny w cenniku"></textarea></label><label>Metal<select id="catalog-metal"><option value="gold">Złoto</option><option value="silver">Srebro</option><option value="platinum">Platyna</option><option value="palladium">Pallad</option></select></label><label>Rodzaj<select id="catalog-kind"><option value="coin">Moneta</option><option value="bar">Sztabka</option></select></label><label>Próba<select id="catalog-purity">${catalogPurities.map(value=>`<option value="${value}">${String(value).replace('.',',')}</option>`).join('')}</select></label><label>Masa całkowita (g)<input id="catalog-gross" type="number" min="0.01" step="0.0001" required></label><label>Czysty metal (g)<input id="catalog-fine" type="number" min="0.001" step="0.0001" placeholder="Wyliczy się automatycznie"></label><label>Domyślne potrącenie (%)<input id="catalog-margin" type="number" min="0" max="100" step="0.5" value="10"></label><label class="catalog-image-field">Zdjęcie produktu<input id="catalog-image" type="file" accept="image/jpeg,image/png,image/webp"><span id="catalog-image-help">Zdjęcie zostanie automatycznie zmniejszone</span></label><div class="catalog-preview"><img id="catalog-preview-image" alt="Podgląd zdjęcia" hidden><span id="catalog-image-note">Brak zdjęcia</span></div><label class="catalog-active"><input id="catalog-active" type="checkbox" checked> Produkt widoczny w cenniku i kalkulatorze</label><div class="catalog-form-actions"><button type="submit">Zapisz zmiany</button><button type="button" id="catalog-cancel">Anuluj</button></div><p id="catalog-message" role="status"></p></form>`;
  document.querySelector('.metal-head').before(section);
  section.querySelector('#catalog-toggle').onclick=()=>openCatalogForm();
  section.querySelector('#catalog-cancel').onclick=closeCatalogForm;
  section.querySelector('#catalog-form').onsubmit=saveCatalogProduct;
  section.querySelector('#catalog-image').onchange=readCatalogImage;
  section.querySelector('#catalog-gross').oninput=calculateFineWeight;
  section.querySelector('#catalog-purity').onchange=calculateFineWeight;
  return section;
}

function renderCatalogManager(){
  const section=ensureCatalogManager();section.hidden=kind==='purities';
  if(section.hidden)closeCatalogForm();
  decorateProductRows();
}

function decorateProductRows(){
  if(kind==='purities')return;
  document.querySelectorAll('#rows tr[data-product]').forEach(row=>{
    if(row.querySelector('.catalog-row-actions'))return;
    const product=currentProducts().find(item=>item.id===row.dataset.product);if(!product)return;
    const box=document.createElement('div');box.className='catalog-row-actions';
    box.innerHTML=`<button type="button" data-edit-product="${product.id}">Edytuj</button>${product.custom?`<button type="button" class="danger" data-delete-product="${product.id}">Usuń</button>`:product.overridden?`<button type="button" data-restore-product="${product.id}">Przywróć domyślne</button>`:''}`;
    row.cells[0].append(box);
  });
  document.querySelectorAll('[data-edit-product]').forEach(button=>button.onclick=()=>openCatalogForm(currentProducts().find(item=>item.id===button.dataset.editProduct)));
  document.querySelectorAll('[data-delete-product]').forEach(button=>button.onclick=()=>deleteCatalogProduct(button.dataset.deleteProduct));
  document.querySelectorAll('[data-restore-product]').forEach(button=>button.onclick=()=>restoreCatalogProduct(button.dataset.restoreProduct));
}

function ensurePurityOption(value){
  const select=document.querySelector('#catalog-purity'),string=String(value);
  if(![...select.options].some(option=>option.value===string))select.add(new Option(string.replace('.',','),string));
}

function openCatalogForm(product=null){
  const form=document.querySelector('#catalog-form');form.hidden=false;catalogEditId=product?.id||null;catalogEditingBuiltIn=Boolean(product&&!product.custom);catalogImageData=product?.imageData||'';
  document.querySelector('#catalog-name').value=product?.name||'';
  document.querySelector('#catalog-description').value=product?.description||'';
  document.querySelector('#catalog-metal').value=product?.metal||active;
  document.querySelector('#catalog-kind').value=product?.kind||(kind==='bars'?'bar':'coin');
  ensurePurityOption(product?.purity||999.9);document.querySelector('#catalog-purity').value=String(product?.purity||999.9);
  document.querySelector('#catalog-gross').value=product?.grossWeight||'';document.querySelector('#catalog-fine').value=product?.fineWeight||'';
  document.querySelector('#catalog-margin').value=config.products?.[product?.id]?.margin??product?.defaultMargin??10;
  document.querySelector('#catalog-active').checked=product?.active!==false;document.querySelector('#catalog-image').value='';
  const preview=document.querySelector('#catalog-preview-image');preview.hidden=!catalogImageData;preview.src=catalogImageData||'';
  document.querySelector('#catalog-image-note').textContent=catalogImageData?'Zdjęcie zapisane':catalogEditingBuiltIn?'Pozostanie obecne zdjęcie katalogowe':'Wybierz zdjęcie produktu';
  document.querySelector('#catalog-image-help').textContent=catalogEditingBuiltIn?'Nowe zdjęcie jest opcjonalne. Bez niego pozostanie obecne.':'Zdjęcie zostanie automatycznie zmniejszone';
  document.querySelector('#catalog-message').textContent='';document.querySelector('#catalog-name').focus();
}

function closeCatalogForm(){const form=document.querySelector('#catalog-form');if(form)form.hidden=true;catalogEditId=null;catalogImageData='';catalogEditingBuiltIn=false}
function calculateFineWeight(){const gross=Number(document.querySelector('#catalog-gross').value),purity=Number(document.querySelector('#catalog-purity').value);if(gross>0&&purity>0)document.querySelector('#catalog-fine').value=(gross*purity/1000).toFixed(4)}

async function readCatalogImage(event){
  const file=event.target.files[0],message=document.querySelector('#catalog-message');if(!file)return;message.textContent='Przygotowuję zdjęcie…';
  try{catalogImageData=await resizeCatalogImage(file);const preview=document.querySelector('#catalog-preview-image');preview.src=catalogImageData;preview.hidden=false;document.querySelector('#catalog-image-note').textContent=`Gotowe: ${file.name}`;message.textContent='Zdjęcie gotowe do zapisania.'}catch{message.textContent='Nie udało się odczytać zdjęcia. Wybierz JPG, PNG lub WEBP.'}
}
function resizeCatalogImage(file){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onerror=reject;reader.onload=()=>{const image=new Image();image.onerror=reject;image.onload=()=>{const max=600,scale=Math.min(1,max/Math.max(image.width,image.height)),canvas=document.createElement('canvas');canvas.width=Math.round(image.width*scale);canvas.height=Math.round(image.height*scale);const context=canvas.getContext('2d');context.fillStyle='#fff';context.fillRect(0,0,canvas.width,canvas.height);context.drawImage(image,0,0,canvas.width,canvas.height);const data=canvas.toDataURL('image/webp',.78);data.length>480000?reject(Error('large')):resolve(data)};image.src=reader.result};reader.readAsDataURL(file)})}

function saveCatalogProduct(event){
  event.preventDefault();const message=document.querySelector('#catalog-message');if(!catalogImageData&&!catalogEditingBuiltIn){message.textContent='Najpierw wybierz zdjęcie produktu.';return}
  const metal=document.querySelector('#catalog-metal').value,productKind=document.querySelector('#catalog-kind').value,purity=Number(document.querySelector('#catalog-purity').value),grossWeight=Number(document.querySelector('#catalog-gross').value),fineWeight=Number(document.querySelector('#catalog-fine').value)||grossWeight*purity/1000,id=catalogEditId||`custom-${metal}-${productKind}-${Date.now()}`,existing=currentProducts().find(item=>item.id===id),product={id,name:document.querySelector('#catalog-name').value.trim(),description:document.querySelector('#catalog-description').value.trim(),metal,kind:productKind,purity,grossWeight,fineWeight,imageData:catalogImageData,imageIndex:existing?.imageIndex||0,active:document.querySelector('#catalog-active').checked,custom:!catalogEditingBuiltIn,overridden:catalogEditingBuiltIn,defaultMargin:Number(document.querySelector('#catalog-margin').value)||0};
  if(!product.name||!(purity>=900)||!(grossWeight>0)){message.textContent='Uzupełnij nazwę, próbę oraz masę.';return}
  config.customProducts||=[];const old=config.customProducts.findIndex(item=>item.id===id);old>=0?config.customProducts[old]=product:config.customProducts.push(product);
  config.products[id]||={margin:product.defaultMargin,mode:'auto',manualPrice:null};config.products[id].margin=product.defaultMargin;
  const group=catalogGroup(product),marketValue=prices.metals[metal].spot*fineWeight;for(const list of Object.values(prices.products)){const index=list.findIndex(item=>item.id===id);if(index>=0)list.splice(index,1)}prices.products[group].push({...existing,...product,marketValue,price:marketValue*(1-config.products[id].margin/100),margin:config.products[id].margin,mode:config.products[id].mode});
  active=metal;kind=productKind==='coin'?'coins':'bars';markDirty();closeCatalogForm();render();
}

function deleteCatalogProduct(id){if(!confirm('Usunąć ten produkt?'))return;config.customProducts=(config.customProducts||[]).filter(item=>item.id!==id);for(const list of Object.values(prices.products)){const index=list.findIndex(item=>item.id===id);if(index>=0)list.splice(index,1)}delete config.products[id];markDirty();render()}
function restoreCatalogProduct(id){config.customProducts=(config.customProducts||[]).filter(item=>item.id!==id);markDirty();document.querySelector('#status').textContent='Przywrócono dane domyślne. Opublikuj cennik, aby zapisać zmianę.';render()}

const originalAdminRender=render;render=function(){originalAdminRender();renderCatalogManager()};
