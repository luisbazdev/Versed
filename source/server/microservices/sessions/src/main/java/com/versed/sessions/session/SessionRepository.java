package com.versed.sessions.session;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionRepository extends JpaRepository<Session, Integer> {
    List<Session> findByStudentIdOrMentorId(String studentId, String mentorId);
}
