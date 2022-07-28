import swal from 'sweetalert2';

/*
* PERFIL
*/

export function cambioPass() {
    swal.fire("Buen trabajo!", "Se ha actualizado tu contraseña de manera correcta", "success");
}
export function errorCambioPass() {
    swal.fire("Error!", "No se pudo actualizar la contraseña, intentalo más tarde", "error");
}
export function perfil() {
    swal.fire("Buen trabajo!", "Se ha actualizado tu perfil de manera correcta", "success");
}
export function errorPerfil() {
    swal.fire("Error!", "No se pudo actualizar el perfil, intento más tarde", "error");
}



/*
* General
*/
export function limpiarContenido() {
    swal.fire("Informacion", "Contenido Limpiado !", "warning");
}
export function typeErrorcl2() {
    swal.fire("Error!", "El registro no se ha podido Completar! \n Rut ya ingresado", "error");
}
export function typeErrorClienteEliminado() {
    swal.fire("Error!", "No se pudo eliminar el cliente!", "error");
}
export function typeErrorAsigEliminado() {
    swal.fire("Error!", "No se pudo eliminar la asignación!", "error");
}
export function typeErrorgetAlerta() {
    swal.fire("Error!", "No se pudo encontrar alertas para esta cuenta!", "error");
}
export function typeErrorAlertaEliminado() {
    swal.fire("Error!", "No se pudo eliminar la alerta!", "error");
}
export function typeErrorCRelevanteEliminado() {
    swal.fire("Error!", "No se pudo eliminar la cuenta relevante!", "error");
}
export function typeSuccesDescarga() {
    swal.fire("Genial!", "Se ha descargado correctamente el archivo excel!", "success");
}
export function typeSuccesspeticion() {
    swal.fire("Genial!", "Se ha registrado correctamente la solicitud!", "success");
}
export function typeSuccessActSolicitud() {
    swal.fire("Genial!", "Se ha actualizado correctamente la solicitud!", "success");
}
export function typeErrorActSoli() {
    swal.fire("Error!", "No se ha actualizado la solicitud", "error");
}
export function typeErrorcl() {
    swal.fire("Error!", "El registro no se ha podido Completar! \n Email ya ingresado", "error");
}
export function typeSuccesscl() {
    swal.fire("Genial!", "Se ha registrado correctamente el usuario!", "success");
}
export function typeSuccesUpdateadmin() {
    swal.fire("Genial!", "Se ha actualizado correctamente el usuario!", "success");
}
export function typeSuccesCilindro() {
    swal.fire("Genial!", "Se ha actualizado correctamente el cilindro!", "success");
}
export function typeSuccesDeleteadmin() {
    swal.fire("Genial!", "Se ha eliminado correctamente el usuario!", "success");
}
export function typeSuccessChofer() {
    swal.fire("Genial!", "Se ha registrado correctamente el Chofer!", "success");
}
export function typeSuccessCall() {
    swal.fire("Genial!", "Se ha registrado correctamente al Usuario", "success");
}
export function typeSuccessDescuento() {
    swal.fire("Genial!", "Se ha registrado correctamente al descuento!", "success");
}
export function typeSuccessPublicidad() {
    swal.fire("Genial!", "Se ha registrado correctamente la publicidad!", "success");
}
export function typeSuccessActPublicidad() {
    swal.fire("Genial!", "Se ha actualizado correctamente la publicidad!", "success");
}
export function typeSuccessDeleteDescuento() {
    swal.fire("Genial!", "Se ha eliminado correctamente al descuento!", "success");
}
export function typeSuccessEnviarOferta() {
    swal.fire("Genial!", "Se ha enviado la oferta a todos los usuarios!", "success");
}
export function typeSuccessContraseña() {
    swal.fire("Genial!", "Se ha actualizado correctamente la contraseña!", "success");
}
export function typeSuccessRecuperarContraseña() {
    swal.fire("Genial!", "Se ha enviado correctamente un correo de recuperación!", "success");
}
export function typeErrorRecuperarPass() {
    swal.fire("Error!", "No se ha podido recuperar la contraseña!", "error");
}
export function typeErrorCall() {
    swal.fire("Error!", "No se ha podido guardar al Usuario!", "error");
}
export function typeErrorGuardarCodigo() {
    swal.fire("Error!", "No se ha podido guardar al descuento!", "error");
}
export function typeErrorGuardarPublicidad() {
    swal.fire("Error!", "No se ha podido guardar la publicidad!", "error");
}
export function typeErrorEliminarCodigo() {
    swal.fire("Error!", "No se ha podido eliminar al codigo!", "error");
}
export function typeErrorEnviarOferta() {
    swal.fire("Error!", "No se ha podido enviar la oferta!", "error");
}
export function typeErrorActPublicidad() {
    swal.fire("Error!", "No se ha podido actualizar la publicidad!", "error");
}
export function typeErrorActPublicidadExiste() {
    swal.fire("Error!", "Solo puede existir una publicidad activa a la vez", "error");
}
export function typeErrorUpdateCilindro() {
    swal.fire("Error!", "No se ha podido actualizar el cilindro!", "error");
}
export function typeErrorUpdateAdmin() {
    swal.fire("Error!", "No se ha podido actualizar el usuario!", "error");
}
export function typeErrorDeleteAdmin() {
    swal.fire("Error!", "No se ha podido eliminar el usuario!", "error");
}
export function typeErrorCM() {
    swal.fire("Error!", "No se ha podido guardar el usuario!", "error");
}
export function typeErrorSolici() {
    swal.fire("Error!", "No se ha podido guardar la solicitud!", "error");
}
export function typeErrorEmail() {
    swal.fire("Error", "Ya existe una usuario asociado a este email y/o rut", "error");
}
export function typeErrorEmailBad() {
    swal.fire("Error", "El email ingresado no es valido", "error");
}
export function typeErrorPedido() {
    swal.fire("Error!", "No se ha podido registrar el pedido!", "error");
}
export function typeErrorPedidosProgramadosPendientes() {
    swal.fire("Error!", "No hay pedidos programados pendientes!", "error");
}
export function typeErrorPedidosProgramadosAsignar() {
    swal.fire("Error!", "No se ha podido asignar el pedido, favor intentarlo más tarde!", "error");
}
export function typeErrorPedidosChoferesDisponibles() {
    swal.fire("Atención!", "No hay choferes disponibles en este momento, favor intentarlo más tarde!", "warning");
}
export function typeSuccessPedido() {
    swal.fire("Genial!", "Se ha ingresado correctamente el pedido", "success");
}
export function typeErrorCambiarPass() {
    swal.fire("Error!", "No se ha podido cambiar la contraseña!", "error");
}
export function typeErrorChofer() {
    swal.fire("Error!", "No se ha podido guardar el Chofer!", "error");
}
export function typeSuccessEliminarCM(cm) {
    swal.fire("Genial!", "Se ha elimnado correctamente a "+cm, "success");
}
export function typeErrorEliminarCM(cm) {
    swal.fire("Error!", "No se ha podido eliminar a "+cm, "error");
}
export function typeSuccessActualizarCM(cm) {
    swal.fire("Genial!", "Se ha actualizado correctamente a "+cm, "success");
}
export function typeErrorActualizarCM(cm) {
    swal.fire("Error!", "No se ha podido actualizar a "+cm, "error");
}
export function typeSuccessActualizarPass() {
    swal.fire("Genial!", "Se ha actualizado correctamente la clave", "success");
}
export function typeErrorActualizarPass() {
    swal.fire("Error!", "Las claves no coinciden!", "error");
}
export function typeErrorActualizarPassServ() {
    swal.fire("Error!", "No se pudo realizar el cambio de clave", "error");
}
export function typeSuccessAsignar() {
    swal.fire("Genial!", "Se ha asignado correctamente al CM!", "success");
}
export function typeSuccessGuardarKpi() {
    swal.fire("Genial!", "Se han registrado correctamente los KPI!", "success");
}
export function typeSuccessGuardarAlerta() {
    swal.fire("Genial!", "Se ha registrado correctamente la Alerta!", "success");
}
export function typeErrorGuardarAlerta() {
    swal.fire("Error!", "No se ha podido guardar la Alerta!", "error");
}
export function typeSuccessGuardarSintaxis() {
    swal.fire("Genial!", "Se ha registrado correctamente la Sintaxis!", "success");
}
export function typeErrorGuardarSintaxis() {
    swal.fire("Error!", "No se ha podido guardar la Sintaxis, ya existe ingresada para esta Empresa!", "error");
}
export function typeSuccessEliminarSintaxis() {
    swal.fire("Genial!", "Se ha eliminado correctamente la Sintaxis!", "success");
}
export function typeErrorEliminarSintaxis() {
    swal.fire("Error!", "No se ha podido eliminar la Sintaxis!", "error");
}
export function typeSuccessGuardarCRelevante() {
    swal.fire("Genial!", "Se ha registrado correctamente la Cuenta Relevante!", "success");
}
export function typeErrorGuardarCRelevante() {
    swal.fire("Error!", "No se ha podido guardar la Cuenta Relevante!", "error");
}
export function typeSuccessGuardarAlertaGoogle() {
    swal.fire("Genial!", "Se ha registrado correctamente la alerta de Google!", "success");
}
export function typeErrorGuardarAlertaGoogle() {
    swal.fire("Error!", "No se ha podido guardar la Alerta de Google, ya existe agregada a esta Empresa!", "error");
}
export function typeSuccessGuardarAlertaPrensa() {
    swal.fire("Genial!", "Se ha registrado correctamente la alerta de Prensa Digital!", "success");
}
export function typeErrorGuardarComentario() {
    swal.fire("Error!", "No se ha podido guardar el comentario!", "error");
}
export function typeSuccessGuardarComentario() {
    swal.fire("Genial!", "Se ha registrado correctamente el comentario!", "success");
}
export function typeErrorDescargarComentario() {
    swal.fire("Error!", "No se han podido descargar los comentarios!", "error");
}
export function typeSuccessDescargarComentario() {
    swal.fire("Genial!", "Se han descargado correctamente los comentarios!", "success");
}
export function typeErrorGuardarPublicacion() {
    swal.fire("Error!", "No se ha podido guardar la publicación de Facebook, ya existe agregada esta publicación!", "error");
}
export function typeSuccessGuardarFacebook() {
    swal.fire("Genial!", "Se ha registrado correctamente la publicación de Facebook!", "success");
}
export function typeErrorActualizarPublicacion() {
    swal.fire("Error!", "No se ha podido actualizar la publicación!", "error");
}
export function typeSuccessActualizarPublicacion() {
    swal.fire("Genial!", "Se ha actualizado correctamente la publicación!", "success");
}
export function typeErrorGuardarAlertaPrensa() {
    swal.fire("Error!", "No se ha podido guardar la alerta de Prensa Digital, ya existe agregada a esta Empresa!", "error");
}
export function typeSuccessDescarga() {
    swal.fire("Genial!", "Se ha descargado correctamente!", "success");
}
export function typeErrorDescarga() {
    swal.fire("Error!", "No se ha podido descargar, intentalo más tarde o prueba otro rango de fechas", "error");
}
export function typeSuccessAsignarPagina() {
    swal.fire("Genial!", "Se ha agregado correctamente!", "success");
}
export function typeErrorAsignarPagina() {
    swal.fire("Error!", "No se ha podido agregar, ya que se encunetra ingresada", "error");
}
export function typeSuccessGuardarPost() {
    swal.fire("Genial!", "Se han guardado correctamente los posts!", "success");
}
export function typeSuccessActualizarComentario() {
    swal.fire("Genial!", "Se actualizo correctamente el comentario!", "success");
}
export function typeErrorActualizarComentario() {
    swal.fire("Error!", "No se pudo actualizar el comentario", "error");
}
export function typeSuccessActualizarPOST() {
    swal.fire("Genial!", "Se actualizo correctamente el Post!", "success");
}
export function typeErrorActualizarPOST() {
    swal.fire("Error!", "No se pudo actualizar el Post", "error");
}
export function typeErrorGuardarPost() {
    swal.fire("Error!", "No se han podido guardar los posts", "error");
}
export function typeErrorObtenerPagina() {
    swal.fire("Error!", "No hay pagina asignada a esta Empresa", "error");
}
export function typeErrorComentarios() {
    swal.fire("Error!", "Este post no posee comentarios a mostrar", "error");
}
export function typeErrorDescargaGeneral() {
    swal.fire("Error!", "No se ha podido descargar, intentalo más tarde", "error");
}
export function typeErrorAnalisis() {
    swal.fire("Error!", "No se ha podido analizar los tweets de este rango, favor intenta más tarde o con otro rango de fechas", "error");
}
export function typeErrorInforme() {
    swal.fire("Error!", "No se ha podido analizar en este rango de fechas, favor intenta más tarde o con otro rango de fechas", "error");
}
export function typeErrorGuardarKpi() {
    swal.fire("Error!", "No se han podido guardar los KPI. \n Ya existen datos guardados en esta fecha para esta cuenta", "error");
}
export function typeErrorFechasIncorrectas() {
    swal.fire("Error!", "Ha ingresado un rango de fechas incorrectas. No se puede calcular entre el mismo día", "error");
}
export function typeErrorFechasSuperior() {
    swal.fire("Error!", "Ha ingresado un rango de fechas incorrectas. No se puede calcular fecha superior a hoy", "error");
}
export function typeErrorNoencontroKpi() {
    swal.fire("Error!", "No se han encontrado KPI en la fecha ingresada.", "error");
}
export function typeErrorAsignar() {
    swal.fire("Error!", "No se ha podido asignar al CM, ya se encuentra asignado a esta Empresa!", "error");
}
export function typeErrorLenguajeValor() {
    swal.fire("Error!", "El valor ingresado no puede ser menor a -5 y mayor 5", "error");
}
export function typeErrorLenguajeDuplicado() {
    swal.fire("Error!", "Ya existe esta palabra ingresada", "error");
}
export function typeErrorLenguajeActualizar() {
    swal.fire("Error!", "No se ha podido actualizar la palabra", "error");
}
export function typeErrorLenguajeEliminar() {
    swal.fire("Error!", "No se ha podido eliminar la palabra", "error");
}
export function typeSuccessLenguaje() {
    swal.fire("Genial!", "Se ha registrado correctamente la nueva palabra!", "success");
}
export function typeSuccessLenguajeActualizado() {
    swal.fire("Genial!", "Se ha actualizado correctamente la palabra!", "success");
}
export function typeSuccessLenguajeEliminado() {
    swal.fire("Genial!", "Se ha eliminado correctamente la palabra!", "success");
}
//Empresa:
export function typeErrorEmpresa() {
    swal.fire("Error!", "La Empresa ya se encuenta registrada", "error");
}
export function typeSuccessEmpresa() {
    swal.fire("Genial!", "Se ha registrado una Empresa Nueva!", "success");
}
export function typeErrorActualizarEmpresa() {
    swal.fire("Error!", "No se pudo actualizar la empresa, intealo más tarde", "error");
}
export function typeSuccessActualizarEmpresa() {
    swal.fire("Genial!", "Se ha actualizado correctamente la Empresa!", "success");
}
export function typeSuccessActualizarCliente() {
    swal.fire("Buen trabajo!", "Se ha actualizado el usuario de manera satisfactoria!", "success");
}
export function typeErrorActualizarCliente() {
    swal.fire("Error!", "No se pudo actualizar el usuario, intealo más tarde", "error");
}
export function typeSuccessEliminarCliente() {
    swal.fire("Buen trabajo!", "Se ha eliminado al usuario de manera satisfactoria!", "success");
}
export function typeSuccessEliminarAsig() {
    swal.fire("Buen trabajo!", "Se ha eliminado correctamente la asignacion!", "success");
}
export function typeSuccessEliminarAlerta() {
    swal.fire("Buen trabajo!", "Se ha eliminado correctamente la alerta!", "success");
}
export function typeSuccessEliminarCRelevante() {
    swal.fire("Buen trabajo!", "Se ha eliminado correctamente la cuenta relevante!", "success");
}
export function typeSuccessEliminarGoogleAlerts() {
    swal.fire("Buen trabajo!", "Se ha eliminado correctamente la alerta de google!", "success");
}
export function typeErrorGoogleAlertsEliminado() {
    swal.fire("Error!", "No se pudo eliminar la alerta de google!", "error");
}
export function typeSuccessEliminarAlertaPrensa() {
    swal.fire("Buen trabajo!", "Se ha eliminado correctamente la alerta de prensa digital!", "success");
}
export function typeErrorAlertaPrensaEliminado() {
    swal.fire("Error!", "No se pudo eliminar la alerta de prensa digital!", "error");
}

//NO HAY ENTRADAS DISPONIBLES
export function nohayEntradas() {
    swal.fire({ title: "Lo sentimos", text: "No hay entradas disponibles, intentalo más tarde", timer: 2000, showConfirmButton: false });
}







// Simple Alert
export function basicAlert() {
    swal.fire("Here's a message!");
}

// Alert with Title
export function withTitle() {
    swal.fire("Here's a message!", "It's pretty, isn't it?");
}

//  HTML Alert
export function htmlAlert() {
    swal.fire({
        title: 'HTML <small>Title</small>!',
        html: 'A custom <span style="color:#F6BB42">html<span> message.'
    });
}

// Question Type Alert
export function typeQuestion() {
    swal.fire("Question", "Are You Sure?", "question");
}

// Success Type Alert
export function typeSuccess() {
    swal.fire("Good job!", "You clicked the button!", "success");
}

// Info Type Alert
export function typeInfo() {
    swal.fire("Info!", "You clicked the button!", "info");
}

// Warning Type Alert
export function typeWarning() {
    swal.fire("Warning!", "You clicked the button!", "warning");
}

// Error Type Alert
export function typeError() {
    swal.fire("Error!", "You clicked the button!", "error");
}

// Custom Icon
export function customIcon() {
    swal.fire({ title: "Sweet!", text: "Here's a custom image.", imageUrl: "./assets/img/portrait/avatars/avatar-08.png" });
}

// Auto close timer
export function autoClose() {
    swal.fire({ title: "Auto close alert!", text: "I will close in 2 seconds.", timer: 2000, showConfirmButton: false });
}



//Empresa:

export function typeErrorEmpresa2(){
    swal.fire("Error!", "No se pudo registrar la empresa, favor intentalo más tarde", "error" );
}
export function typeErrorEvento(){
    swal.fire("Error!", "Error Evento API!", "error" );
}
export function typeErrorEvento2(){
    swal.fire("Info!", "El Evento ya se encuentra creado. Debe ingresar uno nuevo!", "info" );
}
//Profesion
export function typeErrorProfesion() {
    swal.fire("Error!", "La Profesion no se ha podido Registrar! \n o ya se encuenta registrada", "error");
}
export function typeSuccessProfesion() {
    swal.fire("Genial!", "Se ha registrado una Profesion Nueva!", "success");
}
export function typeErrorProfesionApi(){
    swal.fire("Error!", "Error API!", "error" );
}
// Allow Outside Click
export function outsideClick() {
    swal.fire({
        title: 'Click outside to close!',
        text: 'This is a cool message!',
        allowOutsideClick: true
    });
}

// Ajax Request
export function ajaxRequest() {
    swal.fire({
        title: 'Submit email to run ajax request',
        input: 'email',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        showLoaderOnConfirm: true,
        preConfirm: function () {
            return new Promise(function (resolve) {
                setTimeout(function () {
                    resolve('');
                }, 2000);
            });
        },
        allowOutsideClick: false
    }).then(function (email) {
        if (email) {
            swal.fire({
                type: 'success',
                title: 'Ajax request finished!',
                html: 'Submitted email: ' + email
            });
        }
    })
}

// Button Options
export function customButton() {
    swal.fire({
        title: '<i>HTML</i> <u>example</u>',
        type: 'info',
        html:
        'You can use <b>bold text</b>, ' +
        '<a href="//github.com">links</a> ' +
        'and other HTML tags',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Great!',
        cancelButtonText:
        '<i class="fa fa-thumbs-down"></i> Opps!'
    })
}

// Prompt Function
// export function promptFunction() {
//     swal.fire.setDefaults({
//         input: 'text',
//         confirmButtonText: 'Next &rarr;',
//         showCancelButton: true,
//         progressSteps: ['1', '2', '3']
//       })

//       var steps = [
//         {
//           title: 'Question 1',
//           text: 'Chaining swal.fire2 modals is easy'
//         },
//         'Question 2',
//         'Question 3'
//       ]

//       swal.fire.queue(steps).then((result) => {
//         swal.fire.resetDefaults()

//         if (result.value) {
//           swal.fire({
//             title: 'All done!',
//             html:
//               'Your answers: <pre>' +
//                 JSON.stringify(result.value) +
//               '</pre>',
//             confirmButtonText: 'Lovely!'
//           })
//         }
//       })

// }

// Confirm Button Action
// export function confirmText() {
//     swal.fire({
//         title: 'Are you sure?',
//         text: "You won't be able to revert this!",
//         type: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#0CC27E',
//         cancelButtonColor: '#FF586B',
//         confirmButtonText: 'Text Changed',
//         cancelButtonText: "No, cancel"
//     }).then(function (isConfirm) {
//         if (isConfirm) {
//             swal.fire(
//                 'Changed!',
//                 'Confirm button text was changed!!',
//                 'success'
//             );
//         }
//     }).catch(swal.fire.noop);
// }

export function eliminarEmpresa(nombreEmpresa){
    return new Promise(function (resolve, reject) {
  swal.fire({
      title: 'Estas seguro de eliminar '+nombreEmpresa,
      text: "Esto eliminara toda la información con respecto a "+nombreEmpresa,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#D93832',
      cancelButtonColor: '#6D6E70',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      confirmButtonClass: 'btn btngris btn-raised mr-5',
      cancelButtonClass: 'btn btnrojo btn-raised',
      buttonsStyling: true
  }).then(function (res) {
    if (res.dismiss) {
        swal.fire(
            'Cancelado',
            'No se ha eliminado la empresa',
            'error'
        )
        reject(0)
    }else{
      resolve(1);
      swal.fire({
        title:'Eliminado!',
        text:'Se ha eliminado correctamente toda la información correspondiente a '+nombreEmpresa,
        type:'success',
      }

      )
    }

  })
  });
}

// Confirm & Cancel Button
export function confirmCancelButton() {
    swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0CC27E',
        cancelButtonColor: '#FF586B',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        confirmButtonClass: 'btn btn-success btn-raised mr-5',
        cancelButtonClass: 'btn btn-danger btn-raised',
        buttonsStyling: false
    }).then(function () {
        swal.fire(
            'Deleted!',
            'Your imaginary file has been deleted.',
            'success'
        )
    }, function (dismiss) {
        // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
        if (dismiss === 'cancel') {
            swal.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
            )
        }
    })
}

// Chaining modals / Steps
// export function steps() {
//     swal.fire.setDefaults({
//       confirmButtonText: 'Next &rarr;',
//       showCancelButton: true,
//       cancelButtonColor: '#FF586B',
//       animation: false
//     });

//     var steps = [
//       {
//         title: 'Step 1',
//         text: 'Chaining modals is easy with Step 1'
//       },
//       {
//         title: 'Step 2',
//         text: 'Chaining modals is easy with Step 2'
//       },
//       {
//         title: 'Step 3',
//         text: 'Chaining modals is easy with Step 3'
//       },
//     ];

//     swal.fire.queue(steps).then(function() {
//       swal.fire({
//         title: 'All done!',
//         text: 'Great job :)',
//         confirmButtonText: 'Lovely!',
//         showCancelButton: false
//       });
//     }).then(function() {
//       swal.fire.resetDefaults();
//     }).catch(swal.fire.noop);
// }
