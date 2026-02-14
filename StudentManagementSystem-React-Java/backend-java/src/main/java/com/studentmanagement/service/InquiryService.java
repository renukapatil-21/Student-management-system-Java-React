package com.studentmanagement.service;

import com.studentmanagement.model.Inquiry;
import com.studentmanagement.repository.InquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class InquiryService {

    @Autowired
    private InquiryRepository inquiryRepository;

    public List<Inquiry> getAllInquiries() {
        return inquiryRepository.findAllOrderByCreatedDateDesc();
    }

    public Optional<Inquiry> getInquiryById(Long id) {
        return inquiryRepository.findById(id);
    }

    public List<Inquiry> getInquiriesByStatus(String status) {
        return inquiryRepository.findByStatus(status);
    }

    public List<Inquiry> getInquiriesByEmail(String email) {
        return inquiryRepository.findByEmail(email);
    }

    public Inquiry createInquiry(Inquiry inquiry) {
        return inquiryRepository.save(inquiry);
    }

    public Inquiry updateInquiry(Long id, Inquiry inquiryDetails) {
        Inquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inquiry not found with id: " + id));

        inquiry.setName(inquiryDetails.getName());
        inquiry.setEmail(inquiryDetails.getEmail());
        inquiry.setPhone(inquiryDetails.getPhone());
        inquiry.setSubject(inquiryDetails.getSubject());
        inquiry.setMessage(inquiryDetails.getMessage());
        inquiry.setStatus(inquiryDetails.getStatus());

        return inquiryRepository.save(inquiry);
    }

    public Inquiry respondToInquiry(Long id, String response) {
        Inquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inquiry not found with id: " + id));

        inquiry.setResponse(response);
        inquiry.setResponseDate(LocalDateTime.now());
        inquiry.setStatus("Responded");

        return inquiryRepository.save(inquiry);
    }

    public void deleteInquiry(Long id) {
        Inquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inquiry not found with id: " + id));
        inquiryRepository.delete(inquiry);
    }

    public Long getPendingInquiriesCount() {
        return inquiryRepository.countPendingInquiries();
    }
}