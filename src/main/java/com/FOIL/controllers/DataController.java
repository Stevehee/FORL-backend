package com.FOIL.controllers;

import com.FOIL.services.DataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

@CrossOrigin(origins = "*")
@RestController
public class DataController {

    private DataService dataService;

    public DataController(DataService service){
        this.dataService = service ;
    }

    @GetMapping("/getRule")
    public String getRules() {

        System.out.println("hello world");

        return "test" ;
    }


    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file,
                                             @RequestParam(name = "args") String[] args){
        if (file.isEmpty()) {
            return "Please select a file to upload" ;
        }

        System.out.println("request received");
        return this.dataService.getRules(file, args) ;
    }


}
