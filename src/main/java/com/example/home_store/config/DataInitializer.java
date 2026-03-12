package com.example.home_store.config;


import com.example.home_store.model.enum_model.Category;
import com.example.home_store.model.Product;
import com.example.home_store.model.enum_model.Room;
import com.example.home_store.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(ProductRepository productRepository) {
        return args -> {

            if(productRepository.count() == 0){

                Product p1 = new Product();
                p1.setName("Sofa narożna");
                p1.setDescription("Nowoczesna sofa do salonu");
                p1.setPrice(2499.99);
                p1.setQuantity(10);
                p1.setRoom(Room.LIVING_ROOM);
                p1.setCategory(Category.FURNITURE);
                p1.setImageUrl("sofa.jpg");

                Product p2 = new Product();
                p2.setName("Stół drewniany");
                p2.setDescription("Stół do jadalni z litego drewna");
                p2.setPrice(899.99);
                p2.setQuantity(15);
                p2.setRoom(Room.KITCHEN);
                p2.setCategory(Category.FURNITURE);
                p2.setImageUrl("table.jpg");

                Product p3 = new Product();
                p3.setName("Lodówka Samsung");
                p3.setDescription("Duża lodówka z zamrażarką");
                p3.setPrice(2999.99);
                p3.setQuantity(5);
                p3.setRoom(Room.KITCHEN);
                p3.setCategory(Category.APPLIANCE);
                p3.setImageUrl("fridge.jpg");

                Product p4 = new Product();
                p4.setName("Lampa stojąca");
                p4.setDescription("Lampa do salonu");
                p4.setPrice(299.99);
                p4.setQuantity(20);
                p4.setRoom(Room.LIVING_ROOM);
                p4.setCategory(Category.LIGHTING);
                p4.setImageUrl("lamp.jpg");

                Product p5 = new Product();
                p5.setName("Łóżko dwuosobowe");
                p5.setDescription("Łóżko 160x200");
                p5.setPrice(1599.99);
                p5.setQuantity(8);
                p5.setRoom(Room.BEDROOM);
                p5.setCategory(Category.FURNITURE);
                p5.setImageUrl("bed.jpg");

                Product p6 = new Product();
                p6.setName("Szafa przesuwna");
                p6.setDescription("Duża szafa do sypialni");
                p6.setPrice(1999.99);
                p6.setQuantity(6);
                p6.setRoom(Room.BEDROOM);
                p6.setCategory(Category.STORAGE);
                p6.setImageUrl("wardrobe.jpg");

                Product p7 = new Product();
                p7.setName("Szafka łazienkowa");
                p7.setDescription("Szafka pod umywalkę");
                p7.setPrice(499.99);
                p7.setQuantity(12);
                p7.setRoom(Room.BATHROOM);
                p7.setCategory(Category.FURNITURE);
                p7.setImageUrl("bathroom.jpg");

                Product p8 = new Product();
                p8.setName("Biurko komputerowe");
                p8.setDescription("Biurko do pracy w domu");
                p8.setPrice(699.99);
                p8.setQuantity(10);
                p8.setRoom(Room.OFFICE);
                p8.setCategory(Category.FURNITURE);
                p8.setImageUrl("desk.jpg");

                Product p9 = new Product();
                p9.setName("Krzesło biurowe");
                p9.setDescription("Ergonomiczne krzesło");
                p9.setPrice(399.99);
                p9.setQuantity(25);
                p9.setRoom(Room.OFFICE);
                p9.setCategory(Category.FURNITURE);
                p9.setImageUrl("chair.jpg");

                Product p10 = new Product();
                p10.setName("Lustro łazienkowe");
                p10.setDescription("Duże lustro LED");
                p10.setPrice(299.99);
                p10.setQuantity(15);
                p10.setRoom(Room.BATHROOM);
                p10.setCategory(Category.DECOR);
                p10.setImageUrl("mirror.jpg");

                productRepository.save(p1);
                productRepository.save(p2);
                productRepository.save(p3);
                productRepository.save(p4);
                productRepository.save(p5);
                productRepository.save(p6);
                productRepository.save(p7);
                productRepository.save(p8);
                productRepository.save(p9);
                productRepository.save(p10);
            }
        };
    }
}