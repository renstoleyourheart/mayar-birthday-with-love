document.addEventListener('DOMContentLoaded', () => {
  const openGiftButton = document.querySelector('#openGift');
  const heroEnvelope = document.querySelector('#heroEnvelope');
  const giftContent = document.querySelector('#giftContent');
  const opening = document.querySelector('#opening');
  const surpriseEnvelope = document.querySelector('#surpriseEnvelope');
  const surpriseMessage = document.querySelector('#surpriseMessage');

  const revealItems = document.querySelectorAll('.reveal');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const showGift = () => {
    heroEnvelope.classList.add('is-open');
    opening.classList.add('opening--opened');
    openGiftButton.setAttribute('aria-expanded', 'true');
    openGiftButton.querySelector('span').textContent = 'Your gift is open';
    giftContent.classList.add('is-visible');
    giftContent.setAttribute('aria-hidden', 'false');

    window.setTimeout(() => {
      document.querySelector('#friendship').scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
    }, reducedMotion ? 0 : 520);
  };

  openGiftButton.addEventListener('click', () => {
    if (!giftContent.classList.contains('is-visible')) {
      showGift();
    } else {
      document.querySelector('#friendship').scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
    }
  });

  surpriseEnvelope.addEventListener('click', () => {
    const isOpen = surpriseEnvelope.classList.toggle('is-open');
    surpriseEnvelope.setAttribute('aria-expanded', String(isOpen));
    surpriseMessage.classList.toggle('is-visible', isOpen);
    surpriseMessage.setAttribute('aria-hidden', String(!isOpen));

    if (isOpen && !reducedMotion) {
      window.setTimeout(() => {
        surpriseMessage.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 260);
    }
  });

  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver((entries, entryObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          entryObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
});