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
                        "https://zona-design.pl/160979-large_default/sofa-rozkladana-tino-c-cm-z-funkcja-spania.jpg",
                        ProductType.LIVING_ROOM_SOFA,
                        livingRoom
                ),
                product(
                        "Stolik kawowy Oslo",
                        "Praktyczny stolik kawowy do salonu z półką na drobiazgi.",
                        499,
                        12,
                        "https://soolido.pl/userdata/public/gfx/6360/Stolik-kawowy-Ellon-70x70-cm-z-otwarta-szuflada-i-polka%2C-widok-w-aranzacji-salonu..webp",
                        ProductType.LIVING_ROOM_COFFEE_TABLE,
                        livingRoom
                ),
                product(
                        "Regał Loft",
                        "Wysoki regał do salonu na książki i dekoracje.",
                        899,
                        6,
                        "https://www.mebel-partner.pl/pub/media/catalog/product-resized/e/l/elegancki-wysoki-regal-na-ksiazki-i-dekoracje-joris-orzech-stelaz-czarny_2_-0-x900.webp",
                        ProductType.LIVING_ROOM_BOOKCASE,
                        livingRoom
                ),
                product(
                        "Fotel Relax",
                        "Miękki fotel wypoczynkowy idealny do czytania i odpoczynku.",
                        1099,
                        5,
                        "https://meblemakarowski.pl/img/cms/BLOG2/fotel-rozkladany-z-podnozkiem-spencer-szary-sztruksowy-nowoczesny.jpg",
                        ProductType.LIVING_ROOM_ARMCHAIR,
                        livingRoom
                ),

                product(
                        "Łóżko Dream 160",
                        "Duże łóżko do sypialni z wygodnym zagłówkiem.",
                        2399,
                        4,
                        "https://meblini.pl/userdata/public/gfx/29030/Lozko-tapicerowane-MEDIOLAN-w-tkaninie-monolith-25090.jpg",
                        ProductType.BEDROOM_BED,
                        bedroom
                ),
                product(
                        "Szafa Nova",
                        "Pojemna szafa do sypialni z drzwiami przesuwnymi.",
                        1799,
                        5,
                        "https://meblegracjansklep.pl/userdata/public/gfx/1306/Szafa-przesuwna-Mila-lustro-LEFKAS.webp",
                        ProductType.BEDROOM_WARDROBE,
                        bedroom
                ),
                product(
                        "Komoda Luna",
                        "Komoda do sypialni z szerokimi szufladami.",
                        999,
                        7,
                        "https://m.media-amazon.com/images/I/71AdVoopNXL._AC_UF894,1000_QL80_.jpg",
                        ProductType.BEDROOM_CHEST_OF_DRAWERS,
                        bedroom
                ),
                product(
                        "Szafka nocna Soft",
                        "Mała szafka nocna z miejscem na lampkę i książkę.",
                        349,
                        10,
                        "https://m.media-amazon.com/images/I/71Sldtf3ZZL._AC_UF894,1000_QL80_.jpg",
                        ProductType.BEDROOM_NIGHT_STAND,
                        bedroom
                ),

                product(
                        "Stół Family",
                        "Solidny stół kuchenny do codziennych posiłków.",
                        1299,
                        6,
                        "https://a.allegroimg.com/original/11787c/96c5988e4230a4787682d027a386",
                        ProductType.KITCHEN_TABLE,
                        kitchen
                ),
                product(
                        "Krzesło Basic",
                        "Wygodne krzesło do kuchni i jadalni.",
                        249,
                        20,
                        "https://www.mebel-partner.pl/pub/media/catalog/product-resized/k/r/krzeslo_elina_czarny-czarny_skora_ekologiczna__podstawa_czarny_8_-0-x1200.webp",
                        ProductType.KITCHEN_CHAIR,
                        kitchen
                ),
                product(
                        "Zlew Inox",
                        "Nowoczesny zlew kuchenny ze stali nierdzewnej.",
                        599,
                        9,
                        "https://kochamymeble.pl/img/products/55/75/1_max.jpg",
                        ProductType.KITCHEN_SINK,
                        kitchen
                ),
                product(
                        "Szafka kuchenna Smart",
                        "Szafka stojąca do zabudowy kuchennej.",
                        699,
                        11,
                        "https://dominat-meble.pl/4741-large_default/szafka-do-piekarnika-pod-zabudowe-szara-artisan.jpg",
                        ProductType.KITCHEN_CABINET,
                        kitchen
                ),
                product(
                        "Hoker Loft",
                        "Nowoczesny hoker do wyspy kuchennej lub barku.",
                        399,
                        8,
                        "https://www.deltachairs.com/img/blog/107/krakow_hoker_zdj1.jpg",
                        ProductType.KITCHEN_BAR_STOOL,
                        kitchen
                ),

                product(
                        "Szafka pod umywalkę Aqua",
                        "Łazienkowa szafka pod umywalkę z półkami.",
                        799,
                        7,
                        "https://www.lazienkowy.pl/obrazki4/szafka-lazienkowa-pod-umywalke-nablatowa-harmony-studio-031025.jpg",
                        ProductType.BATHROOM_SINK_CABINET,
                        bathroom
                ),
                product(
                        "Wanna Comfort",
                        "Klasyczna wanna do nowoczesnej łazienki.",
                        1899,
                        3,
                        "https://www.twojabateria.pl/upload/stblog/2/672/2032/6722032large.jpg",
                        ProductType.BATHROOM_BATH,
                        bathroom
                ),
                product(
                        "Szafka łazienkowa Clean",
                        "Wąska szafka do przechowywania ręczników i kosmetyków.",
                        649,
                        9,
                        "https://m.media-amazon.com/images/I/71kk15IDsLL._AC_UF894,1000_QL80_.jpg",
                        ProductType.BATHROOM_STORAGE_CABINET,
                        bathroom
                ),
                product(
                        "Półka łazienkowa Home",
                        "Praktyczna półka ścienna do łazienki.",
                        199,
                        15,
                        "https://notodo.pl/uploads/products/3232/polka-wiszaca-do-lazienki-rosa-3.jpg",
                        ProductType.BATHROOM_SHELF,
                        bathroom
                ),
                product(
                        "Kosz na pranie Linen",
                        "Kosz na pranie do łazienki z pokrywą.",
                        179,
                        14,
                        "https://static.brw.pl/brw/img/produkt/533327/kosz-z-pokrywa-na-bielizne-pranie-duzy-50l-kolory-slarge.jpg",
                        ProductType.BATHROOM_LAUNDRY_BASKET,
                        bathroom
                ),

                product(
                        "Biurko Work Pro",
                        "Funkcjonalne biurko do pracy i nauki.",
                        999,
                        8,
                        "https://a.allegroimg.com/original/1133a7/ddd493de4f85b8b4e845cc2e6422/Funkcjonalne-biurko-narozne-do-pracy-szkoly-nauki",
                        ProductType.OFFICE_DESK,
                        office
                ),
                product(
                        "Fotel biurowy Ergo",
                        "Ergonomiczny fotel biurowy z regulacją wysokości.",
                        899,
                        10,
                        "https://a.allegroimg.com/original/118bb9/8377f8b94b0891e6d96b0a6abf50/FOTEL-BIUROWY-CZARNY-KRZESLO-BIUROWE-FOTEL-OBROTOWY-ERGONOMICZNY-SKORZANY-Rodzaj-obrotowy",
                        ProductType.OFFICE_CHAIR,
                        office
                ),
                product(
                        "Regał biurowy Office Line",
                        "Regał na dokumenty i książki do domowego biura.",
                        749,
                        6,
                        "https://deerhorn.pl/wp-content/uploads/2023/12/regal-na-dokumenty-czarny.jpg",
                        ProductType.OFFICE_BOOKCASE,
                        office
                ),
                product(
                        "Szafka na dokumenty Lock",
                        "Zamykana szafka biurowa na akta i dokumenty.",
                        829,
                        5,
                        "https://alekrzesla.pl/66549-large_default/biurowa-szafa-metalowa-na-akta-jan-9040185h-antracytowa-orzech.jpg",
                        ProductType.OFFICE_FILE_CABINET,
                        office
                ),

                product(
                        "Szafka na buty Step",
                        "Szafka do przedpokoju na kilka par butów.",
                        499,
                        10,
                        "https://a.allegroimg.com/original/11141c/1f45abd049528efc5d524564c598/Szafa-na-buty-180x80-do-przedpokoju-25-par-obuwia",
                        ProductType.HALLWAY_SHOE_CABINET,
                        hallway
                ),
                product(
                        "Wieszak Edie Hall",
                        "Stojący wieszak na kurtki i płaszcze.",
                        229,
                        13,
                        "https://static.brw.pl/brw/img/produkt/435340/stojak-tree-wieszak-na-kurtki-i-plaszcze-wys-180-cm-slarge.jpg",
                        ProductType.HALLWAY_COAT_RACK,
                        hallway
                ),
                product(
                        "Ławka Entry",
                        "Ławka do przedpokoju z miejscem do siedzenia.",
                        549,
                        7,
                        "https://timbersky.pl/wp-content/uploads/2023/10/Ascella-04.png",
                        ProductType.HALLWAY_BENCH,
                        hallway
                ),
                product(
                        "Lustro Classic",
                        "Duże lustro do przedpokoju w prostej ramie.",
                        379,
                        9,
                        "https://sklep.stolarstwo-smaza.pl/userdata/public/gfx/4576/Duze-prostokatne-lustro-w-czarnej-drewnianej-ramie-180x80.jpg",
                        ProductType.HALLWAY_MIRROR,
                        hallway
                ),

                product(
                        "Telewizor Vision 55",
                        "Nowoczesny telewizor 55 cali do salonu.",
                        2999,
                        4,
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6aRPxec_HdX9fsv501VTYVdjaWmbBdhXF-A&s",
                        ProductType.TELEVISION,
                        rtv
                ),
                product(
                        "Soundbar Audio Plus",
                        "System audio poprawiający jakość dźwięku w domu.",
                        1199,
                        6,
                        "https://sklep.audiocolor.pl/wp-content/smush-webp/2025/06/Technics-SC-CX700-czarny-Roon-Nucleus-One-audiocolor-warszawa-1.png.webp",
                        ProductType.SOUND_SYSTEM,
                        rtv
                ),
                product(
                        "Kino domowe MaxSound",
                        "Zestaw kina domowego do filmów i seriali.",
                        2499,
                        3,
                        "https://www.tophifi.pl/media/wysiwyg/NAD/m17-v2i/nad-m17-v2i.jpg",
                        ProductType.HOME_THEATER,
                        rtv
                ),
                product(
                        "Odtwarzacz Media Box",
                        "Urządzenie do odtwarzania multimediów i aplikacji.",
                        499,
                        8,
                        "https://sklep.rms.pl/img/product_media/35001-36000/MS120_black_avant_copie.jpg",
                        ProductType.MEDIA_PLAYER,
                        rtv
                ),
                product(
                        "Konsola Game Pro",
                        "Konsola do gier dla całej rodziny.",
                        2199,
                        5,
                        "https://m.media-amazon.com/images/I/51zgnbshSsL._AC_SY300_SX300_QL70_ML2_.jpg",
                        ProductType.GAME_CONSOLE,
                        rtv
                ),

                product(
                        "Lodówka FreshCool",
                        "Pojemna lodówka do nowoczesnej kuchni.",
                        2799,
                        4,
                        "https://paypo.pl/blog/wp-content/uploads/2021/09/Nowy-projekt-16.png",
                        ProductType.REFRIGERATOR,
                        agd
                ),
                product(
                        "Zmywarka CleanWash",
                        "Zmywarka do codziennego użytku w domu.",
                        1999,
                        4,
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1GCecxs048mX8CM2YjB4q0-6hzwHPrDMtRg&s",
                        ProductType.DISHWASHER,
                        agd
                ),
                product(
                        "Pralka AquaWash",
                        "Automatyczna pralka do domu i mieszkania.",
                        1899,
                        6,
                        "https://m.media-amazon.com/images/I/71VKM3-oDYL._AC_UF1000,1000_QL80_.jpg",
                        ProductType.WASHING_MACHINE,
                        agd
                ),
                product(
                        "Suszarka DryTech",
                        "Suszarka bębnowa oszczędzająca czas i miejsce.",
                        2099,
                        3,
                        "https://m.media-amazon.com/images/I/71IPplLhQTL._AC_UF894,1000_QL80_.jpg",
                        ProductType.DRYER,
                        agd
                ),
                product(
                        "Piekarnik BakeMaster",
                        "Piekarnik do pieczenia i przygotowywania potraw.",
                        1599,
                        5,
                        "https://a.allegroimg.com/s512/11c03f/23421e2843eb88b8bea377edda7f/DWUSTREFOWY-DZIELONY-PIEKARNIK-ELEKTRYCZNY-FRYTOWNICA-BEZTLUSZCZOWA-12L",
                        ProductType.OVEN,
                        agd
                ),
                product(
                        "Mikrofala QuickHeat",
                        "Kuchenka mikrofalowa do szybkiego podgrzewania dań.",
                        449,
                        9,
                        "https://mmgastro.pl/hpeciai/2a658cadaf567600363e288f263bd43c/pol_pl_Kuchenka-mikrofalowa-z-funkcja-grilla-700-W-20-l-HENDI-281710-131365_1.webp",
                        ProductType.MICROWAVE,
                        agd
                ),
                product(
                        "Ekspres Aroma",
                        "Ekspres do kawy dla miłośników espresso i cappuccino.",
                        1299,
                        6,
                        "https://ocdn.eu/pulscms/MDA_/6fd33f53cd658b0627dd96fc8167ff0c.jpg",
                        ProductType.COFFEE_MACHINE,
                        agd
                ),
                product(
                        "Czajnik Silver",
                        "Elektryczny czajnik do szybkiego gotowania wody.",
                        149,
                        16,
                        "https://a.allegroimg.com/original/113c45/e467eb3d4464be75dc362f65e163/KRAFT-DELE-CZAJNIK-ELEKTRYCZNY-1-8L-2400W-SZYBKIE-GOTOWANIE-WODY-KD4104",
                        ProductType.KETTLE,
                        agd
                ),
                product(
                        "Toster Crunch",
                        "Toster do przygotowania chrupiących grzanek.",
                        129,
                        14,
                        "https://static3.redcart.pl/templates/images/thumb/939969/1500/1500/pl/0/templates/images/products/939969/13ddf7be932cf5c346ede929d653679a.jpeg",
                        ProductType.TOASTER,
                        agd
                ),
                product(
                        "Blender MixIt",
                        "Blender do koktajli, zup i sosów.",
                        219,
                        11,
                        "https://js.europ24.pl/67558-medium_default/blender-reczny-mg-home-300w-z-regulacja-predkosci-czarny-do-zup-koktajli-mocny.jpg",
                        ProductType.BLENDER,
                        agd
                ),
                product(
                        "Odkurzacz PowerVac",
                        "Odkurzacz do codziennego sprzątania domu.",
                        899,
                        7,
                        "https://www.sencor.pl/Sencor/media/content/Products/41018171-03.jpg",
                        ProductType.VACUUM_CLEANER,
                        agd
                ),
                product(
                        "Żelazko Steam Pro",
                        "Żelazko parowe do prasowania ubrań.",
                        269,
                        10,
                        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTLivdBxO3CfXzGwk6i6nCpb8sl7SlO6JtuyVwKIcRbiK42g8WA0IFuOSIT7zMwYRdECPO0hR4fwRqcw7Vl9PunkHJ_xm5P3eWwPChRcgz0fS1W_eHMTSbb",
                        ProductType.IRON,
                        agd
                ),
                product(
                        "Oczyszczacz Air Pure",
                        "Oczyszczacz powietrza do domu i sypialni.",
                        1099,
                        5,
                        "https://ranking-oczyszczaczy.pl/wp-content/uploads/porownanie-oczyszczacze-powietrza-do-sypialni-scaled-e1668607555756.jpg",
                        ProductType.AIR_PURIFIER,
                        agd
                ),
                product(
                        "Oczyszczacz Air Super Pure",
                        "Oczyszczacz powietrza do całego domu.",
                        800,
                        2,
                        "https://klarta.pl/wp-content/uploads/2023/03/klarta-humea-grande-white-nalewanie-wody_11zon.webp",
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