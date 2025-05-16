import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ZoneService } from '../../../shared/services/zone.service';
import { Store } from '../../../controlPanel/model/Store.entity';
import {TranslateModule} from "@ngx-translate/core";

interface ReportRow {
  zona: string;
  tipo: string;
  kg: string;
  fecha: string;
  mes: string;
  anio: string;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule]
})
export class ReportsComponent implements OnInit {
  idioma: 'es' | 'en' = 'es';

  textos = {
    es: {
      descripcion: 'Consulta información clave y exporta tus reportes<br>para auditorías, normativas y toma de decisiones.',
      exportarPDF: 'Exportar PDF',
      exportarExcel: 'Exportar Excel',
      mes: 'Mes',
      anio: 'Año',
      historial: 'Historial de Recojos',
      zona: 'Zona',
      tipo: 'Tipo de residuo',
      kg: 'Kg recolectados',
      fecha: 'Última recolección',
      meses: [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ]
    },
    en: {
      descripcion: 'Key information and export your reports<br>for audits, regulations, and decision making.',
      exportarPDF: 'Export PDF',
      exportarExcel: 'Export Excel',
      mes: 'Month',
      anio: 'Year',
      historial: 'Collection History',
      zona: 'Zone',
      tipo: 'Waste type',
      kg: 'Collected Kg',
      fecha: 'Last collection',
      meses: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ]
    }
  };

  meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  anios = ['2024', '2025'];
  mesSeleccionado = '';
  anioSeleccionado = '';

  rows: ReportRow[] = [];

  constructor(private zoneService: ZoneService) {}

  ngOnInit() {
    this.zoneService.getAll().subscribe((zones: Store[]) => {
      this.rows = [];
      zones.forEach(zone => {
        if (zone.sensor && zone.sensor.length > 0) {
          zone.sensor.forEach(sensor => {
            // Si hay varios tipos de residuo por sensor, puedes adaptar esto
            this.rows.push({
              zona: zone.name,
              tipo: sensor.typeSensor || '-',
              kg: (sensor.nivelActual ? sensor.nivelActual + ' kg' : '-'),
              fecha: sensor.lastReadingDate || sensor.recojo || '-',
              mes: this.getMes(sensor.lastReadingDate || sensor.recojo),
              anio: this.getAnio(sensor.lastReadingDate || sensor.recojo)
            });
          });
        }
      });
    });
  }

  getMes(fecha: string): string {
    if (!fecha) return '';
    const partes = fecha.split('/');
    if (partes.length === 3) {
      // Formato dd/mm/yyyy
      const mesNum = parseInt(partes[1], 10) - 1;
      return this.meses[mesNum] || '';
    }
    return '';
  }

  getAnio(fecha: string): string {
    if (!fecha) return '';
    const partes = fecha.split('/');
    if (partes.length === 3) {
      return partes[2];
    }
    return '';
  }

  get filteredRows() {
    return this.rows.filter(row =>
      (!this.mesSeleccionado || row.mes === this.mesSeleccionado) &&
      (!this.anioSeleccionado || row.anio === this.anioSeleccionado)
    );
  }

  get mesesTraducidos() {
    return this.textos[this.idioma].meses;
  }

  exportPDF() {
    const doc = new jsPDF();
    doc.text(this.textos[this.idioma].historial, 14, 16);
    autoTable(doc, {
      head: [[
        this.textos[this.idioma].zona,
        this.textos[this.idioma].tipo,
        this.textos[this.idioma].kg,
        this.textos[this.idioma].fecha
      ]],
      body: this.filteredRows.map(row => [row.zona, row.tipo, row.kg, row.fecha]),
      startY: 22
    });
    doc.save('reporte.pdf');
  }

  exportExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.filteredRows.map(row => ({
      [this.textos[this.idioma].zona]: row.zona,
      [this.textos[this.idioma].tipo]: row.tipo,
      [this.textos[this.idioma].kg]: row.kg,
      [this.textos[this.idioma].fecha]: row.fecha
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'reporte.xlsx');
  }
}
