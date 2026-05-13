import { Injectable } from '@angular/core';

type Language = 'pl' | 'en';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private storageKey = 'home_store_language';
  currentLanguage: Language = 'pl';

  private translations: Record<Language, Record<string, string>> = {
    pl: {
      home: 'Strona główna',
      products: 'Produkty',
      cart: 'Koszyk',
      myOrders: 'Moje zamówienia',
      register: 'Rejestracja',
      login: 'Logowanie',
      logout: 'Wyloguj',
      authLoginSubtitle: 'Zaloguj się do Home Store.',
      authRegisterSubtitle: 'Utwórz nowe konto w Home Store.',
      email: 'Email',
      password: 'Hasło',
      confirmPassword: 'Powtórz hasło',
      emailPlaceholderLogin: 'np. name@homestore.pl',
      emailPlaceholderRegister: 'np. jan.kowalski@email.com',
      passwordPlaceholderLogin: 'podaj hasło',
      passwordPlaceholderRegister: 'minimum 6 znaków',
      confirmPasswordPlaceholder: 'powtórz hasło',
      invalidEmail: 'Podaj poprawny adres email.',
      passwordRequired: 'Hasło jest wymagane.',
      passwordMinLength: 'Hasło musi mieć co najmniej 6 znaków.',
      confirmPasswordRequired: 'Potwierdzenie hasła jest wymagane.',
      passwordsDoNotMatch: 'Hasła nie są takie same.',
      loginSuccess: 'Zalogowano pomyślnie.',
      loginError: 'Wystąpił błąd podczas logowania.',
      registerSuccess: 'Konto zostało utworzone.',
      registerError: 'Wystąpił błąd podczas rejestracji.',
      loggingIn: 'Logowanie...',
      creatingAccount: 'Tworzenie konta...',
      loginButton: 'Zaloguj się',
      registerButton: 'Zarejestruj się',
      noAccountRegister: 'Nie masz konta? Zarejestruj się',
      haveAccountLogin: 'Masz już konto? Zaloguj się',
      adminProducts: 'Zarządzanie produktami',
      adminOrders: 'Zarządzanie zamówieniami',
      myAccount: 'Moje konto',
      role: 'Rola',
      loginRequired: 'Musisz być zalogowany, aby zobaczyć konto.',
      categories: 'Kategorie',
      featuredProducts: 'Polecane produkty',
      welcome: 'Witaj w Home Store',
      checkProducts: 'Sprawdź produkty z naszego katalogu.',
      all: 'Wszystkie',
      details: 'Zobacz szczegóły',
      loadingCategories: 'Ładowanie kategorii...',
      loadingProducts: 'Ładowanie produktów...',
      noProducts: 'Brak produktów do wyświetlenia',
      noCategories: 'Brak kategorii',
      categoryError: 'Nie udało się pobrać kategorii z backendu.',
      productsError: 'Nie udało się pobrać produktów z backendu.',
      noDescription: 'Brak opisu produktu.',
      loadingProductDetails: 'Ładowanie szczegółów produktu...',
      productDetailsLoadError: 'Nie udało się pobrać szczegółów produktu.',
      invalidProductId: 'Nieprawidłowy identyfikator produktu.',
      loginToAddCart: 'Musisz się zalogować, aby dodać produkt do koszyka.',
      productNotFound: 'Nie znaleziono produktu.',
      quantityMustBePositive: 'Ilość musi być większa od 0.',
      productAddedToCart: 'Produkt został dodany do koszyka.',
      productAddCartError: 'Nie udało się dodać produktu do koszyka.',
      availableQuantity: 'Dostępna ilość',
      addToCart: 'Dodaj do koszyka',
      productList: 'Lista produktów',
      search: 'Wyszukaj',
      searchPlaceholder: 'Wpisz nazwę lub opis produktu',
      category: 'Kategoria',
      productType: 'Typ produktu',
      priceFrom: 'Cena od',
      priceTo: 'Cena do',
      sort: 'Sortowanie',
      defaultSort: 'Domyślne',
      priceAsc: 'Cena rosnąco',
      priceDesc: 'Cena malejąco',
      clearFilters: 'Wyczyść filtry',
      backHome: 'Strona główna',
      backProducts: 'Wróć do produktów',
      basket: 'Koszyk',
      emptyCart: 'Twój koszyk jest pusty.',
      goToProducts: 'Przejdź do produktów',
      loadingCart: 'Ładowanie koszyka...',
      cartLoadError: 'Nie udało się pobrać koszyka.',
      cartQuantityError: 'Nie udało się zmienić ilości produktu.',
      cartRemoveError: 'Nie udało się usunąć produktu z koszyka.',
      cartClearError: 'Nie udało się wyczyścić koszyka.',
      orderCreated: 'Zamówienie zostało złożone.',
      orderCreateError: 'Nie udało się złożyć zamówienia.',
      price: 'Cena',
      value: 'Wartość',
      removeFromCart: 'Usuń z koszyka',
      summary: 'Podsumowanie',
      productCount: 'Liczba produktów',
      amount: 'Kwota',
      placeOrder: 'Złóż zamówienie',
      clearCart: 'Wyczyść koszyk',
      myOrdersTitle: 'Moje zamówienia',
      noOrders: 'Nie masz jeszcze żadnych zamówień.',
      loadingOrders: 'Ładowanie zamówień...',
      ordersLoadError: 'Nie udało się pobrać zamówień.',
      order: 'Zamówienie',
      date: 'Data',
      status: 'Status',
      pieces: 'szt.',
      cartIncreaseError: 'Nie udało się zwiększyć ilości produktu.',
      cartDecreaseError: 'Nie udało się zmniejszyć ilości produktu.',
      cartItemRemoved: 'Produkt został usunięty z koszyka.',
      cartCleared: 'Koszyk został wyczyszczony.',
      placingOrder: 'Składanie...',
      productManageTitle: 'Panel zarządzania produktami',
      addNewProduct: 'Dodaj nowy produkt',
      editProduct: 'Edytuj produkt',
      productName: 'Nazwa produktu',
      productDescription: 'Opis produktu',
      productNamePlaceholder: 'Np. Nowoczesna sofa',
      productDescriptionPlaceholder: 'Krótki opis produktu',
      productNameValidation: 'Nazwa jest wymagana i musi mieć minimum 2 znaki.',
      pricePlaceholder: 'Np. 1999',
      priceValidation: 'Cena musi być większa od 0.',
      quantity: 'Ilość',
      quantityPlaceholder: 'Np. 5',
      quantityValidation: 'Ilość nie może być ujemna.',
      imageUrl: 'URL obrazka',
      imageUrlPlaceholder: 'Np. https://example.com/sofa.jpg',
      imageUrlHint: 'Tutaj wklejasz link do obrazka z internetu. Jeśli zostawisz puste, backend ustawi obrazek zastępczy.',
      categoryRequired: 'Kategoria jest wymagana.',
      saveChanges: 'Zapisz zmiany',
      addProduct: 'Dodaj produkt',
      cancelEdit: 'Anuluj edycję',
      productManageSearchPlaceholder: 'Wyszukaj produkt po nazwie lub opisie',
      edit: 'Edytuj',
      delete: 'Usuń',
      unknownCategory: 'Nieznana kategoria',
      fillFormCorrectly: 'Uzupełnij poprawnie formularz',
      categoryLoadErrorShort: 'Błąd ładowania kategorii',
      productsLoadErrorShort: 'Błąd ładowania produktów',
      productUpdated: 'Produkt został zaktualizowany',
      productUpdateError: 'Błąd aktualizacji produktu',
      productAdded: 'Produkt został dodany',
      productAddError: 'Błąd dodawania produktu',
      productDeleted: 'Produkt został usunięty',
      productDeleteError: 'Błąd usuwania produktu',
      confirmDeleteProductMessage: 'Czy na pewno chcesz usunąć ten produkt? Tej operacji nie można cofnąć.',
      confirmDeleteTitle: 'Potwierdzenie usunięcia',
      cancel: 'Anuluj',
      noOrdersAdmin: 'Brak zamówień do wyświetlenia.',
      user: 'Użytkownik',
      saveStatus: 'Zapisz status',
      statusChanged: 'Status zamówienia został zmieniony na',
      statusUpdateError: 'Nie udało się zaktualizować statusu.'
    },
    en: {
      home: 'Home',
      products: 'Products',
      cart: 'Cart',
      myOrders: 'My orders',
      register: 'Register',
      login: 'Login',
      logout: 'Logout',
      authLoginSubtitle: 'Log in to Home Store.',
      authRegisterSubtitle: 'Create a new Home Store account.',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm password',
      emailPlaceholderLogin: 'e.g. name@homestore.com',
      emailPlaceholderRegister: 'e.g. john.smith@email.com',
      passwordPlaceholderLogin: 'enter password',
      passwordPlaceholderRegister: 'minimum 6 characters',
      confirmPasswordPlaceholder: 'repeat password',
      invalidEmail: 'Enter a valid email address.',
      passwordRequired: 'Password is required.',
      passwordMinLength: 'Password must be at least 6 characters long.',
      confirmPasswordRequired: 'Password confirmation is required.',
      passwordsDoNotMatch: 'Passwords do not match.',
      loginSuccess: 'Logged in successfully.',
      loginError: 'An error occurred while logging in.',
      registerSuccess: 'Account has been created.',
      registerError: 'An error occurred during registration.',
      loggingIn: 'Logging in...',
      creatingAccount: 'Creating account...',
      loginButton: 'Log in',
      registerButton: 'Register',
      noAccountRegister: 'No account? Register',
      haveAccountLogin: 'Already have an account? Log in',
      adminProducts: 'Manage products',
      adminOrders: 'Manage orders',
      myAccount: 'My account',
      role: 'Role',
      loginRequired: 'You must be logged in to view your account.',
      categories: 'Categories',
      featuredProducts: 'Featured products',
      welcome: 'Welcome to Home Store',
      checkProducts: 'Browse products from our catalog.',
      all: 'All',
      details: 'View details',
      loadingCategories: 'Loading categories...',
      loadingProducts: 'Loading products...',
      noProducts: 'No products to display',
      noCategories: 'No categories',
      categoryError: 'Could not load categories from backend.',
      productsError: 'Could not load products from backend.',
      noDescription: 'No product description.',
      loadingProductDetails: 'Loading product details...',
      productDetailsLoadError: 'Could not load product details.',
      invalidProductId: 'Invalid product identifier.',
      loginToAddCart: 'You must be logged in to add a product to cart.',
      productNotFound: 'Product was not found.',
      quantityMustBePositive: 'Quantity must be greater than 0.',
      productAddedToCart: 'Product has been added to cart.',
      productAddCartError: 'Could not add product to cart.',
      availableQuantity: 'Available quantity',
      addToCart: 'Add to cart',
      productList: 'Product list',
      search: 'Search',
      searchPlaceholder: 'Enter product name or description',
      category: 'Category',
      productType: 'Product type',
      priceFrom: 'Price from',
      priceTo: 'Price to',
      sort: 'Sort',
      defaultSort: 'Default',
      priceAsc: 'Price ascending',
      priceDesc: 'Price descending',
      clearFilters: 'Clear filters',
      backHome: 'Home',
      backProducts: 'Back to products',
      basket: 'Cart',
      emptyCart: 'Your cart is empty.',
      goToProducts: 'Go to products',
      loadingCart: 'Loading cart...',
      cartLoadError: 'Could not load cart.',
      cartQuantityError: 'Could not update product quantity.',
      cartRemoveError: 'Could not remove product from cart.',
      cartClearError: 'Could not clear cart.',
      orderCreated: 'Order has been placed.',
      orderCreateError: 'Could not place order.',
      price: 'Price',
      value: 'Value',
      removeFromCart: 'Remove from cart',
      summary: 'Summary',
      productCount: 'Product count',
      amount: 'Amount',
      placeOrder: 'Place order',
      clearCart: 'Clear cart',
      myOrdersTitle: 'My orders',
      noOrders: 'You do not have any orders yet.',
      loadingOrders: 'Loading orders...',
      ordersLoadError: 'Could not load orders.',
      order: 'Order',
      date: 'Date',
      status: 'Status',
      pieces: 'pcs.',
      cartIncreaseError: 'Could not increase product quantity.',
      cartDecreaseError: 'Could not decrease product quantity.',
      cartItemRemoved: 'Product has been removed from cart.',
      cartCleared: 'Cart has been cleared.',
      placingOrder: 'Placing order...',
      productManageTitle: 'Product management panel',
      addNewProduct: 'Add new product',
      editProduct: 'Edit product',
      productName: 'Product name',
      productDescription: 'Product description',
      productNamePlaceholder: 'E.g. Modern sofa',
      productDescriptionPlaceholder: 'Short product description',
      productNameValidation: 'Name is required and must be at least 2 characters long.',
      pricePlaceholder: 'E.g. 1999',
      priceValidation: 'Price must be greater than 0.',
      quantity: 'Quantity',
      quantityPlaceholder: 'E.g. 5',
      quantityValidation: 'Quantity cannot be negative.',
      imageUrl: 'Image URL',
      imageUrlPlaceholder: 'E.g. https://example.com/sofa.jpg',
      imageUrlHint: 'Paste an image link from the internet here. If you leave it empty, the backend will set a placeholder image.',
      categoryRequired: 'Category is required.',
      saveChanges: 'Save changes',
      addProduct: 'Add product',
      cancelEdit: 'Cancel editing',
      productManageSearchPlaceholder: 'Search product by name or description',
      edit: 'Edit',
      delete: 'Delete',
      unknownCategory: 'Unknown category',
      fillFormCorrectly: 'Fill in the form correctly',
      categoryLoadErrorShort: 'Error loading categories',
      productsLoadErrorShort: 'Error loading products',
      productUpdated: 'Product has been updated',
      productUpdateError: 'Error updating product',
      productAdded: 'Product has been added',
      productAddError: 'Error adding product',
      productDeleted: 'Product has been deleted',
      productDeleteError: 'Error deleting product',
      confirmDeleteProductMessage: 'Are you sure you want to delete this product? This action cannot be undone.',
      confirmDeleteTitle: 'Delete confirmation',
      cancel: 'Cancel',
      noOrdersAdmin: 'No orders to display.',
      user: 'User',
      saveStatus: 'Save status',
      statusChanged: 'Order status has been changed to',
      statusUpdateError: 'Could not update status.'
    }
  };

  private categoryTranslations: Record<Language, Record<string, string>> = {
    pl: {
      Furniture: 'Meble',
      Electronics: 'Elektronika',
      'Living Room': 'Salon',
      Bedroom: 'Sypialnia',
      Kitchen: 'Kuchnia',
      Bathroom: 'Łazienka',
      Office: 'Biuro',
      Hallway: 'Przedpokój',
      RTV: 'RTV',
      AGD: 'AGD'
    },
    en: {
      Furniture: 'Furniture',
      Electronics: 'Electronics',
      'Living Room': 'Living Room',
      Bedroom: 'Bedroom',
      Kitchen: 'Kitchen',
      Bathroom: 'Bathroom',
      Office: 'Office',
      Hallway: 'Hallway',
      RTV: 'RTV',
      AGD: 'Home appliances'
    }
  };

  private productTypeTranslations: Record<Language, Record<string, string>> = {
    pl: {
      LIVING_ROOM_SOFA: 'Sofa do salonu',
      LIVING_ROOM_COFFEE_TABLE: 'Stolik kawowy',
      LIVING_ROOM_BOOKCASE: 'Regał do salonu',
      LIVING_ROOM_ARMCHAIR: 'Fotel do salonu',

      BEDROOM_BED: 'Łóżko',
      BEDROOM_WARDROBE: 'Szafa',
      BEDROOM_CHEST_OF_DRAWERS: 'Komoda',
      BEDROOM_NIGHT_STAND: 'Szafka nocna',

      KITCHEN_TABLE: 'Stół kuchenny',
      KITCHEN_CHAIR: 'Krzesło kuchenne',
      KITCHEN_SINK: 'Zlew kuchenny',
      KITCHEN_CABINET: 'Szafka kuchenna',
      KITCHEN_BAR_STOOL: 'Hoker',

      BATHROOM_SINK_CABINET: 'Szafka pod umywalkę',
      BATHROOM_BATH: 'Wanna',
      BATHROOM_STORAGE_CABINET: 'Szafka łazienkowa',
      BATHROOM_SHELF: 'Półka łazienkowa',
      BATHROOM_LAUNDRY_BASKET: 'Kosz na pranie',

      OFFICE_DESK: 'Biurko',
      OFFICE_CHAIR: 'Fotel biurowy',
      OFFICE_BOOKCASE: 'Regał biurowy',
      OFFICE_FILE_CABINET: 'Szafka na dokumenty',

      HALLWAY_SHOE_CABINET: 'Szafka na buty',
      HALLWAY_COAT_RACK: 'Wieszak',
      HALLWAY_BENCH: 'Ławka',
      HALLWAY_MIRROR: 'Lustro',

      TELEVISION: 'Telewizor',
      SOUND_SYSTEM: 'System audio',
      HOME_THEATER: 'Kino domowe',
      MEDIA_PLAYER: 'Odtwarzacz multimedialny',
      GAME_CONSOLE: 'Konsola do gier',

      REFRIGERATOR: 'Lodówka',
      DISHWASHER: 'Zmywarka',
      WASHING_MACHINE: 'Pralka',
      DRYER: 'Suszarka',
      OVEN: 'Piekarnik',
      MICROWAVE: 'Mikrofalówka',
      COFFEE_MACHINE: 'Ekspres do kawy',
      KETTLE: 'Czajnik',
      TOASTER: 'Toster',
      BLENDER: 'Blender',
      VACUUM_CLEANER: 'Odkurzacz',
      IRON: 'Żelazko',
      AIR_PURIFIER: 'Oczyszczacz powietrza'
    },
    en: {
      LIVING_ROOM_SOFA: 'Living room sofa',
      LIVING_ROOM_COFFEE_TABLE: 'Coffee table',
      LIVING_ROOM_BOOKCASE: 'Living room bookcase',
      LIVING_ROOM_ARMCHAIR: 'Living room armchair',

      BEDROOM_BED: 'Bed',
      BEDROOM_WARDROBE: 'Wardrobe',
      BEDROOM_CHEST_OF_DRAWERS: 'Chest of drawers',
      BEDROOM_NIGHT_STAND: 'Nightstand',

      KITCHEN_TABLE: 'Kitchen table',
      KITCHEN_CHAIR: 'Kitchen chair',
      KITCHEN_SINK: 'Kitchen sink',
      KITCHEN_CABINET: 'Kitchen cabinet',
      KITCHEN_BAR_STOOL: 'Bar stool',

      BATHROOM_SINK_CABINET: 'Sink cabinet',
      BATHROOM_BATH: 'Bathtub',
      BATHROOM_STORAGE_CABINET: 'Bathroom cabinet',
      BATHROOM_SHELF: 'Bathroom shelf',
      BATHROOM_LAUNDRY_BASKET: 'Laundry basket',

      OFFICE_DESK: 'Desk',
      OFFICE_CHAIR: 'Office chair',
      OFFICE_BOOKCASE: 'Office bookcase',
      OFFICE_FILE_CABINET: 'File cabinet',

      HALLWAY_SHOE_CABINET: 'Shoe cabinet',
      HALLWAY_COAT_RACK: 'Coat rack',
      HALLWAY_BENCH: 'Bench',
      HALLWAY_MIRROR: 'Mirror',

      TELEVISION: 'Television',
      SOUND_SYSTEM: 'Sound system',
      HOME_THEATER: 'Home theater',
      MEDIA_PLAYER: 'Media player',
      GAME_CONSOLE: 'Game console',

      REFRIGERATOR: 'Refrigerator',
      DISHWASHER: 'Dishwasher',
      WASHING_MACHINE: 'Washing machine',
      DRYER: 'Dryer',
      OVEN: 'Oven',
      MICROWAVE: 'Microwave',
      COFFEE_MACHINE: 'Coffee machine',
      KETTLE: 'Kettle',
      TOASTER: 'Toaster',
      BLENDER: 'Blender',
      VACUUM_CLEANER: 'Vacuum cleaner',
      IRON: 'Iron',
      AIR_PURIFIER: 'Air purifier'
    }
  };

  private productNameTranslations: Record<string, string> = {
    'Sofa Milano': 'Milano Sofa',
    'Stolik kawowy Oslo': 'Oslo Coffee Table',
    'Regał Loft': 'Loft Bookcase',
    'Fotel Relax': 'Relax Armchair',

    'Łóżko Dream 160': 'Dream 160 Bed',
    'Szafa Nova': 'Nova Wardrobe',
    'Komoda Luna': 'Luna Chest of Drawers',
    'Szafka nocna Soft': 'Soft Nightstand',

    'Stół Family': 'Family Table',
    'Krzesło Basic': 'Basic Chair',
    'Zlew Inox': 'Inox Sink',
    'Szafka kuchenna Smart': 'Smart Kitchen Cabinet',
    'Hoker Loft': 'Loft Bar Stool',

    'Szafka pod umywalkę Aqua': 'Aqua Sink Cabinet',
    'Wanna Comfort': 'Comfort Bathtub',
    'Szafka łazienkowa Clean': 'Clean Bathroom Cabinet',
    'Półka łazienkowa Home': 'Home Bathroom Shelf',
    'Kosz na pranie Linen': 'Linen Laundry Basket',

    'Biurko Work Pro': 'Work Pro Desk',
    'Fotel biurowy Ergo': 'Ergo Office Chair',
    'Regał biurowy Office Line': 'Office Line Bookcase',
    'Szafka na dokumenty Lock': 'Lock File Cabinet',

    'Szafka na buty Step': 'Step Shoe Cabinet',
    'Wieszak Eddie Hall': 'Eddie Hall Coat Rack',
    'Ławka Entry': 'Entry Bench',
    'Lustro Classic': 'Classic Mirror',

    'Telewizor Vision 55': 'Vision 55 TV',
    'Soundbar Audio Plus': 'Audio Plus Soundbar',
    'Kino domowe MaxSound': 'MaxSound Home Theater',
    'Odtwarzacz Media Box': 'Media Box Player',
    'Konsola Game Pro': 'Game Pro Console',

    'Lodówka FreshCool': 'FreshCool Refrigerator',
    'Zmywarka CleanWash': 'CleanWash Dishwasher',
    'Pralka AquaWash': 'AquaWash Washing Machine',
    'Suszarka DryTech': 'DryTech Dryer',
    'Piekarnik BakeMaster': 'BakeMaster Oven',
    'Mikrofala QuickHeat': 'QuickHeat Microwave',
    'Ekspres Aroma': 'Aroma Coffee Machine',
    'Czajnik Silver': 'Silver Kettle',
    'Toster Crunch': 'Crunch Toaster',
    'Blender MixIt': 'MixIt Blender',
    'Odkurzacz PowerVac': 'PowerVac Vacuum Cleaner',
    'Żelazko Steam Pro': 'Steam Pro Iron',
    'Oczyszczacz Air Pure': 'Air Pure Air Purifier',
    'Oczyszczacz Air Super Pure': 'Air Super Pure Air Purifier'
  };

  private productDescriptionTranslations: Record<string, string> = {
    'Wygodna sofa do salonu w nowoczesnym stylu.': 'Comfortable modern-style sofa for the living room.',
    'Praktyczny stolik kawowy do salonu z półką na drobiazgi.': 'Practical living room coffee table with a shelf for small items.',
    'Wysoki regał do salonu na książki i dekoracje.': 'Tall living room bookcase for books and decorations.',
    'Miękki fotel wypoczynkowy idealny do czytania i odpoczynku.': 'Soft lounge armchair ideal for reading and relaxing.',

    'Duże łóżko do sypialni z wygodnym zagłówkiem.': 'Large bedroom bed with a comfortable headboard.',
    'Pojemna szafa do sypialni z drzwiami przesuwnymi.': 'Spacious bedroom wardrobe with sliding doors.',
    'Komoda do sypialni z szerokimi szufladami.': 'Bedroom chest of drawers with wide drawers.',
    'Mała szafka nocna z miejscem na lampkę i książkę.': 'Small nightstand with space for a lamp and a book.',

    'Solidny stół kuchenny do codziennych posiłków.': 'Solid kitchen table for everyday meals.',
    'Wygodne krzesło do kuchni i jadalni.': 'Comfortable chair for the kitchen and dining room.',
    'Nowoczesny zlew kuchenny ze stali nierdzewnej.': 'Modern stainless steel kitchen sink.',
    'Szafka stojąca do zabudowy kuchennej.': 'Standing cabinet for kitchen installation.',
    'Nowoczesny hoker do wyspy kuchennej lub barku.': 'Modern bar stool for a kitchen island or bar.',

    'Łazienkowa szafka pod umywalkę z półkami.': 'Bathroom sink cabinet with shelves.',
    'Klasyczna wanna do nowoczesnej łazienki.': 'Classic bathtub for a modern bathroom.',
    'Wąska szafka do przechowywania ręczników i kosmetyków.': 'Narrow cabinet for storing towels and cosmetics.',
    'Praktyczna półka ścienna do łazienki.': 'Practical wall shelf for the bathroom.',
    'Kosz na pranie do łazienki z pokrywą.': 'Bathroom laundry basket with a lid.',

    'Funkcjonalne biurko do pracy i nauki.': 'Functional desk for work and study.',
    'Ergonomiczny fotel biurowy z regulacją wysokości.': 'Ergonomic office chair with height adjustment.',
    'Regał na dokumenty i książki do domowego biura.': 'Bookcase for documents and books in a home office.',
    'Zamykana szafka biurowa na akta i dokumenty.': 'Lockable office cabinet for files and documents.',

    'Szafka do przedpokoju na kilka par butów.': 'Hallway shoe cabinet for several pairs of shoes.',
    'Stojący wieszak na kurtki i płaszcze.': 'Standing coat rack for jackets and coats.',
    'Ławka do przedpokoju z miejscem do siedzenia.': 'Hallway bench with a seating area.',
    'Duże lustro do przedpokoju w prostej ramie.': 'Large hallway mirror in a simple frame.',

    'Nowoczesny telewizor 55 cali do salonu.': 'Modern 55-inch TV for the living room.',
    'System audio poprawiający jakość dźwięku w domu.': 'Audio system that improves sound quality at home.',
    'Zestaw kina domowego do filmów i seriali.': 'Home theater set for movies and series.',
    'Urządzenie do odtwarzania multimediów i aplikacji.': 'Device for playing multimedia and apps.',
    'Konsola do gier dla całej rodziny.': 'Game console for the whole family.',

    'Pojemna lodówka do nowoczesnej kuchni.': 'Spacious refrigerator for a modern kitchen.',
    'Zmywarka do codziennego użytku w domu.': 'Dishwasher for everyday home use.',
    'Automatyczna pralka do domu i mieszkania.': 'Automatic washing machine for home and apartment use.',
    'Suszarka bębnowa oszczędzająca czas i miejsce.': 'Tumble dryer that saves time and space.',
    'Piekarnik do pieczenia i przygotowywania potraw.': 'Oven for baking and preparing meals.',
    'Kuchenka mikrofalowa do szybkiego podgrzewania dań.': 'Microwave oven for quickly heating meals.',
    'Ekspres do kawy dla miłośników espresso i cappuccino.': 'Coffee machine for espresso and cappuccino lovers.',
    'Elektryczny czajnik do szybkiego gotowania wody.': 'Electric kettle for quickly boiling water.',
    'Toster do przygotowania chrupiących grzanek.': 'Toaster for making crispy toast.',
    'Blender do koktajli, zup i sosów.': 'Blender for smoothies, soups and sauces.',
    'Odkurzacz do codziennego sprzątania domu.': 'Vacuum cleaner for everyday home cleaning.',
    'Żelazko parowe do prasowania ubrań.': 'Steam iron for ironing clothes.',
    'Oczyszczacz powietrza do domu i sypialni.': 'Air purifier for home and bedroom.',
    'Oczyszczacz powietrza do całego domu.': 'Air purifier for the whole house.'
  };

  constructor() {
    const savedLanguage = localStorage.getItem(this.storageKey);

    if (savedLanguage === 'pl' || savedLanguage === 'en') {
      this.currentLanguage = savedLanguage;
    }
  }

  setLanguage(language: Language): void {
    if (this.currentLanguage === language) {
      return;
    }

    this.currentLanguage = language;
    localStorage.setItem(this.storageKey, language);

    window.location.reload();
  }

  t(key: string): string {
    const savedLanguage = localStorage.getItem(this.storageKey);

    if (savedLanguage === 'pl' || savedLanguage === 'en') {
      this.currentLanguage = savedLanguage;
    }

    return this.translations[this.currentLanguage][key] ?? key;
  }

  categoryName(name: string): string {
    const savedLanguage = localStorage.getItem(this.storageKey);

    if (savedLanguage === 'pl' || savedLanguage === 'en') {
      this.currentLanguage = savedLanguage;
    }

    return this.categoryTranslations[this.currentLanguage][name] ?? name;
  }
  productTypeName(productType: string): string {
    const savedLanguage = localStorage.getItem(this.storageKey);

    if (savedLanguage === 'pl' || savedLanguage === 'en') {
      this.currentLanguage = savedLanguage;
    }

    return this.productTypeTranslations[this.currentLanguage][productType] ?? productType;
  }

  productName(name: string): string {
    const savedLanguage = localStorage.getItem(this.storageKey);

    if (savedLanguage === 'pl' || savedLanguage === 'en') {
      this.currentLanguage = savedLanguage;
    }

    if (this.currentLanguage === 'pl') {
      return name;
    }

    return this.productNameTranslations[name] ?? name;
  }

  productDescription(description: string | null | undefined): string {
    const savedLanguage = localStorage.getItem(this.storageKey);

    if (savedLanguage === 'pl' || savedLanguage === 'en') {
      this.currentLanguage = savedLanguage;
    }

    if (!description) {
      return '';
    }

    if (this.currentLanguage === 'pl') {
      return description;
    }

    return this.productDescriptionTranslations[description] ?? description;
  }
}
