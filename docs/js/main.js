document.addEventListener('DOMContentLoaded', function() {
  // Меню
  var menuBtn = document.getElementById('menuBtn');
  var closeBtn = document.getElementById('closeMenuBtn');
  var fullscreenMenu = document.getElementById('fullscreenMenu');
  var menuLinks = document.querySelectorAll('.fullscreen-nav a');
  
  function openMenu() {
    fullscreenMenu.classList.add('active');
    document.body.style.overflow = 'hidden'; // Блокируем скролл фона
  }
  
  function closeMenu() {
    fullscreenMenu.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuBtn) menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  // Закрываем меню при клике на ссылку
  menuLinks.forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });

  // Анимация появления
  var sections = document.querySelectorAll('.section');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    sections.forEach(function(s) {
      s.style.opacity = '0';
      s.style.transform = 'translateY(40px)';
      s.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      observer.observe(s);
    });
  }
});
