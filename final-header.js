const fs = require('fs');
const ejs = require('ejs');

/* ========== 1. ОБНОВЛЯЕМ HEADER (Секции для ПК и Мобильных) ========== */
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
  "      <!-- Меню для компьютеров -->",
  "      <nav class=\"nav desktop-nav\">",
  "        <a href=\"/\">Главная</a>",
  "        <a href=\"/#services\">Услуги</a>",
  "        <a href=\"/price\">Прайс</a>",
  "        <a href=\"/#contacts\">Контакты</a>",
  "      </nav>",
  "",
  "      <div class=\"header-right\">",
  "        <!-- Телефон для ПК -->",
  "        <a href=\"tel:89514462515\" class=\"phone header-phone\">8 (951) 446-25-15</a>",
  "        <!-- Кнопка бургера для мобильных -->",
  "        <button class=\"mobile-menu-btn\" id=\"menuBtn\" aria-label=\"Открыть меню\">",
  "          <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><line x1=\"3\" y1=\"12\" x2=\"21\" y2=\"12\"></line><line x1=\"3\" y1=\"6\" x2=\"21\" y2=\"6\"></line><line x1=\"3\" y1=\"18\" x2=\"21\" y2=\"18\"></line></svg>",
  "        </button>",
  "      </div>",
  "    </div>",
  "  </header>",
  "",
  "  <!-- Полноэкранное меню для мобильных -->",
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


/* ========== 2. ЧИНИМ CSS ДЛЯ ШАПКИ ========== */
let css = fs.readFileSync('public/css/style.css', 'utf-8');

// Принудительно возвращаем десктопное меню
if (!css.includes('.desktop-nav {')) {
  css += `
/* ===== ФИКС ШАПКИ ===== */
.desktop-nav { display: flex; gap: 28px; }
.desktop-nav a { color: #5c4a4a; font-size: 16px; letter-spacing: 0.5px; transition: 0.3s; }
.desktop-nav a:hover { color: #c45a7a; }

@media (max-width: 900px) {
  .desktop-nav { display: none !important; } /* Прячем текстовое меню на телефонах */
  .mobile-menu-btn { display: block !important; } /* Показываем бургер */
  .header-phone { display: none !important; } /* Прячем телефон */
  
  .header-inner { 
    flex-wrap: nowrap !important; 
    justify-content: space-between !important; 
    align-items: center !important;
  }
}
`;
}

fs.writeFileSync('public/css/style.css', css);
console.log('✅ Стили шапки исправлены');


/* ========== 3. ПЕРЕСОБИРАЕМ ВСЁ ДЛЯ GITHUB PAGES ========== */
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
fs.copyFileSync('public/js/main.js', 'docs/js/main.js');

console.log('✅ Файлы в /docs обновлены');
console.log('\nОтправь на GitHub: git add . && git commit -m "Fix desktop and mobile header" && git push');