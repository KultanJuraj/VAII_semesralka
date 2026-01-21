package com.backend.backend.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User addUser(User user);
    Optional<User> getUserByUsername(String username);
    User updateUser(int userId, User user);
    void saveUser(User user);
    void deleteUser(int userId);
    List<User> getUsers(int userId);
}