export interface AreaI {
  solicitudes: number;
  _id: string;
  nombre: string;
  email: string;
  create_at: Date;
  __v: number;
  tipoSolicitud: TipoSolicitudI[];
}

export interface TipoSolicitudI {
  _id: string;
  activo: boolean;
  solicitudes: number;
  nombre: string;
  create_at: Date;
  area: string;
  __v: number;
  fechaModificacion?: Date;
}
