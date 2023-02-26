async function init() {
  setTimeout(currentPage, 100);
  await initGeneral();
}

function currentPage() {
  document.getElementById("sidebar_legal").classList.add("background-color");
}
