package ExternalService;

import ExternalAPI.ExtensionsProductsService;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.rest.client.inject.RestClient;

import java.util.ArrayList;
import java.util.List;

@Path("/products")
public class ProductsDisplayResource {

     @RestClient
     ExtensionsProductsService extensionsProductsService;

    private List<String> myProduct = new ArrayList<>();
    private List<Products> products = new ArrayList<>();

    @GET
    @Produces("application/json")
    public List<Products> getProduct(){
         myProduct.add(extensionsProductsService.getById().toString());
         return extensionsProductsService.getById();
    }
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("{id}")
    public Products GetProductByID(@PathParam("id")String id){
        products.add(extensionsProductsService.getProducts(id));
        return extensionsProductsService.getProducts(id);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/hello")
    public Response get(){
        return Response.ok(myProduct).build();
    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @Path("/categories")
    public List<String> Categories(){
        return extensionsProductsService.GetByCategorie();}

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/categories/{productCategory}")
    public List<Products> ProductCategories(@PathParam("productCategory")String productCategory){
        return extensionsProductsService.ProductsCategory(productCategory);}

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{SearchProduct}")
    public List<Products> SearchedProduct(@QueryParam("SearchProduct")String SearchProduct){
        return extensionsProductsService.ProductsCategory(SearchProduct);}



}
