package com.example.home_store.config;

import com.example.home_store.model.Cart;
import com.example.home_store.model.Category;
import com.example.home_store.model.Product;
import com.example.home_store.model.User;
import com.example.home_store.model.enum_model.ProductType;
import com.example.home_store.model.enum_model.UserRole;
import com.example.home_store.repository.CategoryRepository;
import com.example.home_store.repository.ProductRepository;
import com.example.home_store.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public void run(String... args) {
        createAdminIfMissing();

        if (categoryRepository.count() > 0 || productRepository.count() > 0) {
            return;
        }

        Category furniture = category("Furniture", null);
        Category electronics = category("Electronics", null);
        categoryRepository.saveAll(List.of(furniture, electronics));

        Category livingRoom = category("Living Room", furniture);
        Category bedroom = category("Bedroom", furniture);
        Category kitchen = category("Kitchen", furniture);
        Category bathroom = category("Bathroom", furniture);
        Category office = category("Office", furniture);
        Category hallway = category("Hallway", furniture);

        Category rtv = category("RTV", electronics);
        Category agd = category("AGD", electronics);

        categoryRepository.saveAll(List.of(
                livingRoom, bedroom, kitchen, bathroom, office, hallway, rtv, agd
        ));

        List<Product> products = List.of(
                product(
                        "Sofa Milano",
                        "Wygodna sofa do salonu w nowoczesnym stylu.",
                        1999,
                        8,
                        "TUTAJ_WKLEJ_URL_LIVING_ROOM_SOFA",
                        ProductType.LIVING_ROOM_SOFA,
                        livingRoom
                ),
                product(
                        "Stolik kawowy Oslo",
                        "Praktyczny stolik kawowy do salonu z półką na drobiazgi.",
                        499,
                        12,
                        "TUTAJ_WKLEJ_URL_LIVING_ROOM_COFFEE_TABLE",
                        ProductType.LIVING_ROOM_COFFEE_TABLE,
                        livingRoom
                ),
                product(
                        "Regał Loft",
                        "Wysoki regał do salonu na książki i dekoracje.",
                        899,
                        6,
                        "TUTAJ_WKLEJ_URL_LIVING_ROOM_BOOKCASE",
                        ProductType.LIVING_ROOM_BOOKCASE,
                        livingRoom
                ),
                product(
                        "Fotel Relax",
                        "Miękki fotel wypoczynkowy idealny do czytania i odpoczynku.",
                        1099,
                        5,
                        "TUTAJ_WKLEJ_URL_LIVING_ROOM_ARMCHAIR",
                        ProductType.LIVING_ROOM_ARMCHAIR,
                        livingRoom
                ),

                product(
                        "Łóżko Dream 160",
                        "Duże łóżko do sypialni z wygodnym zagłówkiem.",
                        2399,
                        4,
                        "TUTAJ_WKLEJ_URL_BEDROOM_BED",
                        ProductType.BEDROOM_BED,
                        bedroom
                ),
                product(
                        "Szafa Nova",
                        "Pojemna szafa do sypialni z drzwiami przesuwnymi.",
                        1799,
                        5,
                        "TUTAJ_WKLEJ_URL_BEDROOM_WARDROBE",
                        ProductType.BEDROOM_WARDROBE,
                        bedroom
                ),
                product(
                        "Komoda Luna",
                        "Komoda do sypialni z szerokimi szufladami.",
                        999,
                        7,
                        "TUTAJ_WKLEJ_URL_BEDROOM_CHEST_OF_DRAWERS",
                        ProductType.BEDROOM_CHEST_OF_DRAWERS,
                        bedroom
                ),
                product(
                        "Szafka nocna Soft",
                        "Mała szafka nocna z miejscem na lampkę i książkę.",
                        349,
                        10,
                        "TUTAJ_WKLEJ_URL_BEDROOM_NIGHT_STAND",
                        ProductType.BEDROOM_NIGHT_STAND,
                        bedroom
                ),

                product(
                        "Stół Family",
                        "Solidny stół kuchenny do codziennych posiłków.",
                        1299,
                        6,
                        "TUTAJ_WKLEJ_URL_KITCHEN_TABLE",
                        ProductType.KITCHEN_TABLE,
                        kitchen
                ),
                product(
                        "Krzesło Basic",
                        "Wygodne krzesło do kuchni i jadalni.",
                        249,
                        20,
                        "TUTAJ_WKLEJ_URL_KITCHEN_CHAIR",
                        ProductType.KITCHEN_CHAIR,
                        kitchen
                ),
                product(
                        "Zlew Inox",
                        "Nowoczesny zlew kuchenny ze stali nierdzewnej.",
                        599,
                        9,
                        "TUTAJ_WKLEJ_URL_KITCHEN_SINK",
                        ProductType.KITCHEN_SINK,
                        kitchen
                ),
                product(
                        "Szafka kuchenna Smart",
                        "Szafka stojąca do zabudowy kuchennej.",
                        699,
                        11,
                        "TUTAJ_WKLEJ_URL_KITCHEN_CABINET",
                        ProductType.KITCHEN_CABINET,
                        kitchen
                ),
                product(
                        "Hoker Loft",
                        "Nowoczesny hoker do wyspy kuchennej lub barku.",
                        399,
                        8,
                        "TUTAJ_WKLEJ_URL_KITCHEN_BAR_STOOL",
                        ProductType.KITCHEN_BAR_STOOL,
                        kitchen
                ),

                product(
                        "Szafka pod umywalkę Aqua",
                        "Łazienkowa szafka pod umywalkę z półkami.",
                        799,
                        7,
                        "TUTAJ_WKLEJ_URL_BATHROOM_SINK_CABINET",
                        ProductType.BATHROOM_SINK_CABINET,
                        bathroom
                ),
                product(
                        "Wanna Comfort",
                        "Klasyczna wanna do nowoczesnej łazienki.",
                        1899,
                        3,
                        "TUTAJ_WKLEJ_URL_BATHROOM_BATH",
                        ProductType.BATHROOM_BATH,
                        bathroom
                ),
                product(
                        "Szafka łazienkowa Clean",
                        "Wąska szafka do przechowywania ręczników i kosmetyków.",
                        649,
                        9,
                        "TUTAJ_WKLEJ_URL_BATHROOM_STORAGE_CABINET",
                        ProductType.BATHROOM_STORAGE_CABINET,
                        bathroom
                ),
                product(
                        "Półka łazienkowa Home",
                        "Praktyczna półka ścienna do łazienki.",
                        199,
                        15,
                        "TUTAJ_WKLEJ_URL_BATHROOM_SHELF",
                        ProductType.BATHROOM_SHELF,
                        bathroom
                ),
                product(
                        "Kosz na pranie Linen",
                        "Kosz na pranie do łazienki z pokrywą.",
                        179,
                        14,
                        "TUTAJ_WKLEJ_URL_BATHROOM_LAUNDRY_BASKET",
                        ProductType.BATHROOM_LAUNDRY_BASKET,
                        bathroom
                ),

                product(
                        "Biurko Work Pro",
                        "Funkcjonalne biurko do pracy i nauki.",
                        999,
                        8,
                        "TUTAJ_WKLEJ_URL_OFFICE_DESK",
                        ProductType.OFFICE_DESK,
                        office
                ),
                product(
                        "Fotel biurowy Ergo",
                        "Ergonomiczny fotel biurowy z regulacją wysokości.",
                        899,
                        10,
                        "TUTAJ_WKLEJ_URL_OFFICE_CHAIR",
                        ProductType.OFFICE_CHAIR,
                        office
                ),
                product(
                        "Regał biurowy Office Line",
                        "Regał na dokumenty i książki do domowego biura.",
                        749,
                        6,
                        "TUTAJ_WKLEJ_URL_OFFICE_BOOKCASE",
                        ProductType.OFFICE_BOOKCASE,
                        office
                ),
                product(
                        "Szafka na dokumenty Lock",
                        "Zamykana szafka biurowa na akta i dokumenty.",
                        829,
                        5,
                        "TUTAJ_WKLEJ_URL_OFFICE_FILE_CABINET",
                        ProductType.OFFICE_FILE_CABINET,
                        office
                ),

                product(
                        "Szafka na buty Step",
                        "Szafka do przedpokoju na kilka par butów.",
                        499,
                        10,
                        "TUTAJ_WKLEJ_URL_HALLWAY_SHOE_CABINET",
                        ProductType.HALLWAY_SHOE_CABINET,
                        hallway
                ),
                product(
                        "Wieszak Hall",
                        "Stojący wieszak na kurtki i płaszcze.",
                        229,
                        13,
                        "TUTAJ_WKLEJ_URL_HALLWAY_COAT_RACK",
                        ProductType.HALLWAY_COAT_RACK,
                        hallway
                ),
                product(
                        "Ławka Entry",
                        "Ławka do przedpokoju z miejscem do siedzenia.",
                        549,
                        7,
                        "TUTAJ_WKLEJ_URL_HALLWAY_BENCH",
                        ProductType.HALLWAY_BENCH,
                        hallway
                ),
                product(
                        "Lustro Classic",
                        "Duże lustro do przedpokoju w prostej ramie.",
                        379,
                        9,
                        "TUTAJ_WKLEJ_URL_HALLWAY_MIRROR",
                        ProductType.HALLWAY_MIRROR,
                        hallway
                ),

                product(
                        "Telewizor Vision 55",
                        "Nowoczesny telewizor 55 cali do salonu.",
                        2999,
                        4,
                        "TUTAJ_WKLEJ_URL_TELEVISION",
                        ProductType.TELEVISION,
                        rtv
                ),
                product(
                        "Soundbar Audio Plus",
                        "System audio poprawiający jakość dźwięku w domu.",
                        1199,
                        6,
                        "TUTAJ_WKLEJ_URL_SOUND_SYSTEM",
                        ProductType.SOUND_SYSTEM,
                        rtv
                ),
                product(
                        "Kino domowe MaxSound",
                        "Zestaw kina domowego do filmów i seriali.",
                        2499,
                        3,
                        "TUTAJ_WKLEJ_URL_HOME_THEATER",
                        ProductType.HOME_THEATER,
                        rtv
                ),
                product(
                        "Odtwarzacz Media Box",
                        "Urządzenie do odtwarzania multimediów i aplikacji.",
                        499,
                        8,
                        "TUTAJ_WKLEJ_URL_MEDIA_PLAYER",
                        ProductType.MEDIA_PLAYER,
                        rtv
                ),
                product(
                        "Konsola Game Pro",
                        "Konsola do gier dla całej rodziny.",
                        2199,
                        5,
                        "TUTAJ_WKLEJ_URL_GAME_CONSOLE",
                        ProductType.GAME_CONSOLE,
                        rtv
                ),

                product(
                        "Lodówka FreshCool",
                        "Pojemna lodówka do nowoczesnej kuchni.",
                        2799,
                        4,
                        "TUTAJ_WKLEJ_URL_REFRIGERATOR",
                        ProductType.REFRIGERATOR,
                        agd
                ),
                product(
                        "Zmywarka CleanWash",
                        "Zmywarka do codziennego użytku w domu.",
                        1999,
                        4,
                        "TUTAJ_WKLEJ_URL_DISHWASHER",
                        ProductType.DISHWASHER,
                        agd
                ),
                product(
                        "Pralka AquaWash",
                        "Automatyczna pralka do domu i mieszkania.",
                        1899,
                        6,
                        "TUTAJ_WKLEJ_URL_WASHING_MACHINE",
                        ProductType.WASHING_MACHINE,
                        agd
                ),
                product(
                        "Suszarka DryTech",
                        "Suszarka bębnowa oszczędzająca czas i miejsce.",
                        2099,
                        3,
                        "TUTAJ_WKLEJ_URL_DRYER",
                        ProductType.DRYER,
                        agd
                ),
                product(
                        "Piekarnik BakeMaster",
                        "Piekarnik do pieczenia i przygotowywania potraw.",
                        1599,
                        5,
                        "TUTAJ_WKLEJ_URL_OVEN",
                        ProductType.OVEN,
                        agd
                ),
                product(
                        "Mikrofala QuickHeat",
                        "Kuchenka mikrofalowa do szybkiego podgrzewania dań.",
                        449,
                        9,
                        "TUTAJ_WKLEJ_URL_MICROWAVE",
                        ProductType.MICROWAVE,
                        agd
                ),
                product(
                        "Ekspres Aroma",
                        "Ekspres do kawy dla miłośników espresso i cappuccino.",
                        1299,
                        6,
                        "TUTAJ_WKLEJ_URL_COFFEE_MACHINE",
                        ProductType.COFFEE_MACHINE,
                        agd
                ),
                product(
                        "Czajnik Silver",
                        "Elektryczny czajnik do szybkiego gotowania wody.",
                        149,
                        16,
                        "TUTAJ_WKLEJ_URL_KETTLE",
                        ProductType.KETTLE,
                        agd
                ),
                product(
                        "Toster Crunch",
                        "Toster do przygotowania chrupiących grzanek.",
                        129,
                        14,
                        "TUTAJ_WKLEJ_URL_TOASTER",
                        ProductType.TOASTER,
                        agd
                ),
                product(
                        "Blender MixIt",
                        "Blender do koktajli, zup i sosów.",
                        219,
                        11,
                        "TUTAJ_WKLEJ_URL_BLENDER",
                        ProductType.BLENDER,
                        agd
                ),
                product(
                        "Odkurzacz PowerVac",
                        "Odkurzacz do codziennego sprzątania domu.",
                        899,
                        7,
                        "TUTAJ_WKLEJ_URL_VACUUM_CLEANER",
                        ProductType.VACUUM_CLEANER,
                        agd
                ),
                product(
                        "Żelazko Steam Pro",
                        "Żelazko parowe do prasowania ubrań.",
                        269,
                        10,
                        "TUTAJ_WKLEJ_URL_IRON",
                        ProductType.IRON,
                        agd
                ),
                product(
                        "Oczyszczacz Air Pure",
                        "Oczyszczacz powietrza do domu i sypialni.",
                        1099,
                        5,
                        "TUTAJ_WKLEJ_URL_AIR_PURIFIER",
                        ProductType.AIR_PURIFIER,
                        agd
                )
        );

        productRepository.saveAll(products);
    }

    private void createAdminIfMissing() {
        if (userRepository.existsByEmailIgnoreCase("admin@homestore.pl")) {
            return;
        }

        User admin = User.builder()
                .email("admin@homestore.pl")
                .password(passwordEncoder.encode("admin123"))
                .role(UserRole.ADMIN)
                .build();

        Cart cart = Cart.builder()
                .user(admin)
                .build();

        admin.setCart(cart);

        userRepository.save(admin);
    }

    private Category category(String name, Category parentCategory) {
        return Category.builder()
                .name(name)
                .parentCategory(parentCategory)
                .build();
    }

    private Product product(
            String name,
            String description,
            double price,
            int quantity,
            String imageUrl,
            ProductType productType,
            Category category
    ) {
        return Product.builder()
                .name(name)
                .description(description)
                .price(BigDecimal.valueOf(price))
                .quantity(quantity)
                .imageUrl(imageUrl)
                .productType(productType)
                .category(category)
                .build();
    }
}