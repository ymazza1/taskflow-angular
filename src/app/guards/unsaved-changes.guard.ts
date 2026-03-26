import { CanDeactivateFn } from '@angular/router';

export interface HasUnsavedChanges {
  hasunsavedChanges(): boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<HasUnsavedChanges> = (component) => {
  if (component.hasunsavedChanges && component.hasunsavedChanges()) {
    return confirm('Vous avez des changements non sauvegardées, voulez vous vraiment quitter?');
  }
  return true;
};
