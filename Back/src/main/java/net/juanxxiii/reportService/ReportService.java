package net.juanxxiii.reportService;

import net.juanxxiii.db.entity.Client;
import net.juanxxiii.db.repository.ClientRepository;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;


import java.io.File;
import java.io.FileNotFoundException;
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
            InputStream clientsStream = getClass().getResourceAsStream("/clientsTemplate.jrxml");
            JasperReport jasperReport = JasperCompileManager.compileReport(clientsStream);

            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(clients);
            Map<String, Object> map = new HashMap<>();
            map.put("createdBy", "Grupo 2 SGE");
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, map, dataSource);
            switch (reportFormat) {
                case "html":
                    JasperExportManager.exportReportToPdfFile(jasperPrint,"C:\\Users\\pabli\\Desktop\\ProyectoSGE\\Reports\\client.pdf");
                    break;
                case "pdf":
                    JasperExportManager.exportReportToHtmlFile(jasperPrint, "C:\\Users\\pabli\\Desktop\\ProyectoSGE\\Reports\\client.html");
                    break;

            }

        } catch (JRException e) {
            e.printStackTrace();
        }
        return "report generated";
    }
}
