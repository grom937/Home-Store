package com.example.home_store.Service;

import com.example.home_store.model.Order;
import com.example.home_store.model.OrderItem;
import com.example.home_store.model.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:no-reply@homestore.local}")
    private String fromAddress;

    public void sendRegistrationConfirmation(User user) {
        String subject = "Home Store - konto zostało utworzone";

        String text = """
                Dziękujemy za rejestrację w Home Store.

                Twoje konto zostało utworzone poprawnie.

                Email konta: %s

                Możesz teraz zalogować się do sklepu i korzystać z koszyka oraz zamówień.
                """.formatted(user.getEmail());

        send(user.getEmail(), subject, text);
    }

    public void sendOrderConfirmation(Order order) {
        StringBuilder text = new StringBuilder();

        text.append("Dziękujemy za złożenie zamówienia w Home Store.\n\n");
        text.append("ID zamówienia: ").append(order.getId()).append("\n");
        text.append("Status: ").append(order.getStatus()).append("\n\n");
        text.append("Produkty:\n");

        BigDecimal totalAmount = BigDecimal.ZERO;

        for (OrderItem item : order.getItems()) {
            BigDecimal lineTotal = item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
            totalAmount = totalAmount.add(lineTotal);

            text.append("- ")
                    .append(item.getProduct().getName())
                    .append(" | ilość: ")
                    .append(item.getQuantity())
                    .append(" | cena: ")
                    .append(item.getPrice())
                    .append(" zł | razem: ")
                    .append(lineTotal)
                    .append(" zł\n");
        }

        text.append("\nSuma zamówienia: ").append(totalAmount).append(" zł\n");

        send(order.getUser().getEmail(), "Home Store - potwierdzenie zamówienia", text.toString());
    }

    private void send(String to, String subject, String text) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromAddress);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);

            mailSender.send(message);

            log.info("Wysłano mail do: {}", to);
        } catch (MailException ex) {
            log.warn("Nie udało się wysłać maila do {}. Powód: {}", to, ex.getMessage());
        }
    }
}