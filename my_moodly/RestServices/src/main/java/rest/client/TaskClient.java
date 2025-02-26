package rest.client;

import model.Task;
import org.springframework.web.client.RestTemplate;

import java.util.concurrent.Callable;
public class TaskClient {

    public static final String URL = "http://localhost:8080/tasks";

    private final RestTemplate restTemplate = new RestTemplate();

    private <T> T execute(Callable<T> callable) throws Exception {
        try {
            return callable.call();
        } catch (Exception e) {
            throw new Exception(e);
        }
    }

    public Task[] getAll() throws Exception {
        return execute(() -> restTemplate.getForObject(URL, Task[].class));
    }

    public Task getById(Long id) throws Exception {
        return execute(() -> restTemplate.getForObject(String.format("%s/%s", URL, id), Task.class));
    }

    public Task add(Task task) throws Exception {
        return execute(() -> restTemplate.postForObject(URL, task, Task.class));
    }

    public void update(Task task) throws Exception {
        execute(() -> {
            restTemplate.put(String.format("%s/%s", URL, task.getId()), task);
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
