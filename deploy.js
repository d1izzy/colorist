const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Функция для выполнения команд в терминале
function run(cmd) {
  try {
    console.log(`> ${cmd}`);
    execSync(cmd, { stdio: 'inherit' });
  } catch (error) {
    console.error(`\n❌ Ошибка при выполнении: ${cmd}`);
    process.exit(1);
  }
}

console.log('========================================');
console.log('  ДЕПЛОЙ НА GITHUB');
console.log('========================================\n');

rl.question('Введите ваш GitHub Username (например, nastya123): ', (username) => {
  rl.question('Введите название репозитория (например, nastya-color): ', (repoName) => {
    rl.question('Введите ваш GitHub Token (начинается на ghp_...): ', (token) => {
      rl.close();

      const remoteUrl = `https://${token}@github.com/${username}/${repoName}.git`;
      const publicUrl = `https://github.com/${username}/${repoName}`;

      console.log('\n--- Начинаем процесс ---\n');

      // 1. Инициализация гита
      run('git init');

      // 2. Добавляем все файлы (node_modules исключен благодаря .gitignore)
      run('git add .');

      // 3. Создаем коммит
      run('git commit -m "Initial commit: Nastya Colorist Website"');

      // 4. Переименовываем ветку в main (стандарт GitHub)
      run('git branch -M main');

      // 5. Добавляем удаленный репозиторий (с токеном для авторизации)
      run(`git remote add origin ${remoteUrl}`);

      // 6. Пушим код на GitHub
      console.log('\nОтправляем файлы на GitHub...');
      run('git push -u origin main');

      console.log('\n========================================');
      console.log('  ✅ УСПЕШНО ЗАДЕПЛОЕНО!');
      console.log('========================================');
      console.log(`\nВаш сайт доступен по адресу:\n${publicUrl}`);
      console.log('\nВажно: Не забудьте включить GitHub Pages в настройках репозитория,');
      console.log('чтобы сайт стал доступен в интернете (Settings -> Pages -> Branch: main).');
      console.log('Но помните: для работы Node.js сервера нужен хостинг (например, Render.com или Vercel),');
      console.log('GitHub Pages отображает только статические файлы.');
      console.log('');
    });
  });
});