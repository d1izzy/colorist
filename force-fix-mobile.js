const fs = require('fs');
const ejs = require('ejs');

// 1. Читаем текущий CSS
let css = fs.readFileSync('public/css/style.css', 'utf-8');

// 2. Полностью удаляем все старые медиа-запросы, чтобы они не конфликтовали
// (Ищем блоки @media и удаляем их)
css = css.replace(/@media[\s\S]*?\}\s*\}/g, '');

// 3. Добавляем выверенную мобильную версию
css += `
/* ===== МОБИЛЬНАЯ ВЕРСИЯ (ПЕРЕЗАПИСЬ) ===== */
.mobile-menu-btn { 
  display: none; 
  background: transparent; 
  border: 1px solid #c45a7a; 
  border-radius: 8px;
  font-size: 24px; 
  cursor: pointer; 
  color: #c45a7a; 
  padding: 2px 10px;
  font-family: inherit;
}
.header-right { display: flex; align-items: center; gap: 15px; }

@media (max-width: 900px) {
  .mobile-menu-btn { display: block; }
  
  /* Прячем телефон в шапке */
  .header-inner > .phone { display: none; }
  
  /* Делаем шапку в одну линию */
  .header-inner { 
    flex-wrap: nowrap !important; 
    justify-content: space-between !important; 
    align-items: center !important;
    padding: 15px 20px !important; 
  }
  
  /* Выпадающее меню */
  .nav {
    display: none;
    position: absolute;
    top: 100%; left: 0; right: 0;
    background: #fdfaf9;
    flex-direction: column;
    padding: 10px 0;
    border-bottom: 1px solid rgba(196,90,122,0.2);
    box-shadow: 0 10px 20px rgba(0,0,0,0.05);
    text-align: center;
    z-index: 100;
  }
  .nav.active { display: flex; }
  .nav a { 
    font-size: 18px; 
    padding: 16px 0; 
    border-bottom: 1px solid rgba(196,90,122,0.1); 
    margin: 0; 
    display: block;
    width: 100%;
  }
  .nav a:last-child { border-bottom: none; }
  
  /* Сетки в одну колонку */
  .about-grid, .course-grid, .services-grid, .footer-inner { 
    grid-template-columns: 1fr !important; 
  }
}

@media (max-width: 600px) {
  .section { padding: 60px 0; }
  .hero h1 { font-size: 42px; }
  h2 { font-size: 32px; }
  .hero-text { font-size: 18px; }
  .hero-buttons { flex-direction: column; align-items: center; width: 100%; }
  .btn { width: 100%; max-width: 100%; }
  .course-card { padding: 24px; }
  .price-list { grid-template-columns: 1fr; }
  .price-cta { flex-direction: column; align-items: center; }
  .price-cta .btn { max-width: 100%; }
  .stat strong { font-size: 32px; }
  .stat span { font-size: 16px; }
}
`;

fs.writeFileSync('public/css/style.css', css);
console.log('✅ CSS полностью переписан и исправлен');

// 4. Пересобираем статику в /docs для GitHub Pages
const priceData = JSON.parse(fs.readFileSync('data/price.json', 'utf-8'));
function fixPaths(html, isSubpage = false) {
  let fixed = html.replace(/href="\/css\//g, 'href="css/');
  fixed = fixed.replace(/src="\/js\//g, 'src="js/');
  if (isSubpage) {
    fixed = fixed.replace(/href="css\//g, 'href="../css/');
    fixed = fixed.replace(/src="js\//g, 'src="../js/');
    fixed = fixed.replace(/href="\/"/g, 'href="../"');
    fixed = fixed.replace(/href="\/price"/g, 'href="./"');
    fixed = fixed.replace(/href="\/#/g, 'href="../#');
  } else {
    fixed = fixed.replace(/href="\/price"/g, 'href="price/"');
    fixed = fixed.replace(/href="\/"/g, 'href="./"');
    fixed = fixed.replace(/href="\/#/g, 'href="#');
  }
  return fixed;
}

ejs.renderFile('views/index.ejs', { title: 'Мастер-колорист Настя | Челябинск' }, {}, (err, str) => {
  fs.writeFileSync('docs/index.html', fixPaths(str, false));
});
ejs.renderFile('views/price.ejs', { title: 'Прайс-лист | Окрашивания', price: priceData }, {}, (err, str) => {
  fs.writeFileSync('docs/price/index.html', fixPaths(str, true));
});
fs.copyFileSync('public/css/style.css', 'docs/css/style.css');

console.log('✅ Файлы в /docs обновлены');
console.log('\nОтправь на GitHub: git add . && git commit -m "Force fix mobile layout" && git push');