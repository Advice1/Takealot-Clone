package org.acme;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.ArrayList;

@Path("/greeting")

public class SubscriptionResource {
    @Inject
    GreetingService service;

 ArrayList<StoreUserDetails> users = new ArrayList<>();

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @Path("/{name}")
    public String greeting(@PathParam("name") String name){
        return service.greeting(name);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public ArrayList RetrievingUserDetails(){
        return users;
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public StoreUserDetails addingUsersDetails(StoreUserDetails store){
        users.add(store);
        return store;
    }





}
