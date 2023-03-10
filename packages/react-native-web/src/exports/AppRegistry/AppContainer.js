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
import StyleSheet from '../StyleSheet';
import View from '../View';

type Props = {
  WrapperComponent?: ?React.ComponentType<*>,
  // $FlowFixMe
  children?: React.Children
};

export default function AppContainer(props: Props): React.Node {
  const { children, WrapperComponent } = props;

  let innerView = (
    <View
      children={children}
      key={1}
      pointerEvents="box-none"
      style={styles.appContainer}
    />
  );

  if (WrapperComponent) {
    innerView = <WrapperComponent>{innerView}</WrapperComponent>;
  }

  return (
    <View pointerEvents="box-none" style={styles.appContainer}>
      {innerView}
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  }
});
