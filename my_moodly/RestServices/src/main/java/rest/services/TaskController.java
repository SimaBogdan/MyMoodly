package rest.services;

import model.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import repository.TaskRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getById(@PathVariable Long id){
        Task task = taskRepository.getById(id);

        if(task == null){
            return new ResponseEntity<String>("Task not found", HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<Task>(task, HttpStatus.OK);
        }
    }

    @RequestMapping(method = RequestMethod.GET)
    public Task[] getAll(){
        System.out.println("Get all tasks...");
        List<Task> taskList = new ArrayList<>(taskRepository.getAll());
        return taskList.toArray(new Task[taskList.size()]);
    }

    @RequestMapping(method = RequestMethod.POST)
    public Task add(@RequestBody Task task){
        taskRepository.add(task);
        return task;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> delete(@PathVariable Long id){
        try{
            taskRepository.delete(id);
            return new ResponseEntity<Task>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Task update(@RequestBody Task task){
        taskRepository.update(task.getId(), task);
        return task;
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String eventError(Exception e) {
        return e.getMessage();
    }
}
