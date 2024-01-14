package StripeApi;

import com.stripe.model.Customer;
import org.acme.StoreUserDetails;

public interface pay {

    public Customer AddCustomer(StoreUserDetails details);
    public void CheckoutSession();

}
