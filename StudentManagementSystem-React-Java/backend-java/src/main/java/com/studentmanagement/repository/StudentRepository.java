package com.studentmanagement.repository;

import com.studentmanagement.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    
    Optional<Student> findByEmail(String email);
    
    List<Student> findByStatus(String status);
    
    List<Student> findByCourse(String course);
    
    @Query("SELECT s FROM Student s WHERE " +
           "LOWER(s.firstName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(s.lastName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(s.email) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(s.course) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Student> searchStudents(@Param("searchTerm") String searchTerm);
    
    @Query("SELECT COUNT(s) FROM Student s WHERE s.status = 'Active'")
    Long countActiveStudents();
    
    @Query("SELECT COUNT(s) FROM Student s WHERE YEAR(s.enrollmentDate) = YEAR(CURRENT_DATE) AND MONTH(s.enrollmentDate) = MONTH(CURRENT_DATE)")
    Long countNewAdmissionsThisMonth();
}