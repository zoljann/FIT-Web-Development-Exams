$.validator.addMethod(
    "regex",
    function(value, element, regexp) {
        var check = false;
        return this.optional(element) || regexp.test(value);
    },
    "Provjeri unos!<br>"
);
$("#forma").validate({
    rules:{
        naslov:{
            required:true,
            regex: /^[A-Z][a-zA-Z]+\s[a-zA-Z]+$/
        },
        telefon:{
            required:true,
            regex:/^\+[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{4}$/
        }
    },
    messages:{
        naslov:{
            required:"Obavezno polje!",
            regex:"Minimalno dvije riječi. Prva riječ počinje velikim slovom.",
        }, 
        telefon:{
            required:"Obavezno polje!",
            regex:"Format +111-11-111-1111",
        },
        poruka:{
            required:"Obavezno polje!",
        }
    }
})

const getPodatke = (callback, url) => {
    var zahtjev = new XMLHttpRequest();

    zahtjev.onload = () => {
        if (zahtjev.status === 200) {
            callback(JSON.parse(zahtjev.responseText));
        } else {
            alert("Server javlja grešku: " + zahtjev.statusText);
        }
    };

    zahtjev.onerror = () => {
        alert("Greška u komunikaciji sa serverom.");
    };

    zahtjev.open("GET", url, true);
    zahtjev.send(null);
};

let urlGet4Radnika =
    "https://restapiexample.wrd.app.fit.ba/Ispit20210702/Get4Studenta";

const kreirajRadnika = (obj) => {
    return `<img src="${obj.slikaPutanja}"/>
        <h3>${obj.imePrezime}</h3>
        <p>${obj.opis}</p>`;
};

const postaviRadnike = (obj) => {
    var containers = document.querySelectorAll("[id^=radnik]");

    for (var i = 0; i < obj.length; i++) {
        containers[i].innerHTML = kreirajRadnika(obj[i]);
    }
};

getPodatke(postaviRadnike, urlGet4Radnika);
$("#IzbornikDugme").on("click", function(){
    $("#Izbornik").toggle();
})
