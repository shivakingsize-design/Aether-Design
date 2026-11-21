# Aether Design

Portfolio website for Aether Design, an independent graphic design studio.

Tagline: *Visuals with intention.*

## Files

```
aetherweb/
├── index.html                 Page structure and content
├── style.css                  Layout, colour and typography
├── script.js                  Header state and image preview
├── README.md                  This file
└── images/
    ├── project-01-live-better-in-style.png
    ├── project-02-design-your-everyday.png
    ├── project-03-comfort-with-character.png
    ├── project-04-made-for-moments-together.png
    └── project-05-your-home-our-vision.png
```

To view the site, open `index.html` in a browser. The page loads its fonts from Google Fonts, so it needs an internet connection for the typefaces to display correctly.

## Editing content

**Project text.** Each project is an `<article class="project">` block in `index.html`. Change the title, the category line (`project-kind`) and the description inside `project-meta`.

**Contact details.** Found in the `#contact` section of `index.html`. The email and Instagram link are set in two places: the visible text and the `href`.

**Colours and type.** All colours and font families are variables at the top of `style.css` (`--bone`, `--ink`, `--oak`, `--serif`, `--sans`, and so on).

## Adding a fourth project

1. Copy the new image into `images/` and name it `project-04-your-title.png`.
2. Copy an existing `<article class="project">` block in `index.html`, paste it below the last one, and update the image path, `alt` text, `aria-label` and copy.
3. The layout alternates automatically: odd projects sit image-left and even projects sit image-right.

## Image notes

- The three project images are the works as supplied. Two of them carry the text "AETHERWEB" in their artwork. If you would like the artwork to match the Aether Design name, re-export those files with the name removed or updated.
- Duplicate uploads were removed. The site includes five unique works.
- "Your Home. Our Vision." also carries a small "AetherWeb" credit in its artwork, so the same re-export note applies.

## Publishing

The site is plain HTML, CSS and JavaScript, so it can be hosted for free. Options include:

- **GitHub Pages:** upload the folder to a repository and enable Pages in its settings.
- **Netlify or Cloudflare Pages:** drag the `aetherweb` folder into the dashboard.

## Contact

- Email: trollcoretrial@gmail.com
- Instagram: [@aetherweb.studio](https://www.instagram.com/aetherweb.studio/)
- Based in India. Available for freelance projects and collaborations.
