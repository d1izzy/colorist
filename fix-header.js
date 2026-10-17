const fs = require('fs');
const ejs = require('ejs');

// 1. Читаем текущий CSS
let css = fs.readFileSync('public/css/style.css', 'utf-8');

// Удаляем старые кривые стили для мобильной шапки
css = css.replace(/\/\* ===== MOBILE MENU ===== \*\/[\s\S]*?@media \(max-width: 900px\) \{[\s\S]*?\.header-right \{ display: flex; align-items: center; gap: 15px; \}/, '');
css = css.replace(/@media \(max-width: 900px\) \{[\s\S]*?\.phone \{ font-size: 15px; padding: 8px 12px; \}\n\}/, '');

// Добавляем новые, правильные стили
css += `
/* ===== ПРАВИЛЬНАЯ МОБИЛЬНАЯ ШАПКА ===== */
.mobile-menu-btn { 
  display: none; 
  background: transparent; 
  border: 1px solid rgba(196,90,122,0.3); 
  border-radius: 8px;
  font-size: 24px; 
  cursor: pointer; 
  color: #c45a7a; 
  padding: 4px 12px;
}
.header-right { display: flex; align-items: center; gap: 15px; }

@media (max-width: 900px) {
  .mobile-menu-btn { display: block; }
  
  /* Прячем телефон в шапке на телефонах, чтобы не мешал */
  .header .phone { display: none; }
  
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
  }
  .nav.active { display: flex; }
  .nav a { font-size: 18px; padding: 16px 0; border-bottom: 1px solid rgba(196,90,122,0.1); margin: 0; }
  .nav a:last-child { border-bottom: none; }
  
  /* Делаем шапку ровной в одну линию */
  .header-inner { 
    flex-wrap: nowrap; 
    justify-content: space-between; 
    align-items: center;
    padding: 15px 20px; 
  }
}
`;

fs.writeFileSync('public/css/style.css', css);
console.log('✅ Стили шапки исправлены');

/* ========== ПЕРЕСОБИРАЕМ СТАТИКУ В DOCS ========== */
// (Код сборки как в прошлом скрипте, чтобы обновить GitHub Pages)
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

console.log('✅ Сайт в папке /docs пересобран');
console.log('\nОтправь на GitHub: git add . && git commit -m "Fix mobile header" && git push');