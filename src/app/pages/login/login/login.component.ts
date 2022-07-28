import {
  Component,
  OnInit,
  ViewEncapsulation,
  NgZone,
  ViewChild,
  ElementRef,
  AfterContentInit,
} from "@angular/core";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { CustomValidators } from "ng2-validation";
import { UserService } from "app/servicios/services/user/user.service";
import * as alertFunction from "../../../servicios/data/sweet-alerts";
import { MapsAPILoader, AgmMap } from "@agm/core";
import { AreaI } from "../../interface/area";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { json } from "@angular-devkit/core";
declare var google;

const claveUsuario = new FormControl("", Validators.required);

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [UserService],
})
export class LoginComponent implements OnInit, AfterContentInit {
  areas$: Observable<AreaI[]> = this._userService.area$;
  area: AreaI[] = [];
  form2: FormGroup;
  selec;
  @ViewChild("search")
  public searchElementRef: ElementRef;
  cargando = false;
  cargando2 = false;
  rut: String = "";
  solicitud = ["Recolección de basura", "Poda árboles"];
  tipos;
  direccion;
  busqueda;
  verificar = false;
  latitude: number = -33.47269;
  longitude: number = -70.64724;
  private geoCoder;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _userService: UserService,
    private mapsAPILoader: MapsAPILoader,
    public ngZone: NgZone
  ) {}

  ngOnInit() {
    this.getArea();
    console.log("area", this.area);

    this._userService.getTipoSolicitud().then((res: any) => {
      this.tipos = res.tipos;
    });

    this.form2 = this.fb.group({
      nombre: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      rut: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("[0-9]{6,8}-[0-9|kK]{1}"),
          Validators.minLength(9),
          Validators.maxLength(10),
        ]),
      ],
      direccion: ["", Validators.compose([Validators.required])],
      email: [
        null,
        Validators.compose([Validators.required, CustomValidators.email]),
      ],
      telefono: [
        null,
        Validators.compose([Validators.required, Validators.pattern("[0-9]+")]),
      ],
      requerimiento: ["", Validators.compose([Validators.required])],
      lat: ["", Validators.compose([Validators.required])],
      lng: ["", Validators.compose([Validators.required])],
      solicitud: ["", Validators.compose([Validators.required])],
    });
  }

  getArea(): void {
    this._userService.getAreaByTipos().subscribe((res: AreaI[]) => {
      this.area = res;
    });
  }

  ngAfterContentInit(): void {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder();
      let autocomplete = new window["google"].maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: [],
          componentRestrictions: { country: "cl" },
        }
      );
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.form2.controls["lng"].setValue(place.geometry.location.lng());
          this.form2.controls["lat"].setValue(place.geometry.location.lat());
          this.form2.controls["direccion"].setValue(place.formatted_address);
        });
      });
    });
  }

  inicio() {
    this.router.navigate(["/inicio"]);
  }

  onSubmit(formDirective) {
    if (this.form2.valid) {
      this.cargando2 = true;
      this.form2.disable();
      this._userService.guardarSolicitud(this.form2.value).then(
        (res) => {
          this.form2.enable();
          this.form2.reset();
          formDirective.resetForm();
          this.cargando2 = false;
          this.typeGuardar();
        },
        (err) => {
          if (err.error.existe) {
            this.typeErrorEmail();
          } else {
            if (err.error.correo) {
              alertFunction.typeErrorEmailBad();
            } else {
              this.typeError();
            }
          }
          this.cargando2 = false;
          this.form2.enable();
        }
      );
    }
  }

  typeError() {
    alertFunction.typeErrorSolici();
  }
  typeErrorEmail() {
    alertFunction.typeErrorEmail();
  }
  typeGuardar() {
    alertFunction.typeSuccesspeticion();
  }

  limpiar() {
    this.form2.reset();
  }
  myFunction() {
    var rut: any = String(this.form2.value.rut).replace(/-/g, "");
    rut = String(rut).replace(/\./g, "");
    rut = String(rut).replace("null", "");
    if (rut.length > 1) {
      this.form2.controls["rut"].setValue(
        String(rut).substring(0, rut.length - 1) +
          "-" +
          String(rut).substring(rut.length - 1, rut.length)
      );
      this.rut = this.form2.value.rut;
    } else {
      this.form2.controls["rut"].setValue(rut);
      this.rut = rut;
    }
    // console.log(this.rut)
    this.verificar = this.verificador(this.rut);
  }

  verificador(rut): boolean {
    rut = String(rut).replace(/\./g, "");
    if (rut == "" || rut == null) {
      return false;
    }
    var Rut = [];
    if (rut.length == 9) {
      rut = "0" + rut;
    }
    rut = rut.toLowerCase();
    for (let i = 0; i < 10; i++) {
      Rut[i] = rut.charAt(i);
    }
    var r = new RegExp(/[0-9]/g);
    var prueba,
      cantidad = 0;
    for (let i = 0; i < 8; i++) {
      if ((prueba = Rut[i].replace(r, "")) == "") {
        cantidad = cantidad;
      } else {
        cantidad = cantidad + 1;
      }
    }
    if (cantidad == 0) {
      var suma = 0,
        mul = 2;
      for (let i = 7; i > -1; i--) {
        suma = suma + Number(Rut[i]) * mul;
        if (mul == 7) {
          mul = 2;
        } else {
          mul++;
        }
      }
      var resul = suma % 11;
      resul = 11 - resul;
      var digito;
      if (resul == 11) {
        digito = 0;
      } else {
        if (resul == 10) {
          digito = "k";
        } else {
          digito = resul;
        }
      }
      // console.log(digito == Rut[9] && rut.length<11)
      if (digito == Rut[9] && rut.length < 11) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  seleccionTipos(i) {
    this.tipos = [];
    this.form2.controls["tipos"].reset();
  }
}
