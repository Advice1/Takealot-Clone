package ExternalAPI;

import ExternalService.Products;
import jakarta.ws.rs.*;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import java.util.List;
//https://dummyjson.com/products
@Path("/products")
@Produces("application/json")
@RegisterRestClient(baseUri = "https://fakestoreapi.com")
public interface ExtensionsProductsService {

    @GET
    List<Products> getById();

    @GET
    @Path("{id}")
    Products getProducts(@PathParam("id") String id);

    @GET
    @Path("/categories")
    List<String> GetByCategorie();

    @GET
    @Path("/category/{productCategory}")
    List<Products> ProductsCategory(@PathParam("productCategory") String productCategory);

    @GET
    @Path("/{SearchProduct}")
    List<Products> SearchProducts(@QueryParam("SearchProduct") String SearchProduct);

}
