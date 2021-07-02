$.validator.addMethod(
    "regex",
    function(value, element, regexp) {
        var check = false;
        return this.optional(element) || regexp.test(value);
    },
    "Provjeri unos!<br>"
);
$(".zaFormu").validate({
    rules:{
        Ime:{
            required:true,
            regex: /^[A-Z][a-zA-Z ]+[A-Z][a-zA-Z]+$/
        },
        BrojIndeksa:{
            required:true,
            regex: /^[0-9]{6}$/
        },
        Telefon:{
            required:true,
            regex:/^\+[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{4}$/
        }
    }
})

var sviProizvodi;
function popuniPodatke(podaci){
for(let i=0;i<podaci.length;i++){
    let red=document.createElement("tr");
    document.getElementById("tabelaProizvodi").appendChild(red);

    let IDproizvoda=document.createElement("td");
    red.appendChild(IDproizvoda);
    IDproizvoda.innerHTML=podaci[i].proizvodID;

    let Naziv=document.createElement("td");
    red.appendChild(Naziv);
    Naziv.innerHTML=podaci[i].naziv;

    let cijena=document.createElement("td");
    red.appendChild(cijena);
    cijena.innerHTML=podaci[i].cijenaPoKvadratu;

    let slika=document.createElement("td");
    red.appendChild(slika);
    slika.innerHTML='<img src="'+podaci[i].slikaUrl+'">';

    let brojLajkova=document.createElement("td");
    red.appendChild(brojLajkova);
    brojLajkova.innerHTML=podaci[i].likeCounter;
}
}

function podaci() {
    fetch("http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/GetProizvodiAll")
        .then((r) => {
            if (r.status != 200) {

                return;
            }

            r.json().then((x) => {
                console.log(x);
                popuniPodatke(x);
                sviProizvodi=x;
            });

        })
        .catch((error) => {

        });
}

$("#prijava").on("click",function(){

    var uploaduj={
        Ime:$("#dostavaIme").val(),
        Adresa:$("#dostavaAdresa").val(),
        Grad:$("#dostavaGrad").val(),
        Telefon:$("#dostavaTelefon").val(),
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


function najviseLajkova(){
    var najveci=100000;
    let naziv;
   for(let i=0;i<sviProizvodi.length ;i++){
       if(najveci<sviProizvodi[i].likeCounter) {
            najveci=sviProizvodi[i].likeCounter;
         naziv=sviProizvodi[i].naziv;
    }
   }
   alert("Naziv: "+naziv+ " broj lajkova: "+najveci);
}
function BudgetProizvod(){
    let najeftiniji=1000000;
    let naziv;
    for(let i=0;i<sviProizvodi.length;i++){
        if(najeftiniji>sviProizvodi[i].cijenaPoKvadratu){
        najeftiniji=sviProizvodi[i].cijenaPoKvadratu;
        naziv=sviProizvodi[i].naziv;
        }
    }
    alert("Cijena najeftinijeg "+najeftiniji+", a naziv: "+naziv);
}