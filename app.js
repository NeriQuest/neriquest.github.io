window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.app-banner').forEach((banner, index) => {
      banner.style.opacity = 0;
      banner.style.transition = 'opacity 2s ease-in-out';
      setTimeout(() => {
        banner.style.opacity = 1;
      }, index * 1000);
    });
  });
  