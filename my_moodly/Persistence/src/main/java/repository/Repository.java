package repository;

import model.Entity;

import java.util.Collection;
import java.util.List;

public interface Repository<ID, E extends Entity<ID>> {
    E getById(ID id);

    List<E> getAll();

    void add(E entity);

    void delete(ID id);

    void update(ID id, E entity);
}