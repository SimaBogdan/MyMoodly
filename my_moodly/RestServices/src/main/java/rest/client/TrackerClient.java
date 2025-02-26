package rest.client;

import model.Tracker;
import org.springframework.web.client.RestTemplate;

import java.util.concurrent.Callable;

public class TrackerClient {

    public static final String URL = "http://localhost:8080/trackers";

    private final RestTemplate restTemplate = new RestTemplate();

    private <T> T execute(Callable<T> callable) throws Exception {
        try {
            return callable.call();
        } catch (Exception e) {
            throw new Exception(e);
        }
    }

    public Tracker[] getAll() throws Exception {
        return execute(() -> restTemplate.getForObject(URL, Tracker[].class));
    }

    public Tracker getById(Long id) throws Exception {
        return execute(() -> restTemplate.getForObject(String.format("%s/%s", URL, id), Tracker.class));
    }

    public Tracker add(Tracker tracker) throws Exception {
        return execute(() -> restTemplate.postForObject(URL, tracker, Tracker.class));
    }

    public void update(Tracker tracker) throws Exception {
        execute(() -> {
            restTemplate.put(String.format("%s/%s", URL, tracker.getId()), tracker);
            return null;
        });
    }

    public void delete(Long id) throws Exception {
        execute(() -> {
            restTemplate.delete(String.format("%s/%s", URL, id));
            return null;
        });
    }
}
