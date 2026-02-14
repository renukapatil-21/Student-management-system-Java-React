package com.studentmanagement.repository;

import com.studentmanagement.model.Inquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface InquiryRepository extends JpaRepository<Inquiry, Long> {
    
    List<Inquiry> findByStatus(String status);
    
    List<Inquiry> findByEmail(String email);
    
    @Query("SELECT COUNT(i) FROM Inquiry i WHERE i.status = 'Pending'")
    Long countPendingInquiries();
    
    @Query("SELECT i FROM Inquiry i ORDER BY i.createdDate DESC")
    List<Inquiry> findAllOrderByCreatedDateDesc();
}