import './main.css';
import { passageRenderHandler } from './assets/events/passageRenderHandler.ts';
import SugarCubeUtils from './assets/utils/sugarcube.ts';

const setupTypingAnimation = (element: HTMLElement | null, cb?: () => void) => {
  if (!element) return;
  
  // Store the original HTML content
  const originalHTML = element.innerHTML;

  // Extract just the text content for character-by-character typing
  const textToType = element.textContent || element.innerText || '';

  // Clear the element and set up the typing structure
  element.innerHTML = '';

  const contentSpan = document.createElement('span');
  // Pre-apply font inheritance to prevent flashing
  contentSpan.style.fontFamily = 'inherit';
  contentSpan.style.fontSize = 'inherit';
  contentSpan.style.lineHeight = 'inherit';
  contentSpan.style.color = 'inherit';

  const cursorSpan = document.createElement('span');
  cursorSpan.className = 'cursor';

  element.appendChild(contentSpan);
  element.appendChild(cursorSpan);

  let charIndex = 0;
  const typingSpeed = 25;

  // Create a hidden element to reference the original HTML structure
  const hiddenOriginal = document.createElement('div');
  hiddenOriginal.innerHTML = originalHTML;
  hiddenOriginal.style.display = 'none';
  document.body.appendChild(hiddenOriginal);

  const type = () => {
    if (charIndex < textToType.length) {
      charIndex++;

      // Clone the original structure and truncate text nodes
      const clonedContent = hiddenOriginal.cloneNode(true) as HTMLElement;

      // Function to truncate text in DOM nodes
      let remainingChars = charIndex;
      const truncateTextNodes = (node: Node): boolean => {
        if (remainingChars <= 0) return false;

        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent || '';
          if (remainingChars >= text.length) {
            remainingChars -= text.length;
            return true;
          } else {
            node.textContent = text.substring(0, remainingChars);
            remainingChars = 0;
            return false;
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const children = Array.from(node.childNodes);
          for (const child of children) {
            if (!truncateTextNodes(child)) {
              // Remove remaining siblings if we've used up all characters
              const siblings = Array.from(node.childNodes);
              const currentIndex = siblings.indexOf(child);
              for (let i = currentIndex + 1; i < siblings.length; i++) {
                node.removeChild(siblings[i]);
              }
              break;
            }
          }
          return remainingChars > 0;
        }
        return true;
      };

      truncateTextNodes(clonedContent);

      // Use requestAnimationFrame to ensure smooth DOM updates
      requestAnimationFrame(() => {
        contentSpan.innerHTML = clonedContent.innerHTML;
      });

      setTimeout(type, typingSpeed);
    } else {
      // Animation complete - show full content and hide cursor
      requestAnimationFrame(() => {
        contentSpan.innerHTML = originalHTML;
        cursorSpan.style.animation = 'none';
      });
      // Clean up the hidden element
      document.body.removeChild(hiddenOriginal);
      if (cb) cb();
    }
  };

  type();
};

(window as any).setupTypingAnimation = setupTypingAnimation;

const restartGame = () => {
  SugarCubeUtils.whenReady(() => {
    SugarCubeUtils.restart();
  });
};

(window as any).restartGame = restartGame;

// Make image path available globally for Twine
setTimeout(() => {
  if (typeof window !== 'undefined' && (window as any).jQuery) {
    const $ = (window as any).$;

    $(document).on(':passagerender', passageRenderHandler);
  }
}, 0);
