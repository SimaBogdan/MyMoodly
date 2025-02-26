package model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class User extends Entity<Long>
{
    private String username;
    private String password;
    private String name;

    public User(){
        super(null);
    }

    public User(Long id, String username, String password, String name)
    {
        super(id);
        this.username = username;
        this.password = password;
        this.name = name;
    }

    public String getUsername()
    {
        return this.username;
    }

    public void setUsername(String username)
    {
        this.username = username;
    }

    public String getPassword()
    {
        return this.password;
    }

    public void setPassword(String password)
    {
        this.password = password;
    }

    public String getName()
    {
        return this.name;
    }

    public void setName(String name)
    {
        this.name = name;
    }
}