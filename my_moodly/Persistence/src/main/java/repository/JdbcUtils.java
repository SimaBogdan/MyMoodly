package repository;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class JdbcUtils {
    private Properties jdbcProps;
    public JdbcUtils(Properties props){
        jdbcProps = props;
    }
    private Connection instance=null;

    private Connection getNewConnection(){

        String url=jdbcProps.getProperty("jdbc.url");
        String user=jdbcProps.getProperty("tasks.jdbc.user");
        String pass=jdbcProps.getProperty("tasks.jdbc.pass");

        Connection con = null;
        try {
            if (user != null && pass != null)
                con = DriverManager.getConnection(url, user, pass);
            else
                con = DriverManager.getConnection(url);
        } catch (SQLException e) {
            System.out.println("error getting connection " + e);
        }

        return con;
    }

    public Connection getConnection(){

        try {
            if (instance == null || instance.isClosed())
                instance = getNewConnection();
        } catch (SQLException e) {
            System.out.println("db error " + e);
        }

        return instance;
    }
}