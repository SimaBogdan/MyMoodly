package rest.services;

import model.Tracker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import repository.TrackerRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/trackers")
@CrossOrigin(origins = "http://localhost:5173")
public class TrackerController {

    @Autowired
    TrackerRepository trackerRepository;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getById(@PathVariable Long id){
        Tracker tracker = trackerRepository.getById(id);

        if(tracker == null){
            return new ResponseEntity<String>("Tracker not found", HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<Tracker>(tracker, HttpStatus.OK);
        }
    }

    @RequestMapping(method = RequestMethod.GET)
    public Tracker[] getAll(){
        System.out.println("Get all trackers...");
        List<Tracker> trackerList = new ArrayList<>(trackerRepository.getAll());
        return trackerList.toArray(new Tracker[trackerList.size()]);
    }

    @RequestMapping(method = RequestMethod.POST)
    public Tracker add(@RequestBody Tracker tracker){
        trackerRepository.add(tracker);
        return tracker;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> delete(@PathVariable Long id){
        try{
            trackerRepository.delete(id);
            return new ResponseEntity<Tracker>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Tracker update(@RequestBody Tracker tracker){
        trackerRepository.update(tracker.getId(), tracker);
        return tracker;
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String eventError(Exception e) {
        return e.getMessage();
    }
}
