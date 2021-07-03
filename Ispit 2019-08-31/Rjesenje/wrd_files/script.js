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
        document.getElementById("proizvodiTabela").appendChild(red);

        let IDproizvoda=document.createElement("td");
        red.appendChild(IDproizvoda);
        IDproizvoda.innerHTML=podaci[i].proizvodID;

        let Naziv=document.createElement("td");
        red.append(Naziv);
        Naziv.innerHTML=podaci[i].naziv;

        let Cijena=document.createElement("td");
        red.appendChild(Cijena);
        Cijena.innerHTML=podaci[i].cijena;

        let jedinicaMjere=document.createElement("td");
        red.appendChild(jedinicaMjere);
        jedinicaMjere.innerHTML=podaci[i].jedinicaMjere;

        let lajkova=document.createElement("td");
        red.appendChild(lajkova);
        lajkova.innerHTML=podaci[i].likeCounter;

        let dugmeLajk=document.createElement("td");
        red.appendChild(dugmeLajk);
        dugmeLajk.innerHTML='<button onclick="Lajkuj('+podaci[i].proizvodID+')">Like</button>'

        let odaberiDugme=document.createElement("td");
        red.appendChild(odaberiDugme);
        odaberiDugme.innerHTML='<button>Odaberi</button>'
    }
}

  function podaci() {
        fetch("https://onlineshop.wrd.app.fit.ba/api/ispit20190829/Narudzba/GetProizvodiAll")
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
        dostavaIme:$("#dostavaIme").val(),
        dostavaAdresa:$("#dostavaAdresa").val(),
        dostavaGrad:$("#dostavaGrad").val(),
        dostavaTelefon:$("#dostavaTelefon").val(),
        proizvodId:$("#proizvodId").val(),
        kolicina:$("#kolicina").val()
    }
    fetch("http://onlineshop.wrd.app.fit.ba/api/ispit20190829/Narudzba/Dodaj", {
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
                popuniPodatke(x);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    

});

function Lajkuj(id){
    var url = "https://onlineshop.wrd.app.fit.ba/api/ispit20190829/Narudzba/Like?proizvodId="+id;

    fetch(url)
        .then((r) => {
            if (r.status != 200) {
                alert("Server javlja grešku: "+r.status);
                return;
            }

            r.json().then((x) => {
                ++x.likeCounter;
            });

        })
        .catch((error) => {
            console.log("Greska: "+error);
        });
}