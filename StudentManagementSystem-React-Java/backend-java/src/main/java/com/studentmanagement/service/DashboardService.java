package com.studentmanagement.service;

import com.studentmanagement.dto.DashboardStatsDto;
import com.studentmanagement.dto.RecentActivityDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class DashboardService {

    @Autowired
    private StudentService studentService;

    @Autowired
    private FeeService feeService;

    @Autowired
    private InquiryService inquiryService;

    public DashboardStatsDto getDashboardStats() {
        Long totalStudents = studentService.getTotalActiveStudents();
        Long newAdmissions = studentService.getNewAdmissionsThisMonth();
        BigDecimal feesCollected = feeService.getTotalFeesCollected();
        Long pendingInquiries = inquiryService.getPendingInquiriesCount();

        return new DashboardStatsDto(
            totalStudents != null ? totalStudents : 0L,
            newAdmissions != null ? newAdmissions : 0L,
            feesCollected != null ? feesCollected : BigDecimal.ZERO,
            pendingInquiries != null ? pendingInquiries : 0L
        );
    }

    public List<RecentActivityDto> getRecentActivities() {
        List<RecentActivityDto> activities = new ArrayList<>();

        // Add sample recent activities (in a real app, you'd get these from actual data)
        LocalDateTime now = LocalDateTime.now();
        
        activities.add(new RecentActivityDto(
            "admission", 
            "New student John Doe admitted to Computer Science", 
            getRelativeTime(now.minusHours(2)), 
            now.minusHours(2)
        ));
        
        activities.add(new RecentActivityDto(
            "payment", 
            "Fee payment of $1,500.00 received from Jane Smith", 
            getRelativeTime(now.minusHours(4)), 
            now.minusHours(4)
        ));
        
        activities.add(new RecentActivityDto(
            "inquiry", 
            "New inquiry from Alex Johnson about scholarship programs", 
            getRelativeTime(now.minusHours(6)), 
            now.minusHours(6)
        ));
        
        activities.add(new RecentActivityDto(
            "admission", 
            "New student Sarah Wilson admitted to Business Administration", 
            getRelativeTime(now.minusDays(1)), 
            now.minusDays(1)
        ));
        
        activities.add(new RecentActivityDto(
            "payment", 
            "Fee payment of $2,000.00 received from Mike Davis", 
            getRelativeTime(now.minusDays(2)), 
            now.minusDays(2)
        ));

        return activities;
    }

    private String getRelativeTime(LocalDateTime dateTime) {
        LocalDateTime now = LocalDateTime.now();
        long hours = java.time.Duration.between(dateTime, now).toHours();
        
        if (hours < 1) {
            long minutes = java.time.Duration.between(dateTime, now).toMinutes();
            return minutes + (minutes == 1 ? " minute ago" : " minutes ago");
        } else if (hours < 24) {
            return hours + (hours == 1 ? " hour ago" : " hours ago");
        } else {
            long days = java.time.Duration.between(dateTime, now).toDays();
            return days + (days == 1 ? " day ago" : " days ago");
        }
    }
}