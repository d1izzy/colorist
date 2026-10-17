const fs = require('fs');

let css = fs.readFileSync('public/css/style.css', 'utf-8');

// 1. Общий базовый размер шрифта
css = css.replace("font-size: 18px; }", "font-size: 20px; }"); 

// 2. Заголовки (H1 и H2)
css = css.replace("h1 { font-size: 60px; }", "h1 { font-size: 76px; }");
css = css.replace("h2 { font-size: 40px; margin-bottom: 20px; }", "h2 { font-size: 48px; margin-bottom: 24px; }");

// 3. Hero секция (особенно крупно)
css = css.replace(".hero-subtitle { font-size: 13px; letter-spacing: 5px; text-transform: uppercase; color: #c45a7a; margin-bottom: 24px; font-weight: 600; }",
  ".hero-subtitle { font-size: 16px; letter-spacing: 6px; text-transform: uppercase; color: #c45a7a; margin-bottom: 30px; font-weight: 700; }");

css = css.replace(".hero-text { font-size: 20px; color: #5c4a4a; max-width: 650px; margin: 0 auto 40px; font-weight: 400; }",
  ".hero-text { font-size: 24px; color: #5c4a4a; max-width: 750px; margin: 0 auto 50px; font-weight: 400; line-height: 1.6; }");

// 4. Остальные блоки
css = css.replace(".about-text p { color: #5c4a4a; margin-bottom: 18px; font-size: 18px; }",
  ".about-text p { color: #5c4a4a; margin-bottom: 20px; font-size: 20px; }");

css = css.replace(".stat span { color: #7a6b6b; font-size: 17px; }",
  ".stat span { color: #7a6b6b; font-size: 19px; }");

css = css.replace(".course-list li { padding: 12px 0 12px 26px; border-bottom: 1px solid rgba(196,90,122,0.1); color: #5c4a4a; font-size: 17px; position: relative; }",
  ".course-list li { padding: 14px 0 14px 28px; border-bottom: 1px solid rgba(196,90,122,0.1); color: #5c4a4a; font-size: 19px; position: relative; }");

css = css.replace(".service-card p { color: #7a6b6b; font-size: 17px; }",
  ".service-card p { color: #7a6b6b; font-size: 19px; }");

css = css.replace(".cta-inner > p { color: #5c4a4a; margin-bottom: 36px; font-size: 18px; }",
  ".cta-inner > p { color: #5c4a4a; margin-bottom: 40px; font-size: 22px; }");

css = css.replace(".price-item { display: flex; align-items: baseline; gap: 8px; padding: 11px 0; font-size: 17px; }",
  ".price-item { display: flex; align-items: baseline; gap: 8px; padding: 12px 0; font-size: 19px; }");

css = css.replace(".price-item .price-value { font-family: 'Inter', sans-serif; font-size: 18px; font-weight: 600; color: #2b1a1e; white-space: nowrap; display: inline; }",
  ".price-item .price-value { font-family: 'Inter', sans-serif; font-size: 20px; font-weight: 600; color: #2b1a1e; white-space: nowrap; display: inline; }");

// 5. Адаптивность для мобильных (чтобы гигантский текст не ломал экран)
css = css.replace("@media (max-width: 600px) { .section { padding: 60px 0; } .header-inner { flex-wrap: wrap; gap: 12px; justify-content: center; } .hero-buttons { flex-direction: column; align-items: center; } .btn { width: 100%; max-width: 320px; } .course-card { padding: 28px; } .price-cta { flex-direction: column; align-items: center; } h1 { font-size: 38px; } h2 { font-size: 30px; } }",
  "@media (max-width: 600px) { .section { padding: 60px 0; } .header-inner { flex-wrap: wrap; gap: 12px; justify-content: center; } .hero-buttons { flex-direction: column; align-items: center; } .btn { width: 100%; max-width: 320px; } .course-card { padding: 28px; } .price-cta { flex-direction: column; align-items: center; } h1 { font-size: 46px; } h2 { font-size: 36px; } .hero-text { font-size: 20px; } }");

fs.writeFileSync('public/css/style.css', css);

console.log('');
console.log('========================================');
console.log('  ШРИФТЫ УВЕЛИЧЕНЫ');
console.log('========================================');
console.log('');
console.log('  ✓ Hero заголовок: 76px');
console.log('  ✓ Hero текст: 24px');
console.log('  ✓ Подзаголовки и остальной текст: +20%');
console.log('');
console.log('Просто обнови страницу в браузере (Ctrl+F5)');
console.log('');