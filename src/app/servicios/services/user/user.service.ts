import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import swal from "sweetalert2";

import { GLOBAL } from "../global/global";

// import { User } from '../../models/user/user';

// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';
import { Router } from "@angular/router";
import { CommonServiceService } from "../../../common-service.service";
import { AreaI } from "app/pages/interface/area";

@Injectable()
export class UserService {
  public url_app: string;
  message: BehaviorSubject<String>;
  messages: "";
  public identity;
  public token;
  constructor(
    private _http: HttpClient,
    public router: Router,
    public _cs: CommonServiceService
  ) {
    this.url_app = GLOBAL.url;
    this.message = new BehaviorSubject(this.messages);
  }

  area$: Observable<AreaI[]> | undefined;
  getIdentity() {
    var identity = JSON.parse(localStorage.getItem("identity"));
    if (identity != "undefined") {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }
  getToken() {
    let token = localStorage.getItem("token");
    if (token != "undefined") {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }
  nextmessage(data) {
    this.message.next(data);
  }
  loginDashboard(body): Observable<any> {
    let params = JSON.stringify(body); //json convertido a un string
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this._http.post(this.url_app + "loginDashboard/", params, {
      headers: headers,
    });
  }
  cambiarpassDash(body): Observable<any> {
    let params = JSON.stringify(body); //json convertido a un string
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this._http.post(this.url_app + "changePassDashboard/", params, {
      headers: headers,
    });
  }
  recuperarpassDash(body): Observable<any> {
    let params = JSON.stringify(body); //json convertido a un string
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this._http.post(this.url_app + "recoveryPassDashboard/", params, {
      headers: headers,
    });
  }

  createArea(user) {
    let promesa = new Promise((resolve, reject) => {
      let params = JSON.stringify(user); //json convertido a un string
      let headers = new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", this.getToken());
      return this._http
        .post(this.url_app + "createArea/", params, { headers: headers })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            if (err.error.tokenoff) {
              this._cs.nextmessage("salir");
              localStorage.clear();
              swal.fire(
                "Sesión finalizada",
                "¡Tu sesión ha caducado, favor volver a ingresar!",
                "warning"
              );
            } else {
              if (err.error.tokenbad) {
                this._cs.nextmessage("salir");
                localStorage.clear();
                swal.fire(
                  "Acceso denegado",
                  "¡Tu rol no es válido para ejecutar esta acción!",
                  "error"
                );
              } else {
                if (err.error.tokenedit) {
                  this._cs.nextmessage("salir");
                  localStorage.clear();
                  swal.fire(
                    "Acceso denegado",
                    "Los datos del usuario estan erroneos!",
                    "warning"
                  );
                } else {
                  reject(err);
                }
              }
            }
          }
        );
    });
    return promesa;
  }
  getArea() {
    let promesa = new Promise((resolve, reject) => {
      let headers = new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", this.getToken());
      return this._http
        .get(this.url_app + "getArea/", { headers: headers })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            if (err.error.tokenoff) {
              this._cs.nextmessage("salir");
              localStorage.clear();
              swal.fire(
                "Sesión finalizada",
                "¡Tu sesión ha caducado, favor volver a ingresar!",
                "warning"
              );
            } else {
              if (err.error.tokenbad) {
                this._cs.nextmessage("salir");
                localStorage.clear();
                swal.fire(
                  "Acceso denegado",
                  "¡Tu rol no es válido para ejecutar esta acción!",
                  "error"
                );
              } else {
                if (err.error.tokenedit) {
                  this._cs.nextmessage("salir");
                  localStorage.clear();
                  swal.fire(
                    "Acceso denegado",
                    "Los datos del usuario estan erroneos!",
                    "warning"
                  );
                } else {
                  reject(err);
                }
              }
            }
          }
        );
    });
    return promesa;
  }

  getArea2(): Observable<AreaI[]> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    this.area$ = this._http.get<AreaI[]>(this.url_app + "getArea/", {
      headers: headers,
    });
    return this.area$;
  }

  getAreaByTipos(): Observable<AreaI[]> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    this.area$ = this._http
      .get<AreaI[]>(this.url_app + "getAreaBytipos/", {
        headers: headers,
      })
      .pipe
      // map(area)
      ();
    return this.area$;
  }

  putArea(user) {
    let promesa = new Promise((resolve, reject) => {
      let params = JSON.stringify(user); //json convertido a un string
      let headers = new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", this.getToken());
      return this._http
        .put(this.url_app + "putArea/", params, { headers: headers })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            if (err.error.tokenoff) {
              this._cs.nextmessage("salir");
              localStorage.clear();
              swal.fire(
                "Sesión finalizada",
                "¡Tu sesión ha caducado, favor volver a ingresar!",
                "warning"
              );
            } else {
              if (err.error.tokenbad) {
                this._cs.nextmessage("salir");
                localStorage.clear();
                swal.fire(
                  "Acceso denegado",
                  "¡Tu rol no es válido para ejecutar esta acción!",
                  "error"
                );
              } else {
                if (err.error.tokenedit) {
                  this._cs.nextmessage("salir");
                  localStorage.clear();
                  swal.fire(
                    "Acceso denegado",
                    "Los datos del usuario estan erroneos!",
                    "warning"
                  );
                } else {
                  reject(err);
                }
              }
            }
          }
        );
    });
    return promesa;
  }
  createTipoSolicitud(user) {
    let promesa = new Promise((resolve, reject) => {
      let params = JSON.stringify(user); //json convertido a un string
      let headers = new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", this.getToken());
      return this._http
        .post(this.url_app + "createTipoSolicitud/", params, {
          headers: headers,
        })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            if (err.error.tokenoff) {
              this._cs.nextmessage("salir");
              localStorage.clear();
              swal.fire(
                "Sesión finalizada",
                "¡Tu sesión ha caducado, favor volver a ingresar!",
                "warning"
              );
            } else {
              if (err.error.tokenbad) {
                this._cs.nextmessage("salir");
                localStorage.clear();
                swal.fire(
                  "Acceso denegado",
                  "¡Tu rol no es válido para ejecutar esta acción!",
                  "error"
                );
              } else {
                if (err.error.tokenedit) {
                  this._cs.nextmessage("salir");
                  localStorage.clear();
                  swal.fire(
                    "Acceso denegado",
                    "Los datos del usuario estan erroneos!",
                    "warning"
                  );
                } else {
                  reject(err);
                }
              }
            }
          }
        );
    });
    return promesa;
  }
  getTipoSolicitud() {
    let promesa = new Promise((resolve, reject) => {
      let headers = new HttpHeaders().set("Content-Type", "application/json");
      return this._http
        .get(this.url_app + "getTipoSolicitud/", { headers: headers })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            if (err.error.tokenoff) {
              this._cs.nextmessage("salir");
              localStorage.clear();
              swal.fire(
                "Sesión finalizada",
                "¡Tu sesión ha caducado, favor volver a ingresar!",
                "warning"
              );
            } else {
              if (err.error.tokenbad) {
                this._cs.nextmessage("salir");
                localStorage.clear();
                swal.fire(
                  "Acceso denegado",
                  "¡Tu rol no es válido para ejecutar esta acción!",
                  "error"
                );
              } else {
                if (err.error.tokenedit) {
                  this._cs.nextmessage("salir");
                  localStorage.clear();
                  swal.fire(
                    "Acceso denegado",
                    "Los datos del usuario estan erroneos!",
                    "warning"
                  );
                } else {
                  reject(err);
                }
              }
            }
          }
        );
    });
    return promesa;
  }
  putTipoSolicitud(user) {
    let promesa = new Promise((resolve, reject) => {
      let params = JSON.stringify(user); //json convertido a un string
      let headers = new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", this.getToken());
      return this._http
        .put(this.url_app + "putTipoSolicitud/", params, { headers: headers })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            if (err.error.tokenoff) {
              this._cs.nextmessage("salir");
              localStorage.clear();
              swal.fire(
                "Sesión finalizada",
                "¡Tu sesión ha caducado, favor volver a ingresar!",
                "warning"
              );
            } else {
              if (err.error.tokenbad) {
                this._cs.nextmessage("salir");
                localStorage.clear();
                swal.fire(
                  "Acceso denegado",
                  "¡Tu rol no es válido para ejecutar esta acción!",
                  "error"
                );
              } else {
                if (err.error.tokenedit) {
                  this._cs.nextmessage("salir");
                  localStorage.clear();
                  swal.fire(
                    "Acceso denegado",
                    "Los datos del usuario estan erroneos!",
                    "warning"
                  );
                } else {
                  reject(err);
                }
              }
            }
          }
        );
    });
    return promesa;
  }
  deleteTipoSolicitud(id) {
    let promesa = new Promise((resolve, reject) => {
      let headers = new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", this.getToken());
      return this._http
        .delete(this.url_app + "deleteTipoSolicitud/" + id, {
          headers: headers,
        })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            if (err.error.tokenoff) {
              this._cs.nextmessage("salir");
              localStorage.clear();
              swal.fire(
                "Sesión finalizada",
                "¡Tu sesión ha caducado, favor volver a ingresar!",
                "warning"
              );
            } else {
              if (err.error.tokenbad) {
                this._cs.nextmessage("salir");
                localStorage.clear();
                swal.fire(
                  "Acceso denegado",
                  "¡Tu rol no es válido para ejecutar esta acción!",
                  "error"
                );
              } else {
                if (err.error.tokenedit) {
                  this._cs.nextmessage("salir");
                  localStorage.clear();
                  swal.fire(
                    "Acceso denegado",
                    "Los datos del usuario estan erroneos!",
                    "warning"
                  );
                } else {
                  reject(err);
                }
              }
            }
          }
        );
    });
    return promesa;
  }
  guardarAdmin(user) {
    let promesa = new Promise((resolve, reject) => {
      let params = JSON.stringify(user); //json convertido a un string
      let headers = new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", this.getToken());
      return this._http
        .post(this.url_app + "guardarAdmin/", params, { headers: headers })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            if (err.error.tokenoff) {
              this._cs.nextmessage("salir");
              localStorage.clear();
              swal.fire(
                "Sesión finalizada",
                "¡Tu sesión ha caducado, favor volver a ingresar!",
                "warning"
              );
            } else {
              if (err.error.tokenbad) {
                this._cs.nextmessage("salir");
                localStorage.clear();
                swal.fire(
                  "Acceso denegado",
                  "¡Tu rol no es válido para ejecutar esta acción!",
                  "error"
                );
              } else {
                if (err.error.tokenedit) {
                  this._cs.nextmessage("salir");
                  localStorage.clear();
                  swal.fire(
                    "Acceso denegado",
                    "Los datos del usuario estan erroneos!",
                    "warning"
                  );
                } else {
                  reject(err);
                }
              }
            }
          }
        );
    });
    return promesa;
  }
  saveUsuarioMunicipal(user) {
    let promesa = new Promise((resolve, reject) => {
      let params = JSON.stringify(user); //json convertido a un string
      let headers = new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", this.getToken());
      return this._http
        .post(this.url_app + "saveUsuarioMunicipal/", params, {
          headers: headers,
        })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            if (err.error.tokenoff) {
              this._cs.nextmessage("salir");
              localStorage.clear();
              swal.fire(
                "Sesión finalizada",
                "¡Tu sesión ha caducado, favor volver a ingresar!",
                "warning"
              );
            } else {
              if (err.error.tokenbad) {
                this._cs.nextmessage("salir");
                localStorage.clear();
                swal.fire(
                  "Acceso denegado",
                  "¡Tu rol no es válido para ejecutar esta acción!",
                  "error"
                );
              } else {
                if (err.error.tokenedit) {
                  this._cs.nextmessage("salir");
                  localStorage.clear();
                  swal.fire(
                    "Acceso denegado",
                    "Los datos del usuario estan erroneos!",
                    "warning"
                  );
                } else {
                  reject(err);
                }
              }
            }
          }
        );
    });
    return promesa;
  }

  listarAdministrador() {
    let promesa = new Promise((resolve, reject) => {
      let headers = new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", this.getToken());
      return this._http
        .get(this.url_app + "listarAdminDashboard/", { headers: headers })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            if (err.error.tokenoff) {
              this._cs.nextmessage("salir");
              localStorage.clear();
              swal.fire(
                "Sesión finalizada",
                "¡Tu sesión ha caducado, favor volver a ingresar!",
                "warning"
              );
            } else {
              if (err.error.tokenbad) {
                this._cs.nextmessage("salir");
                localStorage.clear();
                swal.fire(
                  "Acceso denegado",
                  "¡Tu rol no es válido para ejecutar esta acción!",
                  "error"
                );
              } else {
                if (err.error.tokenedit) {
                  this._cs.nextmessage("salir");
                  localStorage.clear();
                  swal.fire(
                    "Acceso denegado",
                    "Los datos del usuario estan erroneos!",
                    "warning"
                  );
                } else {
                  reject(err);
                }
              }
            }
          }
        );
    });
    return promesa;
  }
  listarAdmin() {
    let promesa = new Promise((resolve, reject) => {
      let headers = new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", this.getToken());
      return this._http
        .get(this.url_app + "listarAdmin/", { headers: headers })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            if (err.error.tokenoff) {
              this._cs.nextmessage("salir");
              localStorage.clear();
              swal.fire(
                "Sesión finalizada",
                "¡Tu sesión ha caducado, favor volver a ingresar!",
                "warning"
              );
            } else {
              if (err.error.tokenbad) {
                this._cs.nextmessage("salir");
                localStorage.clear();
                swal.fire(
                  "Acceso denegado",
                  "¡Tu rol no es válido para ejecutar esta acción!",
                  "error"
                );
              } else {
                if (err.error.tokenedit) {
                  this._cs.nextmessage("salir");
                  localStorage.clear();
                  swal.fire(
                    "Acceso denegado",
                    "Los datos del usuario estan erroneos!",
                    "warning"
                  );
                } else {
                  reject(err);
                }
              }
            }
          }
        );
    });
    return promesa;
  }

  actualizarAdminDashboard(user) {
    let promesa = new Promise((resolve, reject) => {
      let params = JSON.stringify(user); //json convertido a un string
      let headers = new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", this.getToken());
      return this._http
        .put(this.url_app + "actualizarAdminDashboard/", params, {
          headers: headers,
        })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            if (err.error.tokenoff) {
              this._cs.nextmessage("salir");
              localStorage.clear();
              swal.fire(
                "Sesión finalizada",
                "¡Tu sesión ha caducado, favor volver a ingresar!",
                "warning"
              );
            } else {
              if (err.error.tokenbad) {
                this._cs.nextmessage("salir");
                localStorage.clear();
                swal.fire(
                  "Acceso denegado",
                  "¡Tu rol no es válido para ejecutar esta acción!",
                  "error"
                );
              } else {
                if (err.error.tokenedit) {
                  this._cs.nextmessage("salir");
                  localStorage.clear();
                  swal.fire(
                    "Acceso denegado",
                    "Los datos del usuario estan erroneos!",
                    "warning"
                  );
                } else {
                  reject(err);
                }
              }
            }
          }
        );
    });
    return promesa;
  }
  actualizarAdmin(user) {
    let promesa = new Promise((resolve, reject) => {
      let params = JSON.stringify(user); //json convertido a un string
      let headers = new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", this.getToken());
      return this._http
        .put(this.url_app + "actualizarAdmin/", params, { headers: headers })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            if (err.error.tokenoff) {
              this._cs.nextmessage("salir");
              localStorage.clear();
              swal.fire(
                "Sesión finalizada",
                "¡Tu sesión ha caducado, favor volver a ingresar!",
                "warning"
              );
            } else {
              if (err.error.tokenbad) {
                this._cs.nextmessage("salir");
                localStorage.clear();
                swal.fire(
                  "Acceso denegado",
                  "¡Tu rol no es válido para ejecutar esta acción!",
                  "error"
                );
              } else {
                if (err.error.tokenedit) {
                  this._cs.nextmessage("salir");
                  localStorage.clear();
                  swal.fire(
                    "Acceso denegado",
                    "Los datos del usuario estan erroneos!",
                    "warning"
                  );
                } else {
                  reject(err);
                }
              }
            }
          }
        );
    });
    return promesa;
  }

  eliminarAdminDashboard(id) {
    let promesa = new Promise((resolve, reject) => {
      let headers = new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", this.getToken());
      return this._http
        .delete(this.url_app + "eliminarAdminDashboard/" + id, {
          headers: headers,
        })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            if (err.error.tokenoff) {
              this._cs.nextmessage("salir");
              localStorage.clear();
              swal.fire(
                "Sesión finalizada",
                "¡Tu sesión ha caducado, favor volver a ingresar!",
                "warning"
              );
            } else {
              if (err.error.tokenbad) {
                this._cs.nextmessage("salir");
                localStorage.clear();
                swal.fire(
                  "Acceso denegado",
                  "¡Tu rol no es válido para ejecutar esta acción!",
                  "error"
                );
              } else {
                if (err.error.tokenedit) {
                  this._cs.nextmessage("salir");
                  localStorage.clear();
                  swal.fire(
                    "Acceso denegado",
                    "Los datos del usuario estan erroneos!",
                    "warning"
                  );
                } else {
                  reject(err);
                }
              }
            }
          }
        );
    });
    return promesa;
  }

  guardarSolicitud(user) {
    let promesa = new Promise((resolve, reject) => {
      let params = JSON.stringify(user); //json convertido a un string
      let headers = new HttpHeaders().set("Content-Type", "application/json");
      return this._http
        .post(this.url_app + "guardarSolicitud/", params, { headers: headers })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            if (err.error.tokenoff) {
              this._cs.nextmessage("salir");
              localStorage.clear();
              swal.fire(
                "Sesión finalizada",
                "¡Tu sesión ha caducado, favor volver a ingresar!",
                "warning"
              );
            } else {
              if (err.error.tokenbad) {
                this._cs.nextmessage("salir");
                localStorage.clear();
                swal.fire(
                  "Acceso denegado",
                  "¡Tu rol no es válido para ejecutar esta acción!",
                  "error"
                );
              } else {
                if (err.error.tokenedit) {
                  this._cs.nextmessage("salir");
                  localStorage.clear();
                  swal.fire(
                    "Acceso denegado",
                    "Los datos del usuario estan erroneos!",
                    "warning"
                  );
                } else {
                  reject(err);
                }
              }
            }
          }
        );
    });
    return promesa;
  }
  getSolicitudes() {
    let promesa = new Promise((resolve, reject) => {
      let headers = new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", this.getToken());
      return this._http
        .get(this.url_app + "getSolicitudes/", { headers: headers })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            if (err.error.tokenoff) {
              this._cs.nextmessage("salir");
              localStorage.clear();
              swal.fire(
                "Sesión finalizada",
                "¡Tu sesión ha caducado, favor volver a ingresar!",
                "warning"
              );
            } else {
              if (err.error.tokenbad) {
                this._cs.nextmessage("salir");
                localStorage.clear();
                swal.fire(
                  "Acceso denegado",
                  "¡Tu rol no es válido para ejecutar esta acción!",
                  "error"
                );
              } else {
                if (err.error.tokenedit) {
                  this._cs.nextmessage("salir");
                  localStorage.clear();
                  swal.fire(
                    "Acceso denegado",
                    "Los datos del usuario estan erroneos!",
                    "warning"
                  );
                } else {
                  reject(err);
                }
              }
            }
          }
        );
    });
    return promesa;
  }
  getSolicitudesResumen() {
    let promesa = new Promise((resolve, reject) => {
      let headers = new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", this.getToken());
      return this._http
        .get(this.url_app + "getSolicitudesResumen/", { headers: headers })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            if (err.error.tokenoff) {
              this._cs.nextmessage("salir");
              localStorage.clear();
              swal.fire(
                "Sesión finalizada",
                "¡Tu sesión ha caducado, favor volver a ingresar!",
                "warning"
              );
            } else {
              if (err.error.tokenbad) {
                this._cs.nextmessage("salir");
                localStorage.clear();
                swal.fire(
                  "Acceso denegado",
                  "¡Tu rol no es válido para ejecutar esta acción!",
                  "error"
                );
              } else {
                if (err.error.tokenedit) {
                  this._cs.nextmessage("salir");
                  localStorage.clear();
                  swal.fire(
                    "Acceso denegado",
                    "Los datos del usuario estan erroneos!",
                    "warning"
                  );
                } else {
                  reject(err);
                }
              }
            }
          }
        );
    });
    return promesa;
  }
  getSolicitudesArea(id) {
    let promesa = new Promise((resolve, reject) => {
      let headers = new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", this.getToken());
      return this._http
        .get(this.url_app + "getSolicitudesArea/" + id, { headers: headers })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            if (err.error.tokenoff) {
              this._cs.nextmessage("salir");
              localStorage.clear();
              swal.fire(
                "Sesión finalizada",
                "¡Tu sesión ha caducado, favor volver a ingresar!",
                "warning"
              );
            } else {
              if (err.error.tokenbad) {
                this._cs.nextmessage("salir");
                localStorage.clear();
                swal.fire(
                  "Acceso denegado",
                  "¡Tu rol no es válido para ejecutar esta acción!",
                  "error"
                );
              } else {
                if (err.error.tokenedit) {
                  this._cs.nextmessage("salir");
                  localStorage.clear();
                  swal.fire(
                    "Acceso denegado",
                    "Los datos del usuario estan erroneos!",
                    "warning"
                  );
                } else {
                  reject(err);
                }
              }
            }
          }
        );
    });
    return promesa;
  }
  changeProceso(user) {
    let promesa = new Promise((resolve, reject) => {
      let params = JSON.stringify(user); //json convertido a un string
      let headers = new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", this.getToken());
      return this._http
        .put(this.url_app + "changeProceso/", params, { headers: headers })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            if (err.error.tokenoff) {
              this._cs.nextmessage("salir");
              localStorage.clear();
              swal.fire(
                "Sesión finalizada",
                "¡Tu sesión ha caducado, favor volver a ingresar!",
                "warning"
              );
            } else {
              if (err.error.tokenbad) {
                this._cs.nextmessage("salir");
                localStorage.clear();
                swal.fire(
                  "Acceso denegado",
                  "¡Tu rol no es válido para ejecutar esta acción!",
                  "error"
                );
              } else {
                if (err.error.tokenedit) {
                  this._cs.nextmessage("salir");
                  localStorage.clear();
                  swal.fire(
                    "Acceso denegado",
                    "Los datos del usuario estan erroneos!",
                    "warning"
                  );
                } else {
                  reject(err);
                }
              }
            }
          }
        );
    });
    return promesa;
  }
  finalizarRequerimiento(user) {
    let promesa = new Promise((resolve, reject) => {
      let params = JSON.stringify(user); //json convertido a un string
      let headers = new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", this.getToken());
      return this._http
        .put(this.url_app + "finalizarRequerimiento/", params, {
          headers: headers,
        })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            if (err.error.tokenoff) {
              this._cs.nextmessage("salir");
              localStorage.clear();
              swal.fire(
                "Sesión finalizada",
                "¡Tu sesión ha caducado, favor volver a ingresar!",
                "warning"
              );
            } else {
              if (err.error.tokenbad) {
                this._cs.nextmessage("salir");
                localStorage.clear();
                swal.fire(
                  "Acceso denegado",
                  "¡Tu rol no es válido para ejecutar esta acción!",
                  "error"
                );
              } else {
                if (err.error.tokenedit) {
                  this._cs.nextmessage("salir");
                  localStorage.clear();
                  swal.fire(
                    "Acceso denegado",
                    "Los datos del usuario estan erroneos!",
                    "warning"
                  );
                } else {
                  reject(err);
                }
              }
            }
          }
        );
    });
    return promesa;
  }
}
