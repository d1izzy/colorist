document.addEventListener('DOMContentLoaded', function() {
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
