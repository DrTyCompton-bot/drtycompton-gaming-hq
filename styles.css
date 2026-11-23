document.getElementById("year").textContent = new Date().getFullYear();

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

// Twitch requires the deployed website's hostname in its "parent" parameter.
// Using the current hostname lets the embed work on your GitHub Pages address.
const embed = document.getElementById("twitch-embed");
const host = window.location.hostname;
if (host && host !== "localhost" && host !== "127.0.0.1") {
  const frame = document.createElement("iframe");
  frame.src = `https://player.twitch.tv/?channel=DrTyCompton&parent=${encodeURIComponent(host)}&muted=true`;
  frame.allowFullscreen = true;
  frame.allow = "autoplay; fullscreen";
  frame.title = "DrTyCompton Twitch livestream";
  embed.replaceChildren(frame);
} else {
  const note = document.createElement("span");
  note.textContent = "The live player activates automatically after deployment to your website.";
  embed.appendChild(note);
}
