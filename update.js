const fs = require('fs');

/* ========== 1. ОБНОВЛЯЕМ CTA (Убираем подпись снизу) ========== */
let indexLines = fs.readFileSync('views/index.ejs', 'utf-8').split('\n');
let start = -1, end = -1;

for (let i = 0; i < indexLines.length; i++) {
  if (indexLines[i].indexOf('section class="section cta"') !== -1) start = i;
  if (start !== -1 && indexLines[i].trim() === '</section>') { end = i; break; }
}

if (start !== -1 && end !== -1) {
  const cta = [
    '  <section class="section cta">',
    '    <div class="container cta-inner">',
    '      <p class="section-label">Запись</p>',
    '      <h2>Готова к переменам?</h2>',
    '      <p>Запишись на окрашивание или обучение. Отвечу на все вопросы лично.</p>',
    '      <div class="cta-buttons">',
    '        <a href="https://vk.com/nastyona1231" target="_blank" rel="noopener" class="btn btn-primary btn-full">Написать в личные сообщения</a>',
    '        <a href="tel:89514462515" class="btn btn-outline btn-full">Позвонить мастеру</a>',
    '      </div>',
    '    </div>',
    '  </section>'
  ];
  const newIndex = indexLines.slice(0, start).concat(cta, indexLines.slice(end + 1));
  fs.writeFileSync('views/index.ejs', newIndex.join('\n'));
}

/* ========== 2. ОБНОВЛЯЕМ FOOTER (Иконка ВК вместо текста) ========== */
fs.writeFileSync('views/partials/footer.ejs', [
  "  <footer class=\"footer\" id=\"contacts\">",
  "    <div class=\"container footer-inner\">",
  "      <div class=\"footer-col\">",
  "        <div class=\"logo\">NASTYA<span>.</span>COLOR</div>",
  "        <p>Мастер-колорист в Челябинске.<br>Премиальное окрашивание и обучение.</p>",
  "      </div>",
  "      <div class=\"footer-col\">",
  "        <h4>Контакты</h4>",
  "        <p><a href=\"tel:89514462515\">8 (951) 446-25-15</a></p>",
  "        <p>",
  "          <a href=\"https://vk.com/nastyona1231\" target=\"_blank\" class=\"vk-link\" title=\"Личная страница ВКонтакте\">",
  "            <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">",
  "              <path d=\"M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.5 15.5H15.1C14.6 15.5 14.2 15.2 13.8 14.6C13 13.5 12.5 12.5 12.5 12.5C12.5 12.5 12 13 11.5 13.5C11 14 10.5 14.5 10.5 14.5C10 15 9.5 15.5 8.8 15.5H7.5C7 15.5 6.5 15 6.5 15C6.5 15 6.5 14.5 6.5 14C6.5 13 7.5 11.5 8.5 10.5C8.5 10.5 9 10 8.5 9.5C8 9 7 8.5 7 8C7 7.5 7 7 7 7C7 7 7.5 6.5 8 6.5H9.5C10 6.5 10.5 7 10.5 7C10.5 7 11 8 11.5 9C12 10 12.5 11 12.5 11C12.5 11 13 10.5 13.5 10C14 9.5 14.5 9 14.5 9C15 8.5 15.5 8.5 16 8.5H17.5C18 8.5 18.5 9 18.5 9C18.5 9 18 10 17 11C16 12 15.5 12.5 15 13C14.5 13.5 15 14 15.5 14.5C16 15 16.5 15.5 16.5 15.5Z\" fill=\"#c45a7a\"/>",
  "            </svg>",
  "            <span>ВКонтакте</span>",
  "          </a>",
  "        </p>",
  "      </div>",
  "      <div class=\"footer-col\">",
  "        <h4>Навигация</h4>",
  "        <p><a href=\"/\">Главная</a></p>",
  "        <p><a href=\"/price\">Прайс</a></p>",
  "        <p><a href=\"/#course\">Обучение</a></p>",
  "      </div>",
  "    </div>",
  "    <div class=\"footer-bottom\">",
  "      <p>© 2026 Мастер-колорист Настя. Все права защищены.</p>",
  "    </div>",
  "  </footer>",
  "  <script src=\"/js/main.js\"></script>",
  "</body>",
  "</html>",
  ""
].join('\n'));

/* ========== 3. ОБНОВЛЯЕМ CSS (Увеличиваем шрифты + иконка ВК) ========== */
let css = fs.readFileSync('public/css/style.css', 'utf-8');

// Увеличиваем базовый шрифт и размеры текста
css = css.replace("body { font-family: 'Inter', sans-serif; background: #fdfaf9; color: #332626; line-height: 1.7; font-weight: 300; -webkit-font-smoothing: antialiased; }", 
  "body { font-family: 'Inter', sans-serif; background: #fdfaf9; color: #332626; line-height: 1.8; font-weight: 400; -webkit-font-smoothing: antialiased; font-size: 18px; }");

css = css.replace(".nav a { color: #5c4a4a; font-size: 14px; letter-spacing: 0.5px; }",
  ".nav a { color: #5c4a4a; font-size: 16px; letter-spacing: 0.5px; }");

css = css.replace(".hero-text { font-size: 18px; color: #5c4a4a; max-width: 620px; margin: 0 auto 40px; font-weight: 400; }",
  ".hero-text { font-size: 20px; color: #5c4a4a; max-width: 650px; margin: 0 auto 40px; font-weight: 400; }");

css = css.replace(".about-text p { color: #5c4a4a; margin-bottom: 18px; font-size: 16px; }",
  ".about-text p { color: #5c4a4a; margin-bottom: 18px; font-size: 18px; }");

css = css.replace(".stat span { color: #7a6b6b; font-size: 15px; }",
  ".stat span { color: #7a6b6b; font-size: 17px; }");

css = css.replace(".course-list li { padding: 12px 0 12px 26px; border-bottom: 1px solid rgba(196,90,122,0.1); color: #5c4a4a; font-size: 15px; position: relative; }",
  ".course-list li { padding: 12px 0 12px 26px; border-bottom: 1px solid rgba(196,90,122,0.1); color: #5c4a4a; font-size: 17px; position: relative; }");

css = css.replace(".service-card p { color: #7a6b6b; font-size: 15px; }",
  ".service-card p { color: #7a6b6b; font-size: 17px; }");

css = css.replace(".cta-inner > p { color: #5c4a4a; margin-bottom: 36px; }",
  ".cta-inner > p { color: #5c4a4a; margin-bottom: 36px; font-size: 18px; }");

css = css.replace(".price-item { display: flex; align-items: baseline; gap: 8px; padding: 9px 0; font-size: 15px; }",
  ".price-item { display: flex; align-items: baseline; gap: 8px; padding: 11px 0; font-size: 17px; }");

css = css.replace(".price-item .price-value { font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 600; color: #2b1a1e; white-space: nowrap; display: inline; }",
  ".price-item .price-value { font-family: 'Inter', sans-serif; font-size: 18px; font-weight: 600; color: #2b1a1e; white-space: nowrap; display: inline; }");

css = css.replace(".footer-col p { color: #7a6b6b; font-size: 14px; margin-bottom: 8px; }",
  ".footer-col p { color: #7a6b6b; font-size: 16px; margin-bottom: 12px; }");

css = css.replace(".footer-col h4 { font-size: 15px; color: #2b1a1e; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 2px; }",
  ".footer-col h4 { font-size: 17px; color: #2b1a1e; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 2px; }");

css = css.replace(".footer-bottom { border-top: 1px solid rgba(196,90,122,0.1); padding: 24px; text-align: center; color: #9a8b8b; font-size: 13px; }",
  ".footer-bottom { border-top: 1px solid rgba(196,90,122,0.1); padding: 24px; text-align: center; color: #9a8b8b; font-size: 15px; }");

// Добавляем стили для иконки ВК
css += `
/* Иконка ВК в подвале */
.vk-link { display: inline-flex; align-items: center; gap: 10px; font-weight: 500; color: #c45a7a; transition: 0.3s; }
.vk-link:hover { opacity: 0.8; transform: translateY(-2px); }
.vk-link svg { width: 24px; height: 24px; }
`;

fs.writeFileSync('public/css/style.css', css);

console.log('');
console.log('========================================');
console.log('  ОБНОВЛЕНИЯ ВНЕСЕНЫ');
console.log('========================================');
console.log('');
console.log('  ✓ Убрана подпись "или напиши в VK" из блока записи');
console.log('  ✓ Шрифт везде увеличен (18px база, 20px hero)');
console.log('  ✓ В подвале заменена текстовая ссылка на иконку ВК (ведет на стр. мастера)');
console.log('');
console.log('Перезапусти сервер (Ctrl+C, затем npm start)');
console.log('Обнови страницу в браузере (Ctrl+F5)');
console.log('');