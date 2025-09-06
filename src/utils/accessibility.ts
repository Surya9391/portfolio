// accessibility.ts
export const handleKeyboardNavigation = (e: KeyboardEvent, onAction: () => void) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    onAction();
  }
};

export const focusableElements = [
  'a[href]',
  'button',
  'input',
  'textarea',
  'select',
  '[tabindex]:not([tabindex="-1"])'
].join(',');

export const trapFocus = (element: HTMLElement) => {
  const focusable = element.querySelectorAll(focusableElements);
  const firstFocusable = focusable[0] as HTMLElement;
  const lastFocusable = focusable[focusable.length - 1] as HTMLElement;

  const trap = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  };

  element.addEventListener('keydown', trap);
  return () => element.removeEventListener('keydown', trap);
};
