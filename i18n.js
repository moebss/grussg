// ===========================
// INTERNATIONALIZATION (i18n)
// ===========================

const uiTranslations = {
    de: {
        'tagline': 'Der perfekte Text für jeden Anlass',
        'form-title': '✨ Erstelle deinen Gruß',
        'label-occasion': '📅 Anlass',
        'label-name': 'Name der Person',
        'label-relationship': 'Beziehung',
        'label-info': 'Zusätzliche Infos (optional)',
        'label-tone': 'Stil / Tonalität',
        'placeholder-name': 'z.B. Anna, Michael, Familie Schmidt...',
        'placeholder-info': "Z.B. 'wird 30', 'liebt Reisen', 'neuer Job'...",

        // Occasions
        'occasion-birthday': 'Geburtstag',
        'occasion-wedding': 'Hochzeit',
        'occasion-christmas': 'Weihnachten',
        'occasion-newyear': 'Neujahr',
        'occasion-easter': 'Ostern',
        'occasion-thanks': 'Danke',
        'occasion-baby': 'Geburt',
        'occasion-getwell': 'Gute Besserung',
        'occasion-condolence': 'Beileid',
        'occasion-general': 'Sonstiges',

        // Relationships
        'option-select': 'Bitte wählen...',
        'option-friend': 'Freund/in',
        'option-romantic': 'Partner/in',
        'option-family': 'Familie',
        'option-colleague': 'Kollege/in',
        'option-boss': 'Chef/in',
        'option-acquaintance': 'Bekannte/r',

        // Tones
        'tone-warm': 'Warm & Herzlich',
        'tone-funny': 'Humorvoll & Lustig',
        'tone-formal': 'Formell & Professionell',
        'tone-poetic': 'Poetisch & Kreativ',
        'tone-short': 'Kurz & Knackig',

        // Buttons
        'btn-generate': '✨ Gruß generieren ✨',
        'btn-copy': 'Kopieren',
        'btn-whatsapp': 'WhatsApp',
        'btn-email': 'E-Mail',
        'btn-download': 'Als Bild',
        'btn-new': '🎊 Neuen Gruß erstellen',

        // Output
        'output-title': '🎉 Dein persönlicher Gruß',

        // Toasts
        'toast-copied': 'Text kopiert! 📋',
        'toast-generated': 'Gruß erfolgreich generiert! 🎉',
        'toast-error': 'Fehler:',
        'toast-loading': 'Generiere...'
    },

    en: {
        'tagline': 'The perfect words for every occasion',
        'form-title': '✨ Create your greeting',
        'label-occasion': '📅 Occasion',
        'label-name': 'Recipient\'s name',
        'label-relationship': 'Relationship',
        'label-info': 'Additional info (optional)',
        'label-tone': 'Style / Tone',
        'placeholder-name': 'e.g. Anna, Michael, The Smiths...',
        'placeholder-info': "e.g. 'turning 30', 'loves travel', 'new job'...",

        // Occasions
        'occasion-birthday': 'Birthday',
        'occasion-wedding': 'Wedding',
        'occasion-christmas': 'Christmas',
        'occasion-newyear': 'New Year',
        'occasion-easter': 'Easter',
        'occasion-thanks': 'Thank you',
        'occasion-baby': 'New Baby',
        'occasion-getwell': 'Get Well',
        'occasion-condolence': 'Condolence',
        'occasion-general': 'Other',

        // Relationships
        'option-select': 'Please select...',
        'option-friend': 'Friend',
        'option-romantic': 'Partner',
        'option-family': 'Family',
        'option-colleague': 'Colleague',
        'option-boss': 'Boss',
        'option-acquaintance': 'Acquaintance',

        // Tones
        'tone-warm': 'Warm & Heartfelt',
        'tone-funny': 'Humorous & Fun',
        'tone-formal': 'Formal & Professional',
        'tone-poetic': 'Poetic & Creative',
        'tone-short': 'Short & Sweet',

        // Buttons
        'btn-generate': '✨ Generate Greeting ✨',
        'btn-copy': 'Copy',
        'btn-whatsapp': 'WhatsApp',
        'btn-email': 'Email',
        'btn-download': 'As Image',
        'btn-new': '🎊 Create new greeting',

        // Output
        'output-title': '🎉 Your personal greeting',

        // Toasts
        'toast-copied': 'Text copied! 📋',
        'toast-generated': 'Greeting generated! 🎉',
        'toast-error': 'Error:',
        'toast-loading': 'Generating...'
    },

    es: {
        'tagline': 'El texto perfecto para cada ocasión',
        'form-title': '✨ Crea tu saludo',
        'label-occasion': '📅 Ocasión',
        'label-name': 'Nombre del destinatario',
        'label-relationship': 'Relación',
        'label-info': 'Información adicional (opcional)',
        'label-tone': 'Estilo / Tono',
        'placeholder-name': 'ej. Ana, Miguel, Familia García...',
        'placeholder-info': "ej. 'cumple 30', 'ama viajar', 'nuevo trabajo'...",

        // Occasions
        'occasion-birthday': 'Cumpleaños',
        'occasion-wedding': 'Boda',
        'occasion-christmas': 'Navidad',
        'occasion-newyear': 'Año Nuevo',
        'occasion-easter': 'Pascua',
        'occasion-thanks': 'Gracias',
        'occasion-baby': 'Bebé',
        'occasion-getwell': 'Recuperación',
        'occasion-condolence': 'Condolencias',
        'occasion-general': 'Otro',

        // Relationships
        'option-select': 'Seleccionar...',
        'option-friend': 'Amigo/a',
        'option-romantic': 'Pareja',
        'option-family': 'Familia',
        'option-colleague': 'Colega',
        'option-boss': 'Jefe/a',
        'option-acquaintance': 'Conocido/a',

        // Tones
        'tone-warm': 'Cálido y Sincero',
        'tone-funny': 'Humorístico',
        'tone-formal': 'Formal y Profesional',
        'tone-poetic': 'Poético y Creativo',
        'tone-short': 'Corto y Conciso',

        // Buttons
        'btn-generate': '✨ Generar Saludo ✨',
        'btn-copy': 'Copiar',
        'btn-whatsapp': 'WhatsApp',
        'btn-email': 'Email',
        'btn-download': 'Como Imagen',
        'btn-new': '🎊 Crear nuevo saludo',

        // Output
        'output-title': '🎉 Tu saludo personal',

        // Toasts
        'toast-copied': '¡Texto copiado! 📋',
        'toast-generated': '¡Saludo generado! 🎉',
        'toast-error': 'Error:',
        'toast-loading': 'Generando...'
    },

    fr: {
        'tagline': 'Le texte parfait pour chaque occasion',
        'form-title': '✨ Créez votre message',
        'label-occasion': '📅 Occasion',
        'label-name': 'Nom du destinataire',
        'label-relationship': 'Relation',
        'label-info': 'Infos supplémentaires (optionnel)',
        'label-tone': 'Style / Ton',
        'placeholder-name': 'ex. Anne, Michel, Famille Dupont...',
        'placeholder-info': "ex. 'fête ses 30 ans', 'aime voyager'...",

        // Occasions
        'occasion-birthday': 'Anniversaire',
        'occasion-wedding': 'Mariage',
        'occasion-christmas': 'Noël',
        'occasion-newyear': 'Nouvel An',
        'occasion-easter': 'Pâques',
        'occasion-thanks': 'Merci',
        'occasion-baby': 'Naissance',
        'occasion-getwell': 'Bon Rétablissement',
        'occasion-condolence': 'Condoléances',
        'occasion-general': 'Autre',

        // Relationships
        'option-select': 'Sélectionner...',
        'option-friend': 'Ami(e)',
        'option-romantic': 'Partenaire',
        'option-family': 'Famille',
        'option-colleague': 'Collègue',
        'option-boss': 'Chef',
        'option-acquaintance': 'Connaissance',

        // Tones
        'tone-warm': 'Chaleureux & Sincère',
        'tone-funny': 'Humoristique & Fun',
        'tone-formal': 'Formel & Professionnel',
        'tone-poetic': 'Poétique & Créatif',
        'tone-short': 'Court & Concis',

        // Buttons
        'btn-generate': '✨ Générer le Message ✨',
        'btn-copy': 'Copier',
        'btn-whatsapp': 'WhatsApp',
        'btn-email': 'Email',
        'btn-download': 'En Image',
        'btn-new': '🎊 Créer un nouveau message',

        // Output
        'output-title': '🎉 Votre message personnel',

        // Toasts
        'toast-copied': 'Texte copié ! 📋',
        'toast-generated': 'Message généré ! 🎉',
        'toast-error': 'Erreur :',
        'toast-loading': 'Génération...'
    },

    tr: {
        'tagline': 'Her durum için mükemmel metin',
        'form-title': '✨ Tebriğinizi Oluşturun',
        'label-occasion': '📅 Vesilesi',
        'label-name': 'Alıcının adı',
        'label-relationship': 'İlişki',
        'label-info': 'Ek bilgi (isteğe bağlı)',
        'label-tone': 'Stil / Ton',
        'placeholder-name': 'örn. Ayşe, Ahmet, Yılmaz Ailesi...',
        'placeholder-info': "örn. '30 yaşına giriyor', 'seyahati seviyor'...",

        // Occasions
        'occasion-birthday': 'Doğum Günü',
        'occasion-wedding': 'Düğün',
        'occasion-christmas': 'Noel',
        'occasion-newyear': 'Yılbaşı',
        'occasion-easter': 'Paskalya',
        'occasion-thanks': 'Teşekkür',
        'occasion-baby': 'Bebek',
        'occasion-getwell': 'Geçmiş Olsun',
        'occasion-condolence': 'Başsağlığı',
        'occasion-general': 'Diğer',

        // Relationships
        'option-select': 'Seçiniz...',
        'option-friend': 'Arkadaş',
        'option-romantic': 'Partner',
        'option-family': 'Aile',
        'option-colleague': 'İş Arkadaşı',
        'option-boss': 'Patron',
        'option-acquaintance': 'Tanıdık',

        // Tones
        'tone-warm': 'Sıcak ve Samimi',
        'tone-funny': 'Mizahi ve Eğlenceli',
        'tone-formal': 'Resmi ve Profesyonel',
        'tone-poetic': 'Şiirsel ve Yaratıcı',
        'tone-short': 'Kısa ve Öz',

        // Buttons
        'btn-generate': '✨ Tebrik Oluştur ✨',
        'btn-copy': 'Kopyala',
        'btn-whatsapp': 'WhatsApp',
        'btn-email': 'E-posta',
        'btn-download': 'Resim Olarak',
        'btn-new': '🎊 Yeni tebrik oluştur',

        // Output
        'output-title': '🎉 Kişisel tebriğiniz',

        // Toasts
        'toast-copied': 'Metin kopyalandı! 📋',
        'toast-generated': 'Tebrik oluşturuldu! 🎉',
        'toast-error': 'Hata:',
        'toast-loading': 'Oluşturuluyor...'
    },

    it: {
        'tagline': 'Il testo perfetto per ogni occasione',
        'form-title': '✨ Crea il tuo messaggio',
        'label-occasion': '📅 Occasione',
        'label-name': 'Nome del destinatario',
        'label-relationship': 'Relazione',
        'label-info': 'Info aggiuntive (opzionale)',
        'label-tone': 'Stile / Tono',
        'placeholder-name': 'es. Anna, Marco, Famiglia Rossi...',
        'placeholder-info': "es. 'compie 30 anni', 'ama viaggiare'...",

        // Occasions
        'occasion-birthday': 'Compleanno',
        'occasion-wedding': 'Matrimonio',
        'occasion-christmas': 'Natale',
        'occasion-newyear': 'Capodanno',
        'occasion-easter': 'Pasqua',
        'occasion-thanks': 'Grazie',
        'occasion-baby': 'Nascita',
        'occasion-getwell': 'Guarigione',
        'occasion-condolence': 'Condoglianze',
        'occasion-general': 'Altro',

        // Relationships
        'option-select': 'Seleziona...',
        'option-friend': 'Amico/a',
        'option-romantic': 'Partner',
        'option-family': 'Famiglia',
        'option-colleague': 'Collega',
        'option-boss': 'Capo',
        'option-acquaintance': 'Conoscente',

        // Tones
        'tone-warm': 'Caloroso e Sincero',
        'tone-funny': 'Umoristico e Divertente',
        'tone-formal': 'Formale e Professionale',
        'tone-poetic': 'Poetico e Creativo',
        'tone-short': 'Breve e Conciso',

        // Buttons
        'btn-generate': '✨ Genera Messaggio ✨',
        'btn-copy': 'Copia',
        'btn-whatsapp': 'WhatsApp',
        'btn-email': 'Email',
        'btn-download': 'Come Immagine',
        'btn-new': '🎊 Crea nuovo messaggio',

        // Output
        'output-title': '🎉 Il tuo messaggio personale',

        // Toasts
        'toast-copied': 'Testo copiato! 📋',
        'toast-generated': 'Messaggio generato! 🎉',
        'toast-error': 'Errore:',
        'toast-loading': 'Generazione...'
    }
};

// Function to update all UI elements
function applyTranslations(lang) {
    const t = uiTranslations[lang] || uiTranslations.de;

    // Update data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.textContent = t[key];
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key]) {
            el.placeholder = t[key];
        }
    });
}

// Export for use in generator.js
window.uiTranslations = uiTranslations;
window.applyTranslations = applyTranslations;
