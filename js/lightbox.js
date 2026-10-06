// Gallery lightbox using the native <dialog> element.
// <dialog> gives us Esc-to-close, focus handling and a backdrop for free.
const galleryImages = [...document.querySelectorAll("#gallery .grid img")];
let current = 0;

const dialog = document.createElement("dialog");
dialog.className = "lightbox";
dialog.setAttribute("aria-label", "Image viewer");
dialog.innerHTML = `
  <button class="lb-close" aria-label="Close image viewer">&times;</button>
  <button class="lb-nav lb-prev" aria-label="Previous image">&#8249;</button>
  <img alt="">
  <button class="lb-nav lb-next" aria-label="Next image">&#8250;</button>
`;
document.body.appendChild(dialog);

const bigImg = dialog.querySelector("img");

function show(index) {
  current = (index + galleryImages.length) % galleryImages.length; // wraps around
  bigImg.src = galleryImages[current].src;
  bigImg.alt = galleryImages[current].alt;
}

galleryImages.forEach((img, i) => {
  img.tabIndex = 0; // makes the image reachable with the keyboard
  img.style.cursor = "zoom-in";
  const open = () => { show(i); dialog.showModal(); };
  img.addEventListener("click", open);
  img.addEventListener("keydown", (e) => { if (e.key === "Enter") open(); });
});

dialog.querySelector(".lb-close").addEventListener("click", () => dialog.close());
dialog.querySelector(".lb-prev").addEventListener("click", () => show(current - 1));
dialog.querySelector(".lb-next").addEventListener("click", () => show(current + 1));

// Click on the dark backdrop closes it
dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });

// Arrow keys while open
dialog.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") show(current - 1);
  if (e.key === "ArrowRight") show(current + 1);
});
