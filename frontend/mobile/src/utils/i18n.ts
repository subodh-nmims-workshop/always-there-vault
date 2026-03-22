export type Language = 'en' | 'es' | 'fr' | 'hi';

export const translations = {
  en: {
    // Nav
    nav_home: 'Home',
    nav_assets: 'Assets',
    nav_beneficiaries: 'Beneficiaries',
    nav_pulse: 'Heartbeat',
    nav_settings: 'Settings',
    nav_dashboard: 'Overview',
    vault_health: 'Vault Health',
    hero_cta: 'Sign Heartbeat Now',

    // Landing
    landing_badge: 'BETA v2.0 LIVE ON SEPOLIA',
    landing_title1: 'Your Digital',
    landing_title2: 'Future-Proofed.',
    landing_subtitle: 'The first trustless, decentralized fail-safe for the digital age. Secure your crypto assets for your loved ones with chain-verified certainty.',
    landing_cta: 'SECURE YOUR VAULT',

    // Settings
    settings_title: 'Settings',
    settings_language: 'Language',
    settings_logout: 'Logout Protocol',
    settings_version: 'Protocol Version 2.0.0',
    
    // Generics
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm'
  },
  es: {
    nav_home: 'Inicio',
    nav_assets: 'Activos',
    nav_beneficiaries: 'Beneficiarios',
    nav_pulse: 'Latido',
    nav_settings: 'Ajustes',
    nav_dashboard: 'Resumen',
    vault_health: 'Salud de Bóveda',
    hero_cta: 'Firmar Pulso Ahora',

    landing_badge: 'BETA v2.0 EN VIVO EN SEPOLIA',
    landing_title1: 'Su Futuro',
    landing_title2: 'Digital Asegurado.',
    landing_subtitle: 'La primera red de seguridad descentralizada y sin confianza. Asegure sus activos cripto con certeza verificada en cadena.',
    landing_cta: 'ASEGURAR MI BÓVEDA',

    settings_title: 'Ajustes',
    settings_language: 'Idioma',
    settings_logout: 'Cerrar sesión',
    settings_version: 'Protocolo Versión 2.0.0',

    save: 'Guardar',
    cancel: 'Cancelar',
    confirm: 'Confirmar'
  },
  fr: {
    nav_home: 'Accueil',
    nav_assets: 'Actifs',
    nav_beneficiaries: 'Bénéficiaires',
    nav_pulse: 'Pulsation',
    nav_settings: 'Paramètres',
    nav_dashboard: 'Aperçu',
    vault_health: 'Santé du Coffre',
    hero_cta: 'Signer la Pulsation',

    landing_badge: 'BETA v2.0 EN DIRECT SUR SEPOLIA',
    landing_title1: 'Votre Avenir',
    landing_title2: 'Numérique Sécurisé.',
    landing_subtitle: 'Le premier filet de sécurité décentralisé. Sécurisez vos actifs crypto pour vos proches avec une certitude vérifiée par la chaîne.',
    landing_cta: 'SÉCURISER MON COFFRE',

    settings_title: 'Paramètres',
    settings_language: 'Langue',
    settings_logout: 'Déconnexion',
    settings_version: 'Protocole Version 2.0.0',

    save: 'Enregistrer',
    cancel: 'Annuler',
    confirm: 'Confirmer'
  },
  hi: {
    nav_home: 'मुख्य पृष्ठ',
    nav_assets: 'संपत्ति',
    nav_beneficiaries: 'लाभार्थी',
    nav_pulse: 'धड़कन',
    nav_settings: 'सेटिंग्स',
    nav_dashboard: 'अवलोकन',
    vault_health: 'वॉल्ट स्वास्थ्य',
    hero_cta: 'अभी हार्टबीट साइन करें',

    landing_badge: 'बीटा v2.0 सेपोलिया पर लाइव',
    landing_title1: 'आपका डिजिटल',
    landing_title2: 'भविष्य सुरक्षित।',
    landing_subtitle: 'डिजिटल युग के लिए पहला विकेन्द्रीकृत सुरक्षा जाल। श्रृंखला-सत्यापित निश्चितता के साथ अपनी क्रिप्टो संपत्ति सुरक्षित करें।',
    landing_cta: 'अपनी तिजोरी सुरक्षित करें',

    settings_title: 'सेटिंग्स',
    settings_language: 'भाषा',
    settings_logout: 'लॉग आउट',
    settings_version: 'प्रोटोकॉल संस्करण 2.0.0',

    save: 'सहेजें',
    cancel: 'रद्द करें',
    confirm: 'पुष्टि करें'
  }
};

let currentLanguage: Language = 'en';
type Listener = () => void;
const listeners: Set<Listener> = new Set();

export const t = (key: keyof typeof translations.en) => {
  return translations[currentLanguage][key] || translations['en'][key] || key;
};

export const setLanguage = (lang: Language) => {
  currentLanguage = lang;
  listeners.forEach(listen => listen());
};

export const getLanguage = () => currentLanguage;

export const subscribeI18n = (listener: Listener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};
