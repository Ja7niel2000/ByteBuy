import { CanActivateFn,Router } from '@angular/router';
import { AuthenticationService } from './_service/authentication.service';
import { inject } from '@angular/core';

export const authenticationGuard: CanActivateFn = (route, state) => {
  let estaLogeado = inject(AuthenticationService).isUserLoggedIn();
  console.log(estaLogeado);
  if(!estaLogeado){
    console.log("No esta logeado.");
    return inject(Router).navigate(['/login']);

  }
  return true;
};
