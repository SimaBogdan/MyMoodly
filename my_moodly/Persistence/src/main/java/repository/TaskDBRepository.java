package repository;

import model.Task;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;


@Repository
public class TaskDBRepository implements TaskRepository {

    private JdbcUtils jdbcUtils;

    public TaskDBRepository(Properties properties){
        this.jdbcUtils = new JdbcUtils(properties);
    }

    @Override
    public Task getById(Long id) {
        Connection connection = jdbcUtils.getConnection();
        String query = "SELECT * FROM Task WHERE id = ?;";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setLong(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return new Task(
                        rs.getLong("id"),
                        rs.getLong("id_user"),
                        rs.getString("name"),
                        rs.getString("description"),
                        rs.getBoolean("is_predefined"));
            } else {
                return null; // Task not found
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Task> getAll() {
        Connection connection = jdbcUtils.getConnection();
        ArrayList<Task> tasks = new ArrayList<>();
        String query = "SELECT * FROM Task;";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                tasks.add(new Task(
                        rs.getLong("id"),
                        rs.getLong("id_user"),
                        rs.getString("name"),
                        rs.getString("description"),
                        rs.getBoolean("is_predefined")));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return tasks;
    }

    @Override
    public void add(Task task) {
        Connection connection = jdbcUtils.getConnection();
        String query = "INSERT INTO Task (id_user, name, description, is_predefined) VALUES (?, ?, ?, ?);";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setLong(1, task.getId_user());
            stmt.setString(2, task.getName());
            stmt.setString(3, task.getDescription());
            stmt.setBoolean(4, task.getIs_predefined());
            stmt.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void delete(Long id) {
        Connection connection = jdbcUtils.getConnection();
        String query = "DELETE FROM Task WHERE id = ?;";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setLong(1, id);
            stmt.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void update(Long id, Task task) {
        Connection connection = jdbcUtils.getConnection();
        String query = "UPDATE Task SET id_user = ?, name = ?, description = ?, is_predefined = ? WHERE id = ?;";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setLong(1, task.getId_user());
            stmt.setString(2, task.getName());
            stmt.setString(3, task.getDescription());
            stmt.setBoolean(4, task.getIs_predefined());
            stmt.setLong(5, task.getId());
            stmt.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
