const fs = require('fs');
const ejs = require('ejs');

/* ========== 1. ОБНОВЛЯЕМ HEADER (Жестко убираем телефон из шапки) ========== */
fs.writeFileSync('views/partials/header.ejs', [
  "<!DOCTYPE html>",
  "<html lang=\"ru\">",
  "<head>",
  "  <meta charset=\"UTF-8\">",
  "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
  "  <title><%= title %></title>",
  "  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">",
  "  <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>",
  "  <link href=\"https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap\" rel=\"stylesheet\">",
  "  <link rel=\"stylesheet\" href=\"/css/style.css\">",
  "</head>",
  "<body>",
  "  <header class=\"header\">",
  "    <div class=\"container header-inner\">",
  "      <a href=\"/\" class=\"logo\">NASTYA<span>.</span>COLOR</a>",
  "      <nav class=\"nav\" id=\"mobileNav\">",
  "        <a href=\"/\">Главная</a>",
  "        <a href=\"/price\">Прайс</a>",
  "        <a href=\"/#course\">Обучение</a>",
  "        <a href=\"/#contacts\">Контакты</a>",
  "      </nav>",
  "      <div class=\"header-right\">",
  "        <!-- Телефон спрятан на мобильных через CSS, но он здесь нужен для ПК -->",
  "        <a href=\"tel:89514462515\" class=\"phone header-phone\">8 (951) 446-25-15</a>",
  "        <button class=\"mobile-menu-btn\" id=\"menuBtn\" aria-label=\"Меню\">☰</button>",
  "      </div>",
  "    </div>",
  "  </header>",
  ""
].join('\n'));

/* ========== 2. ОБНОВЛЯЕМ CSS ========== */
let css = fs.readFileSync('public/css/style.css', 'utf-8');

// Удаляем все старые медиа-запросы, чтобы начать с чистого листа
css = css.replace(/@media[\s\S]*?\}\s*\}/g, '');

// Добавляем новые стили
css += `
/* ===== МОБИЛЬНАЯ ВЕРСИЯ (ФИНАЛ) ===== */
.mobile-menu-btn { 
  display: none; 
  background: transparent; 
  border: 1px solid #c45a7a; 
  border-radius: 8px;
  font-size: 24px; 
  cursor: pointer; 
  color: #c45a7a; 
  padding: 2px 10px;
}
.header-right { display: flex; align-items: center; gap: 15px; }

@media (max-width: 900px) {
  /* Прячем бургер и телефон на ПК, показываем на телефоне */
  .mobile-menu-btn { display: block; }
  .header-phone { display: none !important; }
  
  /* Шапка строго в линию */
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
  
  /* ИСПРАВЛЕНИЕ ПРАЙСА НА ТЕЛЕФОНЕ */
  .price-list { 
    grid-template-columns: 1fr; 
    gap: 20px;
  }
  .price-category {
    padding: 20px;
  }
  /* Убираем пунктирную линию, которая ломает экран */
  .price-dots { 
    display: none; 
  }
  /* Выстраиваем цену и название аккуратно */
  .price-item { 
    display: flex; 
    flex-direction: column; 
    align-items: flex-start; 
    gap: 4px;
    padding: 10px 0;
    border-bottom: 1px dashed rgba(196,90,122,0.2);
  }
  .price-item:last-child {
    border-bottom: none;
  }
  .price-item .price-value {
    color: #c45a7a;
    font-size: 18px;
  }
  
  .price-cta { flex-direction: column; align-items: center; }
  .price-cta .btn { max-width: 100%; }
}
`;

fs.writeFileSync('public/css/style.css', css);
console.log('✅ CSS обновлен: шапка и прайс исправлены');

/* ========== 3. ПЕРЕСБОРКА ДЛЯ GITHUB PAGES ========== */
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

console.log('✅ Сайт в /docs обновлен');
console.log('\nОтправь на GitHub: git add . && git commit -m "Fix mobile header and price layout" && git push');