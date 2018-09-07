/*** Cookie scripts ****/

firedYes = "no";

//Set GDPR Cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//Get GDPR Cookie
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/*** Google Analytics Script - There is you will need to insert the UA-XXXXXXXXX-X number for this to work. ***/
function gaCall() {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());

    gtag('config', '[INSERT UA NUMBER]');
}

// Sets the GDPR cookie to yes and calls Google Analytics    
function setYesGDPR() {
    var divGDPR = document.getElementById("footerGDPR");
    divGDPR.style.visibility = "hidden";
    setCookie("consentGDPR", "yes", 1200);
    gaCall();
    firedYes = "yes";
    return firedYes;
}

// Sets the GDPR cookie to no.
function setNoGDPR() {
    var divGDPR = document.getElementById("footerGDPR");
    divGDPR.style.visibility = "hidden";
    setCookie("consentGDPR", "no", 1200);
}

// Fires consent if the person starts scrolling through the page.
function scrollDetectGDPRFunction() {
    if (firedYes == "no") {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            var elGDPR = document.getElementById("footerGDPR");
            if (elGDPR.style.visibility === 'visible') {
                setYesGDPR();
            }
        }
    }
}

//Show GDPR consent bar & set listeners for button clicks or scrolls.
function showGDPR() {
    var divGDPR = document.getElementById("footerGDPR");
    divGDPR.style.visibility = "visible";
    //listener events for GDPR buttons or scroll
    document.getElementById("yesGDPR").addEventListener("click", setYesGDPR);
    document.getElementById("noGDPR").addEventListener("click", setNoGDPR);
    document.addEventListener("scroll", scrollDetectGDPRFunction);
}

//Check GDPR cookie and run Google Analytics if consent is yes and show the consent bar if it's not set.
function gdprCheck() {
    var consentGDPR = getCookie("consentGDPR");
    if (consentGDPR == "yes") {
        gaCall();
    } else {
        if (consentGDPR == "no") {
            console.log("GDPR consent set to no.");
        } else {
            showGDPR();
        }
    }
}
}

//This script checks for country location and displays GDPR if not U.S.
function countryCheck() {
    $.getJSON('https://ipinfo.io/json', function (data) {
        countryAbbr = data.country;
        if (countryAbbr != "US") {
            gdprCheck();
        }
    });
}

window.onload = function () { countryCheck(); }; //If you want to skip the country check, start with gdprCheck();