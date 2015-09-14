# HAMify

Experiments in minimizing color changes between pixels.  See it live at http://bartgrantham.github.io/HAMify/

Drag and drop an image from your local filesystem to see it HAMified.

Some observations:

* **The addition of noise to the calculation of (post-quantized) diffs is an important quality enhancement which allows for tie-breaking that would otherwise result in streaks**
* An algorithm that weights R/G/B perceptually (R=.3, G=.6, B=.1) results in a green-fringed image, presumably from overfavoring green
* An algorithm that minimizes luminosity changes (Y= R\*.2126, G\*.7152 + B\*.0722) results in a blue-tinted image, presumably from holding over blue that should be changing

## TODO

* Better CSS for centering, handling scrolling on oversized/zoomed images, etc.
* Add instructions on overlay
* Add a slider for adding NTSC-like chroma bleed
* Add "Select file..."
* Add "Enter URL: "
