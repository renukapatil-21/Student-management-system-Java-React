package com.studentmanagement.controller;

import com.studentmanagement.service.DashboardService;
import com.studentmanagement.dto.ApiResponse;
import com.studentmanagement.dto.DashboardStatsDto;
import com.studentmanagement.dto.RecentActivityDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<DashboardStatsDto>> getDashboardStats() {
        try {
            DashboardStatsDto stats = dashboardService.getDashboardStats();
            return ResponseEntity.ok(ApiResponse.success(stats, "Dashboard statistics retrieved successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Error retrieving dashboard statistics: " + e.getMessage()));
        }
    }

    @GetMapping("/recent-activities")
    public ResponseEntity<ApiResponse<List<RecentActivityDto>>> getRecentActivities() {
        try {
            List<RecentActivityDto> activities = dashboardService.getRecentActivities();
            return ResponseEntity.ok(ApiResponse.success(activities, "Recent activities retrieved successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Error retrieving recent activities: " + e.getMessage()));
        }
    }
}