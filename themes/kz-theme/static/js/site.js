(function () {
  function switchTheme(theme) {
    switch (theme) {
      case "light":
        document.body.classList.remove("dark");
        break;
      case "dark":
        document.body.classList.add("dark");
        break;
      default:
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.body.classList.add("dark");
        }
    }
  }

  function getPrefTheme() {
    return localStorage.getItem("pref-theme");
  }

  function setPrefTheme(theme) {
    switchTheme(theme);
    localStorage.setItem("pref-theme", theme);
    updateSyntaxTheme(theme);
  }

  function updateSyntaxTheme(theme) {
    var lightSheet = document.getElementById("syntax-theme-light");
    var darkSheet = document.getElementById("syntax-theme-dark");
    if (!lightSheet || !darkSheet) {
      return;
    }

    if (theme === "light") {
      lightSheet.media = "all";
      darkSheet.media = "not all";
    } else if (theme === "dark") {
      lightSheet.media = "not all";
      darkSheet.media = "all";
    } else {
      lightSheet.media = "(prefers-color-scheme: light)";
      darkSheet.media = "(prefers-color-scheme: dark)";
    }
  }

  var defaultTheme = document.body.getAttribute("data-default-theme") || "auto";
  var prefTheme = getPrefTheme();
  var theme = prefTheme ? prefTheme : defaultTheme;
  switchTheme(theme);
  updateSyntaxTheme(prefTheme ? prefTheme : "auto");

  var toggleButton = document.getElementById("theme-toggle");
  if (toggleButton) {
    toggleButton.addEventListener("click", function () {
      var isDark = document.body.classList.contains("dark");
      setPrefTheme(isDark ? "light" : "dark");
    });
  }

  var menu = document.getElementById("menu");
  if (menu) {
    menu.scrollLeft = localStorage.getItem("menu-scroll-position") || 0;
    menu.addEventListener("scroll", function () {
      localStorage.setItem("menu-scroll-position", menu.scrollLeft);
    });
  }

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        var id = this.getAttribute("href").slice(1);
        var target = document.getElementById(decodeURIComponent(id));
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
          if (id === "top") {
            history.replaceState(null, null, " ");
          } else {
            history.pushState(null, null, "#" + id);
          }
        }
      });
    });
  }

  var topLink = document.getElementById("top-link");
  if (topLink) {
    window.addEventListener("scroll", function () {
      if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
        topLink.style.visibility = "visible";
        topLink.style.opacity = "1";
      } else {
        topLink.style.visibility = "hidden";
        topLink.style.opacity = "0";
      }
    });
  }
})();
