package repository;

import model.Journal;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

@Repository
public class JournalDBRepository implements JournalRepository {

    private JdbcUtils jdbcUtils;

    public JournalDBRepository(Properties properties){
        this.jdbcUtils = new JdbcUtils(properties);
    }

    @Override
    public Journal getById(Long id) {
        Connection connection = jdbcUtils.getConnection();
        String query = "SELECT * FROM Journal WHERE id = ?;";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setLong(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return new Journal(
                        rs.getLong("id"),
                        rs.getLong("id_user"),
                        rs.getString("title"),
                        rs.getString("date"),
                        rs.getString("text"));
            } else {
                return null; // Journal not found
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Journal> getAll() {
        Connection connection = jdbcUtils.getConnection();
        ArrayList<Journal> journals = new ArrayList<>();
        String query = "SELECT * FROM Journal;";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                journals.add(new Journal(
                        rs.getLong("id"),
                        rs.getLong("id_user"),
                        rs.getString("title"),
                        rs.getString("date"),
                        rs.getString("text")));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return journals;
    }

    @Override
    public void add(Journal journal) {
        Connection connection = jdbcUtils.getConnection();
        String query = "INSERT INTO Journal (id_user, title, date, text) VALUES (?, ?, ?, ?);";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setLong(1, journal.getId_user());
            stmt.setString(2, journal.getTitle());
            stmt.setString(3, journal.getDate());
            stmt.setString(4, journal.getText());
            stmt.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void delete(Long id) {
        Connection connection = jdbcUtils.getConnection();
        String query = "DELETE FROM Journal WHERE id = ?;";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setLong(1, id);
            stmt.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void update(Long id, Journal journal) {
        Connection connection = jdbcUtils.getConnection();
        String query = "UPDATE Journal SET id_user = ?, title = ?, date = ?, text = ? WHERE id = ?;";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setLong(1, journal.getId_user());
            stmt.setString(2, journal.getTitle());
            stmt.setString(3, journal.getDate());
            stmt.setString(4, journal.getText());
            stmt.setLong(5, journal.getId());
            stmt.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
