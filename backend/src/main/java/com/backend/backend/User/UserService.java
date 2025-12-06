package com.backend.backend.User;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final LoginRepository loginRepository;
    private final UserRepository userRepository;

    public UserService(LoginRepository loginRepository, UserRepository userRepository) {
        this.loginRepository = loginRepository;
        this.userRepository = userRepository;
    }

    public User createUserWithLogin(UserRequest request) {
        Login login = new Login();
        login.setUsername(request.getUsername());
        login.setEMail(request.getEmail());
        login.setPasswd(request.getPasswd());

        User user = new User();
        user.setRating(request.getRating());
        user.setLogin(login);

        login.setUser(user);

        Login savedLogin = loginRepository.save(login); // cascade saves User
        return savedLogin.getUser();
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Integer id) {
        return userRepository.findById(id);
    }

    public User updateUser(Integer id, UserRequest request) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setRating(request.getRating());
                    Login login = user.getLogin();
                    login.setUsername(request.getUsername());
                    login.setEMail(request.getEmail());
                    login.setPasswd(request.getPasswd());
                    return userRepository.save(user);
                })
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void deleteUser(Integer id) {
        loginRepository.deleteById(id);
    }
}
