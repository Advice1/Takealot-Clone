package ExternalService;

import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class Products {

    private String id;
    private String title;
    private  String description;

    private double price;
    private  double discountPercentage;
    //private  double rating;
    //private  String stock;
    //private  String brand ;

    private String category;
    //private String thumbnail;
    private String image;

}

