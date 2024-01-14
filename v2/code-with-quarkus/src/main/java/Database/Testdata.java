package Database;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import lombok.extern.slf4j.Slf4j;
import org.bson.Document;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Slf4j
public class Testdata<T> {
    private ObjectMapper objectMapper;

    private Class<T> inferredClass;

    private Class<T> type;
    public Testdata(Class<T> type) {
        var javaTimeModule = new JavaTimeModule();
        javaTimeModule.addDeserializer(LocalDateTime.class,
                new LocalDateTimeDeserializer(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSSSS")));
        /*
         * this.objectMapper = new
         * ObjectMapper().disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
         * this.objectMapper.registerModule(javaTimeModule);
         * this.objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS,
         * false);
         */

        this.objectMapper = JsonMapper.builder()
                .findAndAddModules()
                // .addModule(javaTimeModule)
                .disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES)
                .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false)
                .build();
        this.type = type;
    }
    public Document documentFromObject(T object) {
        try {
            var jsonString = objectMapper.writeValueAsString(object);
            return Document.parse(jsonString);
        }
        catch (JsonProcessingException e) {
            log.error("Could not serialize {} to Document. {}", object.getClass().getSimpleName(), e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public T objectFromJson(String toJson) {
        try {
            return objectMapper.readValue(toJson, type);
        }
        catch (JsonProcessingException e) {
            log.error("Could not serialize object to {}. {}", type.getSimpleName(), e.getMessage());
            throw new RuntimeException(e);
        }
    }
}
