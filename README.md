# Dera Angeethi: Restaurant Website

A responsive, multi-section website for a fictional Lahore charcoal BBQ and karahi restaurant. Built with plain HTML, CSS and JavaScript, with no frameworks, so it loads fast and is easy for a small business to maintain.

**[View live demo](https://YOUR-USERNAME.github.io/dera-angeethi-restaurant/)**

![Desktop view](screenshots/desktop.png)

> This is a portfolio project for a fictional restaurant. Photos are from Unsplash.

## Features

- Responsive layout tested on mobile, tablet and desktop
- Menu with category tabs, rendered from a single JavaScript data array (easy to update)
- Gallery with an accessible lightbox (keyboard, arrow keys, Esc to close)
- Reservation form with validation: Pakistani mobile number format, no past dates, clear error messages
- Form submission through Web3Forms, with loading and failure states
- Accessible: skip link, visible keyboard focus, semantic HTML, alt text, reduced-motion support
- SEO basics: page title, meta description, lazy-loaded images

## Tech stack

| Tool | Why |
|------|-----|
| HTML5 | Semantic structure for accessibility and SEO |
| CSS3 (custom properties, Grid, Flexbox) | Design tokens in one place and a responsive layout without a framework |
| Vanilla JavaScript | Menu filtering, mobile nav, form validation, lightbox |
| Web3Forms | Free form-to-email service, so no backend is needed |
| GitHub Pages | Free static hosting |

## Project structure

```text
dera-angeethi/
├── index.html
├── css/
│   ├── style.css
│   └── lightbox.css
├── js/
│   ├── main.js
│   └── lightbox.js
├── images/
├── screenshots/
└── README.md
```

## Run locally

```bash
git clone https://github.com/YOUR-USERNAME/dera-angeethi-restaurant.git
cd dera-angeethi-restaurant
```

Open `index.html` in a browser, or use the VS Code Live Server extension.

To enable the reservation form, get a free access key from [web3forms.com](https://web3forms.com) and replace `YOUR_ACCESS_KEY` in `js/main.js`.

## Performance

Lighthouse scores (mobile): Performance **__**, Accessibility **__**, Best Practices **__**, SEO **__**

## What I learned

- Building a responsive layout with CSS Grid and custom properties
- Making interactive UI accessible with the native `<dialog>` element and ARIA attributes
- Validating user input and handling failed network requests

## Author

**Your Name**: Frontend Developer
[Portfolio](#) · [LinkedIn](#) · [Fiverr](#)
