package com.example.authsystembackend.repository;

import com.example.authsystembackend.entity.ActivityLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;

public interface ActivityLogRepo extends JpaRepository<ActivityLog, Long> {

    Page<ActivityLog> findByUserIdAndRecordedAtBetween(Long userId, Date from, Date to, Pageable pageable);
}
