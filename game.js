const SCENES = Object.assign({}, EPISODE1_SCENES, EPISODE2_PART1_SCENES, EPISODE2_PART2_SCENES);

function renderHUD() {
  document.getElementById("hud-social-read").textContent = computeSocialRead(state);
  document.getElementById("hud-cash").textContent = "$" + state.cash;
  document.getElementById("hud-grades").textContent = state.grades;
  const unread = getTotalUnreadDMs();
  const badge = document.getElementById("dm-unread-badge");
  badge.textContent = unread;
  badge.classList.toggle("visible", unread > 0);
}

function goToScene(sceneId) {
  const scene = SCENES[sceneId];
  if (!scene) { console.error("Missing scene:", sceneId); return; }

  state.sceneId = sceneId;
  if (sceneId.startsWith("ep2_")) state.episode = 2;
  state.presentNPCs = Array.isArray(scene.presentNPCs) ? [...scene.presentNPCs] : [];

  const rendered = scene.render();

  document.getElementById("scene-chapter").textContent = scene.chapter || "CHAPTER I";
  document.getElementById("scene-title").textContent = scene.title || "Meet Chloe";

  const beatEl = document.getElementById("beat-indicator");
  if (state.activeArc) {
    beatEl.style.display = "inline-block";
    beatEl.textContent = "Scene Depth · Beat " + Math.min(state.activeArc.beatIndex, state.activeArc.minBeats) + " of " + state.activeArc.minBeats;
  } else {
    beatEl.style.display = "none";
  }

  const bodyEl = document.getElementById("narrative-body");
  bodyEl.innerHTML = "";
  (rendered.text || []).forEach((t) => {
    const p = document.createElement("p");
    p.textContent = t;
    bodyEl.appendChild(p);
  });

  const choicesEl = document.getElementById("choices-deck");
  choicesEl.innerHTML = "";
  (rendered.choices || []).forEach((c) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice-btn";
    btn.textContent = c.label;
    btn.addEventListener("click", () => {
      c.action();
      renderHUD();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    choicesEl.appendChild(btn);
  });
  renderHUD();
}

function renderCorrespondenceDrawer() {
  const container = document.getElementById("dm-threads-container");
  container.innerHTML = "";
  const threads = Object.values(state.dmThreads);
  if (!threads.length) {
    const p = document.createElement("p");
    p.style.color = "#a69b8d";
    p.textContent = "No campus messages yet. Keep moving through the day.";
    container.appendChild(p);
    return;
  }
  threads.forEach((thread) => {
    const card = document.createElement("div");
    card.className = "dm-thread";
    const sender = document.createElement("div");
    sender.className = "dm-sender";
    sender.textContent = thread.name + " " + (thread.handle || "");
    card.appendChild(sender);

    thread.messages.forEach((m) => {
      const b = document.createElement("div");
      b.className = "dm-bubble" + (m.isPlayer ? " player" : "");
      b.textContent = m.text;
      card.appendChild(b);
    });

    if (Array.isArray(thread.replyOptions)) {
      const list = document.createElement("div");
      list.className = "dm-reply-list";
      thread.replyOptions.forEach((opt, i) => {
        const rb = document.createElement("button");
        rb.type = "button";
        rb.className = "dm-reply-btn";
        rb.textContent = opt.playerText;
        rb.addEventListener("click", () => {
          thread.unread = 0;
          replyToDM(thread.npcId, i);
        });
        list.appendChild(rb);
      });
      card.appendChild(list);
    }
    container.appendChild(card);
  });
}

document.getElementById("btn-open-dm").addEventListener("click", () => {
  document.getElementById("dm-overlay").classList.add("open");
  Object.values(state.dmThreads).forEach((t) => (t.unread = 0));
  renderCorrespondenceDrawer();
  renderHUD();
});
document.getElementById("btn-close-dm").addEventListener("click", () => {
  document.getElementById("dm-overlay").classList.remove("open");
});
document.getElementById("dm-overlay").addEventListener("click", (e) => {
  if (e.target.id === "dm-overlay") e.target.classList.remove("open");
});
document.getElementById("btn-restart").addEventListener("click", () => {
  state = INITIAL_STATE();
  renderHUD();
  goToScene("warmup_1");
});

goToScene("warmup_1");
// END OF game.js
