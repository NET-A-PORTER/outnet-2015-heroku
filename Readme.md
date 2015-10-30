# PRESTON
Style guide generator for the rich and famous


## Getting started

Prerequisites

- Node 0.12
- NPM latest

OMG, I'm ready

1. Clone from repo: `git clone http://stash.vm.wtf.nap:7990/scm/out/preston.git`
2. Install node modules: `cd preston && npm i`
3. Start it up: `node --harmony src/server.js`

**Note:** for Outnet 2015 styles, `src/client/fonts` directory needs to be created manually


## Technical overview
- App runs from `src` directory
- Style guides stored in `src/styles/{project}/`
- Styles compiled by **node-sass** middleware at runtime
	- App styles compiled to `src/client/css/`
	- Style guides compiled to `src/client/css/{guide-name}`
- Built on top of API
	- API routes should be defined in `src/routes/`
	- Try hitting **/api/1.0/styles**


## Functional overview
### Create a style guide
- Create a directory in `src/styles/{project-name}`
- Create a **definition.json** file in your brand spanking new directory that looks like this:

```
{
	"title": "Retro 1990's Style Guide",
	"contents": ["buttons", "... list of contents"]
}
```
- Create a directories for the content you require in the style guide, e.g. **buttons**
- In each directory create **markup.hbs** and **style.scss** files
	- Your markup.hbs file will be displayed in the client
	- Your styles.scss will be compiled and requested by the client
- That's it really

### NOTES
- Keep names **url/css friendly** - just to make dev easier, e.g. *my-super-awesome-styleguide*
- If you want some code in your **markup.hbs** to be displayed in the client, wrap it with the **markup helper**, e.g.

```
{{#markup}}
    <div>My component</div>
{{/markup}}
```

## TODO
- Display SASS & compiled contents in line with markup
- Separation of base, component and module styles
- Download/generate style functionality
### Bugs
- SVG files not being copied
