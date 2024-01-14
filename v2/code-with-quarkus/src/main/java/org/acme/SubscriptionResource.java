package org.acme;

import Database.ReactiveMongoDB;
import ExternalService.Products;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Path("/greeting")

public class SubscriptionResource {
    @Inject
    ReactiveMongoDB MongoDB;
    @Inject
    GreetingService service;

 ArrayList<StoreUserDetails> users = new ArrayList<>();
 ArrayList<Products> cart = new ArrayList<>();

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

    //todo:OAuth, JWT (JSON Web Tokens), or a custom authentication system that uses HTTPS to securely transmit credentials
    @Path("{username}/{password}")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public boolean UserLogin(@PathParam("username") String username,String password){
      /* boolean results=false;
        for (StoreUserDetails data : users) {
            if (data.getEmail().equals(username) && data.getPassword().equals(password)) {
                results= true;
            } else {
                results= false;
            }*/
        boolean results= users.stream().anyMatch(items -> items.getEmail().equals(username) && items.getPassword().equals(password));

        return results;
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public StoreUserDetails addingUsersDetails(StoreUserDetails store){
        users.add(store);
        MongoDB.addUser(store).subscribe().with((data) -> {
                System.out.println("User added successfully.");
            },
            failure -> {
                System.err.println("Failed to add user: " + failure.getMessage());
            }
        );
        return store;
    }

    @Path("/database/{email}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Uni<StoreUserDetails> GetUsersDetails(@PathParam("email") String email){
     return MongoDB.list(email).onFailure().recoverWithItem(error ->{
         System.err.println("Eroor occured"+error);
         return (StoreUserDetails) Uni.createFrom().nothing();
     });
    }
    @Path("/cart/")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public  Products storeToCart(Products product){
        cart.add(product);
        return product;
    }
    @Path("/cart/all/{username}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Products> getAllCart(@PathParam("username") String username){

        List<Products> matchingElements = cart.stream()
                .filter(item ->  item.getUser().equals(username))
                .collect(Collectors.toList());

        return matchingElements;
    }
    @Path("cart/remove/{username}")
    @DELETE
    @Consumes(MediaType.APPLICATION_JSON)
    public void deleteAllCart(@PathParam("username") String username){
        cart.removeIf(data ->data.getUser() == username); //todo:add condition need to add another condition
    }

    @Path("/cart/count/{username}")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public int getCartCount(@PathParam("username") String username){
       return  getAllCart(username).size();
        //return cart.size();
    }
    //todo:remove from cart
    @Path("/remove/{id}")
    @DELETE
    @Consumes(MediaType.APPLICATION_JSON)
    public void deleteCart(@PathParam("id") int id){
        cart.removeIf(data ->Integer.parseInt(data.getId())  == id); //todo:add condition need to add another condition
    }
    //TODO:Query param issue





}
