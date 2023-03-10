/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */
import canUseDOM from '../../../modules/canUseDom';

// $FlowFixMe: HTMLStyleElement is incorrectly typed - https://github.com/facebook/flow/issues/2696
export default function createCSSStyleSheet(
  id: string,
  rootNode?: Document | ShadowRoot,
  textContent?: string,
  rootTag?: HTMLElement
) /*: ?CSSStyleSheet*/ {
  if (canUseDOM) {
    const doc = rootTag?.ownerDocument || document;
    const root = rootNode != null ? rootNode : doc;
    let element = doc.getElementById(id);
    if (element == null) {
      element = doc.createElement('style');
      element.setAttribute('id', id);
      const head = doc.head;
      if (head) {
        head.insertBefore(element, head.firstChild);
      }
      if (typeof textContent === 'string') {
        element.appendChild(doc.createTextNode(textContent));
      }
      if (root instanceof ShadowRoot) {
        root.insertBefore(element, root.firstChild);
      } else {
        const head = root.head;
        if (head) {
          head.insertBefore(element, head.firstChild);
        }
      }
    }
    // $FlowFixMe: HTMLElement is incorrectly typed
    return element;
  } else {
    return null;
  }
}

export function destroyStyleSheet(element: ?HTMLStyleElement) {
  if (element) {
    element.remove();
  }
}
