package Database;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import io.smallrye.config.ConfigMapping;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class ReactiveMongoDB {

    @Inject
    MongoClient client;
     // @Inject
    //ReactiveMongoClient mongoClient;
    // @ConfigMapping(prefix = "quarkus.datasource.mongodb")
    //String database;

   /* private MongoCollection getCollection(){
        return client.getDatabase(database).getCollection("Username");
    }*/



}
