package rest.services;

import model.Journal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import repository.JournalRepository;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/journals")
@CrossOrigin(origins = "http://localhost:5173")
public class JournalController {

    @Autowired
    private JournalRepository journalRepository;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getById(@PathVariable Long id){
        Journal journal = journalRepository.getById(id);

        if(journal == null){
            return new ResponseEntity<String>("Journal not found", HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<Journal>(journal, HttpStatus.OK);
        }
    }

    @RequestMapping(method = RequestMethod.GET)
    public Journal[] getAll(){
        System.out.println("Get all journal entries...");
        List<Journal> journalList = new ArrayList<>(journalRepository.getAll());
        return journalList.toArray(new Journal[journalList.size()]);
    }

    @RequestMapping(method = RequestMethod.POST)
    public Journal add(@RequestBody Journal journal){
        journalRepository.add(journal);
        return journal;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> delete(@PathVariable Long id){
        try{
            journalRepository.delete(id);
            return new ResponseEntity<Journal>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Journal update(@RequestBody Journal journal){
        journalRepository.update(journal.getId(), journal);
        return journal;
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String eventError(Exception e) {
        return e.getMessage();
    }
}
