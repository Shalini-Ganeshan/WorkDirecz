package com.workdirecz.userservice.repository;


import com.workdirecz.userservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;



public interface UserRepository extends JpaRepository<User, Long> {
	
	public User findByEmail(String email);

}
