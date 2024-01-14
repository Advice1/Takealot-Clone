package StripeApi;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
@Setter
@Getter
@AllArgsConstructor
public class StripeModel {
    private String Email;
    private String product;
    private Long quantity;
    private Long price;
    private String description;
    private String success_url;
    private String cancel_url;



}
