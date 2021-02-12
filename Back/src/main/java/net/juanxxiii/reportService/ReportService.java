package net.juanxxiii.reportService;

import net.juanxxiii.dto.JasperPurchases;
import net.juanxxiii.dto.JasperSales;
import net.juanxxiii.dto.JasperStockComposite;
import net.juanxxiii.dto.JasperStockSimple;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.stereotype.Service;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportService {

    private JasperPrint getJasperPrint(List<?> list, InputStream stream) throws JRException {
        JasperReport jasperReport = JasperCompileManager.compileReport(stream);
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(list);
        Map<String, Object> map = new HashMap<>();
        map.put("createdBy", "Grupo 2 SGE");
        return JasperFillManager.fillReport(jasperReport, map, dataSource);
    }

    public String exportReportSales(List<JasperSales> salesList) {
        try {
            InputStream stream = getClass().getResourceAsStream("/reportSalesTemplate.jrxml");
            JasperPrint jasperPrint = getJasperPrint(salesList, stream);
            JasperExportManager.exportReportToPdfFile(jasperPrint, "/home/informe_ventas_" + salesList.get(0).getClient() + "_" + salesList.get(0).getReceiptDate() + "_" + salesList.get(salesList.size() - 1).getReceiptDate() + ".pdf");
            JasperExportManager.exportReportToHtmlFile(jasperPrint, "/home/informe_ventas_" + salesList.get(0).getClient() + "_" + salesList.get(0).getReceiptDate() + "_" + salesList.get(salesList.size() - 1).getReceiptDate() + ".html");
        } catch (JRException e) {
            e.printStackTrace();
        }
        return "report generated";
    }

    public String exportReportPurchases(List<JasperPurchases> purchasesList) {
        try {
            InputStream stream = getClass().getResourceAsStream("/reportPurchasesTemplate.jrxml");
            JasperPrint jasperPrint = getJasperPrint(purchasesList, stream);
            JasperExportManager.exportReportToPdfFile(jasperPrint, "/home/informe_compras_" + purchasesList.get(0).getSupplier() + "_" + purchasesList.get(0).getDate() + "_" + purchasesList.get(purchasesList.size() - 1).getDate() + ".pdf");
            JasperExportManager.exportReportToHtmlFile(jasperPrint, "/home/informe_compras_" + purchasesList.get(0).getSupplier() + "_" + purchasesList.get(0).getDate() + "_" + purchasesList.get(purchasesList.size() - 1).getDate() + ".html");
        } catch (JRException e) {
            e.printStackTrace();
        }
        return "informe_compras_" + purchasesList.get(0).getSupplier() + "_" + purchasesList.get(0).getDate() + "_" + purchasesList.get(purchasesList.size() - 1).getDate();
    }

    public String exportReportStockSimpleProducts(List<JasperStockSimple> jasper) {
        try {
            InputStream stream = getClass().getResourceAsStream("/reportStockSimple.jrxml");
            JasperPrint jasperPrint = getJasperPrint(jasper, stream);
            JasperExportManager.exportReportToPdfFile(jasperPrint, "/home/informe_stock_" + jasper.get(0).getProducto() + "_" + LocalDate.now() + ".pdf");
            JasperExportManager.exportReportToHtmlFile(jasperPrint, "/home/informe_stock_" + jasper.get(0).getProducto() + "_" + LocalDate.now() + ".html");
        } catch (JRException e) {
            e.printStackTrace();
        }
        return "informe_stock_" + jasper.get(0).getProducto() + "_" + LocalDate.now();
    }

    public String exportReportStockCompositeProducts(List<JasperStockComposite> jasperList) {
        return null;
    }
}
