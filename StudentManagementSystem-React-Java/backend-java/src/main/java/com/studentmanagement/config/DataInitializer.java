package com.studentmanagement.config;

import com.studentmanagement.model.Student;
import com.studentmanagement.model.Fee;
import com.studentmanagement.model.Inquiry;
import com.studentmanagement.repository.StudentRepository;
import com.studentmanagement.repository.FeeRepository;
import com.studentmanagement.repository.InquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private FeeRepository feeRepository;

    @Autowired
    private InquiryRepository inquiryRepository;

    @Override
    public void run(String... args) throws Exception {
        // Initialize sample data if database is empty
        if (studentRepository.count() == 0) {
            initializeStudents();
            initializeFees();
            initializeInquiries();
        }
    }

    private void initializeStudents() {
        // Create sample students
        Student student1 = new Student(
            "John", "Doe", "john.doe@email.com", "+1234567890",
            "1995-05-15", "Male", "123 Main St, City, State", "Computer Science"
        );
        
        Student student2 = new Student(
            "Jane", "Smith", "jane.smith@email.com", "+1234567891",
            "1996-08-22", "Female", "456 Oak Ave, City, State", "Business Administration"
        );
        
        Student student3 = new Student(
            "Alice", "Johnson", "alice.johnson@email.com", "+1234567892",
            "1997-03-10", "Female", "789 Pine St, City, State", "Engineering"
        );

        studentRepository.save(student1);
        studentRepository.save(student2);
        studentRepository.save(student3);
        
        System.out.println("Sample students initialized");
    }

    private void initializeFees() {
        // Get students for fee assignment
        Student student1 = studentRepository.findByEmail("john.doe@email.com").orElse(null);
        Student student2 = studentRepository.findByEmail("jane.smith@email.com").orElse(null);
        Student student3 = studentRepository.findByEmail("alice.johnson@email.com").orElse(null);

        if (student1 != null) {
            Fee tuitionFee1 = new Fee(student1, "Tuition Fee", new BigDecimal("5000.00"), LocalDateTime.now().plusMonths(1));
            tuitionFee1.setPaidAmount(new BigDecimal("5000.00"));
            tuitionFee1.setStatus("Paid");
            tuitionFee1.setPaidDate(LocalDateTime.now().minusDays(30));
            
            Fee libraryFee1 = new Fee(student1, "Library Fee", new BigDecimal("200.00"), LocalDateTime.now().plusMonths(2));
            libraryFee1.setPaidAmount(new BigDecimal("200.00"));
            libraryFee1.setStatus("Paid");
            libraryFee1.setPaidDate(LocalDateTime.now().minusDays(15));
            
            feeRepository.save(tuitionFee1);
            feeRepository.save(libraryFee1);
        }

        if (student2 != null) {
            Fee tuitionFee2 = new Fee(student2, "Tuition Fee", new BigDecimal("4500.00"), LocalDateTime.now().plusMonths(1));
            tuitionFee2.setPaidAmount(new BigDecimal("1500.00"));
            tuitionFee2.setStatus("Partially Paid");
            tuitionFee2.setPaidDate(LocalDateTime.now().minusDays(20));
            
            Fee labFee2 = new Fee(student2, "Lab Fee", new BigDecimal("300.00"), LocalDateTime.now().plusMonths(3));
            
            feeRepository.save(tuitionFee2);
            feeRepository.save(labFee2);
        }

        if (student3 != null) {
            Fee tuitionFee3 = new Fee(student3, "Tuition Fee", new BigDecimal("5500.00"), LocalDateTime.now().plusMonths(1));
            Fee libraryFee3 = new Fee(student3, "Library Fee", new BigDecimal("200.00"), LocalDateTime.now().plusMonths(2));
            Fee labFee3 = new Fee(student3, "Lab Fee", new BigDecimal("400.00"), LocalDateTime.now().plusMonths(3));
            
            feeRepository.save(tuitionFee3);
            feeRepository.save(libraryFee3);
            feeRepository.save(labFee3);
        }
        
        System.out.println("Sample fees initialized");
    }

    private void initializeInquiries() {
        // Create sample inquiries
        Inquiry inquiry1 = new Inquiry(
            "Alex Johnson", "alex.johnson@email.com", "+1234567893",
            "Admission Information", "I would like to know about the admission process for Computer Science program."
        );
        
        Inquiry inquiry2 = new Inquiry(
            "Sarah Williams", "sarah.williams@email.com", "+1234567894",
            "Scholarship Information", "Are there any scholarship programs available for business students?"
        );
        
        Inquiry inquiry3 = new Inquiry(
            "Mike Davis", "mike.davis@email.com", "+1234567895",
            "Course Duration", "What is the duration of the Engineering program?"
        );
        inquiry3.setStatus("Responded");
        inquiry3.setResponse("The Engineering program is 4 years long.");
        inquiry3.setResponseDate(LocalDateTime.now().minusDays(5));

        inquiryRepository.save(inquiry1);
        inquiryRepository.save(inquiry2);
        inquiryRepository.save(inquiry3);
        
        System.out.println("Sample inquiries initialized");
    }
}