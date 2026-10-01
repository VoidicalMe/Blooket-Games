(function () {
  var tilt = [-2.4, 1.7, -1.3, 2.6, -2.2, 0.9, 2.8, -1.6, 1.4, -2.7, 2.1, -0.7, 1.8, -2.5, 1.1];
  var rise = [0.05, -0.055, 0.03, -0.04, 0.06, -0.02, 0.025, -0.065, 0.04, -0.03, 0.055, -0.045, 0.02, -0.035, 0.045];

  document.querySelectorAll("[data-ink]").forEach(function (el) {
    var text = el.textContent;
    el.setAttribute("aria-label", text.trim());
    el.textContent = "";
    Array.from(text).forEach(function (ch, i) {
      var span = document.createElement("span");
      span.className = "glyph";
      span.setAttribute("aria-hidden", "true");
      span.textContent = ch === " " ? "\u00a0" : ch;
      span.style.setProperty("--r", tilt[i % tilt.length] + "deg");
      span.style.setProperty("--y", rise[i % rise.length] + "em");
      el.appendChild(span);
    });
  });

  var title = document.querySelector("#title");
  var play = document.querySelector("#play");
  var done = document.querySelector("#correct");
  var lives = 3;

  document.querySelector(".begin").addEventListener("click", function () {
    title.hidden = true;
    play.hidden = false;
  });

  document.querySelectorAll(".choice").forEach(function (button) {
    button.addEventListener("click", function () {
      if (button.getAttribute("data-correct") === "true") {
        play.hidden = true;
        done.hidden = false;
        return;
      }
      if (lives === 0) return;
      lives -= 1;
      var marks = play.querySelectorAll(".life");
      marks[lives].classList.add("spent");
      play.querySelector(".lives").setAttribute(
        "aria-label",
        lives === 1 ? "1 life" : lives + " lives"
      );
    });
  });
})();
