﻿
(function ($) {
    $.fn.inputFilter = function (inputFilter) {
        return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function () {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }
        });
    };
}(jQuery));

//Crear calendario pagina principal
function crearCalendarioPaginaPrincipal(inicioFecha, finFecha) {

    var inicioFecha = "/" + $("#inicioFecha").val().substring(3, $("#inicioFecha").val().length - 3) + "/";
    var finFecha = "/" + $("#finFecha").val().substring(3, $("#finFecha").val().length - 3) + "/";

    //Control de kendoCalendar
    var dates = [];
    var fechas = $("#fechasConcatendas").val().split(",")

    for (var index = 0; index < fechas.length; index++) {
        dates.push(new Date(fechas[index]));
    }

    $(".kendocalendar").kendoDatePicker({
        format: "dd/MM/yyyy",
        min: inicioFecha,
        max: finFecha,
        disableDates: dates
        , change: function () {
            if ($("#NumDias0").val() != '') {
                //Calcular la fecha fin de vacaciones
                $.getJSON("/Anotador/CalcularFechaFin", {
                    NumeroDias: parseInt($("#NumDias0").val()),
                    FechaInicio: $("#kendocalendar_0").val(),
                    DiasFestivosSabadosDomingos: $("#fechasConcatendas").val()
                }, function (oRespuesta) {
                    switch (oRespuesta.Codigo) {

                        case "0":
                            var fechas = oRespuesta.Resultado.Data.split("/");
                            $("#kendocalendar_1").val(new Date(parseInt(fechas[2]), parseInt(fechas[1] - 1), parseInt(fechas[0])).toJSON().slice(0, 10).split('-').reverse().join('/'));
                            break;

                        case "-1":

                            $("#kendocalendar_1").val('');

                            swal.fire({
                                text: respuesta.Mensaje,
                                type: 'warning',
                                confirmButtonText: "OK",
                                confirmButtonColor: '#00AFF0',
                                allowOutsideClick: false,
                                allowEscapeKey: false
                            });
                            break;
                    }
                })
            }
        }
    });
}

//Creacion de la grid
function crearGrid() {
    $("#rowSelection").kendoGrid({
        dataSource: {
            data: "",
            pageSize: 10
        },
        selectable: false,
        resizable: true,
        pageable: {
            buttonCount: 5
        },
        scrollable: true,
        columns: [
            {
                field: "nmroDcmnto",
                title: "Documento",
                width: 100,
                media: "(min-width: 50px)",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight: bold;"
                },
            },
            {
                field: "nmbre_cmplto",
                title: "Nombre completo",
                width: 100,
                media: "(min-width: 50px)",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight: bold;"
                },
            },
            {
                field: "nmro_ds",
                title: "Nro. de días a disfrutar",
                width: 100,
                media: "(min-width: 50px)",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight: bold;"
                }
            },
            {
                field: "fcha_inco_vccns",
                title: "Inicio de vacaciones",
                width: 100,
                media: "(min-width: 50px)",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight: bold;"
                },
                template: "#= kendo.toString(kendo.parseDate(fcha_inco_vccns), 'dd/MM/yyyy') #"
            },
            {
                field: "fcha_fn_vcc",
                title: "Fin de vacaciones",
                width: 100,
                media: "(min-width: 50px)",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight: bold;"
                },
                template: "#= kendo.toString(kendo.parseDate(fcha_fn_vcc), 'dd/MM/yyyy') #"
            },
            {
                field: "nmbrs_slctnte",
                title: "Nombres",
                width: 100,
                media: "(min-width: 100px)",
                hidden: true,
                headerAttributes: {
                    style: "text-align: center"
                }
            },
            {
                field: "apllds_slctnte",
                title: "Apellidos",
                width: 100,
                media: "(min-width: 100px)",
                hidden: true,
                headerAttributes: {
                    style: "text-align: center"
                }
            },
            {
                field: "sbdo_hbl",
                title: "Sabado Habil",
                width: 100,
                media: "(min-width: 50px)",
                hidden: true,
                headerAttributes: {
                    style: "text-align: center"
                }
            },
            {
                field: "fcha_hra_aprvc",
                title: "Fecha Aprobacion",
                width: 100,
                media: "(min-width: 50px)",
                hidden: true,
                headerAttributes: {
                    style: "text-align: center"
                }
            },
            {
                field: "fcha_hra_rgstro_nvdd",
                title: "Fecha Registro",
                width: 100,
                media: "(min-width: 50px)",
                hidden: true,
                headerAttributes: {
                    style: "text-align: center"
                }
            },
            {
                field: "crreo_slctnte",
                title: "Correo Solicitante",
                width: 100,
                media: "(min-width: 50px)",
                hidden: true,
                headerAttributes: {
                    style: "text-align: center"
                }
            },
            {
                field: "crreo_jfe_slctnte",
                title: "Correo Jefe Solicitante",
                width: 100,
                media: "(min-width: 50px)",
                hidden: true,
                headerAttributes: {
                    style: "text-align: center"
                }
            },
            {
                field: "codEmpldo",
                title: "Codigo Empleado",
                width: 100,
                media: "(min-width: 50px)",
                hidden: true,
                headerAttributes: {
                    style: "text-align: center"
                }
            },
            {
                field: "idEstdoSlctd",
                title: "Estado Solicitud",
                width: 100,
                media: "(min-width: 50px)",
                hidden: true,
                headerAttributes: {
                    style: "text-align: center"
                }
            },
            {
                field: "scdd",
                title: "Sociedad",
                width: 100,
                media: "(min-width: 50px)",
                hidden: true,
                headerAttributes: {
                    style: "text-align: center"
                }
            },
            {
                field: "nmro_ds_dspnbls",
                title: "Numero de dias disponibles",
                width: 100,
                media: "(min-width: 50px)",
                hidden: true,
                headerAttributes: {
                    style: "text-align: center"
                }
            },
            {
                field: "MinimoDias",
                title: "Minimo dias motor de reglas",
                width: 100,
                media: "(min-width: 50px)",
                hidden: true,
                headerAttributes: {
                    style: "text-align: center"
                }
            },
            {
                field: "InicioFecha",
                title: "Fecha de inicio para el calendario de la modal",
                width: 100,
                media: "(min-width: 50px)",
                hidden: true,
                headerAttributes: {
                    style: "text-align: center"
                }
            },
            {
                field: "FinFecha",
                title: "Fecha de Fin para el calendario de la modal",
                width: 100,
                media: "(min-width: 50px)",
                hidden: true,
                headerAttributes: {
                    style: "text-align: center"
                }
            },
            {
                field: "DiasFestivosSabadosDomingos",
                title: "Cadena de string con los dias festivos, sabados y domingos",
                width: 100,
                media: "(min-width: 50px)",
                hidden: true,
                headerAttributes: {
                    style: "text-align: center"
                }
            },
            {
                field: "NroMinDiasCorreoCompensacion",
                title: "Minimo de dias donde se debe enviar el correo de compensacion y nomina",
                width: 100,
                media: "(min-width: 50px)",
                hidden: true,
                headerAttributes: {
                    style: "text-align: center"
                }
            },
            {
                field: "CorreoCompensacion",
                title: "Lista de correos de compensacion y nomina",
                width: 100,
                media: "(min-width: 50px)",
                hidden: true,
                headerAttributes: {
                    style: "text-align: center"
                }
            },
            {
                title: "Acciones",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight: bold;"
                },
                columns: [
                    {
                        width: 80,
                        command: [
                            {
                                name: "Edit",
                                text: "Editar",
                                click: function (e) {


                                    //Se identifica la fila en la cual se le dio click al boton editar
                                    var item = this.dataItem($(e.currentTarget).closest("tr"));

                                    //Se abre la pantalla modal
                                    $("#ModalOtrosColaboradores").modal({
                                        //Evitar que se cierre la modal cuando se da click por fuera de ella
                                        backdrop: 'static'
                                    });


                                    //Se asignan los valores correspondientes
                                    $("#txtCedulaOtros").val(item.nmroDcmnto);
                                    $("#SpanNombreEmpleado1").html(item.nmbrs_slctnte);
                                    $("#SpanApellidoEmpleado1").html(item.apllds_slctnte);
                                    $("#SpanNumDias1").html(item.nmro_ds_dspnbls);
                                    $("#NumDias1").val(item.nmro_ds);
                                    $("#MinimoDiasModal").val(item.MinimoDias);
                                    $("#SabadoHabilModal").val(item.sbdo_hbl);
                                    $("#DiasFestivosSabadosDomingosModal").val(item.DiasFestivosSabadosDomingos);

                                    //Se muestran los botones nesesarios y se ocultan los que no se nesesitan
                                    $("#btnAgregar2").hide();
                                    $("#btnAgregarModal").hide();
                                    $("#btnEditarModal").show();


                                    //Se realizan las asignaciones correspondientes para crear el control del calendario
                                    var fechasConcatendasModal = item.DiasFestivosSabadosDomingos;
                                    var inicioFechaModal = item.InicioFecha;
                                    var finFechaModal = item.FinFecha;
                                    var datesModal = [];
                                    var fechasModal = fechasConcatendasModal.split(",")

                                    for (var index = 0; index < fechasModal.length; index++) {
                                        datesModal.push(new Date(fechasModal[index]));
                                    }

                                    var kendoDatePicker = $("#datepicker").data("kendoDatePicker");
                                    kendo.destroy(kendoDatePicker);
                                    $("#datepickerDiv").empty();
                                    $("#datepickerDiv").append('<input id="datepicker" style="width:inherit" />');

                                    $("#datepicker").kendoDatePicker({
                                        format: "dd/MM/yyyy",
                                        min: inicioFechaModal,
                                        max: finFechaModal,
                                        disableDates: datesModal,
                                        change: function () {
                                            if ($("#NumDias1").val() != '') {
                                                //Calcular la fecha fin de vacaciones
                                                $.getJSON("/Anotador/CalcularFechaFin", {
                                                    NumeroDias: parseInt($("#NumDias1").val()),
                                                    FechaInicio: $("#datepicker").val(),
                                                    DiasFestivosSabadosDomingos: $("#DiasFestivosSabadosDomingosModal").val(),
                                                }, function (oRespuesta) {
                                                    switch (oRespuesta.Codigo) {

                                                        case "0":

                                                            var fechas = oRespuesta.Resultado.Data.split("/");
                                                            $("#kendocalendar_2").val(new Date(parseInt(fechas[2]), parseInt(fechas[1] - 1), parseInt(fechas[0])).toJSON().slice(0, 10).split('-').reverse().join('/'));
                                                            break;

                                                        case "-1":
                                                            swal.fire({
                                                                text: oRespuesta.Mensaje,
                                                                type: 'warning',
                                                                confirmButtonText: "OK",
                                                                confirmButtonColor: '#00AFF0',
                                                                allowOutsideClick: false,
                                                                allowEscapeKey: false
                                                            }).then((result) => {
                                                                if (result.value) {

                                                                }
                                                            });
                                                            break;
                                                    }
                                                })
                                            }
                                            else {
                                                $("#kendocalendar_2").val('');
                                            }
                                        }
                                    });

                                    $("#datepicker").attr("readonly", true);
                                    $("#datepicker").attr("placeholder", "DD/MM/AAAA");

                                    $("#datepicker").val(kendo.toString(kendo.parseDate(item.fcha_inco_vccns), 'dd/MM/yyyy'));
                                    $("#kendocalendar_2").val(kendo.toString(kendo.parseDate(item.fcha_fn_vcc), 'dd/MM/yyyy'));

                                }
                            }
                        ]
                    },
                    {
                        width: 90,
                        command: [
                            {
                                name: "Delete",
                                text: "Eliminar",
                                click: function (e) {
                                    swal.fire({
                                        text: "¿Está seguro que desea eliminar este registro?",
                                        type: 'warning',
                                        confirmButtonText: "Eliminar",
                                        confirmButtonColor: '#00AFF0',
                                        showCancelButton: true,
                                        cancelButtonText: "Cancelar",
                                        cancelButtonColor: '#5a6268',
                                        allowOutsideClick: false,
                                        allowEscapeKey: false
                                    }).then((result) => {
                                        if (result.value) {

                                            var item = this.dataItem($(e.currentTarget).closest("tr"));
                                            var grid = $("#rowSelection").data("kendoGrid");

                                            $(grid.dataSource.data()).each(function (index) {
                                                if (this.nmroDcmnto == item.nmroDcmnto) {
                                                    rowIndex = index;
                                                    row = grid.tbody.find(">tr:not(.k-grouping-row)").eq(rowIndex);
                                                    grid.removeRow(row);
                                                    swal.fire({
                                                        text: "Registro eliminado correctamente",
                                                        type: 'success',
                                                        confirmButtonText: "OK",
                                                        confirmButtonColor: '#00AFF0',
                                                        allowOutsideClick: false,
                                                        allowEscapeKey: false
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    });
};

//Validacion del campo numero de dias en pantalla principal
function validarNumDias() {
    $("#NumDias0").focusout(function () {
        if ($("#NumDias0").val() != '') {
            $.getJSON("/Anotador/ValidarCantidadDias", { NumeroDias: parseInt($("#NumDias0").val()), NumDiasDisponibles: parseFloat($("#SpanNumDias0").html()), MinimoDias: parseInt($("#MinimoDias").val()) }, function (respuesta) {

                switch (respuesta.Codigo) {

                    case "1":

                        $("#kendocalendar_1").val('');
                        $("#NumDias0").val('');
                        $("#NumDias0").focus();

                        swal.fire({
                            text: respuesta.Mensaje,
                            type: 'warning',
                            confirmButtonText: "OK",
                            confirmButtonColor: '#00AFF0',
                            allowOutsideClick: false,
                            allowEscapeKey: false
                        });

                        break;

                    case "2":

                        $("#kendocalendar_1").val('');
                        $("#NumDias0").val('');
                        $("#NumDias0").focus();

                        swal.fire({
                            text: respuesta.Mensaje,
                            type: 'warning',
                            confirmButtonText: "OK",
                            confirmButtonColor: '#00AFF0',
                            allowOutsideClick: false,
                            allowEscapeKey: false
                        });
                        break;

                    case "3":

                        $("#kendocalendar_1").val('');
                        $("#NumDias0").val('');
                        $("#NumDias0").focus();

                        swal.fire({
                            text: respuesta.Mensaje,
                            type: 'warning',
                            confirmButtonText: "OK",
                            confirmButtonColor: '#00AFF0',
                            allowOutsideClick: false,
                            allowEscapeKey: false
                        });
                        break;
                }
            })
        }
        else {
            $("#kendocalendar_1").val('');
        }
    });
}

function calcularFechaFin() {
    $("#NumDias0").change(function () {
        if ($("#NumDias0").val() != '' && $("#kendocalendar_0").val() != '') {
            $.getJSON("/Anotador/CalcularFechaFin", {
                NumeroDias: parseInt($("#NumDias0").val()),
                FechaInicio: $("#kendocalendar_0").val(),
                DiasFestivosSabadosDomingos: $("#fechasConcatendas").val()
            }, function (oRespuesta) {
                switch (oRespuesta.Codigo) {

                    case "0":
                        var fechas = oRespuesta.Resultado.Data.split("/");
                        $("#kendocalendar_1").val(new Date(parseInt(fechas[2]), parseInt(fechas[1] - 1), parseInt(fechas[0])).toJSON().slice(0, 10).split('-').reverse().join('/'));
                        break;

                    case "-1":
                        swal.fire({
                            text: oRespuesta.Mensaje,
                            type: 'warning',
                            confirmButtonText: "OK",
                            confirmButtonColor: '#00AFF0',
                            allowOutsideClick: false,
                            allowEscapeKey: false
                        }).then((result) => {
                            if (result.value) {
                                $("#kendocalendar_1").val('');
                            }
                        });
                        break;
                }
            })
        }
    });
}

//Evento del boton aregar dentro de la ventana Principal
function agregarItemLista() {
    $("#btnAgregar0").click(function () {
        if ($("#NroIdentificacionHidden").val() != '' && $("#NumDias0").val() != '' && $("#kendocalendar_0").val() != '') {

            $("#DivFondoTrasparente").show();
            $("#DivCirculoAzul").show();

            $.post("../Anotador/ConsultaFechasSolicitudExistentes",
                {
                    oIdentificacion: $("#NroIdentificacionHidden").val(),
                    FechaInicio: $("#kendocalendar_0").val(),
                    FechaFin: $("#kendocalendar_1").val(),
                }, function (oRespuestaFechasSolicitudes) {

                    $("#DivFondoTrasparente").hide();
                    $("#DivCirculoAzul").hide();

                    switch (oRespuestaFechasSolicitudes.Codigo) {

                        case "-1":
                            swal.fire({
                                text: oRespuestaFechasSolicitudes.Mensaje,
                                type: 'error',
                                confirmButtonText: "OK",
                                confirmButtonColor: '#00AFF0',
                                allowOutsideClick: false,
                                allowEscapeKey: false
                            });
                            break;

                        case "-3":
                            swal.fire({
                                text: oRespuestaFechasSolicitudes.Mensaje,
                                type: 'error',
                                confirmButtonText: "OK",
                                confirmButtonColor: '#00AFF0',
                                allowOutsideClick: false,
                                allowEscapeKey: false
                            });
                            break;

                        case "1":

                            $("#DivFondoTrasparente").show();
                            $("#DivCirculoAzul").show();



                            if ($("#TieneVacacione").val() == "SI") {

                                $("#DivFondoTrasparente").hide();
                                $("#DivCirculoAzul").hide();

                                swal.fire({
                                    text: "Usted ya cuenta con una solicitud de vacaciones pendiente de aprobación",
                                    type: 'warning',
                                    confirmButtonText: "OK",
                                    confirmButtonColor: '#00AFF0',
                                    allowOutsideClick: false,
                                    allowEscapeKey: false
                                });
                            }
                            else {
                                $.post("../Anotador/AgregarOEditarEmpleado",
                                    {
                                        NroIdentificacion: $("#NroIdentificacionHidden").val(),
                                        NombresEmpleado: $("#NombresEmpleado").val(),
                                        ApellidosEmpleado: $("#ApellidosEmpleado").val(),
                                        NumeroDias: $("#NumDias0").val(),
                                        NumeroDiasDisponibles: $("#SpanNumDias0").html(),
                                        EsEdit: false,
                                        EsModal: false,
                                        FechaInicio: $("#kendocalendar_0").val(),
                                        FechaFin: $("#kendocalendar_1").val(),
                                        DataActual: JSON.stringify($('#rowSelection').data("kendoGrid").dataSource.data()),
                                        oRespuestaSAP: $("#oRespuestaSAPModels").val(),
                                        DiasFestivosSabadosDomingos: $("#fechasConcatendas").val(),
                                        oRespuestaMotor: $("#oRespuestaMotor").val(),
                                        oMinimoDiasCorreoCompensacion: $("#NroMinDiasCorreoCompensacion").val(),
                                        oCorreoCompensacion: $("#CorreoCompensacion").val()
                                    },
                                    function (oRespuestaAgregarOEditarEmpleado) {

                                        switch (oRespuestaAgregarOEditarEmpleado.Codigo) {

                                            case "1":

                                                $("#DivFondoTrasparente").hide();
                                                $("#DivCirculoAzul").hide();

                                                $('#rowSelection').data("kendoGrid").dataSource.data(oRespuestaAgregarOEditarEmpleado.Resultado.Data);

                                                $("#NumDias0").val('');
                                                $("#kendocalendar_0").val('');
                                                $("#kendocalendar_1").val('');
                                                $('#ModalOtrosColaboradores').modal('hide')

                                                swal.fire({
                                                    text: oRespuestaAgregarOEditarEmpleado.Mensaje,
                                                    type: 'success',
                                                    confirmButtonText: "OK",
                                                    confirmButtonColor: '#00AFF0',
                                                    allowOutsideClick: false,
                                                    allowEscapeKey: false
                                                });
                                                break

                                            case "2":

                                                $("#DivFondoTrasparente").hide();
                                                $("#DivCirculoAzul").hide();

                                                $('#rowSelection').data("kendoGrid").dataSource.data(oRespuestaAgregarOEditarEmpleado.Resultado.Data);

                                                swal.fire({
                                                    text: oRespuestaAgregarOEditarEmpleado.Mensaje,
                                                    type: 'warning',
                                                    confirmButtonText: "OK",
                                                    confirmButtonColor: '#00AFF0',
                                                    allowOutsideClick: false,
                                                    allowEscapeKey: false
                                                });

                                                break

                                            case "3":

                                                $("#DivFondoTrasparente").hide();
                                                $("#DivCirculoAzul").hide();

                                                $('#rowSelection').data("kendoGrid").dataSource.data(oRespuestaAgregarOEditarEmpleado.Resultado.Data);
                                                swal.fire({
                                                    text: oRespuestaAgregarOEditarEmpleado.Mensaje,
                                                    type: 'warning',
                                                    confirmButtonText: "OK",
                                                    confirmButtonColor: '#00AFF0',
                                                    allowOutsideClick: false,
                                                    allowEscapeKey: false
                                                });
                                                break

                                            case "-1":

                                                $("#DivFondoTrasparente").hide();
                                                $("#DivCirculoAzul").hide();

                                                swal.fire({
                                                    text: oRespuestaAgregarOEditarEmpleado.Mensaje,
                                                    type: 'error',
                                                    confirmButtonText: "OK",
                                                    confirmButtonColor: '#00AFF0',
                                                    allowOutsideClick: false,
                                                    allowEscapeKey: false
                                                });

                                                break
                                        }
                                    });
                            }

                            break

                        case "2":
                            swal.fire({
                                text: oRespuestaFechasSolicitudes.Mensaje,
                                type: 'warning',
                                confirmButtonText: "OK",
                                confirmButtonColor: '#00AFF0',
                                allowOutsideClick: false,
                                allowEscapeKey: false
                            });
                            break;

                    }
                });
        }
        else {
            swal.fire({
                text: "Debe ingresar el número de días y la fecha de inicio para la solicitud de vacaciones",
                type: 'warning',
                confirmButtonText: "Ok",
                confirmButtonColor: '#00AFF0',
                allowOutsideClick: false,
                allowEscapeKey: false
            })
        };
    });
}

//Ventana Modal
//Validacion del campo numero de dias
function validarNumDiasModal() {
    $("#NumDias1").focusout(function () {
        if ($("#NumDias1").val() != '') {
            $.getJSON("/Anotador/ValidarCantidadDias", { NumeroDias: parseInt($("#NumDias1").val()), NumDiasDisponibles: parseFloat($("#SpanNumDias1").html()), MinimoDias: $("#MinimoDiasModal").val() }, function (respuesta) {

                switch (respuesta.Codigo) {

                    case "1":

                        $("#kendocalendar_2").val('');
                        $("#NumDias1").val('');
                        $("#NumDias1").focus();

                        swal.fire({
                            text: respuesta.Mensaje,
                            type: 'warning',
                            confirmButtonText: "OK",
                            confirmButtonColor: '#00AFF0',
                            allowOutsideClick: false,
                            allowEscapeKey: false
                        });
                        break;

                    case "2":

                        $("#kendocalendar_2").val('');
                        $("#NumDias1").val('');
                        $("#NumDias1").focus();

                        swal.fire({
                            text: respuesta.Mensaje,
                            type: 'warning',
                            confirmButtonText: "OK",
                            confirmButtonColor: '#00AFF0',
                            allowOutsideClick: false,
                            allowEscapeKey: false
                        });
                        break;

                    case "3":

                        $("#kendocalendar_2").val('');
                        $("#NumDias1").val('');
                        $("#NumDias1").focus();

                        swal.fire({
                            text: respuesta.Mensaje,
                            type: 'warning',
                            confirmButtonText: "OK",
                            confirmButtonColor: '#00AFF0',
                            allowOutsideClick: false,
                            allowEscapeKey: false
                        });
                        break;
                }
            })
        }
        else {
            $("#kendocalendar_2").val('');
        }
    });
}

//Calcular FechaFin Modal
function calcularFechaFinModal() {
    $("#NumDias1").change(function () {
        if ($("#NumDias1").val() != '' && $("#datepicker").val() != '') {
            $.getJSON("/Anotador/CalcularFechaFin", {
                NumeroDias: parseInt($("#NumDias1").val()),
                FechaInicio: $("#datepicker").val(),
                DiasFestivosSabadosDomingos: $("#DiasFestivosSabadosDomingosModal").val()
            }, function (oRespuesta) {
                switch (oRespuesta.Codigo) {

                    case "0":
                        var fechas = oRespuesta.Resultado.Data.split("/");
                        $("#kendocalendar_2").val(new Date(parseInt(fechas[2]), parseInt(fechas[1] - 1), parseInt(fechas[0])).toJSON().slice(0, 10).split('-').reverse().join('/'));
                        break;

                    case "-1":

                        $("#kendocalendar_2").val('');

                        swal.fire({
                            text: oRespuesta.Mensaje,
                            type: 'warning',
                            confirmButtonText: "OK",
                            confirmButtonColor: '#00AFF0',
                            allowOutsideClick: false,
                            allowEscapeKey: false
                        });
                        break;
                }
            })
        }
        else {
            $("#kendocalendar_2").val('');
        }
    });
}

//btnBuscar en la pantalla principal, donde se abre la ventana modal
function buscarEmpleado() {
    $("#btnOtrosColaboradoresModal").click(function () {
        if ($("#txtCedulaOtros").val() != '') {
            var exis = false;

            $($('#rowSelection').data("kendoGrid").dataSource.data()).each(function (index) {
                if (this.nmroDcmnto == $("#txtCedulaOtros").val()) {
                    exis = true;
                }
            });

            if (!exis) {

                $("#DivFondoTrasparente").show();
                $("#DivCirculoAzul").show();

                $.getJSON("/Anotador/ConsultarUserSAP", { NroDocumento: parseInt($("#txtCedulaOtros").val()) }, function (oRespuestaSAP) {

                    switch (oRespuestaSAP.Codigo) {

                        case "6":

                            $("#DivFondoTrasparente").hide();
                            $("#DivCirculoAzul").hide();

                            swal.fire({
                                text: "No se ha identificado la información del jefe inmediato del trabajador. Comuníquese con Gestión Humana",
                                type: 'warning',
                                confirmButtonText: "OK",
                                confirmButtonColor: '#00AFF0',
                                allowOutsideClick: false,
                                allowEscapeKey: false
                            });
                            break;

                        case "5":

                            $("#DivFondoTrasparente").hide();
                            $("#DivCirculoAzul").hide();

                            swal.fire({
                                text: "El trabajador no cuenta con días disponibles para disfrute de vacaciones",
                                type: 'warning',
                                confirmButtonText: "OK",
                                confirmButtonColor: '#00AFF0',
                                allowOutsideClick: false,
                                allowEscapeKey: false
                            });
                            break;

                        case "4":

                            $("#DivFondoTrasparente").hide();
                            $("#DivCirculoAzul").hide();

                            $.post("../Anotador/ConsultaMotorDeReglas", { RespuestaSAP: JSON.stringify(oRespuestaSAP.Resultado.Data) }, function (oRespuestaMotorReglas) {

                                $("#DivFondoTrasparente").show();
                                $("#DivCirculoAzul").show();

                                switch (oRespuestaMotorReglas.Codigo) {
                                    case "1":
                                        $.post("../Anotador/ArmarObjetoPantallaModal", { RespuestaMotor: JSON.stringify(oRespuestaMotorReglas.Resultado.Data), RespuestaSAP: JSON.stringify(oRespuestaSAP.Resultado.Data) }, function (oRespuestaArmarObjetoPantallaModal) {

                                            switch (oRespuestaArmarObjetoPantallaModal.Codigo) {
                                                case "1":

                                                    $("#DivFondoTrasparente").hide();
                                                    $("#DivCirculoAzul").hide();

                                                    //Se manda a abrir la pantalla modal
                                                    $("#ModalOtrosColaboradores").modal({
                                                        //Evitar que se cierre la modal cuando se da click por fuera de ella
                                                        backdrop: 'static'
                                                    });

                                                    //Se muestran botones y se ocultan otros que no son nesesario
                                                    $("#btnAgregarModal").show();
                                                    $("#btnCancelarModal").show();
                                                    $("#btnEditarModal").hide();
                                                    $("#btnAgregar2").hide();

                                                    //Se guardan los valores importantes para poder editar o guardar los registros mas adelante
                                                    $("#MinimoDiasModal").val(oRespuestaArmarObjetoPantallaModal.Resultado.Data.MinimoDias);
                                                    $("#InicioFechaModal").val(oRespuestaArmarObjetoPantallaModal.Resultado.Data.InicioFecha);
                                                    $("#FinFechaModal").val(oRespuestaArmarObjetoPantallaModal.Resultado.Data.FinFecha);
                                                    $("#SabadoHabilModal").val(oRespuestaArmarObjetoPantallaModal.Resultado.Data.SabadoHabil);
                                                    $("#DiasFestivosSabadosDomingosModal").val(oRespuestaArmarObjetoPantallaModal.Resultado.Data.DiasFestivosSabadosDomingos);
                                                    $("#CorreoSolicitanteModal").val(oRespuestaArmarObjetoPantallaModal.Resultado.Data.CorreoSolicitante);
                                                    $("#CorreoJefeSolicitanteModal").val(oRespuestaArmarObjetoPantallaModal.Resultado.Data.CorreoJefeSolicitante);
                                                    $("#CodigoEmpleadoModal").val(oRespuestaArmarObjetoPantallaModal.Resultado.Data.CodigoEmpleado);
                                                    $("#SociedadModal").val(oRespuestaArmarObjetoPantallaModal.Resultado.Data.Sociedad);
                                                    $("#MinimoDiasCorreoCompensacionModal").val(oRespuestaArmarObjetoPantallaModal.Resultado.Data.NroMinDiasCorreoCompensacion);
                                                    $("#CorreoCompensacionModal").val(oRespuestaArmarObjetoPantallaModal.Resultado.Data.CorreoCompensacion);
                                                    $("#SpanNumDias1").html(oRespuestaArmarObjetoPantallaModal.Resultado.Data.NroDias);
                                                    $("#SpanNombreEmpleado1").html(oRespuestaArmarObjetoPantallaModal.Resultado.Data.NombreEmpleado);
                                                    $("#SpanApellidoEmpleado1").html(oRespuestaArmarObjetoPantallaModal.Resultado.Data.ApellidoEmpleado);


                                                    //Se realizan las asignaciones correspondientes para crear el control del calendario
                                                    var fechasConcatendasModal = $("#DiasFestivosSabadosDomingosModal").val();
                                                    var inicioFechaModal = $("#InicioFechaModal").val();
                                                    var finFechaModal = $("#FinFechaModal").val();
                                                    var datesModal = [];
                                                    var fechasModal = fechasConcatendasModal.split(",")
                                                    for (var index = 0; index < fechasModal.length; index++) {
                                                        datesModal.push(new Date(fechasModal[index]));
                                                    }

                                                    var kendoDatePicker = $("#datepicker").data("kendoDatePicker");
                                                    kendo.destroy(kendoDatePicker);
                                                    $("#datepickerDiv").empty();
                                                    $("#datepickerDiv").append('<input id="datepicker" style="width:inherit" />');

                                                    $("#datepicker").kendoDatePicker({
                                                        format: "dd/MM/yyyy",
                                                        min: inicioFechaModal,
                                                        max: finFechaModal,
                                                        disableDates: datesModal,
                                                        change: function () {
                                                            if ($("#NumDias1").val() != '') {
                                                                //Calcular la fecha fin de vacaciones
                                                                $.getJSON("/Anotador/CalcularFechaFin", {
                                                                    NumeroDias: parseInt($("#NumDias1").val()),
                                                                    FechaInicio: $("#datepicker").val(),
                                                                    DiasFestivosSabadosDomingos: $("#DiasFestivosSabadosDomingosModal").val()
                                                                }, function (oRespuesta) {
                                                                    switch (oRespuesta.Codigo) {

                                                                        case "0":

                                                                            var fechas = oRespuesta.Resultado.Data.split("/");
                                                                            $("#kendocalendar_2").val(new Date(parseInt(fechas[2]), parseInt(fechas[1] - 1), parseInt(fechas[0])).toJSON().slice(0, 10).split('-').reverse().join('/'));
                                                                            break;

                                                                        case "-1":
                                                                            swal.fire({
                                                                                text: oRespuesta.Mensaje,
                                                                                type: 'warning',
                                                                                confirmButtonText: "OK",
                                                                                confirmButtonColor: '#00AFF0',
                                                                                allowOutsideClick: false,
                                                                                allowEscapeKey: false
                                                                            }).then((result) => {
                                                                                if (result.value) {
                                                                                    $("#kendocalendar_2").val('');
                                                                                }
                                                                            });
                                                                            break;
                                                                    }
                                                                })
                                                            }
                                                        }
                                                    });

                                                    $("#datepicker").attr("readonly", true);
                                                    $("#datepicker").attr("placeholder", "DD/MM/AAAA");
                                                    break

                                                case "-3":

                                                    $("#DivFondoTrasparente").hide();
                                                    $("#DivCirculoAzul").hide();

                                                    swal.fire({
                                                        text: oRespuestaArmarObjetoPantallaModal.Mensaje,
                                                        type: 'error',
                                                        confirmButtonText: "OK",
                                                        confirmButtonColor: '#00AFF0',
                                                        allowOutsideClick: false,
                                                        allowEscapeKey: false
                                                    });
                                                    break
                                            }
                                        });

                                        break;

                                    case "-1":

                                        $("#DivFondoTrasparente").hide();
                                        $("#DivCirculoAzul").hide();

                                        swal.fire({
                                            text: oRespuestaMotorReglas.Mensaje,
                                            type: 'error',
                                            confirmButtonText: "OK",
                                            confirmButtonColor: '#00AFF0',
                                            allowOutsideClick: false,
                                            allowEscapeKey: false
                                        });
                                        break;

                                    case "-2":

                                        $("#DivFondoTrasparente").hide();
                                        $("#DivCirculoAzul").hide();

                                        swal.fire({
                                            text: oRespuestaMotorReglas.Mensaje,
                                            type: 'error',
                                            confirmButtonText: "OK",
                                            confirmButtonColor: '#00AFF0',
                                            allowOutsideClick: false,
                                            allowEscapeKey: false
                                        });
                                        break;

                                    case "-3":

                                        $("#DivFondoTrasparente").hide();
                                        $("#DivCirculoAzul").hide();

                                        swal.fire({
                                            text: oRespuestaMotorReglas.Mensaje,
                                            type: 'error',
                                            confirmButtonText: "OK",
                                            confirmButtonColor: '#00AFF0',
                                            allowOutsideClick: false,
                                            allowEscapeKey: false
                                        });
                                        break;
                                }
                            });
                            break;

                        case "3":

                            $("#DivFondoTrasparente").hide();
                            $("#DivCirculoAzul").hide();

                            swal.fire({
                                text: oRespuestaSAP.Mensaje,
                                type: 'error',
                                confirmButtonText: "OK",
                                confirmButtonColor: '#00AFF0',
                                allowOutsideClick: false,
                                allowEscapeKey: false
                            });
                            break;

                        case "2":

                            $("#DivFondoTrasparente").hide();
                            $("#DivCirculoAzul").hide();

                            swal.fire({
                                text: oRespuestaSAP.Mensaje,
                                type: 'error',
                                confirmButtonText: "OK",
                                confirmButtonColor: '#00AFF0',
                                allowOutsideClick: false,
                                allowEscapeKey: false
                            });
                            break;

                        case "1":

                            $("#DivFondoTrasparente").hide();
                            $("#DivCirculoAzul").hide();

                            swal.fire({
                                text: oRespuestaSAP.Mensaje,
                                type: 'error',
                                confirmButtonText: "OK",
                                confirmButtonColor: '#00AFF0',
                                allowOutsideClick: false,
                                allowEscapeKey: false
                            });
                            break;

                        case "-1":

                            $("#DivFondoTrasparente").hide();
                            $("#DivCirculoAzul").hide();

                            swal.fire({
                                text: oRespuestaSAP.Mensaje,
                                type: 'warning',
                                confirmButtonText: "OK",
                                confirmButtonColor: '#00AFF0',
                                allowOutsideClick: false,
                                allowEscapeKey: false
                            });

                            break;

                        case "-2":

                            $("#DivFondoTrasparente").hide();
                            $("#DivCirculoAzul").hide();

                            swal.fire({
                                text: oRespuestaSAP.Mensaje,
                                type: 'error',
                                confirmButtonText: "OK",
                                confirmButtonColor: '#00AFF0',
                                allowOutsideClick: false,
                                allowEscapeKey: false
                            });

                            break;


                        case "-3":

                            $("#DivFondoTrasparente").hide();
                            $("#DivCirculoAzul").hide();

                            swal.fire({
                                text: oRespuestaSAP.Mensaje,
                                type: 'error',
                                confirmButtonText: "OK",
                                confirmButtonColor: '#00AFF0',
                                allowOutsideClick: false,
                                allowEscapeKey: false
                            });

                            break;

                        case "-4":

                            $("#DivFondoTrasparente").hide();
                            $("#DivCirculoAzul").hide();

                            swal.fire({
                                text: oRespuestaSAP.Mensaje,
                                type: 'warning',
                                confirmButtonText: "OK",
                                confirmButtonColor: '#00AFF0',
                                allowOutsideClick: false,
                                allowEscapeKey: false
                            });

                            break;

                        case "-5":

                            $("#DivFondoTrasparente").hide();
                            $("#DivCirculoAzul").hide();

                            swal.fire({
                                text: oRespuestaSAP.Mensaje,
                                type: 'warning',
                                confirmButtonText: "OK",
                                confirmButtonColor: '#00AFF0',
                                allowOutsideClick: false,
                                allowEscapeKey: false
                            });

                            break;
                    }
                });
            }
            else {
                swal.fire({
                    text: "El empleado ya se encuentra agregado en la lista. Verifique la información e inténtelo de nuevo",
                    type: 'warning',
                    confirmButtonText: "OK",
                    confirmButtonColor: '#00AFF0',
                    allowOutsideClick: false,
                    allowEscapeKey: false
                });
            }

        }
        else {
            swal.fire({
                text: "Debe ingresar un Nro. de identificación",
                type: 'warning',
                confirmButtonText: "OK",
                confirmButtonColor: '#00AFF0',
                allowOutsideClick: false,
                allowEscapeKey: false
            });
        }
    });
}

//BTN GUARDAR
function guardarPantallaPrincipal(URL) {

    $("#btnAgregar1").click(function () {
        if ($($('#rowSelection').data("kendoGrid").dataSource.data()).length > 0) {

            $("#DivFondoTrasparente").show();
            $("#DivCirculoAzul").show();

            $.post("../Anotador/GuardarSolicitud", {
                NroIdentificacionAnotador: $("#NroIdentificacionHidden").val(),
                NombresEmpleadoAnotador: $("#SpanNombreEmpleado0").html(),
                ApellidosEmpleadoAnotador: $("#SpanApellidoEmpleado0").html(),
                oRespuestaMotor: $("#oRespuestaMotor").val(),
                oDataActual: JSON.stringify($('#rowSelection').data("kendoGrid").dataSource.data()),
                oCorreoAnotador: $("#CorreoAnotador").val(),
            }, function (oRespuestaGuardar) {
                switch (oRespuestaGuardar.Codigo) {
                    case "1":

                        $("#DivFondoTrasparente").hide();
                        $("#DivCirculoAzul").hide();

                        $.post("../Anotador/EnviarNotificacionFlow", {
                            oDataActual: JSON.stringify($('#rowSelection').data("kendoGrid").dataSource.data()),
                            oIdSolicitud: oRespuestaGuardar.Resultado.Data.Resultado,
                            oRespuestaSAP: $("#oRespuestaSAPModels").val(),
                        });

                        //Aqui se debe hacer el envio de la notificacion
                        swal.fire({
                            text: oRespuestaGuardar.Mensaje,
                            type: 'success',
                            confirmButtonText: "OK",
                            confirmButtonColor: '#00AFF0',
                            allowOutsideClick: false,
                            allowEscapeKey: false
                        }).then((result) => {
                            if (result.value) {
                                var url = URL;
                                window.location.href = url
                            }
                        });
                        break

                    case "-3":

                        $("#DivFondoTrasparente").hide();
                        $("#DivCirculoAzul").hide();

                        swal.fire({
                            text: oRespuestaGuardar.Mensaje,
                            type: 'error',
                            confirmButtonText: "OK",
                            confirmButtonColor: '#00AFF0',
                            allowOutsideClick: false,
                            allowEscapeKey: false
                        });
                        break
                }
            });
        }
        else {

            $("#DivFondoTrasparente").hide();
            $("#DivCirculoAzul").hide();

            swal.fire({
                text: "Debe ingresar mínimo un ítem a la lista",
                type: 'warning',
                confirmButtonText: "Ok",
                confirmButtonColor: '#00AFF0',
                allowOutsideClick: false,
                allowEscapeKey: false
            })
        }
    });
}

function limpiarPantalla() {
    //Se limpian los valores de la ventana modal cuando se cierran
    $('#ModalOtrosColaboradores').on('hidden.bs.modal', function () {
        $("#datepicker").data("kendoDatePicker").value(null);
        $("#kendocalendar_2").data("kendoDatePicker").value(null);
        $("#NumDias1").val('');
        $("#txtCedulaOtros").val('');
        $("#MinimoDiasModal").val('');
        $("#InicioFechaModal").val('');
        $("#FinFechaModal").val('');
        $("#SabadoHabilModal").val('');
        $("#DiasFestivosSabadosDomingosModal").val('');
        $("#CorreoSolicitanteModal").val('');
        $("#CorreoJefeSolicitanteModal").val('');
        $("#CodigoEmpleadoModal").val('');
        $("#SociedadModal").val('');
        $("#MinimoDiasCorreoCompensacionModal").val('')
        $("#CorreoCompensacionModal").val('')
        $("#SpanNumDias1").html('');
        $("#SpanNombreEmpleado1").html('');
        $("#SpanApellidoEmpleado1").html('');
    });
}

//Boton de agregar un nuevo registro desde la pantalla modal
function agregarPantallaModal() {
    $("#btnAgregarModal").click(function () {
        if ($("#txtCedulaOtros").val() != '' && $("#NumDias1").val() != '' && $("#datepicker").val() != '') {

            $.post("../Anotador/ConsultaFechasSolicitudExistentes",
                {
                    oIdentificacion: $("#txtCedulaOtros").val(),
                    FechaInicio: $("#datepicker").val(),
                    FechaFin: $("#kendocalendar_2").val(),
                }, function (oRespuestaFechasSolicitudes) {

                    $("#DivFondoTrasparente").hide();
                    $("#DivCirculoAzul").hide();

                    switch (oRespuestaFechasSolicitudes.Codigo) {

                        case "-1":
                            swal.fire({
                                text: oRespuestaFechasSolicitudes.Mensaje,
                                type: 'error',
                                confirmButtonText: "OK",
                                confirmButtonColor: '#00AFF0',
                                allowOutsideClick: false,
                                allowEscapeKey: false
                            });
                            break;

                        case "-3":
                            swal.fire({
                                text: oRespuestaFechasSolicitudes.Mensaje,
                                type: 'error',
                                confirmButtonText: "OK",
                                confirmButtonColor: '#00AFF0',
                                allowOutsideClick: false,
                                allowEscapeKey: false
                            });
                            break;

                        case "1":

                            $.post("../Anotador/AgregarOEditarEmpleado", {
                                NroIdentificacion: $("#txtCedulaOtros").val(),
                                NombresEmpleado: $("#SpanNombreEmpleado1").html(),
                                ApellidosEmpleado: $("#SpanApellidoEmpleado1").html(),
                                NumeroDias: $("#NumDias1").val(),
                                NumeroDiasDisponibles: $("#SpanNumDias1").html(),
                                EsEdit: false,
                                EsModal: true,
                                FechaInicio: $("#datepicker").val(),
                                FechaFin: $("#kendocalendar_2").val(),
                                DataActual: JSON.stringify($('#rowSelection').data("kendoGrid").dataSource.data()),
                                SabadoHabil: $("#SabadoHabilModal").val(),
                                CorreoSolicitante: $("#CorreoSolicitanteModal").val(),
                                CorreoJefeSolicitante: $("#CorreoJefeSolicitanteModal").val(),
                                CodigoEmpleado: $("#CodigoEmpleadoModal").val(),
                                Sociedad: $("#SociedadModal").val(),
                                MinimoDias: $("#MinimoDiasModal").val(),
                                InicioFecha: kendo.toString(kendo.parseDate($("#InicioFechaModal").val()), 'dd/MM/yyyy'),
                                FinFecha: kendo.toString(kendo.parseDate($("#FinFechaModal").val()), 'dd/MM/yyyy'),
                                DiasFestivosSabadosDomingos: $("#DiasFestivosSabadosDomingosModal").val(),
                                oMinimoDiasCorreoCompensacion: $("#MinimoDiasCorreoCompensacionModal").val(),
                                oCorreoCompensacion: $("#CorreoCompensacionModal").val(),

                            }, function (oRespuestaAgregarOEditarEmpleado) {

                                switch (oRespuestaAgregarOEditarEmpleado.Codigo) {

                                    case "1":

                                        $('#rowSelection').data("kendoGrid").dataSource.data(oRespuestaAgregarOEditarEmpleado.Resultado.Data);

                                        $("#NumDias0").val('');
                                        $("#kendocalendar_0").val('');
                                        $("#kendocalendar_1").val('');
                                        $('#ModalOtrosColaboradores').modal('hide')

                                        swal.fire({
                                            text: oRespuestaAgregarOEditarEmpleado.Mensaje,
                                            type: 'success',
                                            confirmButtonText: "OK",
                                            confirmButtonColor: '#00AFF0',
                                            allowOutsideClick: false,
                                            allowEscapeKey: false
                                        });

                                        break


                                    case "2":
                                        $('#rowSelection').data("kendoGrid").dataSource.data(oRespuestaAgregarOEditarEmpleado.Resultado.Data);
                                        swal.fire({
                                            text: oRespuestaAgregarOEditarEmpleado.Mensaje,
                                            type: 'warning',
                                            confirmButtonText: "OK",
                                            confirmButtonColor: '#00AFF0',
                                            allowOutsideClick: false,
                                            allowEscapeKey: false
                                        });
                                        break

                                    case "3":
                                        $('#rowSelection').data("kendoGrid").dataSource.data(oRespuestaAgregarOEditarEmpleado.Resultado.Data);
                                        swal.fire({
                                            text: oRespuestaAgregarOEditarEmpleado.Mensaje,
                                            type: 'warning',
                                            confirmButtonText: "OK",
                                            confirmButtonColor: '#00AFF0',
                                            allowOutsideClick: false,
                                            allowEscapeKey: false
                                        });
                                        break

                                    case "-1":
                                        $('#rowSelection').data("kendoGrid").dataSource.data(oRespuestaAgregarOEditarEmpleado.Resultado.Data);
                                        swal.fire({
                                            text: oRespuestaAgregarOEditarEmpleado.Mensaje,
                                            type: 'error',
                                            confirmButtonText: "OK",
                                            confirmButtonColor: '#00AFF0',
                                            allowOutsideClick: false,
                                            allowEscapeKey: false
                                        });
                                        break

                                }
                            });

                            break

                        case "2":
                            swal.fire({
                                text: oRespuestaFechasSolicitudes.Mensaje,
                                type: 'warning',
                                confirmButtonText: "OK",
                                confirmButtonColor: '#00AFF0',
                                allowOutsideClick: false,
                                allowEscapeKey: false
                            });
                            break;

                    }
                });
        }
        else {
            swal.fire({
                text: "Debe ingresar el número de días y la fecha de inicio para la solicitud de vacaciones",
                type: 'warning',
                confirmButtonText: "Ok",
                confirmButtonColor: '#00AFF0',
                allowOutsideClick: false,
                allowEscapeKey: false
            })
        };
    });
}

//Evento del boton Editar dentro de la ventana modal
function editarPantallaModal() {
    $("#btnEditarModal").click(function () {
        if ($("#txtCedulaOtros").val() != '' && $("#NumDias1").val() != '' && $("#datepicker").val() != '') {


            $.post("../Anotador/ConsultaFechasSolicitudExistentes",
                {
                    oIdentificacion: $("#txtCedulaOtros").val(),
                    FechaInicio: $("#datepicker").val(),
                    FechaFin: $("#kendocalendar_2").val(),
                }, function (oRespuestaFechasSolicitudes) {

                    $("#DivFondoTrasparente").hide();
                    $("#DivCirculoAzul").hide();

                    switch (oRespuestaFechasSolicitudes.Codigo) {

                        case "-1":
                            swal.fire({
                                text: oRespuestaFechasSolicitudes.Mensaje,
                                type: 'error',
                                confirmButtonText: "OK",
                                confirmButtonColor: '#00AFF0',
                                allowOutsideClick: false,
                                allowEscapeKey: false
                            });
                            break;

                        case "-3":
                            swal.fire({
                                text: oRespuestaFechasSolicitudes.Mensaje,
                                type: 'error',
                                confirmButtonText: "OK",
                                confirmButtonColor: '#00AFF0',
                                allowOutsideClick: false,
                                allowEscapeKey: false
                            });
                            break;

                        case "1":

                            $.post("../Anotador/AgregarOEditarEmpleado", {
                                NroIdentificacion: $("#txtCedulaOtros").val(),
                                NombresEmpleado: $("#SpanNombreEmpleado1").html(),
                                ApellidosEmpleado: $("#SpanApellidoEmpleado1").html(),
                                NumeroDias: $("#NumDias1").val(),
                                NumeroDiasDisponibles: $("#SpanNumDias1").html(),
                                EsEdit: true,
                                EsModal: true,
                                FechaInicio: $("#datepicker").val(),
                                FechaFin: $("#kendocalendar_2").val(),
                                DataActual: JSON.stringify($('#rowSelection').data("kendoGrid").dataSource.data()),
                                SabadoHabil: $("#SabadoHabilModal").val(),
                                CorreoSolicitante: $("#CorreoSolicitanteModal").val(),
                                CorreoJefeSolicitante: $("#CorreoJefeSolicitanteModal").val(),
                                CodigoEmpleado: $("#CodigoEmpleadoModal").val(),
                                Sociedad: $("#SociedadModal").val(),
                                MinimoDias: $("#MinimoDiasModal").val(),
                                InicioFecha: kendo.toString(kendo.parseDate($("#InicioFechaModal").val()), 'dd/MM/yyyy'),
                                FinFecha: kendo.toString(kendo.parseDate($("#FinFechaModal").val()), 'dd/MM/yyyy'),
                                DiasFestivosSabadosDomingos: $("#DiasFestivosSabadosDomingosModal").val(),
                                oMinimoDiasCorreoCompensacion: $("#MinimoDiasCorreoCompensacionModal").val(),
                                oCorreoCompensacion: $("#CorreoCompensacionModal").val(),
                            }, function (d) {

                                if (d.Codigo == 2) {
                                    swal.fire({
                                        text: d.Mensaje,
                                        type: 'warning',
                                        allowOutsideClick: false,
                                        allowEscapeKey: false
                                    });
                                }
                                else {
                                    $('#rowSelection').data("kendoGrid").dataSource.data(d.Resultado.Data);
                                    swal.fire({
                                        text: d.Mensaje,
                                        type: 'success',
                                        confirmButtonText: "OK",
                                        confirmButtonColor: '#00AFF0',
                                        allowOutsideClick: false,
                                        allowEscapeKey: false
                                    });

                                    $('#ModalOtrosColaboradores').modal('hide')
                                }
                            });

                            break;

                        case "2":
                            swal.fire({
                                text: oRespuestaFechasSolicitudes.Mensaje,
                                type: 'warning',
                                confirmButtonText: "OK",
                                confirmButtonColor: '#00AFF0',
                                allowOutsideClick: false,
                                allowEscapeKey: false
                            });
                            break;
                    }
                });
        }
        else {
            swal.fire({
                text: "Debe ingresar el número de días y la fecha de inicio para la solicitud de vacaciones",
                type: 'warning',
                confirmButtonText: "Ok",
                confirmButtonColor: '#00AFF0',
                allowOutsideClick: false,
                allowEscapeKey: false
            })
        };
    });
}