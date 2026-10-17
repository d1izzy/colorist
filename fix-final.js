const fs = require('fs');
const ejs = require('ejs');

/* ========== 1. ОБНОВЛЯЕМ HEADER (Убираем "Обучение") ========== */
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
  "      ",
  "      <nav class=\"nav desktop-nav\">",
  "        <a href=\"/\">Главная</a>",
  "        <a href=\"/#services\">Услуги</a>",
  "        <a href=\"/price\">Прайс</a>",
  "        <a href=\"/#contacts\">Контакты</a>",
  "      </nav>",
  "",
  "      <div class=\"header-right\">",
  "        <a href=\"tel:89514462515\" class=\"phone header-phone\">8 (951) 446-25-15</a>",
  "        <button class=\"mobile-menu-btn\" id=\"menuBtn\" aria-label=\"Открыть меню\">",
  "          <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><line x1=\"3\" y1=\"12\" x2=\"21\" y2=\"12\"></line><line x1=\"3\" y1=\"6\" x2=\"21\" y2=\"6\"></line><line x1=\"3\" y1=\"18\" x2=\"21\" y2=\"18\"></line></svg>",
  "        </button>",
  "      </div>",
  "    </div>",
  "  </header>",
  "",
  "  <!-- Полноэкранное меню (только актуальные ссылки) -->",
  "  <div class=\"fullscreen-menu\" id=\"fullscreenMenu\">",
  "    <div class=\"fullscreen-menu-header\">",
  "      <a href=\"/\" class=\"logo\" style=\"color: #fff;\">NASTYA<span>.</span>COLOR</a>",
  "      <button class=\"close-menu-btn\" id=\"closeMenuBtn\" aria-label=\"Закрыть меню\">",
  "        <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line><line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line></svg>",
  "      </button>",
  "    </div>",
  "    <nav class=\"fullscreen-nav\">",
  "      <a href=\"/\">Главная</a>",
  "      <a href=\"/#services\">Услуги</a>",
  "      <a href=\"/price\">Прайс</a>",
  "      <a href=\"/#contacts\">Контакты</a>",
  "    </nav>",
  "    <div class=\"fullscreen-footer\">",
  "      <a href=\"tel:89514462515\" class=\"menu-phone\">8 (951) 446-25-15</a>",
  "      <a href=\"https://vk.com/nastyona1231\" target=\"_blank\" class=\"menu-vk\">Написать в VK</a>",
  "    </div>",
  "  </div>",
  ""
].join('\n'));


/* ========== 2. ОБНОВЛЯЕМ CSS (Жесткое разделение ПК и Телефона) ========== */
let css = fs.readFileSync('public/css/style.css', 'utf-8');

// Очищаем старые медиа-запросы, чтобы они не мешали (удаляем блоки @media)
css = css.replace(/@media[\s\S]*?\}\s*\}/g, '');

// Добавляем новые, строгие правила
css += `
/* ===== СТРОГИЕ ПРАВИЛА ДЛЯ ПК И МОБИЛЬНЫХ ===== */

/* Базовые стили (ПК) */
.desktop-nav { display: flex !important; gap: 28px; }
.desktop-nav a { color: #5c4a4a; font-size: 16px; letter-spacing: 0.5px; transition: 0.3s; }
.desktop-nav a:hover { color: #c45a7a; }
.mobile-menu-btn { display: none !important; }
.header-phone { display: block !important; }
.header-inner { flex-wrap: nowrap !important; justify-content: space-between !important; align-items: center !important; }

/* Стили для телефонов (экраны до 900px) */
@media (max-width: 900px) {
  /* Прячем всё лишнее */
  .desktop-nav { display: none !important; }
  .header-phone { display: none !important; }
  
  /* Показываем только бургер */
  .mobile-menu-btn { display: block !important; }
  
  /* Уменьшаем шрифт в полноэкранном меню (делаем 22px вместо 32px) */
  .fullscreen-nav a {
    font-size: 22px !important; 
    padding: 16px 0 !important;
  }
}

/* Фиксы для маленьких экранов (Прайс) */
@media (max-width: 600px) {
  .price-category { padding-bottom: 24px !important; }
  .price-page h1 { font-size: 34px !important; word-wrap: break-word !important; }
  .about-grid, .course-grid, .services-grid, .footer-inner { grid-template-columns: 1fr !important; }
  .hero h1 { font-size: 42px; }
  h2 { font-size: 32px; }
}
`;

fs.writeFileSync('public/css/style.css', css);
console.log('✅ CSS обновлен: ПК и Телефон разделены');


/* ========== 3. ПЕРЕСОБИРАЕМ СТАТИКУ ДЛЯ GITHUB PAGES ========== */
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

const priceData = JSON.parse(fs.readFileSync('data/price.json', 'utf-8'));

ejs.renderFile('views/index.ejs', { title: 'Мастер-колорист Настя | Челябинск' }, {}, (err, str) => {
  if (err) throw err;
  fs.writeFileSync('docs/index.html', fixPaths(str, false));
});

ejs.renderFile('views/price.ejs', { title: 'Прайс-лист | Окрашивания', price: priceData }, {}, (err, str) => {
  if (err) throw err;
  fs.writeFileSync('docs/price/index.html', fixPaths(str, true));
});

fs.copyFileSync('public/css/style.css', 'docs/css/style.css');

console.log('✅ Файлы в /docs обновлены');
console.log('\nОтправь на GitHub: git add . && git commit -m "Strict mobile vs desktop header" && git push');