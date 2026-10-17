const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Измененная функция: ошибки не останавливают скрипт, а просто выводятся в консоль
function run(cmd) {
  try {
    console.log(`> ${cmd}`);
    execSync(cmd, { stdio: 'inherit' });
  } catch (error) {
    console.log(`\n⚠️ Предупреждение по команде: ${cmd}`);
    console.log('Продолжаем выполнение...\n');
  }
}

console.log('========================================');
console.log('  ДЕПЛОЙ НА GITHUB (ИСПРАВЛЕННЫЙ)');
console.log('========================================\n');

rl.question('Введите ваш GitHub Username (например, nastya123): ', (username) => {
  rl.question('Введите название репозитория (например, nastya-color): ', (repoName) => {
    rl.question('Введите ваш НОВЫЙ GitHub Token (начинается на ghp_...): ', (token) => {
      rl.close();

      const remoteUrl = `https://${token}@github.com/${username}/${repoName}.git`;
      const publicUrl = `https://github.com/${username}/${repoName}`;

      console.log('\n--- Начинаем процесс ---\n');

      // 1. Инициализация
      run('git init');

      // 2. Добавляем файлы
      run('git add .');

      // 3. Коммит (если нечего коммитить - скрипт не упадет)
      run('git commit -m "Update site"');

      // 4. Переименовываем ветку
      run('git branch -M main');

      // 5. Удаляем старый origin, если он был
      run('git remote remove origin');

      // 6. Добавляем новый origin
      run(`git remote add origin ${remoteUrl}`);

      // 7. Пушим принудительно (-f), чтобы перезаписать возможные старые файлы на сервере
      console.log('\nОтправляем файлы на GitHub...');
      run('git push -u origin main -f');

      console.log('\n========================================');
      console.log('  ✅ ГОТОВО!');
      console.log('========================================');
      console.log(`\nВаш репозиторий: ${publicUrl}`);
      console.log('');
    });
  });
});