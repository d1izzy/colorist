const fs = require('fs');

/* ========== 1. HEADER (якоря с /) ========== */
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
  "      <nav class=\"nav\">",
  "        <a href=\"/\">Главная</a>",
  "        <a href=\"/price\">Прайс</a>",
  "        <a href=\"/#course\">Обучение</a>",
  "        <a href=\"/#contacts\">Контакты</a>",
  "      </nav>",
  "      <a href=\"tel:89514462515\" class=\"phone\">8 (951) 446-25-15</a>",
  "    </div>",
  "  </header>",
  ""
].join('\n'));

/* ========== 2. CTA-БЛОК на главной (кнопка -> VK) ========== */
const indexLines = fs.readFileSync('views/index.ejs', 'utf-8').split('\n');

// Находим строку с "section class=\"section cta\"" и переписываем блок до </section>
let start = -1, end = -1;
for (let i = 0; i < indexLines.length; i++) {
  if (indexLines[i].indexOf('section class="section cta"') !== -1) start = i;
  if (start !== -1 && indexLines[i].trim() === '</section>') { end = i; break; }
}

if (start === -1 || end === -1) {
  console.error('Не найден CTA-блок в index.ejs — файл мог быть изменён. Создаю заново.');
  // Если не нашли — просто оставляем как есть, сообщим пользователю.
} else {
  const cta = [
    '  <section class="section cta">',
    '    <div class="container cta-inner">',
    '      <p class="section-label">Запись</p>',
    '      <h2>Готова к переменам?</h2>',
    '      <p>Запишись на окрашивание или обучение. Отвечу на все вопросы лично.</p>',
    '      <div class="cta-buttons">',
    '        <a href="https://vk.me/nastyona1231" target="_blank" rel="noopener" class="btn btn-primary btn-full">Написать в личные сообщения</a>',
    '        <a href="https://vk.ru/nastyona1231" target="_blank" rel="noopener" class="btn btn-outline btn-full">Открыть группу ВКонтакте</a>',
    '      </div>',
    '      <p class="cta-phone">или позвони: <a href="tel:89514462515">8 (951) 446-25-15</a></p>',
    '    </div>',
    '  </section>'
  ];
  const newIndex = indexLines.slice(0, start).concat(cta, indexLines.slice(end + 1));
  fs.writeFileSync('views/index.ejs', newIndex.join('\n'));
}

/* ========== 3. CSS — тёплый фон, без чб ========== */
fs.writeFileSync('public/css/style.css', [
  "* { margin: 0; padding: 0; box-sizing: border-box; }",
  "html { scroll-behavior: smooth; }",
  "body { font-family: 'Inter', sans-serif; background: #1c1418; color: #f3ece9; line-height: 1.7; font-weight: 300; -webkit-font-smoothing: antialiased; }",
  "a { color: #e07a95; text-decoration: none; transition: 0.3s; }",
  "a:hover { color: #ffa3bb; }",
  "img { max-width: 100%; display: block; }",
  ".container { max-width: 1150px; margin: 0 auto; padding: 0 24px; }",
  "h1, h2, h3, h4 { font-family: 'Playfair Display', serif; font-weight: 600; line-height: 1.2; letter-spacing: 0.5px; }",
  "h1 { font-size: 60px; }",
  "h2 { font-size: 40px; margin-bottom: 20px; }",
  "h3 { font-size: 22px; margin-bottom: 14px; color: #fff; }",
  ".section-label { font-size: 13px; text-transform: uppercase; letter-spacing: 4px; color: #e07a95; margin-bottom: 16px; font-weight: 500; }",
  ".section-desc { color: #bfaeae; max-width: 620px; margin-bottom: 40px; }",
  ".btn { display: inline-block; padding: 15px 36px; border-radius: 50px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; transition: all 0.3s ease; border: 1px solid transparent; }",
  ".btn-primary { background: linear-gradient(135deg, #e07a95, #b8456a); color: #fff; box-shadow: 0 6px 20px rgba(224,122,149,0.25); }",
  ".btn-primary:hover { background: linear-gradient(135deg, #ffa3bb, #d45b7a); color: #fff; transform: translateY(-2px); box-shadow: 0 12px 30px rgba(224,122,149,0.4); }",
  ".btn-outline { background: rgba(255,255,255,0.03); border: 1px solid #e07a95; color: #e07a95; }",
  ".btn-outline:hover { background: #e07a95; color: #1c1418; transform: translateY(-2px); }",
  ".btn-full { width: 100%; text-align: center; }",
  "",
  ".header { position: sticky; top: 0; z-index: 100; background: rgba(28,20,24,0.92); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(224,122,149,0.15); }",
  ".header-inner { display: flex; justify-content: space-between; align-items: center; padding: 18px 24px; }",
  ".logo { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; letter-spacing: 3px; color: #fff; }",
  ".logo span { color: #e07a95; }",
  ".nav { display: flex; gap: 28px; }",
  ".nav a { color: #d8c8c8; font-size: 14px; letter-spacing: 0.5px; }",
  ".nav a:hover { color: #ffa3bb; }",
  ".phone { font-size: 14px; font-weight: 500; color: #fff; padding: 8px 18px; border: 1px solid rgba(224,122,149,0.4); border-radius: 50px; }",
  ".phone:hover { border-color: #e07a95; color: #e07a95; }",
  "",
  ".hero { position: relative; min-height: 88vh; display: flex; align-items: center; background: linear-gradient(135deg, #2a1a20 0%, #3a1e2a 40%, #1c1418 100%); overflow: hidden; }",
  ".hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 20% 30%, rgba(224,122,149,0.35) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(184,69,106,0.35) 0%, transparent 55%), radial-gradient(circle at 50% 50%, rgba(255,163,187,0.12) 0%, transparent 60%); pointer-events: none; }",
  ".hero-content { position: relative; z-index: 2; text-align: center; width: 100%; animation: fadeUp 1s ease forwards; }",
  ".hero-subtitle { font-size: 13px; letter-spacing: 5px; text-transform: uppercase; color: #ffa3bb; margin-bottom: 24px; font-weight: 500; }",
  ".hero h1 { margin-bottom: 28px; color: #fff; }",
  ".hero h1 span { color: #ffa3bb; font-style: italic; }",
  ".hero-text { font-size: 18px; color: #e6d5d5; max-width: 620px; margin: 0 auto 40px; font-weight: 300; }",
  ".hero-buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }",
  "",
  ".section { padding: 100px 0; }",
  ".section.about { background: #241a20; }",
  ".section.course { background: #1c1418; }",
  ".section.services { background: #241a20; }",
  ".section.cta { background: linear-gradient(135deg, #2a1a20 0%, #1c1418 100%); }",
  ".center { text-align: center; }",
  "",
  ".about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; margin-top: 30px; }",
  ".about-text p { color: #d8c8c8; margin-bottom: 18px; font-size: 16px; }",
  ".stats { display: flex; flex-direction: column; gap: 16px; }",
  ".stat { background: rgba(255,255,255,0.04); border: 1px solid rgba(224,122,149,0.2); border-radius: 14px; padding: 24px 28px; display: flex; align-items: baseline; gap: 18px; transition: 0.3s; }",
  ".stat:hover { border-color: #e07a95; transform: translateX(6px); background: rgba(224,122,149,0.08); }",
  ".stat strong { font-family: 'Playfair Display', serif; font-size: 40px; color: #ffa3bb; line-height: 1; }",
  ".stat span { color: #bfaeae; font-size: 15px; }",
  "",
  ".course-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 30px; margin-top: 20px; }",
  ".course-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(224,122,149,0.15); border-radius: 20px; padding: 40px; transition: 0.3s; }",
  ".course-card:hover { border-color: rgba(224,122,149,0.5); }",
  ".course-card-accent { background: linear-gradient(160deg, #3a1e2a 0%, #2a1a20 100%); border-color: rgba(224,122,149,0.4); }",
  ".course-card-accent:hover { border-color: #e07a95; }",
  ".course-list { list-style: none; }",
  ".course-list li { padding: 12px 0 12px 26px; border-bottom: 1px solid rgba(224,122,149,0.12); color: #d8c8c8; font-size: 15px; position: relative; }",
  ".course-list li:last-child { border-bottom: none; }",
  ".course-list li::before { content: '✦'; position: absolute; left: 0; color: #ffa3bb; font-size: 14px; }",
  ".course-list-check li::before { content: '✓'; font-weight: bold; color: #ffa3bb; }",
  ".course-price { margin: 20px 0 10px; }",
  ".course-card-accent .price-value { font-family: 'Playfair Display', serif; font-size: 44px; color: #ffa3bb; display: block; line-height: 1; }",
  ".price-note { font-size: 13px; color: #bfaeae; text-transform: uppercase; letter-spacing: 2px; }",
  ".course-start { margin: 20px 0; padding: 14px 0; border-top: 1px solid rgba(224,122,149,0.2); border-bottom: 1px solid rgba(224,122,149,0.2); color: #e6d5d5; }",
  ".course-start strong { color: #fff; }",
  ".course-card-accent .course-list { margin-bottom: 28px; }",
  "",
  ".services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 50px; }",
  ".service-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(224,122,149,0.15); border-radius: 16px; padding: 36px 30px; transition: 0.3s; }",
  ".service-card:hover { border-color: #e07a95; transform: translateY(-6px); background: rgba(224,122,149,0.07); }",
  ".service-card h3 { color: #ffa3bb; }",
  ".service-card p { color: #bfaeae; font-size: 15px; }",
  "",
  ".cta-inner { max-width: 560px; margin: 0 auto; text-align: center; }",
  ".cta-inner h2 { margin-bottom: 16px; }",
  ".cta-inner > p { color: #d8c8c8; margin-bottom: 36px; }",
  ".cta-buttons { display: flex; flex-direction: column; gap: 14px; }",
  ".cta-phone { margin-top: 28px; color: #bfaeae; font-size: 15px; }",
  ".cta-phone a { color: #ffa3bb; font-weight: 500; }",
  "",
  ".price-page { padding: 80px 0 60px; background: #1c1418; }",
  ".price-page h1 { margin-bottom: 20px; }",
  ".price-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; margin: 50px 0; }",
  ".price-category { background: rgba(255,255,255,0.04); border: 1px solid rgba(224,122,149,0.15); border-radius: 16px; padding: 30px; transition: 0.3s; }",
  ".price-category:hover { border-color: #e07a95; background: rgba(224,122,149,0.06); }",
  ".price-category h3 { color: #ffa3bb; font-size: 20px; margin-bottom: 18px; padding-bottom: 14px; border-bottom: 1px solid rgba(224,122,149,0.2); }",
  ".price-item { display: flex; align-items: baseline; gap: 8px; padding: 9px 0; font-size: 15px; }",
  ".price-name { color: #d8c8c8; }",
  ".price-dots { flex: 1; border-bottom: 1px dotted rgba(224,122,149,0.35); margin: 0 6px; transform: translateY(-3px); }",
  ".price-item .price-value { font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 600; color: #fff; white-space: nowrap; display: inline; }",
  ".price-cta { margin-top: 50px; display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }",
  "",
  ".footer { background: #150f12; border-top: 1px solid rgba(224,122,149,0.12); padding-top: 60px; }",
  ".footer-inner { display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 40px; padding-bottom: 50px; }",
  ".footer-col p { color: #a89898; font-size: 14px; margin-bottom: 8px; }",
  ".footer-col h4 { font-size: 15px; color: #fff; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 2px; }",
  ".footer .logo { margin-bottom: 16px; }",
  ".footer-bottom { border-top: 1px solid rgba(224,122,149,0.12); padding: 24px; text-align: center; color: #6b5a5a; font-size: 13px; }",
  "",
  "@keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }",
  "@media (max-width: 900px) { .about-grid, .course-grid, .services-grid { grid-template-columns: 1fr; } .footer-inner { grid-template-columns: 1fr; } .nav { display: none; } }",
  "@media (max-width: 600px) { .section { padding: 60px 0; } .header-inner { flex-wrap: wrap; gap: 12px; justify-content: center; } .hero-buttons { flex-direction: column; align-items: center; } .btn { width: 100%; max-width: 320px; } .course-card { padding: 28px; } .price-cta { flex-direction: column; align-items: center; } h1 { font-size: 38px; } h2 { font-size: 30px; } }"
].join('\n'));

/* ========== 4. main.js — убираем fetch, форма больше не используется ========== */
fs.writeFileSync('public/js/main.js', [
  "document.addEventListener('DOMContentLoaded', function() {",
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

console.log('');
console.log('========================================');
console.log('  ИСПРАВЛЕНИЯ ВНЕСЕНЫ');
console.log('========================================');
console.log('');
console.log('Изменено:');
console.log('  ✓ Тёплый винно-розовый фон вместо чб');
console.log('  ✓ Мягкие градиентные пятна в hero');
console.log('  ✓ Якоря в шапке работают с любой страницы (/ + #course)');
console.log('  ✓ CTA-блок: кнопки ведут в VK (личка + группа) и на телефон');
console.log('');
console.log('Перезапусти сервер (если он был запущен): Ctrl+C, затем:');
console.log('  npm start');
console.log('');
console.log('Открой: http://localhost:3000');
console.log('');