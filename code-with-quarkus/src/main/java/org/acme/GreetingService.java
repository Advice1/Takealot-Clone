package org.acme;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class GreetingService {
@Inject
GreetingConfig greetingConfig;
    public String greeting(String name){
        return greetingConfig.response()+name;
    }
    public String respond(){
    return "advice hello world";
    }

}
