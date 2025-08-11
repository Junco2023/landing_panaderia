document.addEventListener('DOMContentLoaded', function () {
  //sidenav
  const sidenavs = document.querySelectorAll('.sidenav');
  var instanciaSidenav = M.Sidenav.init(sidenavs)
  //slider
  const slider = document.querySelectorAll('.slider');
  var instanciaSlider = M.Slider.init(slider, {
    indicators: true,
    height: 650,
    duration: 500,
    interval: 4000
  })
  //tooltip
  const tool=document.querySelectorAll('.tooltipped');
  var instaniaTooltip=M.Tooltip.init(tool,{
    inDuration:300,
    transitionMovement:1
  });
  //modal
  const modal=document.querySelectorAll('.modal');
  var instanciaModal=M.Modal.init(modal);

  //cerrar sidenav al hacer click en enlace
  const sidenavsLinks = document.querySelectorAll('.sidenav a');
  sidenavsLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      const sidenavInstance = M.Sidenav.getInstance(document.querySelector('.sidenav'));
      if (sidenavInstance) {
        sidenavInstance.close();
      }
    });
  });
  /* pwa config */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js")
      .then(registration => {
        console.log("Service Worker registrado con éxito:", registration.scope);

        // Escuchar si hay una nueva versión del SW
        registration.onupdatefound = () => {
          const newWorker = registration.installing;
          newWorker.onstatechange = () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              console.log("Nueva versión disponible, recargando...");
              window.location.reload();
            }
          };
        };
      })
      .catch(error => {
        console.log("Fallo al registrar el Service Worker:", error);
      });
  });
}

  
});