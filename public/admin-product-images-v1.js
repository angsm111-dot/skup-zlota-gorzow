const ADMIN_COMMONS_IMAGE_FILES={
  'krugerrand':'1 oz Krugerrand 2017 Bildseite.png','american-eagle':'American-Gold-Eagle.jpg','american-buffalo':'American buffalo proof vertical edit.jpg','maple-leaf':'Canadian Maple Leaf.png','chinese-panda':'30g China Panda Goldmünze 2016.png','philharmonic':'1 oz Vienna Philharmonic 2017 averse.png',
  'usa-20-dollar':'20 Dollars gold coin of the United States of America.jpg','usa-10-dollar':'United States Twenty-dollar Gold Piece MET DP170360.jpg','usa-5-dollar':'United States Twenty-dollar Gold Piece MET DP170360.jpg','usa-2-5-dollar':'United States Twenty-dollar Gold Piece MET DP170360.jpg',
  'russia-15-ruble':'15-1897 реверс.jpg','russia-10-ruble':'10 рублей 1899.jpg','russia-5-ruble':'Russian Empire-1899-Coin-5-Obverse.jpg','austria-4-ducat':'Golddukaten.png','austria-1-ducat':'Golddukaten.png',
  'germany-20-mark':'20 M Gold Kaiser Wilhelm I. von Preussen B 76.jpg','germany-10-mark':'20 M Gold Kaiser Wilhelm I. von Preussen B 76.jpg','germany-5-mark':'20 M Gold Kaiser Wilhelm I. von Preussen B 76.jpg',
  'france-switzerland-20-franc':'20 Franc Helvetia coin front.png','france-switzerland-10-franc':'20 Franc Helvetia coin front.png','uk-sovereign':'Sovereign-victoria-avers.jpg',
  'austria-100-corona':'Austria 1908 100 Kronen.jpg','austria-20-corona':'Austria 1908 100 Kronen.jpg','austria-10-corona':'Austria 1908 100 Kronen.jpg',
  'mexico-libertad-1oz':'Libertad 1.20 oz Gold Vorderseite.jpg','mexico-libertad-half':'Libertad 1.20 oz Gold Vorderseite.jpg','mexico-libertad-quarter':'Libertad 1.20 oz Gold Vorderseite.jpg',
  'mexico-50-pesos':'50 Pesos, Mexico, 1921 - National Museum of American History - DSC00266.jpg','mexico-20-pesos':'20 Peso Coin Given to Charles Lindbergh by Emilio Carranza - DPLA - 7e2ead179ec3948040a60a3e89fbd562 (page 1).jpg','mexico-10-pesos':'50 Pesos, Mexico, 1921 - National Museum of American History - DSC00266.jpg','mexico-2-5-pesos':'50 Pesos, Mexico, 1921 - National Museum of American History - DSC00266.jpg',
  'chile-100-pesos':'100 Chilean Pesos (51636114).jpeg','chile-50-pesos':'100 Chilean Pesos (51636114).jpeg','denmark-20-kroner':'Two 20kr gold coins.jpg','netherlands-10-guilder':'Nederlandse 10 gulden, 1897 Nederland, 10 gulden, 1897, KOG-MP-1-5500.jpg','austria-1000-schilling':'1000 Schilling Babenberger Gold Bildseite.png','britannia-100-pound':'Liberty & Britannia Gold Coin.jpg','south-africa-2-rand':'Springbock-1-Doppelbild.jpg'
};
const ADMIN_SILVER_COMMONS_BY_ID={
  'silver-maple-leaf-1oz':'1-ounce Silver Canadian Maple Leaf MADE OF .9999% PURE SILVER.jpg','silver-krugerrand-1oz':'1 oz Silver Krugerrand 2017 detail.png','silver-britannia-1oz':'British Britannia Silver 2021 1Oz. .999 Fine Silver 2 Pounds English coin.jpg','silver-american-eagle-1oz':'American Silver Eagle, obverse, 2022.jpg','silver-kangaroo-1oz':'Obverse 2020 Australia 1 oz Silver Kangaroo.jpg','silver-philharmonic-1oz':'Austria 2009 Silver Philharmonic – Obverse.png'
};
const ADMIN_OFFICIAL_IMAGE_BY_KEY={
  'american-eagle':'https://www.usmint.gov/content/dam/usmint/image-library/coins/2026/American-Eagle-Gold-Bullion-1oz-Obverse.jpg','american-buffalo':'https://www.usmint.gov/content/dam/usmint/image-library/coins/2026/American-Buffalo-Gold-Bullion-Obverse.jpg','philharmonic':'https://www.muenzeoesterreich.at/var/storage/images/6/8/5/6/8956586-5-ger-DE/bf29af3fe878-2026_1_1_oz_Au_NP_RS_2D.png'
};
const ADMIN_OFFICIAL_IMAGE_BY_ID={
  'silver-american-eagle-1oz':'https://www.usmint.gov/content/dam/usmint/image-library/coins/2026/American-Eagle-Silver-Bullion-Obverse.jpg','silver-philharmonic-1oz':'https://www.muenzeoesterreich.at/var/storage/images/8/3/5/6/8956538-5-ger-DE/a5f28f9aa6f1-2026_1_1_oz_Ag_NP_RS_2D.png','silver-britannia-1oz':'https://www.royalmint.com/globalassets/_ecommerce/invest/launches/2026/britannia/products/silver-1-oz/bb26s1c---2026-bullion-britannia-1oz-silver-reverse-1500x1500-f3a2c67.jpg'
};
const adminCommonsUrl=file=>file?`https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}?width=240`:'';
function adminProductImageStyle(product){
  if(product.imageData)return `background-image:url('${product.imageData}');background-size:contain;background-position:center`;
  const external=ADMIN_OFFICIAL_IMAGE_BY_ID[product.id]||ADMIN_OFFICIAL_IMAGE_BY_KEY[product.imageKey]||adminCommonsUrl(ADMIN_COMMONS_IMAGE_FILES[product.imageKey])||adminCommonsUrl(ADMIN_SILVER_COMMONS_BY_ID[product.id]);
  if(external)return `background-image:url('${external}');background-size:contain;background-position:center`;
  if(Number.isFinite(Number(product.familyIndex)))return `background-image:url('assets/gold-coin-families-v1.png');background-size:600% auto;background-position:${Number(product.familyIndex)/5*100}% center`;
  if(product.kind==='coin')return `background-image:url('assets/${product.metal}-coins-catalog.webp');background-size:auto 200%;background-position:${Number(product.imageIndex||0)/3*100}% center`;
  return `background-image:url('assets/bars-catalog.webp');background-size:200% auto;background-position:${product.metal==='gold'?0:100}% center`;
}
function adminProductPhoto(product){return `<span class="admin-product-image" style="${adminProductImageStyle(product)}" role="img" aria-label="${String(product.name||'Produkt').replace(/[<>&\"]/g,'')}"></span>`}

