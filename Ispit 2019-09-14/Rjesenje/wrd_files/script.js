$.validator.addMethod(
    "regex",
    function(value, element, regexp) {
        var check = false;
        return this.optional(element) || regexp.test(value);
    },
    "Provjeri unos!"
);
$("#forma").validate({
    rules:{
        dostavaIme:{
            required:true,
            regex:/^[A-Z][a-zA-Z]+[ A-Z][a-zA-Z]+$/
        },
        dostavaAdresa:{
        required:true,
        regex:/^[a-zA-Z]+$/
    },
    dostavaTelefon:{
        required:true,
        regex:/^\+[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{4}$/
    },
},
messages: {
    dostavaIme:  {
        required: "Obavezno popuniti",
        regex: "Dvije rijeci, prva velika slova u svakoj rijeci"
    },
    dostavaAdresa:  {
        required: "Obavezno popuniti",
        regex: "Samo tekstualni podaci"
    },
    dostavaTelefon:  {
        required: "Obavezno popuniti",
        regex: "Format: +111-11-111-1111"
    },
}
})
function popuniPodatke(podaci){
    for(let i=0;i<podaci.length;i++){
        let red=document.createElement("tr");
        document.getElementById("proizvodi").appendChild(red);
        
        let IDproizvoda=document.createElement("td");
        red.appendChild(IDproizvoda);
        IDproizvoda.innerHTML=podaci[i].proizvodID;

        let brojLajkova=document.createElement("td");
        red.appendChild(brojLajkova);
        brojLajkova.innerHTML=podaci[i].likeCounter;

        let Naziv=document.createElement("td");
        red.appendChild(Naziv);
        Naziv.innerHTML=podaci[i].naziv;

        let slika=document.createElement("td");
        red.appendChild(slika);
        slika.innerHTML='<img src=  "'+podaci[i].slikaUrl+'"height=50px; width:50px;>';

        let cijena=document.createElement("td");
        red.appendChild(cijena);
        cijena.innerHTML=podaci[i].cijenaPoKvadratu;

        let buttonLike=document.createElement("td");
        red.appendChild(buttonLike);
        buttonLike.innerHTML='<button id="like">Like</button>';

        let buttonOdaberi=document.createElement("td");
        red.appendChild(buttonOdaberi);
        buttonOdaberi.innerHTML='<button id="odaberi">Odaberi</button>'
    }
}
function podaci() {
    fetch("http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/GetProizvodiAll")
        .then((r) => {
            if (r.status != 200) {

                return;
            }

            r.json().then((x) => {
                popuniPodatke(x);
            });

        })
        .catch((error) => {

        });
}


function popuniNarudzbe(podaci){
    for(let i=0;i<podaci.length;i++){
        let red=document.createElement("tr");
        document.getElementById("narudzbe").appendChild(red);
        
        let IDproizvoda=document.createElement("td");
        red.appendChild(IDproizvoda);
        IDproizvoda.innerHTML=podaci[i].proizvodID;

        let Naziv=document.createElement("td");
        red.appendChild(Naziv);
        Naziv.innerHTML=podaci[i].naziv;


        let cijena=document.createElement("td");
        red.appendChild(cijena);
        cijena.innerHTML=podaci[i].cijena;

        let kolicina=document.createElement("td");
        red.appendChild(kolicina);
        kolicina.innerHTML=podaci[i].kolicina;

        let iznos=document.createElement("td");
        red.appendChild(iznos);
        iznos.innerHTML=podaci[i].iznos;

        let ime=document.createElement("td");
        red.appendChild(ime);
        ime.innerHTML=podaci[i].dostavaIme;

        let adresa=document.createElement("td");
        red.appendChild(adresa);
        adresa.innerHTML=podaci[i].dostavaAdresa;

        let datum=document.createElement("td");
        red.appendChild(datum);
        datum.innerHTML=podaci[i].datumNarudzbe;

        let telefon=document.createElement("td");
        red.appendChild(telefon);
        telefon.innerHTML=podaci[i].dostavaTelefon;
    }
}
function narudzbe() {
    fetch("http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/GetNarudzbeAll")
        .then((r) => {
            if (r.status != 200) {

                return;
            }

            r.json().then((x) => {
                popuniNarudzbe(x);
            });

        })
        .catch((error) => {

        });
}


$("#naruci").on("click", function() {
   
    if($("#forma").valid()) {
        //ako je validacija bila ispravna popunjavamo request
      var uploaduj = {
        dostavaGrad: $("#dostavaGrad").val(),
        dostavaAdresa: $("#dostavaAdresa").val(),
        dostavaIme: $("#dostavaIme").val(),
        dostavaTelefon: $("#dostavaTelefon").val(),
        proizvodId: $("#idProizvoda").val(),
        opcijaModel: $("#opcija").val(), 
      }
    }
fetch("http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/Dodaj", { //fetchujemo preko linka za dodavanje narudzbe
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(uploaduj), //stringify sluzi da prebacimo iz objekta njegov JSON format, jer samo JSONov format prima podatke
        })
            .then((r) => {
                if (r.status != 200) {
                    alert("Server javlja gresku: " + r.status);
                    return;
                }
                //ako je sve proslo ok pozivamo funkciju da popuni narudzbe i osvjezavamo formu
                r.json().then(x => {
                    console.log("Uspjesno",x);
                    popuniNarudzbe(x); 
                    $("#forma")[0].reset(); 
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });

});

podaci(); //na prvom ucitavanju stranice ucitajemo podatke i narudzbe
narudzbe();

//ukoliko treba padajuci meni da se otvara i zatvara na klik, nije potrebno u zadatku ali najlaksi nacin da se odradi
/*$("#IzbornikDugme").on("click", function() {
    $("#Izbornik").toggle();
 });
*/