const fs = require('fs');
const ejs = require('ejs');

/* ========== 1. ОБНОВЛЯЕМ HEADER (Добавляем мобильное меню) ========== */
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
  "        <a href=\"tel:89514462515\" class=\"phone\">8 (951) 446-25-15</a>",
  "        <button class=\"mobile-menu-btn\" id=\"menuBtn\" aria-label=\"Меню\">☰</button>",
  "      </div>",
  "    </div>",
  "  </header>",
  ""
].join('\n'));

/* ========== 2. ОБНОВЛЯЕМ CSS (Мобильная версия) ========== */
let css = fs.readFileSync('public/css/style.css', 'utf-8');

// Убираем старое скрытие навигации
css = css.replace("@media (max-width: 900px) { .about-grid, .course-grid, .services-grid { grid-template-columns: 1fr; } .footer-inner { grid-template-columns: 1fr; } .nav { display: none; } }", 
  "@media (max-width: 900px) { .about-grid, .course-grid, .services-grid { grid-template-columns: 1fr; } .footer-inner { grid-template-columns: 1fr; } }");

// Добавляем стили для мобильного меню и правок экрана
css += `
/* ===== MOBILE MENU ===== */
.mobile-menu-btn { display: none; background: none; border: none; font-size: 28px; cursor: pointer; color: #c45a7a; }
.header-right { display: flex; align-items: center; gap: 15px; }

@media (max-width: 900px) {
  .mobile-menu-btn { display: block; }
  .nav {
    display: none;
    position: absolute;
    top: 100%; left: 0; right: 0;
    background: #fdfaf9;
    flex-direction: column;
    padding: 20px;
    border-bottom: 1px solid rgba(196,90,122,0.2);
    box-shadow: 0 10px 20px rgba(0,0,0,0.05);
    text-align: center;
  }
  .nav.active { display: flex; }
  .nav a { font-size: 18px; padding: 12px 0; border-bottom: 1px solid rgba(196,90,122,0.1); }
  .nav a:last-child { border-bottom: none; }
  .phone { font-size: 15px; padding: 8px 12px; }
}

@media (max-width: 600px) {
  .section { padding: 60px 0; }
  .header-inner { flex-wrap: nowrap; gap: 10px; justify-content: space-between; }
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

/* ========== 3. ОБНОВЛЯЕМ JS (Логика бургера) ========== */
fs.writeFileSync('public/js/main.js', [
  "document.addEventListener('DOMContentLoaded', function() {",
  "  // Мобильное меню",
  "  var menuBtn = document.getElementById('menuBtn');",
  "  var mobileNav = document.getElementById('mobileNav');",
  "  ",
  "  if (menuBtn && mobileNav) {",
  "    menuBtn.addEventListener('click', function() {",
  "      mobileNav.classList.toggle('active');",
  "      menuBtn.textContent = mobileNav.classList.contains('active') ? '✕' : '☰';",
  "    });",
  "  }",
  "",
  "  // Анимация появления",
  "  var sections = document.querySelectorAll('.section');",
  "  if ('IntersectionObserver' in window) {",
  "    var observer = new IntersectionObserver(function(entries) {",
  "      entries.forEach(function(entry) {",
  "        if (entry.isIntersecting) {",
  "          entry.target.style.opacity = '1';",
  "          entry.target.style.transform = 'translateY(0)';",
  "        }",
  "      });",
  "    }, { threshold: 0.1 });",
  "    sections.forEach(function(s) {",
  "      s.style.opacity = '0';",
  "      s.style.transform = 'translateY(40px)';",
  "      s.style.transition = 'opacity 0.8s ease, transform 0.8s ease';",
  "      observer.observe(s);",
  "    });",
  "  }",
  "});",
  ""
].join('\n'));

/* ========== 4. ПЕРЕСОБИРАЕМ СТАТИКУ В DOCS (Для GitHub Pages) ========== */
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

// Генерируем index.html
ejs.renderFile('views/index.ejs', { title: 'Мастер-колорист Настя | Челябинск' }, {}, (err, str) => {
  if (err) throw err;
  fs.writeFileSync('docs/index.html', fixPaths(str, false));
});

// Генерируем price/index.html
ejs.renderFile('views/price.ejs', { title: 'Прайс-лист | Окрашивания', price: priceData }, {}, (err, str) => {
  if (err) throw err;
  fs.writeFileSync('docs/price/index.html', fixPaths(str, true));
});

// Копируем ассеты
fs.copyFileSync('public/css/style.css', 'docs/css/style.css');
fs.copyFileSync('public/js/main.js', 'docs/js/main.js');

console.log('');
console.log('========================================');
console.log('  МОБИЛЬНАЯ ВЕРСИЯ ГОТОВА');
console.log('========================================');
console.log('');
console.log('  ✓ Добавлена кнопка-бургер в шапку');
console.log('  ✓ Меню выпадает на телефонах');
console.log('  ✓ Скорректированы размеры шрифтов');
console.log('  ✓ Папка /docs пересобрана для GitHub Pages');
console.log('');
console.log('Теперь отправь изменения на GitHub:');
console.log('  git add .');
console.log('  git commit -m "Mobile optimization"');
console.log('  git push origin main');
console.log('');