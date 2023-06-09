# mohc-website

## Installation

Make sure you have the latest version of Node and npm installed. Run `npm ci` to install all dependencies.

Make a copy of the `.env.example` file, rename it to `.env.local`, and populate it with your environment variables.

## Development

Run `npm run dev` to start up the development environment. You can access the development environment in your browser at [localhost:3000](http://localhost:3000).

- To access the home page, go to [localhost:3000/home](http://localhost:3000/home).

## Production

This is a static site run through GitHub Pages. To generate a static build:

Add your local path to the assetPrefix and basePrefix in `next.config.mjs` then run `npm run build`.

This will create an `out` folder in the repository where you can view the static site.

## Contentful integration

### Fetching data

Contentful is a content management system that is integrated with the system to allow for easy content creation and editing.

In the contentful admin, set up a `Personal Content Management Token`.

This needs to be added to your `.env` file along with the `Space ID` and `Content Delivery API Access Token` which can also be found under API keys in the contentful admin.

### Contentful admin

A Content view has been set up in Contentful with the following content types as sections:

- Accordion
- Accordion item
- Animated heading
- Centered title and text
- Device view
- Full width image
- Heading
- Hero banner
- Icon boxes
- Image slider
- Image and text
- Mobile images and text
- Small image banner
- Text column

These can then be assembled on pages using the `Home Page` and `Page` content types.

When creating a new `Page` it must be added to the `Project Navigation` type as well. This will display the page on the project section of the home page and add it to the navigation between projects.

### Creating a new content type

When adding a new content type, it will need to be added as a case in the `getSection.tsx` helper. To generate the types for the new section, the following command can be run:

`npm run generate:types`
