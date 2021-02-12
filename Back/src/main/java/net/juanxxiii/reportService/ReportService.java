package net.juanxxiii.reportService;

import net.juanxxiii.db.entity.Client;
import net.juanxxiii.db.repository.ClientRepository;
import net.juanxxiii.dto.JasperPurchases;
import net.juanxxiii.dto.JasperSales;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportService {

    @Autowired
    private ClientRepository clientRepository;


    public String exportReport(String reportFormat) {
        List<Client> clients = clientRepository.findAll();
        //Load file and compile it
        JasperReport jasperReport = null;
        try {
            InputStream stream = getClass().getResourceAsStream("/clients_template.jrxml");
            jasperReport = JasperCompileManager.compileReport(stream);
            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(clients);

            Map<String, Object> map = new HashMap<>();
            map.put("createdBy", "Grupo 2 SGE");
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, map, dataSource);
            if (reportFormat.equals("pdf")) {
                JasperExportManager.exportReportToPdfFile(jasperPrint, "/home/report_client.pdf");
            } else if (reportFormat.equals("html")) {
                JasperExportManager.exportReportToHtmlFile(jasperPrint, "/home/report_client.html");
            }
        } catch (JRException e) {
            e.printStackTrace();
        }
        return "report generated";
    }

    public String exportReportSales(List<JasperSales> salesList) {
        JasperReport jasperReport;
        try {
            InputStream stream = getClass().getResourceAsStream("/reportSalesTemplate.jrxml");
            jasperReport = JasperCompileManager.compileReport(stream);
            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(salesList);

            Map<String, Object> map = new HashMap<>();
            map.put("createdBy", "Grupo 2 SGE");
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, map, dataSource);
            JasperExportManager.exportReportToPdfFile(jasperPrint, "/home/report_sales.pdf");
            JasperExportManager.exportReportToHtmlFile(jasperPrint, "/home/report_sales.html");
        } catch (JRException e) {
            e.printStackTrace();
        }
        return "report generated";
    }

    public String exportReportPurchases(List<JasperPurchases> purchasesList) {
        JasperReport jasperReport;
        try {
            InputStream stream = getClass().getResourceAsStream("/reportPurchasesTemplate.jrxml");
            jasperReport = JasperCompileManager.compileReport(stream);
            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(purchasesList);
            Map<String, Object> map = new HashMap<>();
            map.put("createdBy", "Grupo 2 SGE");
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, map, dataSource);
            JasperExportManager.exportReportToPdfFile(jasperPrint, "/home/report_purchases.pdf");
            JasperExportManager.exportReportToHtmlFile(jasperPrint, "/home/report_purchases.html");
        } catch (JRException e) {
            e.printStackTrace();
        }
        return "report generated";
    }
}
