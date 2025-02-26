package rest.client;

import model.Journal;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;
import java.util.Collection;
import java.util.concurrent.Callable;

public class JournalClient {

    public static final String URL = "http://localhost:8080/journals";

    private final RestTemplate restTemplate = new RestTemplate();

    private <T> T execute(Callable<T> callable) throws Exception {
        try {
            return callable.call();
        } catch (Exception e) {
            throw new Exception(e);
        }
    }

    public Journal getById(Long id) throws Exception {
        return execute(() -> restTemplate.getForObject(String.format("%s/%s", URL, id), Journal.class));
    }

    public Journal[] getAll() throws Exception {
        return execute(() -> restTemplate.getForObject(URL, Journal[].class));
    }

    public Journal add(Journal journal) throws Exception {
        return execute(() -> restTemplate.postForObject(URL, journal, Journal.class));
    }

    public void delete(Long id) throws Exception {
        execute(() -> {
            restTemplate.delete(String.format("%s/%s", URL, id));
            return null;
        });
    }

    public void update(Journal journal) throws Exception {
        execute(() -> {
            restTemplate.put(String.format("%s/%s", URL, journal.getId()), journal);
            return null;
        });
    }
}
