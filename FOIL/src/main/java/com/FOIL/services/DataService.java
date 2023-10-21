package com.FOIL.services;

import org.springframework.stereotype.Service;
import com.FOIL.services.logic.* ;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;


@Service
public class DataService {

    public String getRules(MultipartFile file, String[] args){

        System.out.println("request processing");

        return FOIL.learn(file, args);
    }
}
