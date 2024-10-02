(function () {
  "use strict";

  const tabs = document.querySelectorAll("#tabs > ul > li > a");

  tabs.forEach((tab) => {
    tab.addEventListener("click", selectTab);
  });

  function selectTab(event) {
    event.preventDefault();

    tabs.forEach((tab) => {
      tab.removeAttribute("class");
    });

    event.target.className = "active";
    const thisTab = event.target.getAttribute("href");
    const thisContent = document.querySelector(thisTab);
    const oldTabContent = document.querySelector(".visible");
    oldTabContent.className = "visuallyhidden";
    oldTabContent.addEventListener(
      "transitionend",
      () => {
        oldTabContent.className = "hidden";

        thisContent.className = "visible visuallyhidden";
        setTimeout(() => {
          thisContent.classList.remove("visuallyhidden");
        }, 20);
      },
      { capture: false, once: true, passive: false },
    );
  }
})();
