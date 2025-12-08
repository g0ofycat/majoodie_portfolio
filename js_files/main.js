// ======== DROPDOWN ========

export const initDropdowns = () => {
  document.querySelectorAll('[data-dropdown]').forEach(dropdown => {
    const button = dropdown.querySelector('[data-dropdown-button]');
    const menu = dropdown.querySelector('.dropdown-menu');

    button.addEventListener('click', () => {
      menu.classList.toggle('show');
    });
  });
};