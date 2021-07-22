$.validator.addMethod(
    "regex",
    function (value, element, regexp) {
        var check = false;
        return this.optional(element) || regexp.test(value);
    },
    "Provjeri unos!<br>"
);
$("#forma").validate({
    rules: {
        naslov: {
            required: true,
            regex: /^[A-Z][a-zA-Z]+\s[a-zA-Z]+$/
        },
        telefon: {
            required: true,
            regex: /^\+[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{4}$/
        }
    },
    messages: {
        naslov: {
            required: "Obavezno polje!",
            regex: "Minimalno dvije riječi. Prva riječ počinje velikim slovom.",
        },
        telefon: {
            required: "Obavezno polje!",
            regex: "Format +111-11-111-1111",
        },
        poruka: {
            required: "Obavezno polje!",
        }
    }
})
getPodatke = (postavi) => {
    fetch("https://restapiexample.wrd.app.fit.ba/Ispit20210702/Get4Studenta")
        .then((r) => {
            if (r.status != 200) {
                alert("Doslo je do greske ");
            }

            r.json().then((x) => {
                postavi(x);
            });

        })
        .catch((error) => {
            alert(error);
        });
}
kreirajRadnika = (obj) => {
    return `<img src="${obj.slikaPutanja}"/>
    <div id="tekstRadnika">
        <h3>${obj.imePrezime}</h3>
        <p>${obj.opis}</p>
        <button>Piši poruku</button>
    </div>`;
}
postaviRadnika = (obj) => {
    var dohvatiRadnika = document.querySelectorAll("[id^=radnik]")
    for (let i = 0; i < obj.length; i++) {
        dohvatiRadnika[i].innerHTML = kreirajRadnika(obj[i]);
    }
}
getPodatke(postaviRadnika);


posaljiPoruku = (podaci) => {
    fetch("https://restapiexample.wrd.app.fit.ba/Ispit20210702/Add", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(podaci),
    })
        .then((r) => {
            if (r.status != 200) {
                alert("Server javlja gresku: " + r.status);
                return;
            }

            r.json().then(x => {
                alert("Doslo je do greske " + error);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

posalji = () => {
    let poruka = {
        imePrezime: document.getElementById("primaoc").value(),
        naslov: document.getElementById("naslov").value,
        telefon: document.getElementById("telefon").value,
        poruka: document.getElementById("poruka").value,
    };
    posaljiPoruku(poruka);
};


$("#IzbornikDugme").on("click", function () { //padajuci meni za telefon
    $("#Izbornik").toggle();
})
