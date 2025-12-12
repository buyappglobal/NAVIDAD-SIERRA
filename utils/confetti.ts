
export const triggerConfetti = () => {
  const colors = ['#fbbf24', '#ef4444', '#3b82f6', '#10b981', '#a855f7'];
  const confettiCount = 100;
  const container = document.createElement('div');
  
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100vw';
  container.style.height = '100vh';
  container.style.pointerEvents = 'none';
  container.style.zIndex = '9999';
  container.style.overflow = 'hidden';
  
  document.body.appendChild(container);

  for (let i = 0; i < confettiCount; i++) {
    const el = document.createElement('div');
    el.style.position = 'absolute';
    el.style.width = Math.random() * 10 + 5 + 'px';
    el.style.height = Math.random() * 5 + 5 + 'px';
    el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    el.style.top = '-10px';
    el.style.left = Math.random() * 100 + 'vw';
    el.style.opacity = Math.random() + 0.5 + '';
    el.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    const duration = Math.random() * 2 + 2; // 2 to 4 seconds
    const delay = Math.random() * 0.5;
    
    el.style.transition = `top ${duration}s ease-out, transform ${duration}s linear, opacity ${duration}s ease-out`;
    
    container.appendChild(el);

    // Trigger animation
    setTimeout(() => {
        el.style.top = '110vh';
        el.style.transform = `rotate(${Math.random() * 360 + 360}deg) translateX(${Math.random() * 100 - 50}px)`;
        el.style.opacity = '0';
    }, delay * 1000);
  }

  // Cleanup
  setTimeout(() => {
    document.body.removeChild(container);
  }, 5000);
};
