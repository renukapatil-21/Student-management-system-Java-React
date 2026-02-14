package com.studentmanagement.service;

import com.studentmanagement.model.Fee;
import com.studentmanagement.model.Student;
import com.studentmanagement.repository.FeeRepository;
import com.studentmanagement.repository.StudentRepository;
import com.studentmanagement.dto.PaymentRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class FeeService {

    @Autowired
    private FeeRepository feeRepository;

    @Autowired
    private StudentRepository studentRepository;

    public List<Fee> getAllFees() {
        return feeRepository.findAll();
    }

    public Optional<Fee> getFeeById(Long id) {
        return feeRepository.findById(id);
    }

    public List<Fee> getFeesByStudentId(Long studentId) {
        return feeRepository.findByStudentId(studentId);
    }

    public List<Fee> getFeesByStatus(String status) {
        return feeRepository.findByStatus(status);
    }

    public List<Fee> getFeesByType(String feeType) {
        return feeRepository.findByFeeType(feeType);
    }

    public Fee createFee(Fee fee) {
        // Validate student exists
        Student student = studentRepository.findById(fee.getStudent().getId())
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + fee.getStudent().getId()));
        
        fee.setStudent(student);
        return feeRepository.save(fee);
    }

    public Fee updateFee(Long id, Fee feeDetails) {
        Fee fee = feeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fee not found with id: " + id));

        fee.setFeeType(feeDetails.getFeeType());
        fee.setAmount(feeDetails.getAmount());
        fee.setDueDate(feeDetails.getDueDate());
        fee.setStatus(feeDetails.getStatus());

        return feeRepository.save(fee);
    }

    public void deleteFee(Long id) {
        Fee fee = feeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fee not found with id: " + id));
        feeRepository.delete(fee);
    }

    public Fee processPayment(Long feeId, PaymentRequestDto paymentRequest) {
        Fee fee = feeRepository.findById(feeId)
                .orElseThrow(() -> new RuntimeException("Fee not found with id: " + feeId));

        // Validate payment amount
        BigDecimal remainingAmount = fee.getRemainingAmount();
        if (paymentRequest.getAmount().compareTo(remainingAmount) > 0) {
            throw new RuntimeException("Payment amount cannot exceed remaining amount: " + remainingAmount);
        }

        // Process payment
        fee.setPaidAmount(fee.getPaidAmount().add(paymentRequest.getAmount()));
        fee.setPaymentMethod(paymentRequest.getPaymentMethod());
        fee.setTransactionId(UUID.randomUUID().toString());
        fee.setPaidDate(LocalDateTime.now());

        // Update status if fully paid
        if (fee.isFullyPaid()) {
            fee.setStatus("Paid");
        } else {
            fee.setStatus("Partially Paid");
        }

        return feeRepository.save(fee);
    }

    public BigDecimal getTotalFeesCollected() {
        BigDecimal total = feeRepository.getTotalFeesCollected();
        return total != null ? total : BigDecimal.ZERO;
    }

    public BigDecimal getTotalPendingFees() {
        BigDecimal total = feeRepository.getTotalPendingFees();
        return total != null ? total : BigDecimal.ZERO;
    }

    public List<Fee> getPendingFeesByStudentId(Long studentId) {
        return feeRepository.findPendingFeesByStudentId(studentId);
    }

    public Long getTotalPendingFeesCount() {
        return feeRepository.countPendingFees();
    }
}