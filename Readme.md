# PRESTON
Style guide generator for the rich and famous

[![Build](https://travis-ci.org/NET-A-PORTER/preston.svg)](https://travis-ci.org/NET-A-PORTER/preston)

## Getting started

Prerequisites

- Node 0.12
- NPM latest

1. Clone from repo: `git clone git@github.com:NET-A-PORTER/preston.git`
2. Install node modules: `cd preston && npm i`
3. Make sure you have node-sass globally installed: `npm install -g node-sass`
3. Start it up: `npm start`

OMG, I'm ready

## Functional overview
### Current styles
- [Outnet 2015](https://github.com/NET-A-PORTER/outnet-2015)

### Create a style guide
- Create a directory for your style
- Create a **definition.json** file in your brand spanking new directory that looks like this:
```json
{
	"title": "Retro 1990's Style Guide",
	"contents": ["buttons", "... list of contents"]
}
```
- Create a directories for the content you require in the style guide, e.g. **buttons**
- In each directory create **markup.hbs** and **style.scss** files
	- Your markup.hbs file will be displayed in the client
	- Your styles.scss will be compiled and requested by the client
- In your root directory, create a **style.scss** to be built
- Publish it via bower and install it into Preston
- That's it really

Take a look at [outnet-2015](https://github.com/NET-A-PORTER/outnet-2015) for an example of a style guide.

### Guidelines
- Keep names **url/css friendly** - just to make dev easier, e.g. *my-super-awesome-styleguide*
- If you want some code in your **markup.hbs** to be displayed in the client, wrap it with the **markup helper**, e.g.

```handlebars
{{#markup}}
    <div>My component</div>
{{/markup}}
```

## Technical overview
- App runs from `src` directory
- Style guides stored in `src/styles/{project}/`
- Styles compiled by **node-sass** middleware at runtime
	- App styles compiled to `src/client/css/`
	- Style guides compiled to `src/client/css/{guide-name}`
- Built on top of API
	- API routes should be defined in `src/routes/`
	- Try hitting **/api/1.0/styles**
- Builds and deploys to S3 via CLI

### Build and Publish

There are scripts which allow you to build locally and publish styles.

- `npm run-script build <styles...>` - Builds assets within `/src/client` directory.
- `npm run-script publish` - Publishes all built assets to S3. Make sure you run this after `./scripts/build`. Publishes to development by default.

To publish to an environment, set `NODE_ENV` as part of your command, e.g. `NODE_ENV=production npm run-script publish outnet-2015`.

Make sure you have a config file for that environment within `config/`. See `config/schema.json` for how to create a config file for an environment.

## Releasing

Preston is hosted as a service on http://preston-nap.herokuapp.com.

This is continuously deployed to whenever changes are merged into to master.

## TODO
- Display SASS & compiled contents in line with markup
- Separation of base, component and module styles
- Release tasks
- npm styles
