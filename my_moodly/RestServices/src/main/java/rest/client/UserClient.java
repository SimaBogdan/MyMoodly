package rest.client;

import model.User;
import org.springframework.web.client.RestTemplate;

import java.util.concurrent.Callable;

public class UserClient {
    public static final String URL = "http://localhost:8080/users";

    private final RestTemplate restTemplate = new RestTemplate();

    private <T> T execute(Callable<T> callable) throws Exception {
        try {
            return callable.call();
        } catch (Exception e) {
            throw new Exception(e);
        }
    }

    public User[] getAll() throws Exception {
        return execute(() -> restTemplate.getForObject(URL, User[].class));
    }

    public User getById(Long id) throws Exception {
        return execute(() -> restTemplate.getForObject(String.format("%s/%s", URL, id), User.class));
    }

    public User add(User user) throws Exception {
        return execute(() -> restTemplate.postForObject(URL, user, User.class));
    }

    public void update(User user) throws Exception {
        execute(() -> {
            restTemplate.put(String.format("%s/%s", URL, user.getId()), user);
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
