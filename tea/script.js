/* =========================================================
PILIM И PILIM — INNER PAGE
TEXT ANIMATIONS
========================================================= */


/* =========================================================
UTILS
========================================================= */

function observeOnce(elements, callback, options = {}){

    if(!elements || !elements.length) return;

    const observer = new IntersectionObserver(

        (entries, obs) => {

            entries.forEach(entry => {

                if(!entry.isIntersecting) return;

                callback(entry.target);

                obs.unobserve(entry.target);

            });

        },

        {
            threshold: options.threshold ?? .15,
            rootMargin: options.rootMargin ?? "0px 0px -10% 0px"
        }

    );

    elements.forEach(element => observer.observe(element));

}


/* =========================================================
PAGE TITLE
========================================================= */

function initPageTitle(){

    const block = document.querySelector(".page-manifest");

    if(!block) return;

    const title = block.querySelector("h1");

    if(!title) return;

    /*
       Разбиваем текст заголовка на буквы.
    */

    if(!title.querySelector(".manifest-letter")){

        const walker = document.createTreeWalker(
            title,
            NodeFilter.SHOW_TEXT
        );

        const textNodes = [];

        while(walker.nextNode()){
            textNodes.push(walker.currentNode);
        }

        textNodes.forEach(node => {

            if(!node.textContent.trim()) return;

            const fragment = document.createDocumentFragment();

            [...node.textContent].forEach(char => {

                if(char === " "){

                    fragment.appendChild(
                        document.createTextNode(" ")
                    );

                    return;

                }

                const letter = document.createElement("span");

                letter.className = "manifest-letter";
                letter.textContent = char;

                letter.style.display = "inline-block";

                fragment.appendChild(letter);

            });

            node.replaceWith(fragment);

        });

    }


    const letters = title.querySelectorAll(
        ".manifest-letter"
    );

    if(!letters.length) return;


    /*
       Начальное состояние
    */

    gsap.set(letters, {
        y:35,
        opacity:0,
        filter:"blur(2px)"
    });


    /*
       Запуск при появлении блока
    */

    observeOnce(
        [block],
        () => {

            gsap.to(letters, {

                y:0,
                opacity:1,
                filter:"blur(0px)",

                duration:.55,
                stagger:.018,

                ease:"power2.out"

            });

        },
        {
            threshold:.15,
            rootMargin:"0px 0px -15% 0px"
        }
    );

}


/* =========================================================
DESCRIPTION TEXT
========================================================= */

function initTextReveal(){

    const blocks = document.querySelectorAll(
        ".page-description p"
    );

    if(!blocks.length) return;


    blocks.forEach(block => {

        /*
           Разбиваем текст на слова.
        */

        if(!block.querySelector(".description-word")){

            const walker = document.createTreeWalker(
                block,
                NodeFilter.SHOW_TEXT
            );

            const textNodes = [];

            while(walker.nextNode()){
                textNodes.push(walker.currentNode);
            }


            textNodes.forEach(node => {

                if(!node.textContent.trim()) return;

                const fragment =
                    document.createDocumentFragment();

                node.textContent
                    .split(/(\s+)/)
                    .forEach(part => {

                        /*
                           Сохраняем пробелы
                        */

                        if(!part.trim()){

                            fragment.appendChild(
                                document.createTextNode(part)
                            );

                            return;

                        }


                        const span =
                            document.createElement("span");

                        span.className =
                            "description-word";

                        span.textContent = part;

                        span.style.display =
                            "inline-block";

                        fragment.appendChild(span);

                    });


                node.replaceWith(fragment);

            });

        }


        const words = block.querySelectorAll(
            ".description-word"
        );

        if(!words.length) return;


        /*
           Начальное состояние
        */

        gsap.set(words, {

            y:45,
            opacity:0,
            filter:"blur(2px)"

        });


        /*
           Запуск при появлении описания
        */

        observeOnce(

            [block],

            () => {

                gsap.to(words, {

                    y:0,
                    opacity:1,
                    filter:"blur(0px)",

                    duration:.7,
                    stagger:.025,

                    ease:"power2.out"

                });

            },

            {
                threshold:.12,
                rootMargin:"0px 0px -8% 0px"
            }

        );

    });

}


/* =========================================================
START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        if(
            typeof gsap === "undefined" ||
            typeof ScrollTrigger === "undefined"
        ){

            console.warn(
                "GSAP или ScrollTrigger не загружены."
            );

            return;

        }


        gsap.registerPlugin(ScrollTrigger);


        initPageTitle();
        initTextReveal();

    }
);