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


/* Live/offline indicator: DecAPI provides a public Twitch uptime endpoint.
   Its response is cached by the service, so the status can lag slightly. */
const statusLabel = document.getElementById("stream-status");
const statusNote = document.getElementById("status-note");
async function refreshStreamStatus() {
  if (!statusLabel) return;
  try {
    const response = await fetch("https://decapi.me/twitch/uptime/DrTyCompton", { cache: "no-store" });
    if (!response.ok) throw new Error("Status service unavailable");
    const result = (await response.text()).trim();
    const offline = !result || /offline|not found|error/i.test(result);
    statusLabel.textContent = offline ? "OFFLINE" : "LIVE NOW";
    statusLabel.classList.toggle("status-live", !offline);
    statusLabel.classList.toggle("status-offline", offline);
    if (statusNote) statusNote.textContent = offline
      ? "Currently offline. Follow on Twitch to catch the next deployment."
      : `Currently live on Twitch · ${result}`;
  } catch (error) {
    statusLabel.textContent = "VIEW TWITCH";
    statusLabel.classList.remove("status-live", "status-offline");
    if (statusNote) statusNote.textContent = "Live status is temporarily unavailable. Tap Open Twitch Channel to check.";
  }
}
refreshStreamStatus();
setInterval(refreshStreamStatus, 120000);

/* Twitch chat embed also requires the deployed site's hostname. */
const chatContainer = document.getElementById("twitch-chat");
if (chatContainer && host && host !== "localhost" && host !== "127.0.0.1") {
  const chatFrame = document.createElement("iframe");
  chatFrame.src = `https://www.twitch.tv/embed/DrTyCompton/chat?parent=${encodeURIComponent(host)}&darkpopout`;
  chatFrame.title = "DrTyCompton Twitch chat";
  chatFrame.loading = "lazy";
  chatContainer.replaceChildren(chatFrame);
}
