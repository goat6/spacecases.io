function goBack() {
    window.history.back();
  }
  
function setUpEvents() {
    let content = document.querySelector(".dropdown");
    let button = document.querySelector(".button-wrapper");
    let svg = document.querySelector(".svg");
    let titleScreen = document.querySelector(".title-screen");

    if (titleScreen !== null) {
        titleScreen.addEventListener("click", function () {
            content.classList.remove("active");
        })
    }
    if (button !== null) {
    button.addEventListener("click", function () {
        content.classList.toggle("active");
        svg.classList.toggle("active");
    })
    }
}

function cookieMenu() { 
    let cookieMenu = document.querySelector(".cookie-menu")
    let cookieReject = document.querySelector(".cookie-reject")
    let cookieAccept = document.querySelector(".cookie-accept")
    let cookieCustomise = document.querySelector(".cookie-customise")
    let cookieToggle = document.querySelector(".cookie-toggle")
    let cookieCustomWrapper = document.querySelector(".cookie-custom-wrapper")
    let cookieSave = document.querySelector(".cookie-save-button")

    if (cookieMenu != null) {
        cookieReject.addEventListener("click", function () { 
            cookieMenu.style.transitionProperty = "none";
            cookieCustomWrapper.style.transitionProperty = "none";
            cookieMenu.style.visibility = "hidden";
            cookieMenu.classList.remove("active");
            cookieCustomWrapper.classList.remove("active");
        })
        cookieAccept.addEventListener("click", function () {
            cookieMenu.style.transitionProperty = "none";
            cookieCustomWrapper.style.transitionProperty = "none";
            cookieMenu.style.visibility = "hidden";
            cookieMenu.classList.remove("active");
            cookieCustomWrapper.classList.remove("active");
        })
        cookieCustomise.addEventListener("click", function () { 
            if (cookieMenu.classList.contains("active")) {
                cookieMenu.style.transitionProperty = "none";
                cookieCustomWrapper.style.transitionProperty = "none";

            } else { 
                cookieMenu.style.transition = "0.3s ease-out";
                cookieCustomWrapper.style.transition = "0.3s ease-out";
            }
            cookieMenu.classList.toggle("active");
            cookieCustomWrapper.classList.toggle("active")
        })
        cookieToggle.addEventListener("click", function () { 
            cookieMenu.classList.add("active");
            cookieMenu.style.transition = "0.3s ease-out";
            cookieCustomWrapper.style.transition = "0.3s ease-out";
            cookieMenu.style.visibility = "visible";
            cookieCustomWrapper.classList.toggle("active");
        })
        cookieSave.addEventListener("click", function () { 
                        cookieMenu.style.transitionProperty = "none";
            cookieCustomWrapper.style.transitionProperty = "none";
            cookieMenu.style.visibility = "hidden";
            cookieMenu.classList.remove("active");
            cookieCustomWrapper.classList.remove("active");
        })
    }
    
}

function scrollReveal() { 
    let reveals = document.querySelectorAll(".reveal")
    for (var i = 0; i < reveals.length; i++) {
        let windowHeight = window.innerHeight
        let revealTop = reveals[i].getBoundingClientRect().top;
        let revealPoint = 100

        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add("active")
        };
    }
}

function buttonHover() {
    function moveBackground() {
        bgs.forEach(background => background.classList.add("active"))
    }
    function resetBackground() {
        bgs.forEach(background => background.classList.remove("active"))
    }
    let buttons = document.querySelectorAll('.section-invite');
    let bgs = document.querySelectorAll(".first-section-bg-pattern");
    buttons.forEach(button => {
        button.addEventListener("mouseover", moveBackground)
        button.addEventListener("mouseleave", resetBackground)
    });
}


function leaderboardCycle() { 
    let arrows = document.querySelectorAll(".lb_svg")
    let count = 1
    let text = document.getElementById("lbtext")
    let globalLB = document.querySelector(".global")
    let serverLB = document.querySelector(".server")

    for (var i = 0; i < arrows.length; i++) {
        arrows[i].addEventListener("click", function () {
            if (count == 1) {
                count = 2
                serverLB.style.visibility = "visible";
                globalLB.style.visibility = "hidden";
                text.innerHTML = "Server Leaderboard";
            } else {
                count = 1;
                text.innerHTML = "Global Leaderboard";
                serverLB.style.visibility = "hidden";
                globalLB.style.visibility = "visible";
            }
        })
    }
    
}
function emailRequest() {
    function addEmail() { 
        let firstName = document.querySelector(".first-name").value;
        let surname = document.querySelector(".surname").value;
        let email = document.querySelector(".email").value;
        return;
    }
    let submitButton = document.querySelector(".website-button");
    submitButton.addEventListener("click", addEmail);
}
function textResize() {
    const isEllipsis = (e) => { return (e.offsetWidth < e.scrollWidth); }
    let username = document.querySelector(".usernameText");
    let parentDiv = document.querySelector(".username");
    if (username !== null && parentDiv !== null) { 
        let i = 0.2
        for (; i < 1.8; i += 0.1) { 
            username.style.fontSize = `${i}vw`
            if (isEllipsis(parentDiv)) {
                break
            }
        };
        username.style.fontSize = `${i-0.1}vw`
    }

}
function inventorySort() {
    items = document.querySelectorAll(".inventoryItem");
    if (items[0] !== undefined) {
        profileDiv = document.querySelector(".profile-inv")
        profileGrid = document.querySelector(".profile-grid")
        profileDiv.innerHTML = null
        profileDiv.remove()
        newDiv = null
        let counter = 0
        for (let i = 0; i < items.length; i++) {
            if ((i) % 9 === 0 || i === 0) {
                counter = 0
                if (newDiv) profileGrid.append(newDiv)
                newDiv = document.createElement("div");
                newDiv.classList.add("profile-inv")
            }
            newDiv.append(items[i])
            counter += 1
        }
        for (let j = 0; j < 9-counter; j++) {
            placeHolderSpan = document.createElement("span");
            placeHolderSpan.classList.add("inventoryItem");
            placeHolderSpan.classList.add("noselect");
            placeHolderImg = document.createElement("img");
            placeHolderImg.src = "http://via.placeholder.com/640x360";
            placeHolderImg.style.opacity = 0;
            placeHolderSpan.append(placeHolderImg);
            newDiv.append(placeHolderSpan);
        }
        profileGrid.append(newDiv)
    };
}
function switchInventoryPage() { 
    items = document.querySelectorAll(".inventoryItem");
    if (items[0] != undefined) {
        pages = document.querySelectorAll(".profile-inv");
        leftButton = document.querySelector(".invButton1");
        rightButton = document.querySelector(".invButton2");
        visualIndicator = document.querySelector(".page-count")
        function switchPages(side) {
            if (side === "left") {
                if (counter === 1) counter = pages.length
                else { counter -= 1 }
            } else if (side === "right") {
                if (counter === pages.length) { counter = 1 }
                else { counter += 1 }
            }
            visualIndicator.innerHTML = counter;
            pages.forEach(element => element.style.visibility = "hidden");
            pages[counter - 1].style.visibility = "visible";
        }
        pages.forEach(element => element.style.visibility = "hidden");
        pages[0].style.visibility = "visible";
        if (pages[0] !== undefined) {
            counter = 1;
            leftButton.addEventListener("click", () => { switchPages("left") });
            rightButton.addEventListener("click", () => { switchPages("right") });
        }
    }
}

function trimFloats() { 
    floats = document.querySelectorAll(".item-float");
    floats.forEach(float => { 
        float.innerHTML = ((float.innerHTML * 1).toFixed(3))
    })
}

window.onload = function () {
    inventorySort();
    buttonHover();
    setUpEvents();
    leaderboardCycle();
    cookieMenu();
    textResize();
    window.addEventListener("scroll", scrollReveal);
    switchInventoryPage();
    trimFloats();
}