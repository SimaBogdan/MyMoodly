package rest.services;

import model.Tracker;
import model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getById(@PathVariable Long id){
        User user = userRepository.getById(id);

        if(user == null){
            return new ResponseEntity<String>("User not found", HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<User>(user, HttpStatus.OK);
        }
    }

    @RequestMapping(method = RequestMethod.GET)
    public User[] getAll(){
        System.out.println("Get all users...");
        List<User> userList = new ArrayList<>(userRepository.getAll());
        return userList.toArray(new User[userList.size()]);
    }

    @RequestMapping(method = RequestMethod.POST)
    public User add(@RequestBody User user){
        userRepository.add(user);
        return user;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> delete(@PathVariable Long id){
        try{
            userRepository.delete(id);
            return new ResponseEntity<User>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public User update(@RequestBody User user){
        userRepository.update(user.getId(), user);
        return user;
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String eventError(Exception e) {
        return e.getMessage();
    }
}
