package StripeApi;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.stripe.Stripe;
import com.stripe.exception.InvalidRequestException;
import com.stripe.exception.StripeException;
import com.stripe.model.*;
//import com.stripe.model.billingportal.Session;
import com.stripe.model.checkout.Session;
import com.stripe.param.*;
import com.stripe.param.checkout.SessionCreateParams;
import jakarta.enterprise.context.ApplicationScoped;
import org.acme.StoreUserDetails;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@ApplicationScoped
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
//@ConfigProperties(prefix = "stripe.Api.key")
public class Payments implements pay{
    @ConfigProperty(name = "stripe.Api.key")
    String key;
    //String key="sk_test_51NttltKdfsYm0s89hpvPmjIaiVhKYDUAyGo7vtzrgM4EVPxQDDZ8QeyHLRT3J0Yxk9kU0fiO2CXXtjoHGNFykI4H00ThLXIqDG";

    @Override
    public Customer AddCustomer(StoreUserDetails details) {
        System.out.println(",y keys"+key);
        Stripe.apiKey=key;
        System.out.println(",y keys"+key);
        CustomerCreateParams params = CustomerCreateParams.builder()
                .setEmail(details.getEmail())
                .setName(details.getName())
                .build();
        try {
            Customer newCustomer =Customer.create(params);
            return newCustomer;

        } catch (StripeException e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    public void CheckoutSession() {

    }

    public CustomerCollection GetAllCustomers(String Limit){
        Stripe.apiKey=key;
        Map<String, Object> params = new HashMap<>();
        params.put("limit", Limit);
        //CustomerListParams c =CustomerListParams.builder().setLimit(3L).build();
        try {
            CustomerCollection customers = Customer.list(params);
            return customers;
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
    }
    public CustomerSearchResult SeachCustomer(String Email){
        Stripe.apiKey=key;
        CustomerSearchParams params =
                CustomerSearchParams
                        .builder()
                        .setQuery("email:\"" + Email + "\"")
                        .build();

        try {
            CustomerSearchResult result = Customer.search(params);
            return result;
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
    }
    public Product addProduct(StripeModel products){
        Stripe.apiKey=key;
        ProductCreateParams myproduct = ProductCreateParams.builder()
                .addImage("https://deep-image.ai/blog/content/images/2022/11/2-7.png")
                .setName(products.getProduct())
                .setDescription(products.getDescription())
                .setShippable(true)
                .build();
        try {
            return Product.create(myproduct);
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
    }
    public Price addPricing(ProductCreateParams product){
        Stripe.apiKey=key;
        try {
            Price price = Price.create(
                    new PriceCreateParams.Builder()
                            .setProduct(product.getId())
                            .setUnitAmount(100l) // Price in cents
                            .setCurrency("zar")
                            .build()
            );
            return price;
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }

    }
    //todo: still need to impliment this
   /* public void UpdateCutomer(String Email){

        Customer customer = null;
        try {
            customer = Customer.retrieve("cus_Ohap1GVTcML2l4");
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }

        Map<String, Object> metadata = new HashMap<>();
        metadata.put("order_id", "6735");

        Map<String, Object> params = new HashMap<>();
        params.put("metadata", metadata);

        try {
            Customer updatedCustomer = customer.update(params);
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
    }*/
    public ProductCollection GetAllProducts(int limit){
        Stripe.apiKey=key;
        Map<String, Object> params = new HashMap<>();
        params.put("limit", limit);

        try {
            return Product.list(params);
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
    }
    public Session CheckoutSession(StripeModel stipemodel) {
        Stripe.apiKey=key;
        addProduct(stipemodel);
        //getting customer id
        Optional<String> customerId = SeachCustomer(stipemodel.getEmail())
                .getData()
                .stream()
                .filter(data -> stipemodel.getEmail().equals(data.getEmail()))
                .map(Customer::getId)
                .findAny();

        String customerIdValue = customerId.orElse(null);
        System.out.println(customerIdValue+"whats my id");System.out.println("what do you give"+stipemodel.getEmail()+"whats my id");
        // Create a price data object for a line item what customer is buying and how much
       SessionCreateParams.LineItem.PriceData priceData = SessionCreateParams.LineItem.PriceData.builder()
                .setCurrency("zar")
                .setProduct(addProduct(stipemodel).getId())
                .setUnitAmount(stipemodel.getPrice()*100) // Price in cents R10:00
                .build();

        SessionCreateParams params = SessionCreateParams.builder()

                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setCustomer(customerIdValue)
                .setSuccessUrl(stipemodel.getSuccess_url())
                .setCancelUrl(stipemodel.getCancel_url())
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setPriceData(priceData)
                                .setQuantity(stipemodel.getQuantity())
                                .build()
                )
                .build();
        try {
            // Create the Checkout Session
            Map<String, Object> paramMap = params.toMap();
            Session session = Session.create(paramMap);
            // Redirect the customer to the Stripe-hosted payment page using the sessionId
            System.out.println("Redirect URL: " + session.getUrl());
            return session;
        }
        catch (InvalidRequestException e) {
            throw new RuntimeException(e);
        }
        catch (StripeException e) {
            throw new RuntimeException(e);
        }
    }
}
