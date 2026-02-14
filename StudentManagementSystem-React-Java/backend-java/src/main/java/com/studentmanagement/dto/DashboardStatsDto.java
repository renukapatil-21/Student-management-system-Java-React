package com.studentmanagement.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class DashboardStatsDto {
    private Long totalStudents;
    private Long newAdmissions;
    private BigDecimal feesCollected;
    private Long pendingInquiries;
    private LocalDateTime lastUpdated;

    public DashboardStatsDto() {
        this.lastUpdated = LocalDateTime.now();
    }

    public DashboardStatsDto(Long totalStudents, Long newAdmissions, 
                           BigDecimal feesCollected, Long pendingInquiries) {
        this.totalStudents = totalStudents;
        this.newAdmissions = newAdmissions;
        this.feesCollected = feesCollected;
        this.pendingInquiries = pendingInquiries;
        this.lastUpdated = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getTotalStudents() { return totalStudents; }
    public void setTotalStudents(Long totalStudents) { this.totalStudents = totalStudents; }

    public Long getNewAdmissions() { return newAdmissions; }
    public void setNewAdmissions(Long newAdmissions) { this.newAdmissions = newAdmissions; }

    public BigDecimal getFeesCollected() { return feesCollected; }
    public void setFeesCollected(BigDecimal feesCollected) { this.feesCollected = feesCollected; }

    public Long getPendingInquiries() { return pendingInquiries; }
    public void setPendingInquiries(Long pendingInquiries) { this.pendingInquiries = pendingInquiries; }

    public LocalDateTime getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(LocalDateTime lastUpdated) { this.lastUpdated = lastUpdated; }
}