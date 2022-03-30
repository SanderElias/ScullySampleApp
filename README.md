# ACMNov2021

## A Scully demo app.

This app is [deployed to netlify](https://app.netlify.com/sites/flamboyant-leavitt-abeeff/deploys/61e0291781321c0007f9da21)
and you can see it in action [here](https://main--flamboyant-leavitt-abeeff.netlify.app/home)

The base of the app is generatied with those commands:
```bash
npx @angular/cli@latest new scully-sample-app  --routing --style css --minimal --strict
cd scully-sample-app
npx ng g m home --route home --module app.module 
npx ng g m about --route about --module app.module
npx ng g m users --route users --module app.module
npx ng g m user  --route :id --module users/users.module
npx ng g s users/users
npx ng g m userSearch  --route "*" --module users/users.module
npx ng add @scullyio/init
npx ng g @scullyio/init:blog
```

