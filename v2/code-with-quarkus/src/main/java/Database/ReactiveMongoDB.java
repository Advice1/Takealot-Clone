package Database;

import io.quarkus.mongodb.reactive.ReactiveMongoClient;
import io.quarkus.mongodb.reactive.ReactiveMongoCollection;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.acme.StoreUserDetails;
import org.bson.Document;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import static com.mongodb.client.model.Filters.eq;


@ApplicationScoped
public class ReactiveMongoDB {

    //@Inject
   // MongoClient client;
    @Inject
    ReactiveMongoClient mongoClient;

    @ConfigProperty(name = "quarkus.mongodb.database")
    String database;

    public ReactiveMongoCollection getCollection(){
        return mongoClient.getDatabase(database).getCollection("subscription");
    }
    public Uni<StoreUserDetails> list(String email) {
        return getCollection().find(eq("Email",email))
               .collect().asList();
    }
    public Uni<StoreUserDetails> addUser(StoreUserDetails user){
        Document document = new Document()
                .append("name", user.getName())
                .append("Email", user.getEmail())
                .append("Surname",user.getSurname())
                .append("Password",user.getPassword());

        return getCollection().insertOne(document).onItem().transformToUni(insertOneResult -> {
            if (insertOneResult != null) {
                System.out.println("lets check"+Uni.createFrom().voidItem()+"results");
                return Uni.createFrom().voidItem();
            } else {
                System.out.println("lets check"+Uni.createFrom().voidItem());
                return Uni.createFrom().failure(new RuntimeException("Insertion failed"));
            }
        });

    }
    public Uni<StoreUserDetails> FindbyID(StoreUserDetails u){
        return getCollection().find(new Document("Email", u.getEmail())).toUni();
    }



}
