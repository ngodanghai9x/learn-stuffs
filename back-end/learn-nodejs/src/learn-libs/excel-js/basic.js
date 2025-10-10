// file: exportExcel.js
import ExcelJS from 'exceljs';

async function exportExcel() {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Report');

    // --- Header ---
    sheet.mergeCells('A1', 'E1');
    const header = sheet.getCell('A1');
    header.value = 'BÁO CÁO DOANH THU 2025';
    header.alignment = { horizontal: 'center', vertical: 'middle' };
    header.font = { bold: true, size: 16, color: { argb: 'FFFFFFFF' } };
    header.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF1F4E78' }, // xanh đậm
    };
    sheet.getRow(1).height = 25;

    // --- Tên cột ---
    const columns = [
        { header: 'STT', key: 'no', width: 8 },
        { header: 'Sản phẩm', key: 'product', width: 25 },
        { header: 'Số lượng', key: 'quantity', width: 15 },
        { header: 'Đơn giá', key: 'price', width: 15 },
        { header: 'Thành tiền', key: 'total', width: 18 },
    ];
    sheet.columns = columns;

    const headerRow = sheet.getRow(2);
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'd6d632' },
    };
    headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
    headerRow.values = [...columns.map(c => c.header)];

    // --- Dữ liệu ---
    const data = [
        { no: 1, product: 'Laptop', quantity: 10, price: 15000 },
        { no: 2, product: 'Bàn phím', quantity: 25, price: 2000 },
        { no: 3, product: 'Chuột', quantity: 30, price: 1500 },
    ];

    data.forEach((item) => {
        sheet.addRow({
            ...item,
            total: item.quantity * item.price,
        });
    });

    // --- Border + định dạng tiền ---
    sheet.eachRow((row, rowNumber) => {
        row.eachCell((cell) => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
            };
            if (rowNumber > 2 && [4, 5].includes(cell.col)) {
                cell.numFmt = '#,##0 [$₫-vi-VN]'; // format tiền VNĐ
            }
        });
    });

    // --- Merge ô tổng ---
    const lastRow = sheet.lastRow.number + 1;
    sheet.mergeCells(`A${lastRow}:D${lastRow}`);

    const totalCell = sheet.getCell(`A${lastRow}`);
    totalCell.value = 'TỔNG CỘNG';
    totalCell.alignment = { horizontal: 'right' };
    totalCell.font = { bold: true };

    const totalValue = sheet.getCell(`E${lastRow}`);
    totalValue.value = { formula: `SUM(E3:E${lastRow - 1})` };
    totalValue.font = { bold: true };

    // --- Xuất file ---
    await workbook.xlsx.writeFile('report.xlsx');
    console.log('✅ File Excel đã được tạo: report.xlsx');
}

exportExcel().catch(console.error);
