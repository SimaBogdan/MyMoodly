package model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Journal extends Entity<Long>
{
    @JsonProperty("id_user")
    private Long id_user;

    private String title;
    private String date;
    private String text;

    public Journal() {
        super(null);  // Call the superclass constructor with a null value
    }


    public Journal(Long id, Long id_user, String title, String date, String text)
    {
        super(id);
        this.id_user = id_user;
        this.title = title;
        this.date = date;
        this.text = text;
    }

    public Long getId_user() {
        return id_user;
    }

    public void setId_user(Long id_user) {
        this.id_user = id_user;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}