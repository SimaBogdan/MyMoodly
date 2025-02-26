package model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Tracker extends Entity<Long>
{
    @JsonProperty("id_task")
    private Long id_task;

    private String date;
    private int duration;
    private boolean is_completed;

    public Tracker(){
        super(null);
    }

    public Tracker(Long id, Long id_task, String date, int duration, boolean is_completed)
    {
        super(id);
        this.id_task = id_task;
        this.date = date;
        this.duration = duration;
        this.is_completed = is_completed;
    }

    public Long getId_task() {
        return id_task;
    }

    public void setId_task(Long id_task) {
        this.id_task = id_task;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public boolean getIs_completed()
    {
        return this.is_completed;
    }

    public void setIs_completed(boolean is_completed) {
        this.is_completed = is_completed;
    }
}