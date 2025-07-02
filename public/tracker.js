(function () {
  // Read selector from script tag attribute
  const scriptTag = document.currentScript;
  const selector = scriptTag.getAttribute("data-track") || "button";

  function sendClickData(elementId) {
    fetch("/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        elementId: elementId,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      }),
    }).catch((err) => console.error("Track error:", err));
  }

  // Listen for clicks on selected elements
  document.addEventListener("click", function (e) {
    const target = e.target.closest(selector);
    if (target) {
      const id = target.id || target.className || target.tagName;
      sendClickData(id.toString().trim());
    }
  });
})();
