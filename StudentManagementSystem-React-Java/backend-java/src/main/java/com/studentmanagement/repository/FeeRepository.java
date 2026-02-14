package com.studentmanagement.repository;

import com.studentmanagement.model.Fee;
import com.studentmanagement.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.util.List;

@Repository
public interface FeeRepository extends JpaRepository<Fee, Long> {
    
    List<Fee> findByStudent(Student student);
    
    List<Fee> findByStudentId(Long studentId);
    
    List<Fee> findByStatus(String status);
    
    List<Fee> findByFeeType(String feeType);
    
    @Query("SELECT SUM(f.paidAmount) FROM Fee f WHERE f.status = 'Paid'")
    BigDecimal getTotalFeesCollected();
    
    @Query("SELECT SUM(f.amount - f.paidAmount) FROM Fee f WHERE f.status != 'Paid'")
    BigDecimal getTotalPendingFees();
    
    @Query("SELECT f FROM Fee f WHERE f.student.id = :studentId AND f.status = 'Pending'")
    List<Fee> findPendingFeesByStudentId(@Param("studentId") Long studentId);
    
    @Query("SELECT COUNT(f) FROM Fee f WHERE f.status = 'Pending'")
    Long countPendingFees();
}