import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FirestoreService } from './firestore.service';

export const stageGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return inject(FirestoreService).gs().then((stage) => {
    if (stage === parseInt(route.url.toString().replace('stage-', ''))) {
      return true;
    }
    router.navigate(['/stage-' + stage]);
    return false;
  });
};
