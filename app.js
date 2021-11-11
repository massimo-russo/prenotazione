/*array di tavoli*/
const Booking = {};

Booking.numeroPersoneW = document.getElementById('numero-persone-w');
Booking.numeroPersone = document.getElementById('numero-persone');
Booking.tavoliW = document.getElementById('tavoli-w');
Booking.tavoloSelezionato = document.getElementById('tavolo-selezionato');
Booking.messageStatus = document.getElementById('message-status');


/*caricamento dati da file.json*/
(async function costruisciSala() {
    Booking.sala = await fetch('sala.json');
    Booking.sala = await Booking.sala.json();
    Booking.tavoli = Booking.sala.tavoli;
    disponiTavoli(Booking.tavoli);
})();


function disponiTavoli(tavoli) {
    tavoli.forEach((tavolo, i) => {
        let classitavolo = 'tavolo',
            tavoloDOM = document.createElement('div');
        tavoloDOM.appendChild(document.createTextNode(i + 1));
        classitavolo += tavolo.occupato ? ' occupato ' : ' libero ';
        classitavolo += tavolo.posti == 6 ? ' x6 ' : ' x4 ';
        tavoloDOM.setAttribute('class', classitavolo);
        Booking.tavoliW.appendChild(tavoloDOM);
    });
}


Booking.numeroPersoneW.addEventListener('click', (e) => {
    e.preventDefault();
    let numeroPersone = +Booking.numeroPersone.textContent;
    if (e.target.id === 'add') {
        Booking.numeroPersone.textContent = numeroPersone + 1;
    } else if (e.target.id === 'sub' && numeroPersone > 1) {
        Booking.numeroPersone.textContent = numeroPersone - 1;
    }
});


Booking.tavoliW.addEventListener('click', (e) => {
    let selezionato = +e.target.textContent;
    if (Booking.tavoli[selezionato - 1].occupato) {
        Booking.messageStatus.textContent = 'tavolo  occupato';
    } else {
        Booking.tavoloSelezionato.textContent = selezionato;
    }
});


document.forms[0].addEventListener('submit', (e) => {
    e.preventDefault();
    if (Booking.tavoloSelezionato.textContent == '-') {
        Booking.messageStatus.textContent = 'tavolo  non selezionato ';
        return;
    }
    sendBooking();
});



function sendBooking() {
    let bookingForm = new FormData();
    bookingForm.append('numero-persone', +Booking.numeroPersone.textContent);
    bookingForm.append('tavolo', +Booking.tavoloSelezionato.textContent);
    bookingForm.append('nome', document.forms[0].nome.value);
    bookingForm.append('nome', document.forms[0].email.value);
    Booking.messageStatus.textContent = 'Prenotazione andata a buon fine';
    document.forms[0].reset();
}