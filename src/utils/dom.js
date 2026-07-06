/**
 * Lightweight DOM factory — keeps components declarative without a framework.
 * @param {string} tag
 * @param {Record<string, unknown>} [attrs]
 * @param {...(Node|string)} children
 * @returns {HTMLElement}
 */
export function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);

  for (const [key, value] of Object.entries(attrs)) {
    if (value == null || value === false) continue;

    if (key === 'className') {
      node.className = value;
    } else if (key === 'dataset') {
      Object.assign(node.dataset, value);
    } else if (key === 'style' && typeof value === 'object') {
      Object.assign(node.style, value);
    } else if (key.startsWith('on') && typeof value === 'function') {
      node.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (key === 'html') {
      node.innerHTML = value;
    } else if (key === 'aria') {
      for (const [ariaKey, ariaVal] of Object.entries(value)) {
        node.setAttribute(`aria-${ariaKey}`, String(ariaVal));
      }
    } else {
      node.setAttribute(key, String(value));
    }
  }

  for (const child of children.flat()) {
    if (child == null || child === false) continue;
    node.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }

  return node;
}

/**
 * @param {string} html
 * @returns {DocumentFragment}
 */
export function html(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content;
}

/**
 * @param {HTMLElement} root
 * @param {string} selector
 * @returns {HTMLElement}
 */
export function $(root, selector) {
  const found = root.querySelector(selector);
  if (!found) throw new Error(`Missing element: ${selector}`);
  return /** @type {HTMLElement} */ (found);
}
