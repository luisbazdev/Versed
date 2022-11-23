package com.versed.users.payment;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MethodRepository extends JpaRepository<Method, Integer>{
    List<Method> findByUserId(String id);
}