package com.studentmanagement.controller;

import com.studentmanagement.model.Fee;
import com.studentmanagement.service.FeeService;
import com.studentmanagement.dto.ApiResponse;
import com.studentmanagement.dto.PaymentRequestDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/fees")
@CrossOrigin(origins = "http://localhost:3000")
public class FeeController {

    @Autowired
    private FeeService feeService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Fee>>> getAllFees() {
        try {
            List<Fee> fees = feeService.getAllFees();
            return ResponseEntity.ok(ApiResponse.success(fees, "Fees retrieved successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Error retrieving fees: " + e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Fee>> getFeeById(@PathVariable Long id) {
        try {
            Optional<Fee> fee = feeService.getFeeById(id);
            if (fee.isPresent()) {
                return ResponseEntity.ok(ApiResponse.success(fee.get(), "Fee retrieved successfully"));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error("Fee not found with id: " + id));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Error retrieving fee: " + e.getMessage()));
        }
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<ApiResponse<List<Fee>>> getFeesByStudentId(@PathVariable Long studentId) {
        try {
            List<Fee> fees = feeService.getFeesByStudentId(studentId);
            return ResponseEntity.ok(ApiResponse.success(fees, "Student fees retrieved successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Error retrieving student fees: " + e.getMessage()));
        }
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<ApiResponse<List<Fee>>> getFeesByStatus(@PathVariable String status) {
        try {
            List<Fee> fees = feeService.getFeesByStatus(status);
            return ResponseEntity.ok(ApiResponse.success(fees, "Fees retrieved by status successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Error retrieving fees by status: " + e.getMessage()));
        }
    }

    @GetMapping("/type/{feeType}")
    public ResponseEntity<ApiResponse<List<Fee>>> getFeesByType(@PathVariable String feeType) {
        try {
            List<Fee> fees = feeService.getFeesByType(feeType);
            return ResponseEntity.ok(ApiResponse.success(fees, "Fees retrieved by type successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Error retrieving fees by type: " + e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Fee>> createFee(@Valid @RequestBody Fee fee) {
        try {
            Fee createdFee = feeService.createFee(fee);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success(createdFee, "Fee created successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Error creating fee: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Fee>> updateFee(@PathVariable Long id, @Valid @RequestBody Fee feeDetails) {
        try {
            Fee updatedFee = feeService.updateFee(id, feeDetails);
            return ResponseEntity.ok(ApiResponse.success(updatedFee, "Fee updated successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Error updating fee: " + e.getMessage()));
        }
    }

    @PostMapping("/{id}/payment")
    public ResponseEntity<ApiResponse<Fee>> processPayment(@PathVariable Long id, @Valid @RequestBody PaymentRequestDto paymentRequest) {
        try {
            Fee updatedFee = feeService.processPayment(id, paymentRequest);
            return ResponseEntity.ok(ApiResponse.success(updatedFee, "Payment processed successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Error processing payment: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteFee(@PathVariable Long id) {
        try {
            feeService.deleteFee(id);
            return ResponseEntity.ok(ApiResponse.success("Fee deleted successfully", "Fee deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Error deleting fee: " + e.getMessage()));
        }
    }
}