/**
 * Copyright (c) Ondrej Zaruba.
 * Copyright (c) Microsoft Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import * as React from 'react';
import RootContext, { RootContextType } from './RootContext';
import StyleSheet from '../StyleSheet';
import ResponderSystem from '../../modules/useResponderEvents/ResponderSystem';

export type ReactRootViewProps = {
  rootTag?: HTMLElement,
  children?: React.Children,
  _styleSheet?: StyleSheet,
  _responderSystem?: ResponderSystem
};

export default function ReactRootView(props: ReactRootView): React.Node {
  const styleSheet = React.useRef<StyleSheet>();
  if (!styleSheet.current) {
    styleSheet.current = props._styleSheet || new StyleSheet(props.rootTag);
  }

  const responderSystem = React.useRef<ResponderSystem>();
  if (!responderSystem.current) {
    responderSystem.current =
      props._responderSystem ||
      new ResponderSystem(props.rootTag?.ownerDocument?.defaultView);
  }

  React.useEffect(() => {
    return () => {
      styleSheet.current.clear();
      responderSystem.current.terminateResponder();
    };
  }, []);

  const styleContext: RootContextType = {
    rootTag: props.rootTag,
    styleSheet: styleSheet.current,
    responderSystem: responderSystem.current
  };

  return (
    <RootContext.Provider value={styleContext}>
      {props.children}
    </RootContext.Provider>
  );
}
