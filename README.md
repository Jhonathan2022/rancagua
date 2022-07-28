# dash-gestionSolicitudes

modificar node_modules
chartjs-plugin -> dist -> chartsjs-plugin-datalabels.js 
En la linea 13 pegar

Chart.defaults.global.defaultFontColor = '#000';

y en la linea 1042

if(label == 0 || label == null){
		return null;
	}else{
		label = label.toString();
		label = label.split(/(?=(?:...)*$)/);
		label = label.join('.');
		return '' + label;
	}

y en node_modules/ng2-charts/fesm5/ng2-charts.js

cambiar ɵɵdefineInjectable por defineInjectable# rancagua
# rancagua
# rancagua
