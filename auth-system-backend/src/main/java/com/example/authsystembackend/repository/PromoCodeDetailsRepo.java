package com.example.authsystembackend.repository;

import com.example.authsystembackend.entity.PromoCodeDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PromoCodeDetailsRepo extends JpaRepository<PromoCodeDetails, Long> {
    Optional<PromoCodeDetails> findByPromoCode(String promoCode);
}
