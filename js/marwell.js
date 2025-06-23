console.clear();

const video = document.querySelector(".video-background");
let src = video.currentSrc || video.src;
console.log(video, src);

function once(el, event, fn, opts) {
  var onceFn = function (e) {
    el.removeEventListener(event, onceFn);
    fn.apply(this, arguments);
  };
  el.addEventListener(event, onceFn, opts);
  return onceFn;
}

once(document.documentElement, "touchstart", function (e) {
  video.play();
  video.pause();
});

/////////////////////////////////////////////////////////////////////

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

if (ScrollTrigger.isTouch === 1) {
    ScrollTrigger.normalizeScroll({
        momentum: self => Math.min(1.5, Math.abs(self.velocityY) / 1000)
    });
}

ScrollSmoother.create ({
    smooth: 3,
    smoothTouch: 0.1,
    ignoreMobileResize: true
});

// Перемещение секции "section1"
gsap.fromTo('.section1', {yPercent: 0}, {
    yPercent: 600,
    ease: 'none',
    scrollTrigger: {
        trigger: ".smooth-content",
        start: "top top",
        end: "bottom bottom",
        scrub: true
    }
});

// Перемещение логотипа
gsap.fromTo('.section1__logo', {yPercent: 0}, {
    yPercent: -35,
    ease: 'none',
    scrollTrigger: {
        trigger: ".section2",
        start: "top bottom",
        end: "top top",
        scrub: true
    }
});

// Изменение прозрачности значка прокрутки
gsap.to('.section1__scroll-icon', {
    opacity: 0,
    scrollTrigger: {
        trigger: ".section2",
        start: "top bottom",
        end: "top center",
        scrub: true
    }
});

// Перемещение и изменение прозрачности текста "Официальные представители..."
gsap.to('.section1__text', {
    yPercent: 200,
    opacity: 1,
    ease: 'none',
    scrollTrigger: {
        trigger: ".section2",
        start: "top bottom",
        end: "top top",
        scrub: true
    }
});

// Перемещение и изменение прозрачности кнопки переключения языков
gsap.to('.section1__language', {
    yPercent: 200,
    opacity: 1,
    ease: 'none',
    scrollTrigger: {
        trigger: ".section2",
        start: "top bottom",
        end: "top top",
        scrub: true
    }
});

// Перемещение и изменение прозрачности ссылки на мессенджер
gsap.to('.section1__messenger', {
    yPercent: -200,
    opacity: 1,
    ease: 'none',
    scrollTrigger: {
        trigger: ".section2",
        start: "top bottom",
        end: "top top",
        scrub: true
    }
});

// Изменение прозрачности заголовка
gsap.to('.section2__text', {
    opacity: 0,
    scrollTrigger: {
        trigger: ".section2__text p",
        start: "bottom center",
        end: "bottom top",
        scrub: true
    }
});

//////////////////////////////////////////////////////////

let tl = gsap.timeline({
  defaults: { duration: 1 },
  scrollTrigger: {
    trigger: ".section3",
    start: "top top",
    end: "bottom bottom",
    scrub: true
  }
});

once(video, "loadedmetadata", () => {
  tl.fromTo(
    video,
    {
      currentTime: 0
    },
    {
      currentTime: video.duration || 1
    }
  );
});

setTimeout(function () {
  if (window["fetch"]) {
    fetch(src)
      .then((response) => response.blob())
      .then((response) => {
        var blobURL = URL.createObjectURL(response);

        var t = video.currentTime;
        once(document.documentElement, "touchstart", function (e) {
          video.play();
          video.pause();
        });

        video.setAttribute("src", blobURL);
        video.currentTime = t + 0.01;
      });
  }
}, 1000);

/* ---------------------------------- */

// Перемещение видео
gsap.to('.opa', {
    yPercent: 400,
    ease: 'none',
    scrollTrigger: {
        trigger: ".section3",
        start: "top top",
        end: "bottom bottom",
        scrub: true
    }
});