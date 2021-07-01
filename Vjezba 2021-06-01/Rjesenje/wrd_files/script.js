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
        slika.innerHTML='<img src=  "'+podaci[i].slikaUrl+'"height=50px; width:50px;>';

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
                popuniPodatke(x);
                sviProizvodi=x;
            });

        })
        .catch((error) => {

        });
}

function najskuplji(){
    var najveci=0;
    let naziv;
   for(let i=0;i<sviProizvodi.length ;i++){
       if(najveci<sviProizvodi[i].cijenaPoKvadratu) {
            najveci=sviProizvodi[i].cijenaPoKvadratu;
         naziv=sviProizvodi[i].naziv;
    }
   }
   alert("Naziv: "+naziv+ ", cijena: "+najveci);
}

function srednjaCijena(){
    var prosjek=0;
    for(var i=0;i<sviProizvodi.length;i++)
    {
        prosjek+=sviProizvodi[i].cijenaPoKvadratu;
    }
    if(sviProizvodi.length>0)
    {
        prosjek=prosjek/sviProizvodi.length;
    }
    alert("Prosjecna cijena svih proizvoda iznosi : " + prosjek+ " KM");
}