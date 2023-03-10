/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import * as React from 'react';
import ReactDOM from 'react-dom';
import canUseDOM from '../../modules/canUseDom';
import RootContext from '../AppRegistry/RootContext';

export type ModalPortalProps = {|
  children: any
|};

function ModalPortal(props: ModalPortalProps): React.Node {
  const { children } = props;
  const elementRef = React.useRef(null);
  const rootContext = React.useContext(RootContext);

  if (canUseDOM && !elementRef.current) {
    const document = rootContext.rootTag?.ownerDocument ?? window.document;
    const element = document.createElement('div');

    if (element && document.body) {
      document.body.appendChild(element);
      elementRef.current = element;
    }
  }

  React.useEffect(() => {
    if (canUseDOM) {
      return () => {
        const document = rootContext.rootTag?.ownerDocument ?? window.document;
        if (document.body && elementRef.current) {
          document.body.removeChild(elementRef.current);
          elementRef.current = null;
        }
      };
    }
  }, [rootContext.rootTag]);

  return elementRef.current && canUseDOM
    ? ReactDOM.createPortal(children, elementRef.current)
    : null;
}

export default ModalPortal;
