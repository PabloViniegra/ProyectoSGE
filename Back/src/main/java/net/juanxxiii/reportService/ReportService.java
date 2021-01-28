package net.juanxxiii.reportService;

import net.juanxxiii.db.entity.Client;
import net.juanxxiii.db.repository.ClientRepository;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;


import java.awt.*;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
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

        try {

            InputStream stream = getClass().getResourceAsStream("/clients_template.jrxml");
            JasperReport jasperReport = JasperCompileManager.compileReport(stream);

            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(clients);
            Map<String, Object> map = new HashMap<>();
            map.put("createdBy", "Grupo 2 SGE");
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, map, dataSource);
            if (reportFormat.equals("pdf")) {
                JasperExportManager.exportReportToPdfFile(jasperPrint,"C:\\report_client.pdf");
            } else if (reportFormat.equals("html")) {
                JasperExportManager.exportReportToHtmlFile(jasperPrint, "C:\\report_client.html");
            }
        } catch (JRException e) {
            e.printStackTrace();
        }
        return "report generated";
    }
}
