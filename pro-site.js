const fs = require('fs');
const ejs = require('ejs');

/* ========== 1. ОБНОВЛЯЕМ ГЛАВНУЮ СТРАНИЦУ (index.ejs) ========== */
fs.writeFileSync('views/index.ejs', [
  "<%- include('partials/header') %>",
  "",
  "<main>",
  "  <!-- Hero -->",
  "  <section class=\"hero\">",
  "    <div class=\"container hero-content\">",
  "      <p class=\"hero-subtitle\">Челябинск · Колорист</p>",
  "      <h1>Мастер — <span>колорист</span></h1>",
  "      <p class=\"hero-text\">Современное окрашивание с бережным отношением к волосам. Качественные материалы, индивидуальный подход и красивые результаты.</p>",
  "      <div class=\"hero-buttons\">",
  "        <a href=\"https://vk.com/nastyona1231\" target=\"_blank\" class=\"btn btn-primary\">Записаться</a>",
  "        <a href=\"/price\" class=\"btn btn-outline\">Смотреть прайс</a>",
  "      </div>",
  "    </div>",
  "  </section>",
  "",
  "  <!-- Обо мне -->",
  "  <section class=\"section about\">",
  "    <div class=\"container\">",
  "      <p class=\"section-label\">Обо мне</p>",
  "      <h2>Привет, меня зовут Настя!</h2>",
  "      <div class=\"about-grid\">",
  "        <div class=\"about-text\">",
  "          <p>Я мастер-колорист. Моя главная цель — сделать ваши волосы красивыми, здоровыми и ухоженными.</p>",
  "          <p>В работе использую профессиональные материалы премиум-класса, которые обеспечивают стойкий и естественный результат. Внимательно отношусь к структуре волос и подбираю технику, подходящую именно вам.</p>",
  "          <p>Буду рада видеть вас на своих окрашиваниях! Записаться можно в личных сообщениях.</p>",
  "        </div>",
  "        <div class=\"stats\">",
  "          <div class=\"stat\"><strong>ВК</strong><span>vk.com/nastyona1231</span></div>",
  "          <div class=\"stat\"><strong>TG</strong><span>@Nastenamas05</span></div>",
  "        </div>",
  "      </div>",
  "    </div>",
  "  </section>",
  "",
  "  <!-- Услуги -->",
  "  <section id=\"services\" class=\"section services\">",
  "    <div class=\"container\">",
  "      <p class=\"section-label\">Услуги</p>",
  "      <h2>Окрашивание волос</h2>",
  "      <p class=\"section-desc\">Работаю с разными техниками: от классического окрашивания в один тон до сложных современных техник.</p>",
  "      <div class=\"services-grid\">",
  "        <div class=\"service-card\">",
  "          <h3>1 тон</h3>",
  "          <p>Окрашивание всей длины в один цвет (короткие, средние, длинные).</p>",
  "        </div>",
  "        <div class=\"service-card\">",
  "          <h3>Корни</h3>",
  "          <p>Обновление цвета прикорневой зоны (до 3 см и до 5 см).</p>",
  "        </div>",
  "        <div class=\"service-card\">",
  "          <h3>Сложные техники</h3>",
  "          <p>Мелирование, шатуш, AirTouch, тотал блонд.</p>",
  "        </div>",
  "      </div>",
  "      <div class=\"center\"><a href=\"/price\" class=\"btn btn-outline\">Посмотреть полный прайс-лист</a></div>",
  "    </div>",
  "  </section>",
  "",
  "  <!-- CTA (Запись) -->",
  "  <section class=\"section cta\">",
  "    <div class=\"container cta-inner\">",
  "      <p class=\"section-label\">Запись</p>",
  "      <h2>Готова к переменам?</h2>",
  "      <p>Запишись на окрашивание. Отвечу на все вопросы и помогу подобрать идеальный образ.</p>",
  "      <div class=\"cta-buttons\">",
  "        <a href=\"https://vk.com/nastyona1231\" target=\"_blank\" class=\"btn btn-primary btn-full\">Написать ВКонтакте</a>",
  "        <a href=\"https://t.me/Nastenamas05\" target=\"_blank\" class=\"btn btn-outline btn-full\">Написать в Telegram</a>",
  "      </div>",
  "      <p class=\"cta-phone\">или позвони: <a href=\"tel:89514462515\">8 (951) 446-25-15</a></p>",
  "    </div>",
  "  </section>",
  "</main>",
  "",
  "<%- include('partials/footer') %>",
  ""
].join('\n'));


/* ========== 2. ПЕРЕСОБИРАЕМ ВСЁ ДЛЯ GITHUB PAGES ========== */
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

// Перечитываем прайс (он не менялся, но нужен для рендера)
const priceData = JSON.parse(fs.readFileSync('data/price.json', 'utf-8'));

ejs.renderFile('views/index.ejs', { title: 'Мастер-колорист Настя | Челябинск' }, {}, (err, str) => {
  if (err) throw err;
  fs.writeFileSync('docs/index.html', fixPaths(str, false));
});

ejs.renderFile('views/price.ejs', { title: 'Прайс-лист | Окрашивания', price: priceData }, {}, (err, str) => {
  if (err) throw err;
  fs.writeFileSync('docs/price/index.html', fixPaths(str, true));
});

console.log('✅ Тексты обновлены (убрано "начинающий" и "поиск моделей")');
console.log('✅ Файлы в /docs обновлены');
console.log('\nОтправь на GitHub: git add . && git commit -m "Professional copy update" && git push');