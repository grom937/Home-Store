package com.example.home_store.Service;

import com.example.home_store.model.Order;
import com.example.home_store.model.OrderItem;
import com.example.home_store.model.User;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.mail.from}")
    private String fromAddress;

    @Value("${app.mail.from-name:Home Store}")
    private String fromName;

    public void sendRegistrationConfirmation(User user) {
        String subject = "Home Store - konto zostało utworzone";

        String html = """
                <html>
                <body>
                    <h2>Dziękujemy za rejestrację w Home Store</h2>
                    <p>Twoje konto zostało utworzone poprawnie.</p>
                    <p><strong>Email konta:</strong> %s</p>
                    <p>Możesz teraz zalogować się do sklepu i korzystać z koszyka oraz zamówień.</p>
                    <p>Pozdrawiamy,<br>Home Store</p>
                </body>
                </html>
                """.formatted(escapeHtml(user.getEmail()));

        send(user.getEmail(), subject, html);
    }

    public void sendOrderConfirmation(Order order) {
        String subject = "Home Store - potwierdzenie zamówienia";
        String html = buildOrderConfirmationHtml(order);

        send(order.getUser().getEmail(), subject, html);
    }

    private void send(String to, String subject, String html) {
        try {
            log.info("Próba wysłania maila. Od: {}, Do: {}, Temat: {}", fromAddress, to, subject);

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(
                    message,
                    true,
                    StandardCharsets.UTF_8.name()
            );

            helper.setFrom(new InternetAddress(fromAddress, fromName));
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(html, true);

            mailSender.send(message);

            log.info("Wysłano mail do: {}, Temat: {}", to, subject);
        } catch (Exception ex) {
            log.warn("Nie udało się wysłać maila do: {}, Temat: {}. Powód: {}",
                    to, subject, ex.getMessage(), ex);
        }
    }

    private String buildOrderConfirmationHtml(Order order) {
        StringBuilder html = new StringBuilder();
        BigDecimal totalAmount = BigDecimal.ZERO;

        html.append("<html>");
        html.append("<body>");
        html.append("<h2>Dziękujemy za złożenie zamówienia w Home Store</h2>");
        html.append("<p>Twoje zamówienie zostało przyjęte.</p>");
        html.append("<p><strong>ID zamówienia:</strong> ")
                .append(escapeHtml(String.valueOf(order.getId())))
                .append("</p>");
        html.append("<p><strong>Status:</strong> ")
                .append(escapeHtml(String.valueOf(order.getStatus())))
                .append("</p>");

        html.append("<h3>Produkty:</h3>");
        html.append("<table border=\"1\" cellpadding=\"8\" cellspacing=\"0\">");
        html.append("<thead>");
        html.append("<tr>");
        html.append("<th>Produkt</th>");
        html.append("<th>Ilość</th>");
        html.append("<th>Cena</th>");
        html.append("<th>Razem</th>");
        html.append("</tr>");
        html.append("</thead>");
        html.append("<tbody>");

        for (OrderItem item : order.getItems()) {
            BigDecimal price = item.getPrice() != null ? item.getPrice() : BigDecimal.ZERO;
            int quantity = item.getQuantity() != null ? item.getQuantity() : 0;
            BigDecimal lineTotal = price.multiply(BigDecimal.valueOf(quantity));
            totalAmount = totalAmount.add(lineTotal);

            String productName = item.getProduct() != null
                    ? item.getProduct().getName()
                    : "Produkt";

            html.append("<tr>");
            html.append("<td>").append(escapeHtml(productName)).append("</td>");
            html.append("<td>").append(quantity).append("</td>");
            html.append("<td>").append(formatMoney(price)).append(" zł</td>");
            html.append("<td>").append(formatMoney(lineTotal)).append(" zł</td>");
            html.append("</tr>");
        }

        html.append("</tbody>");
        html.append("</table>");

        html.append("<p><strong>Suma zamówienia:</strong> ")
                .append(formatMoney(totalAmount))
                .append(" zł</p>");

        html.append("<p>Pozdrawiamy,<br>Home Store</p>");
        html.append("</body>");
        html.append("</html>");

        return html.toString();
    }

    private String escapeHtml(String value) {
        if (value == null) {
            return "";
        }

        return value
                .replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#39;");
    }

    private String formatMoney(BigDecimal value) {
        if (value == null) {
            return "0.00";
        }

        return value.setScale(2, RoundingMode.HALF_UP).toPlainString();
    }
}