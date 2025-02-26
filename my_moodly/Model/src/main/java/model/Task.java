package model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Task extends Entity<Long>
{
    @JsonProperty("id_user")
    private Long id_user;

    private String name;
    private String description;
    private boolean is_predefined;

    public Task(){
        super(null);
    }

    public Task(Long id, Long id_user, String name, String description, boolean is_predefined)
    {
        super(id);
        this.id_user = id_user;
        this.name = name;
        this.description = description;
        this.is_predefined = is_predefined;
    }

    public Long getId_user()
    {
        return id_user;
    }

    public void setId_user(Long id_user) {
        this.id_user = id_user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean getIs_predefined()
    {
        return this.is_predefined;
    }

    public void setIs_predefined(boolean is_predefined) {
        this.is_predefined = is_predefined;
    }
}