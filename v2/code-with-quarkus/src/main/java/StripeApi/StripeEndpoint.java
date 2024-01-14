package StripeApi;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.google.gson.Gson;
import com.stripe.model.Customer;
import com.stripe.model.CustomerCollection;
import com.stripe.model.CustomerSearchResult;
import com.stripe.model.ProductCollection;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.acme.StoreUserDetails;

import java.util.ArrayList;
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Path("/Stripe")
public class StripeEndpoint {
    @Inject
    Payments payments;

    ArrayList<CustomerCollection> testCreation = new ArrayList<>();
    ArrayList<StripeModel> Creation = new ArrayList<>();
    @Path("/Customer")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Customer CreateCustomer(StoreUserDetails details){
       Customer customer = payments.AddCustomer(details);
        return customer;
    }
    @Path("/Customer/{limit}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public ArrayList GetAllCutomer(@PathParam("limit")String limit){
        System.out.println("MY RESPONSE"+payments.GetAllCustomers(limit));
        CustomerCollection collection = payments.GetAllCustomers(limit);
        testCreation.add(collection);
        return testCreation;
        //return collection;
    }
    @Path("/Customer/search/{email}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public CustomerSearchResult SearchforCutomer(@PathParam("email")String email){
        System.out.println("MY RESPONSE"+payments.SeachCustomer(email));
        return payments.SeachCustomer(email);

    }
    @Path("/Products/{count}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public ProductCollection listProduct(@PathParam("count") int count){
       //Response.Status R= Response.Status.FORBIDDEN;
       return payments.GetAllProducts(count);

    }

    @Path("/Customer/checkout/")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String CheckoutSession(StripeModel model){
        Creation.add(model);
        System.out.println("EMAIL ADV"+ model.getEmail());

        Gson gson = new Gson();
        String jsonResponse = gson.toJson(payments.CheckoutSession(model).getId());

        return jsonResponse;

       // return payments.CheckoutSession(model);

    }

}
