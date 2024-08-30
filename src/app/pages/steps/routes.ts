import { Routes } from "@angular/router";
import { addonsGuard } from "../../guards/addons.guard";
import { plansGuard } from "../../guards/plans.guard";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./step1/step1.component").then((m) => m.Step1Component),
  },
  {
    path: "1",
    redirectTo: "",
    pathMatch: "full",
  },
  {
    path: "2",
    canActivate: [plansGuard],
    loadComponent: () =>
      import("./step2/step2.component").then((m) => m.Step2Component),
  },
  {
    path: "3",
    canActivate: [addonsGuard],
    loadComponent: () =>
      import("./step3/step3.component").then((m) => m.Step3Component),
  },
  {
    path: "4",
    loadComponent: () =>
      import("./step4/step4.component").then((m) => m.Step4Component),
  },
  {
    path: "5",
    loadComponent: () =>
      import("./step5/step5.component").then((m) => m.Step5Component),
  },
];
