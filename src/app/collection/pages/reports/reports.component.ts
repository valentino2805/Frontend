import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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
  imports: [FormsModule, CommonModule]
})
export class ReportsComponent {
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

  rows: ReportRow[] = [
    { zona: 'Planta Norte', tipo: 'Orgánico', kg: '480 kg', fecha: '04/04/2025', mes: 'Abril', anio: '2025' },
    { zona: 'Planta Sur', tipo: 'Plástico', kg: '320 kg', fecha: '15/03/2025', mes: 'Marzo', anio: '2025' },
    { zona: 'Planta Este', tipo: 'Vidrio', kg: '150 kg', fecha: '20/04/2024', mes: 'Abril', anio: '2024' }
  ];

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