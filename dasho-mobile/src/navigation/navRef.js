// src/navigation/navRef.ts
import {
  CommonActions,
  NavigationContainerRefWithCurrent,
  createNavigationContainerRef,
} from '@react-navigation/native';

export const navRef: NavigationContainerRefWithCurrent<any> =
  createNavigationContainerRef();

export function resetToAuth() {
  if (navRef.isReady()) {
    navRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Auth' }], // <- must match your Auth stack route name
      })
    );
  }
}
