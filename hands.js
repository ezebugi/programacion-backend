class TicketManager {
  #precioBaseGanancia = 0.15;

  constructor() {
    this.eventos = [];
  }

  getEventos = () => {
    return this.eventos;
  };

  agregarEvento = (
    nombre,
    lugar,
    precio,
    capacidad = 50,
    fecha = new Date().toLocaleDateString()
  ) => {
    const evento = {
      nombre,
      lugar,
      precio: precio + precio * this.#precioBaseGanancia,
      capacidad,
      fecha,
      participantes: [],
    };
    if (this.eventos.length === 0) {
      evento.id = 1;
    } else {
      evento.id = this.eventos[this.eventos.length - 1].id + 1;
    }
    this.eventos.push(evento);
  };

  agregarUsuario = (idEvento, idUsuario) => {
    const eventoId = this.eventos.findIndex((e) => e.id === idEvento);

    if (eventoId === -1) {
      console.log("El evento no fue encontrado");
      return;
    }
    const usuarioRegistrado =
      this.eventos[eventoId].participantes.includes(idUsuario);
    if (usuarioRegistrado) {
      console.log("El usuario ya está registrado");
      return;
    }

    this.eventos[eventoId].participantes.push(idUsuario);
  };

  ponerEventoEnGira = (idEvento, nuevaLocalidad, nuevaFecha) => {
    const eventoIndex = this.eventos.findIndex((e) => e.id === idEvento);
    if (eventoIndex === -1) {
      console.log("Evento no encontrado");
      return;
    }
    const evento = this.eventos[eventoIndex];
    const nuevoEvento = {
      ...evento,
      lugar: nuevaLocalidad,
      fecha: nuevaFecha,
      id: this.eventos[this.eventos.length - 1].id + 1,
      participantes: [],
    };
    this.eventos.push(nuevoEvento);
  };
}

const manejadorDeEventos = new TicketManager();

manejadorDeEventos.agregarEvento("EventoPrueba", "Argentina", 200, 50);
manejadorDeEventos.agregarUsuario(1, 2);
manejadorDeEventos.ponerEventoEnGira(1, "Uruguay", "18/12/2022");

console.log(manejadorDeEventos.getEventos());
