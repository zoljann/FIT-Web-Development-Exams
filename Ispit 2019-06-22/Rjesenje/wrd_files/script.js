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
            regex:/^[a-zA-Z]+$/
        },
        dostavaAdresa:{
            required:true,
            regex:/^[a-zA-Z]+$/
        },
        dostavaPostanskiBroj:{
            required:true,
            regex:/^[0-9]{5}$/
        },
        dostavaTelefon:{
            required:true,
            regex:/^\+[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{4}$/
        }
    },
    messages:{
        dostavaIme:{
            required:"Ovo polje je obavezno!",
            regex: "Samo tekstualni podaci!"
        },
        dostavaAdresa:{
            required:"Ovo polje je obavezno!",
            regex: "Samo tekstualni podaci!"
        },
        dostavaPostanskiBroj:{
            required:"Ovo polje je obavezno!",
            regex: "Numericki - 5 cifara"
        },
        dostavaTelefon:{
            required:"Ovo polje je obavezno!",
            regex: "Format: +111-11-111-1111"
        }
    }
})

function popuniPodatke(podaci){
    for(let i=0;i<podaci.length;i++){
        let red=document.createElement("tr");
        document.getElementById("tabelaID").appendChild(red);

        let IDproizvoda=document.createElement("td");
        red.appendChild(IDproizvoda);
        IDproizvoda.innerHTML=podaci[i].narudzbaId;

        let datum=document.createElement("td");
        red.appendChild(datum);
        datum.innerHTML=podaci[i].datumNarudzbe;

        let ime=document.createElement("td");
        red.appendChild(ime);
        ime.innerHTML=podaci[i].dostavaIme;

        let adresa=document.createElement("td");
        red.appendChild(adresa);
        adresa.innerHTML=podaci[i].dostavaAdresa;

        let postanski=document.createElement("td");
        red.appendChild(postanski);
        postanski.innerHTML=podaci[i].dostavaPostanskiBroj;

        let telefon=document.createElement("td");
        red.appendChild(telefon);
        telefon.innerHTML=podaci[i].dostavaTelefon;

        let Napomena=document.createElement("td");
        red.appendChild(Napomena);
        Napomena.innerHTML=podaci[i].napomena;
    }

}


  function podaci() {
        fetch("http://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/GetAll")
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

podaci();
 


$("#dodaj").on("click",function(){

    var uploaduj={
        dostavaIme:$("dostavaIme").val(),
        dostavaAdresa:$("dostavaAdresa").val(),
        dostavaPostanskiBroj:$("dostavaPostanskiBroj").val(),
        dostavaTelefon:$("dostavaTelefon").val(),
        napomena:$("napomena").val()
    }
    fetch("http://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/Dodaj", {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(uploaduj), 
    })
        .then((r) => {
            if (r.status != 200) {
                alert("Server javlja gresku: " + r.status);
                return;
            }
      
            r.json().then(x => {
                console.log("Uspjesno",x);
                popuniPodatke(x); 
                $("#forma")[0].reset(); 
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });

});

$("#IzbornikDugme").on("click", function(){
    $("#Izbornik").toggle();
});


var elementi= document.getElementsByClassName('VilaKolonaOkvir');
for(var i=0; i<elementi.length; i++) {
    elementi[i].onmouseover = hoveruj;
    elementi[i].onmouseout  = iskljuciHover;
}
function hoveruj() {
   this.style.border = '3px solid yellow';
}
function iskljuciHover() {
    this.style.border = 'none';
}
