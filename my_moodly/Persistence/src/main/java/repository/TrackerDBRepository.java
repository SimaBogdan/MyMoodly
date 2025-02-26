package repository;

import model.Tracker;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

@Repository
public class TrackerDBRepository implements TrackerRepository {

    private JdbcUtils jdbcUtils;

    public TrackerDBRepository(Properties properties){
        this.jdbcUtils = new JdbcUtils(properties);
    }

    @Override
    public Tracker getById(Long id) {
        Connection connection = jdbcUtils.getConnection();
        String query = "SELECT * FROM Tracker WHERE id = ?;";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setLong(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return new Tracker(
                        rs.getLong("id"),
                        rs.getLong("id_task"),
                        rs.getString("date"),
                        rs.getInt("duration"),
                        rs.getBoolean("is_completed"));
            } else {
                return null; // Tracker not found
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Tracker> getAll() {
        Connection connection = jdbcUtils.getConnection();
        ArrayList<Tracker> trackers = new ArrayList<>();
        String query = "SELECT * FROM Tracker;";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                trackers.add(new Tracker(
                        rs.getLong("id"),
                        rs.getLong("id_task"),
                        rs.getString("date"),
                        rs.getInt("duration"),
                        rs.getBoolean("is_completed")));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return trackers;
    }

    @Override
    public void add(Tracker tracker) {
        Connection connection = jdbcUtils.getConnection();
        String query = "INSERT INTO Tracker (id_task, date, duration, is_completed) VALUES (?, ?, ?, ?);";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setLong(1, tracker.getId_task());
            stmt.setString(2, tracker.getDate());
            stmt.setInt(3, tracker.getDuration());
            stmt.setBoolean(4, tracker.getIs_completed());
            stmt.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void delete(Long id) {
        Connection connection = jdbcUtils.getConnection();
        String query = "DELETE FROM Tracker WHERE id = ?;";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setLong(1, id);
            stmt.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }


    @Override
    public void update(Long id, Tracker tracker) {
        Connection connection = jdbcUtils.getConnection();
        String query = "UPDATE Tracker SET id_task = ?, date = ?, duration = ?, is_completed = ? WHERE id = ?;";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setLong(1, tracker.getId_task());
            stmt.setString(2, tracker.getDate());
            stmt.setInt(3, tracker.getDuration());
            stmt.setBoolean(4, tracker.getIs_completed());
            stmt.setLong(5, tracker.getId());
            stmt.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
