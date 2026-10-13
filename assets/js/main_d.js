let inventar = [
    {
        id: 1,
        name: "Eisenschwert",
        typ: "waffe",
        wert: 150,
        gewicht: 4,
        seltenheit: "gewöhnlich"
    },
    {
        id: 2,
        name: "Heiltrank",
        typ: "trank",
        wert: 50,
        gewicht: 1,
        seltenheit: "gewöhnlich"
    },
    {
        id: 3,
        name: "Drachenschild",
        typ: "rüstung",
        wert: 900,
        gewicht: 8,
        seltenheit: "episch"
    },
    {
        id: 4,
        name: "Magischer Ring",
        typ: "schmuck",
        wert: 1200,
        gewicht: 0.2,
        seltenheit: "legendär"
    }
];

const invContainer = document.getElementById("inventar-container");

kartenFilter(inventar)

// ########## Gold ##########
let goldBestand = 0 // weiter in --> function kartenFilter(liste)

function kartenFilter(liste) {
    invContainer.textContent = "";

    liste.forEach((gegenstand) => {
        // Ein neues, leeres div-Element im Speicher erstellen
        let karte = document.createElement("div");
        karte.className = "inventar-karte";

        // Ein Überschriften-Element für den Namen erstellen
        let nameUeberschrift = document.createElement("h3");
        nameUeberschrift.textContent = gegenstand.name;
        karte.append(nameUeberschrift);

        //Typ
        let typInfo = document.createElement("p");
        typInfo.textContent = "Typ: " + gegenstand.typ;
        karte.append(typInfo);

        //Wert
        let wertInfo = document.createElement("p");
        wertInfo.textContent = "Wert: " + gegenstand.wert;
        karte.append(wertInfo);

        //Gewicht
        let gewichtInfo = document.createElement("p");
        gewichtInfo.textContent = "Gewicht: " + gegenstand.gewicht;
        karte.append(gewichtInfo);

        //Seltenheit
        let seltenheitInfo = document.createElement("p");
        seltenheitInfo.textContent = "Seltenheit: " + gegenstand.seltenheit;
        karte.append(seltenheitInfo);

        //Verkaufsbutton
        let verkaufbtn = document.createElement("button")
        verkaufbtn.textContent = "verkaufen"
        verkaufbtn.className = "btn-verkauf"

        verkaufbtn.addEventListener("click", () => {
            alert(`Du hast das Element ${gegenstand.name} verkauft!`);
            goldBestand += gegenstand.wert;
            
            document.getElementById("gold").textContent = "Mein Gold: " + goldBestand + " Goldstücke";

            // Element aus dem Array filtern
            inventar = inventar.filter((item) => item.id !== gegenstand.id);
            
            // Karten im HTML neu zeichnen
            kartenFilter(inventar);
        })
        karte.append(verkaufbtn);

        //Heiltrank
        if(gegenstand.typ==="trank"){
            let trinkbtn = document.createElement("button")
            trinkbtn.textContent = "trinken"
            trinkbtn.className = "drink"
            karte.append(trinkbtn)

            trinkbtn.addEventListener("click",() => {
                inventar = inventar.filter((item) => item.id !== gegenstand.id);
                kartenFilter(inventar);
            })
        }

        invContainer.append(karte);
    });
}

// ########## FILTER FUNCTIONS ##########


function filterInventar(gesuchterTyp) {
    if (gesuchterTyp === "all") {
        kartenFilter(inventar);
    } else {
        const gefilterteListe = inventar.filter((gegenstand) => gegenstand.typ === gesuchterTyp);
        kartenFilter(gefilterteListe);
    }
}

// ########## Sortieren ##########

function sortiereInventar(sortierWert) {
    // Wegen Referenzproblem
    let kopie = [...inventar];

    
    if (sortierWert === 'wert') {
        kopie.sort((a, b) => a.wert - b.wert);       // Günstigste zuerst
    } 
    else if (sortierWert === 'gewicht') {
        kopie.sort((a, b) => a.gewicht - b.gewicht); // Leichteste zuerst
    }

    // Karten neu zeichnen
    kartenFilter(kopie);
}

// ########## reduce() ##########

const vermoegen = inventar.reduce((summe, gegenstand) => {
    return summe + gegenstand.wert
}, 0)

console.log(vermoegen);

document.getElementById("wert").textContent = "Sachvermögen: " + vermoegen + " €";

// ########## Gewicht ##########

const trageGewicht = inventar.reduce((summe, gegenstand) => {
    return summe + gegenstand.gewicht
},0)

console.log(trageGewicht);

document.getElementById("gewicht").textContent = "Aktuelles Gewicht: " + trageGewicht + " Gewichtseinheiten"

const alertBox = document.getElementById("alert");

if (trageGewicht > 20) {
    alertBox.textContent = "⚡ ACHTUNG, ZU SCHWER! ⚡";
} else {
    alertBox.textContent = "⚡ Maximal 20 Gewichtseinheiten ⚡"; // Löscht die Warnung
}

