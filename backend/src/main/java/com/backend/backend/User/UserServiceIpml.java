package com.backend.backend.User;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceIpml implements UserService{

    UserRepository userRepository;
    private PasswordEncoder encoder;
    public UserServiceIpml(UserRepository userRepository, PasswordEncoder encoder){
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    @Override
    public User addUser(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        return this.userRepository.save(user);
    }

    @Override
    public Optional<User> getUserByUsername(String username) {
        return this.userRepository.findByUsername(username);
    }

    @Override
    public User updateUser(int userId, User user) {
        User existing = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        existing.setEmail(user.getEmail());
        existing.setUsername(user.getUsername());

        if (!user.getPassword().equals(existing.getPassword())) {
            existing.setPassword(encoder.encode(user.getPassword()));
        }

        return userRepository.save(existing);
    }
    @Override
    public void saveUser(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    @Override
    public void deleteUser(int userId) {
        if (!userRepository.existsById(userId)) {
            throw new EntityNotFoundException("User with id " + userId + " not found");
        }
        userRepository.deleteById(userId);
    }

    @Override
    public List<User> getUsers(int userId) {
        User currentUser = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + userId));

        if (!currentUser.isAdmin()) {
            return List.of();
        }

        return userRepository.findAll();
    }

}
