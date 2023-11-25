import i18n from "@/i18n";

const Trans = {
    // Setter method to update the current locale in i18n
    set currentLocale(newLocale) {
      i18n.global.locale.value = newLocale;
    },
    async switchLanguage(newLocale) {
      Trans.currentLocale = newLocale;
      document.querySelector("html").setAttribute("lang", newLocale);
      localStorage.setItem("user-locale", newLocale);
    },
  
    // Getter method to retrieve an array of supported locales
    get supportedLocales() {
      return import.meta.env.VITE_SUPPORTED_LOCALES.split(",");
    },
  init() {
    // Check if the user-locale exists in localStorage.
    let locale;
    const userLocale = localStorage.getItem("user-locale");
    
    if (userLocale && this.supportedLocales.includes(userLocale)) {
      this.currentLocale = userLocale;
      locale = userLocale
    } else {
      // Check the user's browser's default language.
      const browserDefaultLocale = navigator.language || navigator.userLanguage;
      
      if (this.supportedLocales.includes(browserDefaultLocale)) {
        this.currentLocale = browserDefaultLocale;
      } else {
        // Default to a fallback locale if both user-locale and browser default are unsupported.
        const fallbackLocale = import.meta.env.VITE_DEFAULT_LOCALE; 
        this.currentLocale = fallbackLocale;
      }
      
      // Update user-locale in localStorage.
      localStorage.setItem("user-locale", this.currentLocale );
    }
    // Set the lang attribute for the HTML element.
    document.querySelector("html").setAttribute("lang", this.currentLocale ? this.currentLocale : locale);
  }
  
};

// Call the init method to check and set the preferred locale on the first load.
Trans.init();

export default Trans;
