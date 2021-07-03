var forma = $("#forma");

ff
$.validator.addMethod(
    "regex",
    function(value, element, regexp) {
        var check = false;
        return this.optional(element) || regexp.test(value);
    },
    "Unos nije validan!"
);


forma.validate({
    rules: {
        dostavaIme: {
            required: true,
            regex: /^[A-Z]{1}[A-Za-z]+ [A-Z]{1}[A-Za-z]+$/
        },
        dostavaAdresa: {
            required:true,
        },
        dostavaGrad: {
            required:true,
        },
        proizvodID: {
            regex: /^\d+$/,
            required:true,
        },
        kolicina: {
            regex: /^\d+$/,
            required:true,
        },
        dostavaTelefon: {
            required:true,
            regex: /^\+[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{4}$/
        }
    },
    messages: {
        dostavaIme:{
            required: "Morate unijeti ime kupca!"
        },
        dostavaAdresa: {
            required: "Morate unijeti adresu!"
        },
        dostavaGrad: {
            required: "Morate unijeti grad!"
        },
        proizvodID: {
            regex: "Samo brojevi",
            required: "Morate odabrati proizvod!"
        },
        kolicina: {
            regex: "Samo brojevi",
            required: "Morate odabrati proizvod!"
        },

        dostavaTelefon: {
            required: "Morate unijeti broj telefona!",
            regex: "Telefon mora biti unijet u formatu: +387-11-123-1234"
        }
    }
});

$("#dodaj").on('click', function() {

    event.preventDefault();

    if(forma.valid()) {

        var podaci = {
            dostavaGrad: $('#dostavaGrad').val(), 
            dostavaAdresa: $('#dostavaAdresa').val(), 
            dostavaIme: $('#dostavaIme').val(), 
            dostavaTelefon: $('#dostavaTelefon').val(), 
            proizvodId: $('#proizvodID').val(), 
            kolicina: $('#kolicina').val()
        }

        $.ajax({
            url: 'http://onlineshop.wrd.app.fit.ba/api/ispit20190829/Narudzba/Dodaj',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(podaci),
            success: function(rez) {
                if(rez.poruka){
                    ucitajNarudzbe();
                    $("#forma")[0].reset();
                }
            }
        });
    }

});


$("#filtiranje").on('keyup', function() {
    var trazi = $("#filtiranje").val();
    var elementi = $("#narudzbe .ime");

    $("#narudzbe tbody tr").hide();
  
    $.each(elementi, function(index, value) {
        var ime = $(value).text();

        ime = ime.toLowerCase();
        trazi = trazi.toLowerCase();
  
        if(ime.search(trazi)>= 0) {
            value.parentElement.style.display ='table-row';
        }

    });

});


$("#IzbornikDugme").on('click', function() {
    $("#Izbornik").toggleClass('vidljivo');
});

// Prvo ucitavanje stranice ucitavamo nove podatke, popunjavamo tabele
ucitajProzivode();
ucitajNarudzbe();