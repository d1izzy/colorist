const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

// 1. Создаем папку docs (GitHub Pages умеет брать сайт из папки /docs)
if (!fs.existsSync('docs')) fs.mkdirSync('docs');
if (!fs.existsSync('docs/price')) fs.mkdirSync('docs/price');
if (!fs.existsSync('docs/css')) fs.mkdirSync('docs/css');
if (!fs.existsSync('docs/js')) fs.mkdirSync('docs/js');

// 2. Читаем данные прайса
const priceData = JSON.parse(fs.readFileSync('data/price.json', 'utf-8'));

// 3. Функция для исправления путей (чтобы сайт работал на GitHub Pages)
function fixPaths(html, isSubpage = false) {
  // Заменяем абсолютные пути на относительные
  let fixed = html.replace(/href="\/css\//g, 'href="css/');
  fixed = fixed.replace(/src="\/js\//g, 'src="js/');
  
  if (isSubpage) {
    // Для страницы /price/ пути к css и js идут на уровень выше
    fixed = fixed.replace(/href="css\//g, 'href="../css/');
    fixed = fixed.replace(/src="js\//g, 'src="../js/');
    // Ссылки на главную
    fixed = fixed.replace(/href="\/"/g, 'href="../"');
    // Ссылки на прайс
    fixed = fixed.replace(/href="\/price"/g, 'href="./"');
  } else {
    // Для главной страницы ссылки на прайс ведут в папку price
    fixed = fixed.replace(/href="\/price"/g, 'href="price/"');
    fixed = fixed.replace(/href="\/"/g, 'href="./"');
  }
  
  // Ссылки-якоря (например, /#course) на главной странице
  fixed = fixed.replace(/href="\/#/g, 'href="#');
  
  return fixed;
}

// 4. Рендерим главную страницу
ejs.renderFile('views/index.ejs', { title: 'Мастер-колорист Настя | Челябинск' }, {}, (err, str) => {
  if (err) throw err;
  const fixedHtml = fixPaths(str, false);
  fs.writeFileSync('docs/index.html', fixedHtml);
  console.log('✅ docs/index.html создан');
});

// 5. Рендерим страницу с прайсом
ejs.renderFile('views/price.ejs', { title: 'Прайс-лист | Окрашивания', price: priceData }, {}, (err, str) => {
  if (err) throw err;
  const fixedHtml = fixPaths(str, true);
  fs.writeFileSync('docs/price/index.html', fixedHtml);
  console.log('✅ docs/price/index.html создан');
});

// 6. Копируем CSS и JS
fs.copyFileSync('public/css/style.css', 'docs/css/style.css');
fs.copyFileSync('public/js/main.js', 'docs/js/main.js');
console.log('✅ Стили и скрипты скопированы');

// 7. Копируем картинки, если они есть
if (fs.existsSync('public/images')) {
  if (!fs.existsSync('docs/images')) fs.mkdirSync('docs/images');
  const images = fs.readdirSync('public/images');
  images.forEach(img => {
    fs.copyFileSync(`public/images/${img}`, `docs/images/${img}`);
  });
  console.log('✅ Картинки скопированы');
}

console.log('\n🎉 ГОТОВО! Сайт собран в папку /docs');
console.log('Теперь вам нужно запушить эту папку на GitHub и включить Pages.');