import type { DirectiveBinding } from 'vue';

function createTooltipElement(content: string, isHtml: boolean): HTMLElement {
  const tooltip = document.createElement('div');
  tooltip.className = 'v-tooltip-global';
  tooltip.setAttribute('role', 'tooltip');
  tooltip.setAttribute('tabindex', '-1');
  if (isHtml) {
    tooltip.innerHTML = content;
  } else {
    tooltip.textContent = content;
  }
  document.body.appendChild(tooltip);
  return tooltip;
}

function setTooltipPosition(el: HTMLElement, tooltip: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const scrollY = window.scrollY || window.pageYOffset;
  const scrollX = window.scrollX || window.pageXOffset;
  tooltip.style.position = 'absolute';
  tooltip.style.top = `${rect.bottom + scrollY + 8}px`;
  tooltip.style.left = `${rect.left + scrollX}px`;
  tooltip.style.zIndex = '9999';
  tooltip.style.pointerEvents = 'none';
}

const vTooltip = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    let tooltip: HTMLElement | null = null;
    const isHtml = !!binding.modifiers.html;
    const getContent = () => binding.value || '';

    const showTooltip = () => {
      if (tooltip) return;
      const content = getContent();
      if (!content) return;
      tooltip = createTooltipElement(content, true);
      setTooltipPosition(el, tooltip);
      el.setAttribute('aria-describedby', 'v-tooltip-global');
    };

    const hideTooltip = () => {
      if (tooltip) {
        tooltip.remove();
        tooltip = null;
        el.removeAttribute('aria-describedby');
      }
    };

    el.addEventListener('mouseenter', showTooltip);
    el.addEventListener('focus', showTooltip);
    el.addEventListener('mouseleave', hideTooltip);
    el.addEventListener('blur', hideTooltip);

    el._vTooltipCleanup = () => {
      el.removeEventListener('mouseenter', showTooltip);
      el.removeEventListener('focus', showTooltip);
      el.removeEventListener('mouseleave', hideTooltip);
      el.removeEventListener('blur', hideTooltip);
      hideTooltip();
    };
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    // If content changes while tooltip is visible, update it
    if (el._vTooltipCleanup) {
      el._vTooltipCleanup();
    }
    vTooltip.mounted(el, binding);
  },
  unmounted(el: HTMLElement) {
    if (el._vTooltipCleanup) {
      el._vTooltipCleanup();
      delete el._vTooltipCleanup;
    }
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('tooltip', vTooltip);
});

// Tooltip styles (add to global SCSS in a real project)
if (process.client) {
  const style = document.createElement('style');
  style.innerHTML = `
    .v-tooltip-global {
      background: rgba(0, 0, 0, 0.85);
      color: #fff;
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 13px;
      max-width: 320px;
      word-break: break-word;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      transition: opacity 0.15s;
      opacity: 1;
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);
} 
