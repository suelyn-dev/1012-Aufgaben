//Array anlegen

const systeme = [
    {
        name: "Sauerstoffversorgung",
        status: "kritisch",
        energieverbrauch: 80,
        reparaturkosten: 1200
    },
    {
        name: "Kantine",
        status: "normal",
        energieverbrauch: 30,
        reparaturkosten: 100
    },
    {
        name: "Antrieb",
        status: "kritisch",
        energieverbrauch: 95,
        reparaturkosten: 5000
    },
    {
        name: "Kommunikation",
        status: "gestört",
        energieverbrauch: 40,
        reparaturkosten: 800
    }
];


//########## Liste ausgeben lassen: ##########
const systemübersicht = document.getElementById("system-liste")

for (const status of systeme) {
    let li = document.createElement("li")
    li.textContent = status.name + ": " + status.status;

    if (status.status === "kritisch") {
        li.style.color = "red";
    } else if (status.status === "gestört") {
        li.style.color = "orange";
    } else if (status.status === "normal") {
        li.style.color = "green";
    }

    systemübersicht.append(li);
}


/* Optional, wenn nur der Status eingefärbt wird:
for (const status of systeme) {
    let li = document.createElement("li");
    li.textContent = status.name + ": ";

    let statusText = document.createElement("span");
    statusText.textContent = status.status;

    if (status.status === "kritisch") {
        statusText.style.color = "red";
    } else if (status.status === "gestört") {
        statusText.style.color = "orange";
    } else if (status.status === "normal") {
        statusText.style.color = "green";
    }

    li.append(statusText);
    systemübersicht.append(li);
} */

//########## Notfallliste ##########

//ohne filter()
/* const notfallListe = document.getElementById("notfall-liste")

for (notfall of systeme) {
    if (notfall.status === "kritisch") {
        let li = document.createElement("li")
        li.textContent = notfall.name + ": " + notfall.status;
    
        notfallListe.append(li)
    }
} */

const notfaelle = systeme.filter((notfall) => notfall.status === "kritisch");

const notfallListe = document.getElementById("notfall-liste");

for (const notfall of notfaelle) {
    let li = document.createElement("li");
    li.textContent = notfall.name + ": " + notfall.status;
    notfallListe.append(li);
}
//########## Reparaturkosten ##########

const reparaturKosten = systeme.reduce((summe, reparatur) => {
    return summe + reparatur.reparaturkosten
}, 0)

console.log(reparaturKosten);

document.getElementById("reparatur").textContent += " " + reparaturKosten + " €";

//########## Neue Liste mit Map ##########

const mapListe = document.getElementById("map");

const systemTexte = systeme.map((system) => {
    return system.name + ": " + system.energieverbrauch + " kW";
});

systemTexte.forEach((text) => {
    let li = document.createElement("li");
    li.textContent = text;
    mapListe.append(li);
});

/* ############## Reparatur-Button ######################## */

const btn = document.querySelector("#reparaturbtn")
let statusNEU

btn.addEventListener('click', (event) => {

    const budget = Number(document.getElementById("budgetInput").value);

    if(budget >= reparaturKosten){
        //Die Statistik-Liste im HTML leeren, um sie neu zu befüllen
        systemübersicht.textContent = ""
    
        for (const status of systeme) {
    
            status.status = "normal";
    
            let li = document.createElement("li");
            li.textContent = status.name + ": " + status.status;
            li.style.color = "green";
    
            systemübersicht.append(li);
        }
    
        //Reparaturkosten auf 0 € setzen (da alles repariert ist)
        document.getElementById("reparatur").textContent = "Reparaturkosten: 0 €";
    
        //Reparaturstatus ändern
        statusStatistik.kritisch = 0;
        statusStatistik.gestört = 0;
        statusStatistik.normal = systeme.length;
    
        //HTML leeren und die ´reparierte Statistik anzeigen
        statistik.textContent = "";
    
        for (const [statusName, anzahl] of Object.entries(statusStatistik)) {
            let li = document.createElement("li");
            li.textContent = statusName + ": " + anzahl;
            statistik.append(li);
        }
    } else {
        alert("Kein Geld zum reparieren")
    }
})

/* ############## Statistik ######################## */

const statusStatistik = {};

for (const system of systeme) {
    statusStatistik[system.status] = (statusStatistik[system.status] || 0) + 1;
}

console.log(statusStatistik);

const statistik = document.getElementById("stat")

//Ausgeben lassen
for (const [statusName, anzahl] of Object.entries(statusStatistik)) {
    let li = document.createElement("li");

    li.textContent = statusName + ": " + anzahl;

    statistik.append(li);
}