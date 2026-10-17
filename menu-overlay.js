const fs = require('fs');
const ejs = require('ejs');

/* ========== 1. ОБНОВЛЯЕМ HEADER ========== */
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
  "      <div class=\"header-right\">",
  "        <a href=\"tel:89514462515\" class=\"phone header-phone\">8 (951) 446-25-15</a>",
  "        <button class=\"mobile-menu-btn\" id=\"menuBtn\" aria-label=\"Открыть меню\">",
  "          <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><line x1=\"3\" y1=\"12\" x2=\"21\" y2=\"12\"></line><line x1=\"3\" y1=\"6\" x2=\"21\" y2=\"6\"></line><line x1=\"3\" y1=\"18\" x2=\"21\" y2=\"18\"></line></svg>",
  "        </button>",
  "      </div>",
  "    </div>",
  "  </header>",
  "",
  "  <!-- Полноэкранное меню -->",
  "  <div class=\"fullscreen-menu\" id=\"fullscreenMenu\">",
  "    <div class=\"fullscreen-menu-header\">",
  "      <a href=\"/\" class=\"logo\" style=\"color: #fff;\">NASTYA<span>.</span>COLOR</a>",
  "      <button class=\"close-menu-btn\" id=\"closeMenuBtn\" aria-label=\"Закрыть меню\">",
  "        <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line><line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line></svg>",
  "      </button>",
  "    </div>",
  "    <nav class=\"fullscreen-nav\">",
  "      <a href=\"/\">Главная</a>",
  "      <a href=\"/#course\">Обучение</a>",
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


/* ========== 2. ОБНОВЛЯЕМ JS ========== */
fs.writeFileSync('public/js/main.js', [
  "document.addEventListener('DOMContentLoaded', function() {",
  "  // Меню",
  "  var menuBtn = document.getElementById('menuBtn');",
  "  var closeBtn = document.getElementById('closeMenuBtn');",
  "  var fullscreenMenu = document.getElementById('fullscreenMenu');",
  "  var menuLinks = document.querySelectorAll('.fullscreen-nav a');",
  "  ",
  "  function openMenu() {",
  "    fullscreenMenu.classList.add('active');",
  "    document.body.style.overflow = 'hidden'; // Блокируем скролл фона",
  "  }",
  "  ",
  "  function closeMenu() {",
  "    fullscreenMenu.classList.remove('active');",
  "    document.body.style.overflow = '';",
  "  }",
  "",
  "  if (menuBtn) menuBtn.addEventListener('click', openMenu);",
  "  if (closeBtn) closeBtn.addEventListener('click', closeMenu);",
  "",
  "  // Закрываем меню при клике на ссылку",
  "  menuLinks.forEach(function(link) {",
  "    link.addEventListener('click', closeMenu);",
  "  });",
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


/* ========== 3. ОБНОВЛЯЕМ CSS ========== */
let css = fs.readFileSync('public/css/style.css', 'utf-8');

// Чистим старые стили навигации
css = css.replace(/\/\* ===== МОБИЛЬНАЯ ВЕРСИЯ[\s\S]*?\}\s*\}/g, '');

css += `
/* ===== НОВОЕ ПОЛНОЭКРАННОЕ МЕНЮ (КАК НА ПРИМЕРАХ) ===== */
.mobile-menu-btn { 
  display: none; 
  background: transparent; 
  border: none; 
  color: #c45a7a; 
  cursor: pointer;
  padding: 5px;
}
.header-right { display: flex; align-items: center; gap: 15px; }

/* Оверлей */
.fullscreen-menu {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: #1a1215; /* Темный фон для контраста */
  z-index: 9999;
  display: flex;
  flex-direction: column;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease;
}
.fullscreen-menu.active {
  opacity: 1;
  pointer-events: all;
}

.fullscreen-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.close-menu-btn {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 50%;
  width: 44px; height: 44px;
  display: flex; justify-content: center; align-items: center;
  color: #fff;
  cursor: pointer;
  transition: 0.3s;
}
.close-menu-btn:hover { background: rgba(255,255,255,0.1); }

.fullscreen-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 24px;
}
.fullscreen-nav a {
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  color: #fff;
  padding: 16px 0;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: 0.3s;
}
.fullscreen-nav a:hover {
  color: #c45a7a;
  padding-left: 10px;
}

.fullscreen-footer {
  padding: 30px 24px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.menu-phone {
  font-size: 20px;
  color: #fff;
  font-weight: 500;
}
.menu-vk {
  display: inline-block;
  padding: 12px 24px;
  background: #c45a7a;
  color: #fff;
  border-radius: 50px;
  text-align: center;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 1px;
}

@media (max-width: 900px) {
  .mobile-menu-btn { display: block; }
  .header-phone { display: none !important; }
  .header-inner { 
    flex-wrap: nowrap !important; 
    justify-content: space-between !important; 
    align-items: center !important;
    padding: 15px 20px !important; 
  }
  .about-grid, .course-grid, .services-grid, .footer-inner { 
    grid-template-columns: 1fr !important; 
  }
}

/* ===== ФИКС ЗАГОЛОВКА ПРАЙСА ===== */
@media (max-width: 600px) {
  .price-page h1 {
    font-size: 36px !important;
    word-wrap: break-word !important;
  }
  .price-item { 
    flex-direction: column; 
    align-items: flex-start; 
  }
  .price-dots { display: none; }
}
`;

fs.writeFileSync('public/css/style.css', css);


/* ========== 4. ДОБАВЛЯЕМ ID="SERVICES" В INDEX.EJS ========== */
let indexHtml = fs.readFileSync('views/index.ejs', 'utf-8');
// Ищем блок услуг и добавляем ему якорь, чтобы меню работало
indexHtml = indexHtml.replace('<section class="section services">', '<section id="services" class="section services">');
fs.writeFileSync('views/index.ejs', indexHtml);


/* ========== 5. ПЕРЕСОБИРАЕМ СТАТИКУ ДЛЯ GITHUB ========== */
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
fs.copyFileSync('public/js/main.js', 'docs/js/main.js');

console.log('');
console.log('========================================');
console.log('  МЕНЮ КАК НА ПРИМЕРАХ ГОТОВО');
console.log('========================================');
console.log('');
console.log('Теперь отправь на GitHub:');
console.log('  git add .');
console.log('  git commit -m "Overlay menu and mobile fixes"');
console.log('  git push origin main');
console.log('');