import { jsPDF } from 'jspdf';
import { HistoryItem } from '../types';

export function generateWakafReceiptPDF(item: HistoryItem) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const primaryColor: [number, number, number] = [16, 120, 60]; // Deep Emerald
  const darkTextColor: [number, number, number] = [30, 41, 59];
  const mutedTextColor: [number, number, number] = [100, 116, 139];
  const goldColor: [number, number, number] = [180, 130, 20];

  // Background pattern / decorative header bar
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, pageWidth, 24, 'F');

  // Gold accent line
  doc.setFillColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.rect(0, 24, pageWidth, 2, 'F');

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('SERAMBI WAKAF INDONESIA', 15, 12);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('Platform Wakaf Digital Terpercaya • Terdaftar & Diawasi Badan Wakaf Indonesia (BWI)', 15, 18);

  // Status Badge on Right Header
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(`STATUS: ${item.status.toUpperCase()}`, pageWidth - 15, 15, { align: 'right' });

  let y = 38;

  // Document Title & Invoice Number
  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('BUKTI PENERIMAAN & SERTIFIKAT WAKAF', pageWidth / 2, y, { align: 'center' });

  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(mutedTextColor[0], mutedTextColor[1], mutedTextColor[2]);
  doc.text(`Nomor Transaksi: ${item.id} • Diterbitkan: ${item.date} WIB`, pageWidth / 2, y, { align: 'center' });

  y += 10;

  // Box 1: Data Wakif & Niat
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(15, y, pageWidth - 30, 42, 3, 3, 'FD');

  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('INFORMASI WAKIF & NIAT AMAL JARIYAH', 20, y + 8);

  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);

  // Line 1: Nama Wakif & Atas Nama
  doc.text('Nama Wakif', 20, y + 16);
  doc.setFont('helvetica', 'bold');
  doc.text(`: ${item.wakifName || 'Ahmad Dani Prasetyo'}`, 55, y + 16);

  doc.setFont('helvetica', 'normal');
  doc.text('Diniatkan Untuk', 110, y + 16);
  doc.setFont('helvetica', 'bold');
  doc.text(`: ${item.intendedFor || 'Diri Sendiri & Keluarga'}`, 145, y + 16);

  // Line 2: Kontak & Jenis Wakaf
  doc.setFont('helvetica', 'normal');
  doc.text('Email / Kontak', 20, y + 24);
  doc.text(`: ${item.wakifEmail || 'aldaniprasetyo@gmail.com'}`, 55, y + 24);

  doc.text('Akad Wakaf', 110, y + 24);
  doc.text(`: ${item.akadType || 'Wakaf Uang Melalui Uang'}`, 145, y + 24);

  // Line 3: Doa / Pesan Kebaikan
  doc.text('Doa / Pesan', 20, y + 32);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(71, 85, 105);
  const prayerText = item.prayer || 'Semoga menjadi amal jariyah yang pahalanya mengalir terus dan membawa keberkahan keluarga.';
  doc.text(`: "${prayerText}"`, 55, y + 32, { maxWidth: pageWidth - 75 });

  y += 50;

  // Box 2: Rincian Program & Nazhir
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(15, y, pageWidth - 30, 48, 3, 3, 'FD');

  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('RINCIAN PROGRAM WAKAF & PENYALURAN', 20, y + 8);

  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);

  doc.text('Nama Program', 20, y + 17);
  doc.setFont('helvetica', 'bold');
  doc.text(`: ${item.campaignTitle}`, 55, y + 17, { maxWidth: pageWidth - 80 });

  doc.setFont('helvetica', 'normal');
  doc.text('Kategori', 20, y + 25);
  doc.text(`: ${item.category || 'Pendidikan & Sosial'}`, 55, y + 25);

  doc.text('Lembaga Nazhir', 110, y + 25);
  doc.setFont('helvetica', 'bold');
  doc.text(`: ${item.nazhir || 'Yayasan Amanah / Dompet Dhuafa'}`, 145, y + 25);

  doc.setFont('helvetica', 'normal');
  doc.text('Metode Pembayaran', 20, y + 33);
  doc.text(`: ${item.paymentMethod || 'QRIS Digital / Bank Syariah'}`, 55, y + 33);

  doc.text('No. Referensi Bank', 110, y + 33);
  doc.text(`: ${item.refNumber || 'REF-8891273918'}`, 145, y + 33);

  doc.text('Status Pembayaran', 20, y + 41);
  if (item.status === 'Berhasil') {
    doc.setTextColor(22, 101, 52);
    doc.setFont('helvetica', 'bold');
    doc.text(': BERHASIL (Lunas Terverifikasi)', 55, y + 41);
  } else if (item.status === 'Proses') {
    doc.setTextColor(194, 65, 12);
    doc.setFont('helvetica', 'bold');
    doc.text(': SEDANG DIPROSES', 55, y + 41);
  } else {
    doc.setTextColor(185, 28, 28);
    doc.setFont('helvetica', 'bold');
    doc.text(': GAGAL / KEDALUWARSA', 55, y + 41);
  }

  y += 56;

  // Box 3: Tabel Rincian Keuangan
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(15, y, pageWidth - 30, 40, 3, 3, 'FD');

  // Header Table
  doc.setFillColor(234, 240, 235);
  doc.rect(15, y, pageWidth - 30, 8, 'F');
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('DESKRIPSI', 20, y + 5.5);
  doc.text('JUMLAH (IDR)', pageWidth - 20, y + 5.5, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.text('Nominal Dana Wakaf', 20, y + 15);
  doc.text(`Rp ${item.amount.toLocaleString('id-ID')}`, pageWidth - 20, y + 15, { align: 'right' });

  doc.text('Biaya Administrasi & Layanan Sistem', 20, y + 22);
  doc.text('Rp 0 (Gratis)', pageWidth - 20, y + 22, { align: 'right' });

  doc.setDrawColor(203, 213, 225);
  doc.line(20, y + 26, pageWidth - 20, y + 26);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('TOTAL PEMBAYARAN WAKAF', 20, y + 33);
  doc.text(`Rp ${item.amount.toLocaleString('id-ID')}`, pageWidth - 20, y + 33, { align: 'right' });

  y += 48;

  // Syariah Akad Statement Box
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(15, y, pageWidth - 30, 22, 2, 2, 'FD');

  doc.setTextColor(22, 101, 52);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('PERNYATAAN IJAB QABUL WAKAF DIGITAL:', 20, y + 6);
  
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.text(
    '"Saya menyatakan mewakafkan harta sejumlah tersebut di atas secara ikhlas karena Allah Ta\'ala untuk dikelola oleh Nazhir yang sah sesuai peruntukannya."',
    20, 
    y + 12, 
    { maxWidth: pageWidth - 40 }
  );

  y += 28;

  // Signatures / QR Code section
  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  
  // Left: Verification QR note
  doc.setDrawColor(203, 213, 225);
  doc.rect(20, y, 22, 22);
  doc.setFontSize(6.5);
  doc.setTextColor(100, 116, 139);
  doc.text('KODE QR', 31, y + 10, { align: 'center' });
  doc.text('VERIFIKASI', 31, y + 14, { align: 'center' });

  doc.setFontSize(7.5);
  doc.text('Dokumen ini sah dan diterbitkan secara elektronik', 46, y + 8);
  doc.text('oleh Sistem Informasi Serambi Wakaf Indonesia.', 46, y + 13);
  doc.text('Diverifikasi otomatis dengan standar regulasi BWI.', 46, y + 18);

  // Right: Signature
  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
  doc.setFontSize(8);
  doc.text('Jakarta, ' + (item.date.split(' ')[0] + ' ' + (item.date.split(' ')[1] || '') + ' ' + (item.date.split(' ')[2] || '')), pageWidth - 60, y + 5);
  doc.setFont('helvetica', 'bold');
  doc.text('Nazhir Wakaf Pengelola,', pageWidth - 60, y + 10);
  
  // Signature placeholder stamp
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.text('[ Tanda Tangan Elektronik Sah ]', pageWidth - 60, y + 17);
  
  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text(item.nazhir || 'Divisi Pengelolaan Wakaf', pageWidth - 60, y + 23);

  // Bottom Footer
  doc.setFillColor(241, 245, 249);
  doc.rect(0, 285, pageWidth, 12, 'F');
  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('Simpan bukti ini sebagai tanda terima sah wakaf Anda. Layanan Bantuan: support@serambiwakaf.id • 021-27874080', pageWidth / 2, 292, { align: 'center' });

  // Trigger download
  doc.save(`Bukti_Wakaf_${item.id}.pdf`);
}
