import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { SignupStoreService } from "../services/signup-store.service";

export const addonsGuard: CanActivateFn = (route, state) => {
  const signupStoreService = inject(SignupStoreService);
  return signupStoreService.maybeLoadAddons();
};
