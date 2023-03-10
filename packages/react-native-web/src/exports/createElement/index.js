/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import AccessibilityUtil from '../../modules/AccessibilityUtil';
import createDOMProps from '../../modules/createDOMProps';
import React from 'react';
import { LocaleProvider } from '../../modules/useLocale';
import RootContext from '../AppRegistry/RootContext';

const createElement = (component, props, options) => {
  // Use equivalent platform elements where possible.
  let accessibilityComponent;
  if (component && component.constructor === String) {
    accessibilityComponent =
      AccessibilityUtil.propsToAccessibilityComponent(props);
  }

  /*eslint-disable */
  const rootContext = React.useContext(RootContext);
  /*eslint-enable */
  const Component = accessibilityComponent || component;
  const domProps = createDOMProps(Component, props, options);
  // @yaochen TODO
  const element = React.createElement(Component, rootContext, domProps);

  // Update locale context if element's writing direction prop changes
  const elementWithLocaleProvider = domProps.dir ? (
    <LocaleProvider
      children={element}
      direction={domProps.dir}
      locale={domProps.lang}
    />
  ) : (
    element
  );

  return elementWithLocaleProvider;
};

export default createElement;
