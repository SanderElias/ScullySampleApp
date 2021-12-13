# ACMNov2021

## A Scully demo app.

The base of the app is generatied with those commands:
```bash
npx @angular/cli@latest new ACM-Nov2021  --routing --style css --minimal --strict
cd ACM-Nov2021
npx ng g m home --route home --module app.module 
npx ng g m about --route about --module app.module
npx ng g m users --route users --module app.module
npx ng g m user  --route :id --module users/users.module
npx ng g s users/users
npx ng g m userSearch  --route "*" --module users/users.module
npx ng add @scullyio/init
npx ng g @scullyio/init:blog
```

