# taylor-sihavong-site

Static rebuild of the Notion page, styled with the Taylor Sihavong design system. Plain HTML and CSS, no JavaScript framework at runtime.

## Upload to Namecheap
Upload these to the folder your domain serves (usually `public_html` on shared hosting), keeping the structure:

- `index.html`
- `styles.css`
- `favicon.svg`
- `images/taylor-sihavong.jpg` (add the portrait here; the page already points to this path)

The `source/` folder is for editing and does not need to be uploaded.

## Editing
All text and links live in `source/content.mjs`. In `source/`, run `npm install` then `npm run build` and the three root files are regenerated.

Fonts load from Google Fonts (Fraunces, Atkinson Hyperlegible Next, Zen Maru Gothic).
