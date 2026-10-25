# Advise Hair website

A simple static website (HTML/CSS/JS) for Advise Hair, ready for GitHub Pages.

## Files
- `index.html`: the page
- `styles.css`: the look (colours, fonts, layout)
- `script.js`: **products, prices and social links live at the top of this file**
- `assets/`: images used by the site (product photos are cropped from the `images/` screenshots)

## Update prices / products
Open `script.js` and edit the `PRODUCTS` list. Each size is written as `["22\"", 2800]`.

## Update socials
At the top of `script.js` change `instagramUrl`, `instagramHandle`, `facebookUrl` and `facebookName`.
The WhatsApp number is `whatsapp: "27753366477"`.

## Publish on GitHub Pages
1. Push this folder to a GitHub repository (e.g. with GitHub Desktop: *Add existing repository* → *Publish*).
2. On GitHub go to **Settings → Pages**.
3. Under **Build and deployment** choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then **Save**.
4. After a minute the site is live at `https://<your-username>.github.io/<repo-name>/`.
