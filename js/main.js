(() => {
  const button = document.getElementById('language-toggle');
  const elements = [...document.querySelectorAll('[data-en]')].map(element => ({ element, pt: element.innerHTML, en: element.dataset.en }));
  const attributes = ['aria-label', 'alt'].flatMap(attribute => [...document.querySelectorAll(attribute === 'alt' ? '[data-en-alt]' : '[data-en-aria]')].map(element => ({ element, attribute, pt: element.getAttribute(attribute), en: element.getAttribute(attribute === 'alt' ? 'data-en-alt' : 'data-en-aria') })));
  let language = 'pt';
  try { if (localStorage.getItem('portfolio-language') === 'en') language = 'en'; } catch (_) { /* The site also works with storage disabled. */ }
  function renderLanguage() {
    for (const item of elements) {
      if (language === 'pt') item.element.innerHTML = item.pt;
      else item.element.textContent = item.en;
    }
    for (const item of attributes) item.element.setAttribute(item.attribute, item[language]);
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
    document.title = language === 'pt' ? 'Fernando Nogueira · Desenvolvedor Sênior' : 'Fernando Nogueira · Senior Developer';
    button.innerHTML = language === 'pt' ? 'PT <span aria-hidden="true">/ EN</span>' : 'EN <span aria-hidden="true">/ PT</span>';
    button.setAttribute('aria-label', language === 'pt' ? 'Switch to English' : 'Mudar para português');
  }
  button.addEventListener('click', () => {
    language = language === 'pt' ? 'en' : 'pt';
    try { localStorage.setItem('portfolio-language', language); } catch (_) {}
    renderLanguage();
  });
  document.getElementById('year').textContent = new Date().getFullYear();
  renderLanguage();
})();
