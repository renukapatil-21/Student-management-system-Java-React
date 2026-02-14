package com.studentmanagement.dto;

import java.math.BigDecimal;

public class PaymentRequestDto {
    private BigDecimal amount;
    private String paymentMethod;

    public PaymentRequestDto() {}

    public PaymentRequestDto(BigDecimal amount, String paymentMethod) {
        this.amount = amount;
        this.paymentMethod = paymentMethod;
    }

    // Getters and Setters
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
}