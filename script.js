/* =========================================================
PILIM И PILIM
JS
Анимации + повторный запуск после клика по фиксированному логотипу
========================================================= */


/* =========================================================
UTILS
========================================================= */

function isMobile(){

    return window.matchMedia("(max-width:768px)").matches;

}


function observeOnce(elements,callback,options={}){

    if(!elements || !elements.length) return;

    const observer = new IntersectionObserver(

        (entries,obs)=>{

            entries.forEach(entry=>{

                if(!entry.isIntersecting) return;

                callback(entry.target);

                obs.unobserve(entry.target);

            });

        },

        {
            threshold:options.threshold ?? .15,
            rootMargin:options.rootMargin ?? "0px 0px -10% 0px"
        }

    );

    elements.forEach(element=>observer.observe(element));

    return observer;

}


/* =========================================================
HERO
========================================================= */

function initHero(){

    const hero=document.querySelector(".hero-title");

    if(!hero) return;

    if(!hero.querySelector(".hero-letter")){

        const walker=document.createTreeWalker(
            hero,
            NodeFilter.SHOW_TEXT
        );

        const textNodes=[];

        while(walker.nextNode()){
            textNodes.push(walker.currentNode);
        }

        textNodes.forEach(node=>{

            const fragment=document.createDocumentFragment();

            [...node.textContent].forEach(char=>{

                if(char===" "){

                    fragment.appendChild(
                        document.createTextNode(" ")
                    );

                    return;

                }

                const wrap=document.createElement("span");
                wrap.className="hero-letter-wrap";

                const letter=document.createElement("span");
                letter.className="hero-letter";
                letter.textContent=char;

                wrap.appendChild(letter);
                fragment.appendChild(wrap);

            });

            node.replaceWith(fragment);

        });

    }

    const letters=hero.querySelectorAll(".hero-letter");

    if(!letters.length) return;

    gsap.set(letters,{
        yPercent:110
    });

    gsap.to(letters,{
        yPercent:0,
        duration:.9,
        stagger:.045,
        ease:"power4.out"
    });

}


/* =========================================================
MANIFEST
========================================================= */

function initManifest(){

    const block=document.querySelector(".manifest-block");

    if(!block) return;

    block.querySelectorAll(".line").forEach(line=>{

        if(line.querySelector(".manifest-letter")) return;

        const text=line.textContent.trim();
        const fragment=document.createDocumentFragment();

        text.split(/\s+/).forEach((word,index,words)=>{

            const wordWrap=document.createElement("span");

            wordWrap.className="manifest-word";

            if(word.toUpperCase()==="МАСТЕРСКАЯ"){
                wordWrap.classList.add("manifest-workshop-word");
            }

            wordWrap.style.cssText=
                "display:inline-block;vertical-align:top;";

            [...word].forEach(char=>{

                const letter=document.createElement("span");

                letter.className="manifest-letter";
                letter.textContent=char;
                letter.style.display="inline-block";

                wordWrap.appendChild(letter);

            });

            fragment.appendChild(wordWrap);

            if(index<words.length-1){

                fragment.appendChild(
                    document.createTextNode(" ")
                );

            }

        });

        line.replaceChildren(fragment);

    });

    const letters=block.querySelectorAll(".manifest-letter");

    if(!letters.length) return;

    gsap.set(letters,{
        y:35,
        opacity:0,
        filter:"blur(2px)"
    });

    observeOnce(
        [block],
        ()=>{

            gsap.to(letters,{
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
DESCRIPTION ANIMATION — LANDSCAPE ONLY
========================================================= */

const descriptionBlock = document.querySelector('.description-block');

const descriptionAnimation = descriptionBlock?.querySelector(
    '.description-animation'
);

const descriptionImage = descriptionAnimation?.querySelector('img');

if (descriptionBlock && descriptionAnimation && descriptionImage) {

    const animationSymbols = [
        'images/animation/tea.svg',
        'images/animation/wood.svg',
        'images/animation/instruments.svg'
    ];

    const landscapeQuery = window.matchMedia(
        '(orientation: landscape)'
    );

    let animationIndex = 0;
    let animationTimer = null;

    function startDescriptionAnimation(){

        if (
            animationTimer ||
            !landscapeQuery.matches
        ) {
            return;
        }

        descriptionAnimation.classList.add('is-active');

        animationTimer = setInterval(() => {

            animationIndex =
                (animationIndex + 1) % animationSymbols.length;

            descriptionImage.src =
                animationSymbols[animationIndex];

        }, 120);
    }

    function stopDescriptionAnimation(){

        descriptionAnimation.classList.remove('is-active');

        if (animationTimer) {
            clearInterval(animationTimer);
            animationTimer = null;
        }

        animationIndex = 0;
        descriptionImage.src = animationSymbols[0];
    }

    const observer = new IntersectionObserver(
        (entries) => {

            const entry = entries[0];

            if (
                entry.isIntersecting &&
                landscapeQuery.matches
            ) {
                startDescriptionAnimation();
            } else {
                stopDescriptionAnimation();
            }

        },
        {
            threshold:0.25
        }
    );

    observer.observe(descriptionBlock);

    landscapeQuery.addEventListener(
        'change',
        () => {

            if (!landscapeQuery.matches) {
                stopDescriptionAnimation();
            }

        }
    );
}
/* =========================================================
CONTACT SLOGAN
========================================================= */

function initSlogan(){

    const contact=document.querySelector(".contact-block");
    const words=contact?.querySelectorAll(".slogan-line .word");

    if(!contact || !words?.length) return;

    const accent=contact.querySelector(".slogan-accent");

    if(accent){

        accent.style.setProperty(
            "color",
            "#7182CB",
            "important"
        );

    }

    gsap.set(words,{
        y:70,
        opacity:0
    });

    observeOnce(
        [contact],
        ()=>{

            gsap.to(words,{
                y:0,
                opacity:1,
                duration:1.1,
                stagger:.25,
                ease:"power4.out"
            });

        },
        {
            threshold:.2,
            rootMargin:"0px 0px -10% 0px"
        }
    );

}


/* =========================================================
SYMBOLS
========================================================= */

function initSymbols(){

    const symbols=document.querySelectorAll(".symbol img");

    if(!symbols.length) return;

    gsap.set(symbols,{
        scale:.82,
        opacity:0,
        filter:"blur(8px)",
        y:30
    });

    observeOnce(
        symbols,
        symbol=>{

            gsap.to(symbol,{
                scale:1,
                opacity:1,
                filter:"blur(0px)",
                y:0,
                duration:1.1,
                ease:"power3.out"
            });

        },
        {
            threshold:.2,
            rootMargin:"0px 0px -10% 0px"
        }
    );

}


/* =========================================================
CARDS
========================================================= */

function initCards(){

    const cards=document.querySelectorAll(".card-block");

    if(!cards.length) return;

    /*
       Заголовки больше не анимируем,
       так как они скрыты через CSS.

       Текст карточек проходит через
       общую word-by-word reveal-анимацию
       в initTextReveals().
    */

}


/* =========================================================
LONG TEXT
========================================================= */

function initTextReveals(){

    const selectors=[

        ".description-block p",
        ".workshops-block p",
        ".jams-block p",
        ".meetings-block p",
        ".final-text-block p",
        ".card-block .text p"

    ];

    const blocks=document.querySelectorAll(
        selectors.join(",")
    );

    if(!blocks.length) return;

    blocks.forEach(block=>{

        let words=block.querySelectorAll(
            ".description-word"
        );

        if(!words.length){

            const walker=document.createTreeWalker(
                block,
                NodeFilter.SHOW_TEXT
            );

            const textNodes=[];

            while(walker.nextNode()){
                textNodes.push(walker.currentNode);
            }

            textNodes.forEach(node=>{

                if(!node.textContent.trim()) return;

                const fragment=document.createDocumentFragment();

                node.textContent
                    .split(/(\s+)/)
                    .forEach(part=>{

                        if(!part.trim()){

                            fragment.appendChild(
                                document.createTextNode(part)
                            );

                            return;

                        }

                        const span=document.createElement("span");

                        span.className="description-word";
                        span.textContent=part;
                        span.style.display="inline-block";

                        fragment.appendChild(span);

                    });

                node.replaceWith(fragment);

            });

            words=block.querySelectorAll(
                ".description-word"
            );

        }

        if(!words.length) return;

        gsap.set(words,{
            y:45,
            opacity:0,
            filter:"blur(2px)"
        });

        observeOnce(
            [block],
            ()=>{

                gsap.to(words,{
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
GALLERY
========================================================= */

function initGallery(){

    const images = [
        "1.webp",
        "2.webp",
        "3.webp",
        "4.webp",
        "5.webp",
        "6.webp",
        "7.webp",
        "8.webp"
    ];

    const image = document.getElementById("gallery-image");
    const mobile = document.getElementById("gallery-mobile");
    const next = document.getElementById("gallery-next");
    const prev = document.getElementById("gallery-prev");

    if(!image || !mobile) return;
    if(image.dataset.galleryInitialized) return;

    image.dataset.galleryInitialized = "true";

    let index = 0;
    let loading = false;

    /* =====================================================
       PRELOAD
    ===================================================== */

    const preload = new Set();

    function preloadImage(i){

        i = (i + images.length) % images.length;

        if(preload.has(i)) return;

        preload.add(i);

        const img = new Image();

        img.src = `images/gallery/${images[i]}`;

        const mobileImg = new Image();

        mobileImg.src =
            `images/gallery/mobile/${images[i]}`;

    }

    /* Загружаем первую пару следующих изображений */
    preloadImage(1);
    preloadImage(2);
    preloadImage(images.length - 1);

    /* =====================================================
       CHANGE IMAGE
    ===================================================== */

    function changeGallery(nextIndex){

        if(loading) return;

        index =
            (nextIndex + images.length) %
            images.length;

        const file = images[index];

        loading = true;

        image.style.opacity = "0";

        mobile.srcset =
            `images/gallery/mobile/${file}`;

        const newImage = new Image();

        newImage.onload = () => {

            image.src =
                `images/gallery/${file}`;

            requestAnimationFrame(() => {

                image.style.opacity = "1";
                loading = false;

            });

        };

        newImage.onerror = () => {

            image.style.opacity = "1";
            loading = false;

        };

        newImage.src =
            `images/gallery/${file}`;

        /* Подгружаем соседние фотографии */
        preloadImage(index + 1);
        preloadImage(index - 1);

    }

    /* =====================================================
       BUTTONS
    ===================================================== */

    next?.addEventListener("click", () => {
        changeGallery(index + 1);
    });

    prev?.addEventListener("click", () => {
        changeGallery(index - 1);
    });

}

/* =========================================================
MOBILE CONTACT LOGO
========================================================= */

function initMobileContact(){

    if(!isMobile()) return;

    const contact=document.querySelector(".contact-block");
    const contactLogo=document.querySelector(".contact-end-logo");

    if(!contact || !contactLogo) return;

    if(
        typeof gsap==="undefined" ||
        typeof ScrollTrigger==="undefined"
    ){
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.getAll().forEach(trigger=>{

        if(
            trigger.vars &&
            trigger.vars.trigger===contact
        ){
            trigger.kill();
        }

    });

    gsap.fromTo(
        contactLogo,
        {
            y:0,
            opacity:1
        },
        {
            y:-120,
            opacity:0,
            ease:"none",
            scrollTrigger:{
                trigger:contact,
                start:"top top",
                end:"top -35%",
                scrub:true
            }
        }
    );

}


/* =========================================================
FIXED LOGO
========================================================= */

function initFixedLogo(){

    const logo=document.querySelector(".logo-fixed");

    if(!logo) return;

    if(logo.dataset.restartInitialized) return;

    logo.dataset.restartInitialized="true";

    const darkSections=document.querySelectorAll(
        [
            ".dark-section",
            ".black-section",
            ".footer",
            ".contact-block"
        ].join(",")
    );

    const sections=document.querySelectorAll(
        "section, footer, .stack-card, .contact-block"
    );

    function getLuminance(color){

        if(!color) return 1;

        const match=color.match(
            /rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/
        );

        if(!match) return 1;

        let [r,g,b]=match
            .slice(1)
            .map(value=>parseInt(value,10)/255);

        [r,g,b]=[r,g,b].map(value=>
            value<=.03928
                ? value/12.92
                : Math.pow(
                    (value+.055)/1.055,
                    2.4
                )
        );

        return(
            .2126*r+
            .7152*g+
            .0722*b
        );

    }

    function updateLogoColor(){

        const rect=logo.getBoundingClientRect();

        const logoX=rect.left+rect.width/2;
        const logoY=rect.top+rect.height/2;

        let isDark=false;

        sections.forEach(section=>{

            const sectionRect=
                section.getBoundingClientRect();

            if(
                logoX>=sectionRect.left &&
                logoX<=sectionRect.right &&
                logoY>=sectionRect.top &&
                logoY<=sectionRect.bottom
            ){

                const background=
                    getComputedStyle(section).backgroundColor;

                if(getLuminance(background)<.35){
                    isDark=true;
                }

            }

        });

        darkSections.forEach(section=>{

            const sectionRect=
                section.getBoundingClientRect();

            if(
                logoX>=sectionRect.left &&
                logoX<=sectionRect.right &&
                logoY>=sectionRect.top &&
                logoY<=sectionRect.bottom
            ){

                isDark=true;

            }

        });

        logo.classList.toggle("dark",isDark);

    }

    let ticking=false;

    function requestLogoUpdate(){

        if(ticking) return;

        ticking=true;

        requestAnimationFrame(()=>{

            updateLogoColor();

            ticking=false;

        });

    }

    window.addEventListener(
        "scroll",
        requestLogoUpdate,
        {passive:true}
    );

    window.addEventListener(
        "resize",
        requestLogoUpdate,
        {passive:true}
    );

    updateLogoColor();


    /* =====================================================
       MOBILE CONTACT POSITION
    ===================================================== */

    if(isMobile()){

        const contact=
            document.querySelector(".contact-block");

        if(contact){

            function updateMobileLogo(){

                const rect=
                    contact.getBoundingClientRect();

                const inside=
                    rect.top<=window.innerHeight &&
                    rect.bottom>=0;

                logo.classList.toggle(
                    "mobile-contact-position",
                    inside
                );

            }

            window.addEventListener(
                "scroll",
                updateMobileLogo,
                {passive:true}
            );

            window.addEventListener(
                "resize",
                updateMobileLogo,
                {passive:true}
            );

            updateMobileLogo();

        }

    }


    /* =====================================================
       RESTART ПО КЛИКУ
    ===================================================== */

    logo.addEventListener("click",event=>{

        event.preventDefault();

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

        let waiting=true;

        function waitForTop(){

            if(!waiting) return;

            const currentY=
                window.scrollY||
                window.pageYOffset||
                0;

            if(currentY<=2){

                waiting=false;

                window.removeEventListener(
                    "scroll",
                    waitForTop
                );

                restartAnimations();

                return;

            }

            requestAnimationFrame(waitForTop);

        }

        window.addEventListener(
            "scroll",
            waitForTop,
            {passive:true}
        );

        waitForTop();

    });

}


/* =========================================================
RESTART ALL ANIMATIONS
========================================================= */

function restartAnimations(){

    const animatedElements=document.querySelectorAll(

        [
            ".hero-letter",
            ".manifest-letter",
            ".slogan-line .word",
            ".symbol img",
            ".description-word",
            ".contact-end-logo"

        ].join(",")

    );

    gsap.killTweensOf(animatedElements);


    if(typeof ScrollTrigger!=="undefined"){

        ScrollTrigger.getAll().forEach(
            trigger=>trigger.kill()
        );

    }


    /* =====================================================
       HERO
    ===================================================== */

    const heroLetters=
        document.querySelectorAll(".hero-letter");

    if(heroLetters.length){

        gsap.set(heroLetters,{
            yPercent:110
        });

    }


    /* =====================================================
       MANIFEST
    ===================================================== */

    const manifestLetters=
        document.querySelectorAll(".manifest-letter");

    if(manifestLetters.length){

        gsap.set(manifestLetters,{
            y:35,
            opacity:0,
            filter:"blur(2px)"
        });

    }


    /* =====================================================
       SLOGAN
    ===================================================== */

    const sloganWords=
        document.querySelectorAll(".slogan-line .word");

    if(sloganWords.length){

        gsap.set(sloganWords,{
            y:70,
            opacity:0
        });

    }


    /* =====================================================
       SYMBOLS
    ===================================================== */

    const symbols=
        document.querySelectorAll(".symbol img");

    if(symbols.length){

        gsap.set(symbols,{
            scale:.82,
            opacity:0,
            filter:"blur(8px)",
            y:30
        });

    }


    /* =====================================================
       ALL REVEAL WORDS
    ===================================================== */

    const descriptionWords=
        document.querySelectorAll(".description-word");

    if(descriptionWords.length){

        gsap.set(descriptionWords,{
            y:45,
            opacity:0,
            filter:"blur(2px)"
        });

    }


    /* =====================================================
       CONTACT LOGO
    ===================================================== */

    const contactLogo=
        document.querySelector(".contact-end-logo");

    if(contactLogo){

        gsap.set(contactLogo,{
            y:0,
            opacity:1
        });

    }


    if(typeof ScrollTrigger!=="undefined"){
        ScrollTrigger.refresh();
    }


    initHero();
    initManifest();
    initSlogan();
    initSymbols();
    initCards();
    initTextReveals();
    initMobileContact();


    requestAnimationFrame(()=>{

        window.dispatchEvent(
            new Event("scroll")
        );

    });

}


/* =========================================================
START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        if(
            typeof gsap!=="undefined" &&
            typeof ScrollTrigger!=="undefined"
        ){

            gsap.registerPlugin(ScrollTrigger);

        }

        initHero();
        initManifest();
        initSlogan();
        initSymbols();
        initCards();
        initTextReveals();
        initGallery();
        initMobileContact();
        initFixedLogo();

    }
);
