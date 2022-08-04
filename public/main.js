const update = document.querySelector("[data-btn]");

update.addEventListener("click", (_) => {
  console.log("clicked");
  fetch("/quotes", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Darth Vadar",
      quote: " I find your lack of faith disturbing.",
    }),
  }).catch((err) => {
    console.error(err);
  });
});
