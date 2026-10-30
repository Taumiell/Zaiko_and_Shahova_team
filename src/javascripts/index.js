import '../stylesheets/style.css';
import { articles, events } from './data.js';
import { arrowSvg, articleCard, eventCard, surveyCard } from './components.js';

const eventRow = document.querySelector('#event-row');
const articleRow = document.querySelector('#article-row');

for (const icon of document.querySelectorAll('.arrow-star:not(:has(img))')) {
  icon.innerHTML = arrowSvg();
}

eventRow.innerHTML = [eventCard(events[0]), eventCard(events[1]), surveyCard(), eventCard(events[2]), eventCard(events[3])].join('');
articleRow.innerHTML = articles.map(articleCard).join('');

const filterList = document.querySelector('.filters');
const filterChips = [...filterList.querySelectorAll('.filter-chip')];

filterChips.forEach((chip, index) => {
  chip.dataset.originalOrder = String(index);
  const label = chip.textContent.trim();
  chip.dataset.filterLabel = label;
  chip.innerHTML = `<span class="filter-chip__label">${label}</span>
    <svg class="filter-chip__check" viewBox="0 0 16 16" aria-hidden="true">
      <path d="m3.5 8.2 3.1 3.1 6-6.4" />
    </svg>`;
});

function reorderFilterChips() {
  const previousPositions = new Map(
    filterChips.map((chip) => [chip, chip.getBoundingClientRect()]),
  );
  const orderedChips = [...filterChips].sort((a, b) => {
    const aSelected = a.getAttribute('aria-pressed') === 'true';
    const bSelected = b.getAttribute('aria-pressed') === 'true';
    return Number(bSelected) - Number(aSelected)
      || Number(a.dataset.originalOrder) - Number(b.dataset.originalOrder);
  });

  filterList.append(...orderedChips);

  window.requestAnimationFrame(() => {
    orderedChips.forEach((chip) => {
      const previous = previousPositions.get(chip);
      const current = chip.getBoundingClientRect();
      const offsetX = previous.left - current.left;
      if (offsetX === 0) return;
      chip.style.transition = 'none';
      chip.style.transform = `translateX(${offsetX}px)`;
    });

    window.requestAnimationFrame(() => {
      orderedChips.forEach((chip) => {
        chip.style.transition = '';
        chip.style.transform = '';
      });
    });
  });
}

filterChips.forEach((chip) => {
  chip.addEventListener('click', () => {
    const selected = chip.getAttribute('aria-pressed') !== 'true';
    chip.setAttribute('aria-pressed', String(selected));
    chip.classList.toggle('is-selected', selected);
    reorderFilterChips();
  });
});

const surveyDialog = document.querySelector('.survey-dialog');
const siteShell = document.querySelector('.site-shell');
let surveyTrigger = null;

function openSurveyDialog(trigger) {
  surveyTrigger = trigger;
  surveyDialog.hidden = false;
  siteShell.inert = true;
  document.body.classList.add('has-open-dialog');
  surveyDialog.querySelector('.survey-dialog__close').focus();
}

function closeSurveyDialog() {
  surveyDialog.hidden = true;
  siteShell.inert = false;
  document.body.classList.remove('has-open-dialog');
  if (surveyTrigger instanceof HTMLElement) surveyTrigger.focus();
}

document.addEventListener('click', (event) => {
  const target = event.target instanceof Element ? event.target : null;
  const trigger = target?.closest('[data-survey-trigger]');
  if (trigger) {
    openSurveyDialog(trigger);
    return;
  }

  if (target?.closest('[data-survey-close]')) closeSurveyDialog();
});

document.querySelectorAll('[data-survey-trigger][role="button"]').forEach((trigger) => {
  trigger.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    openSurveyDialog(trigger);
  });
});

surveyDialog.addEventListener('click', (event) => {
  if (event.target === surveyDialog) closeSurveyDialog();
});

document.addEventListener('keydown', (event) => {
  if (surveyDialog.hidden) return;
  if (event.key === 'Escape') {
    event.preventDefault();
    closeSurveyDialog();
    return;
  }

  if (event.key !== 'Tab') return;
  const focusableElements = [...surveyDialog.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')];
  const first = focusableElements[0];
  const last = focusableElements.at(-1);

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

const aboutCollage = document.querySelector('.about-collage');
const problemCards = [...aboutCollage.querySelectorAll('.problem-card')];
const hoverCards = window.matchMedia('(hover: hover) and (pointer: fine)');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function clearActiveProblemCard() {
  aboutCollage.classList.remove('has-active-card');
  problemCards.forEach((card) => {
    card.classList.remove('is-active', 'is-pushed-before', 'is-pushed-after');
    card.style.removeProperty('--push-x');
  });
}

function activateProblemCard(activeCard) {
  const activeIndex = problemCards.indexOf(activeCard);
  const pushLimit = window.matchMedia('(max-width: 1360px)').matches ? 26 : 48;
  const pushStep = window.matchMedia('(max-width: 1360px)').matches ? 12 : 18;

  aboutCollage.classList.add('has-active-card');
  problemCards.forEach((card, index) => {
    const distance = Math.abs(index - activeIndex);
    const direction = index < activeIndex ? -1 : 1;

    card.classList.toggle('is-active', index === activeIndex);
    card.classList.toggle('is-pushed-before', index < activeIndex);
    card.classList.toggle('is-pushed-after', index > activeIndex);
    const shift = Math.min(pushStep * distance, pushLimit);
    card.style.setProperty('--push-x', `${direction * shift}px`);
  });
}

if (hoverCards.matches && !prefersReducedMotion.matches) {
  problemCards.forEach((card) => {
    card.addEventListener('pointerenter', () => activateProblemCard(card));
    card.addEventListener('pointerleave', (event) => {
      const nextCard = event.relatedTarget instanceof Element
        ? event.relatedTarget.closest('.problem-card')
        : null;
      if (!nextCard) clearActiveProblemCard();
    });
  });

  aboutCollage.addEventListener('pointerleave', clearActiveProblemCard);
}

const russianShortWord = /(^|[\s([{«])((?:а|в|во|и|к|ко|о|об|обо|с|со|у|за|на|по|из|от|до|но|ни|не|ли|бы|же))\s+(?=[А-Яа-яЁё0-9])/giu;
const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
const textNodes = [];
while (textWalker.nextNode()) textNodes.push(textWalker.currentNode);
for (const node of textNodes) node.nodeValue = node.nodeValue.replace(russianShortWord, '$1$2\u00a0');

const heroShots = [...document.querySelectorAll('.hero-shot')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let heroIndex = 0;
window.setInterval(() => {
  if (reduceMotion.matches || document.hidden) return;
  heroShots[heroIndex].classList.remove('is-active');
  heroIndex = (heroIndex + 1) % heroShots.length;
  heroShots[heroIndex].classList.add('is-active');
}, 5000);

const menuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');
menuButton.addEventListener('click', () => {
  const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isExpanded));
  menuButton.setAttribute('aria-label', isExpanded ? 'Открыть меню' : 'Закрыть меню');
  mobileMenu.hidden = isExpanded;
});
mobileMenu.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    mobileMenu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Открыть меню');
  }
});
