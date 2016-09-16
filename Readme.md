# PRESTON
Application to preview and document YOOX Net-A-Porter style guides.

[![Build](https://travis-ci.org/NET-A-PORTER/preston.svg)](https://travis-ci.org/NET-A-PORTER/preston)

## Getting started

Prerequisites

- Node 6.2.2

1. Clone from repo: `git clone git@github.com:NET-A-PORTER/preston.git`
2. Install node modules: `cd preston && npm i`
3. Start it up: `npm start`

OMG, I'm ready

## Functional overview
### Current styles
- [Outnet 2015](https://github.com/NET-A-PORTER/outnet-2015)

### Create a style guide
Style guides are currently installed via **[Bower](https://bower.io/)**.
- Create a directory for your style
- Create `definition.json` file in your brand spanking new directory that looks like this:
```json
{
	"title": "Retro 1990's Style Guide",
	"elements": ["buttons", "typography", "icons", etc.],
  	"files": ["path/to/styles.scss"]
}
```
- Create a directory for element in the style guide, e.g. **buttons**
- In each directory create `document.yml` and `style.scss` files
	- Your `document.yml` file should contain your elements' markup, [example](https://github.com/NET-A-PORTER/outnet-2015/blob/master/buttons/document.yml)
	- Your `style.scss` file is where you put your own styles for your element
- In your root directory, create a `style.scss` to be built, which imports the styles for each element, e.g.

  ```
  	@import 'typography/style';
	@import 'buttons/style';
	@import 'icons/style';
  ```
- Publish it via bower (push to Github, and tag)
- Install it into Preston, `bower install --save my-groovy-style-guide`
- Raise a Pull Request to this repo with the updated `bower.json`

Take a look at [outnet-2015](https://github.com/NET-A-PORTER/outnet-2015) for an example of a style guide.

## Technical overview
- App runs from `src` directory
- Style guides stored in `src/styles/{project}/` via Bower.
- Styles compiled by **node-sass** middleware at runtime
	- App styles compiled to `src/client/css/`
	- Style guides compiled to `src/client/css/{guide-name}`
- Built on top of API
	- API routes should be defined in `src/routes/`
	- Try hitting **/api/1.0/styles**
- Can deploy style guides to S3 via the build, but it's recommended that you set up your own deployment pipeline in your own style guide

### Building and publishing style guides

There are scripts which allow you to build locally and publish styles.

- `npm run-script build <styles...>` - Builds assets within `/src/client` directory.
- `npm run-script publish <style>` - Publishes all built assets to S3. Make sure you run this after `npm run-script build`.

To publish to an environment, set `NODE_ENV` as part of your command, e.g. `NODE_ENV=production npm run-script publish outnet-2015`. Make sure you have a config file for that environment within `config/` or the necessary environment variables set. See `config/schema.json` for how to create a config file for an environment and how to set the environment variables.

## Releasing

Preston is hosted as a service on http://preston-nap.herokuapp.com.

This is continuously deployed to whenever changes are merged into to master.

## TODO
- Display SASS & compiled contents in line with markup
- Separation of base, component and module styles
- Support document style guides available on npm
- CLI to create style guides
