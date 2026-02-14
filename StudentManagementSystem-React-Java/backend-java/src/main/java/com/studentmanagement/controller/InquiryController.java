package com.studentmanagement.controller;

import com.studentmanagement.model.Inquiry;
import com.studentmanagement.service.InquiryService;
import com.studentmanagement.dto.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/inquiries")
@CrossOrigin(origins = "http://localhost:3000")
public class InquiryController {

    @Autowired
    private InquiryService inquiryService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Inquiry>>> getAllInquiries() {
        try {
            List<Inquiry> inquiries = inquiryService.getAllInquiries();
            return ResponseEntity.ok(ApiResponse.success(inquiries, "Inquiries retrieved successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Error retrieving inquiries: " + e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Inquiry>> getInquiryById(@PathVariable Long id) {
        try {
            Optional<Inquiry> inquiry = inquiryService.getInquiryById(id);
            if (inquiry.isPresent()) {
                return ResponseEntity.ok(ApiResponse.success(inquiry.get(), "Inquiry retrieved successfully"));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error("Inquiry not found with id: " + id));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Error retrieving inquiry: " + e.getMessage()));
        }
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<ApiResponse<List<Inquiry>>> getInquiriesByStatus(@PathVariable String status) {
        try {
            List<Inquiry> inquiries = inquiryService.getInquiriesByStatus(status);
            return ResponseEntity.ok(ApiResponse.success(inquiries, "Inquiries retrieved by status successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Error retrieving inquiries by status: " + e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Inquiry>> createInquiry(@Valid @RequestBody Inquiry inquiry) {
        try {
            Inquiry createdInquiry = inquiryService.createInquiry(inquiry);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success(createdInquiry, "Inquiry created successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Error creating inquiry: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Inquiry>> updateInquiry(@PathVariable Long id, @Valid @RequestBody Inquiry inquiryDetails) {
        try {
            Inquiry updatedInquiry = inquiryService.updateInquiry(id, inquiryDetails);
            return ResponseEntity.ok(ApiResponse.success(updatedInquiry, "Inquiry updated successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Error updating inquiry: " + e.getMessage()));
        }
    }

    @PostMapping("/{id}/respond")
    public ResponseEntity<ApiResponse<Inquiry>> respondToInquiry(@PathVariable Long id, @RequestBody String response) {
        try {
            Inquiry updatedInquiry = inquiryService.respondToInquiry(id, response);
            return ResponseEntity.ok(ApiResponse.success(updatedInquiry, "Response added successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Error responding to inquiry: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteInquiry(@PathVariable Long id) {
        try {
            inquiryService.deleteInquiry(id);
            return ResponseEntity.ok(ApiResponse.success("Inquiry deleted successfully", "Inquiry deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Error deleting inquiry: " + e.getMessage()));
        }
    }
}