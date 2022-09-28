package com.versed.mentorships.mentorship;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MentorshipRepository extends JpaRepository<Mentorship, Integer>{
	List<Mentorship> findByStudentIdOrMentorId(String studentId, String mentorId);
}
