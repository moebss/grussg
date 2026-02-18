// ===========================
// INTERNATIONALIZATION (i18n)
// ===========================

const uiTranslations = {
    de: {
        'tagline': 'Der perfekte Text für jeden Anlass',
        'form-title': '✨ Erstelle deinen Gruß',
        'label-occasion': '📅 Anlass',
        'label-name': '👤 Name der Person',
        'label-relationship': '💝 Beziehung',
        'label-info': '💡 Zusätzliche Infos (optional)',
        'label-tone': '🎨 Stil / Tonalität',
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
        'occasion-mothersday': 'Muttertag',
        'occasion-fathersday': 'Vatertag',
        'occasion-graduation': 'Abschluss',
        'occasion-anniversary': 'Jubiläum',
        'occasion-condolence': 'Beileid',
        'occasion-general': 'Sonstiges',

        // Relationships
        'option-select': 'Bitte wählen...',
        'option-none': 'Keine Angabe',
        'option-friend': 'Freund/in',
        'option-romantic': 'Partner/in 💕',
        'option-family': 'Familie',
        'option-colleague': 'Kollege/in',
        'option-boss': 'Chef/in',
        'option-acquaintance': 'Bekannte/r',

        // Tones
        'tone-warm': '😊 Warm & Herzlich',
        'tone-funny': '😂 Humorvoll & Lustig',
        'tone-formal': '👔 Formell & Professionell',
        'tone-poetic': '✍️ Poetisch & Kreativ',
        'tone-short': '⚡ Kurz & Knackig',

        // Buttons
        'btn-generate': '✨ Gruß generieren ✨',
        'btn-copy': 'Kopieren',
        'btn-whatsapp': 'WhatsApp',
        'btn-email': 'E-Mail',
        'btn-download': 'Als Bild speichern',
        'btn-share': 'Teilen',
        'btn-new': '🎊 Neuen Gruß erstellen',

        // Output
        'output-title': '🎉 Dein persönlicher Gruß',

        // Trust Badges
        'badge-free': '🔒 100% kostenlos',
        'badge-fast': '⚡ In Sekunden fertig',
        'badge-languages': '🌍 6 Sprachen',

        // History
        'history-title': '📜 Deine letzten Grüße',
        'history-empty': 'Noch keine Grüße erstellt.',

        // Toasts
        'toast-copied': 'Text kopiert! 📋',
        'toast-generated': 'Gruß erfolgreich generiert! 🎉',
        'toast-error': 'Fehler:',
        'toast-loading': 'Generiere...',
        'toast-history-loaded': 'Gruß geladen! 📜',
        'toast-feedback': 'Danke für dein Feedback! ❤️',
        'toast-copy-fail': 'Kopieren fehlgeschlagen 😞',
        'toast-share-prep': 'Bereite Bild vor... 📤',
        'toast-share-success': 'Erfolgreich geteilt! 🎉',
        'toast-share-fail': 'Teilen fehlgeschlagen',
        'toast-download-prep': 'Wird erstellt (1080x1080)... 📸',
        'toast-download-success': 'Bild gespeichert! 🎉',
        'toast-too-many': 'Zu viele Elemente auf der Karte!',
        'toast-image-added': 'Bild hinzugefügt! Ziehe an der Ecke zum Skalieren. 📐',
        'toast-link-loaded': 'Daten aus Link geladen! ✨',
        'toast-fields-required': 'Bitte fülle alle Pflichtfelder aus! ⚠️',

        // SEO Section
        'seo-title': 'Warum den KI Grußgenerator nutzen?',
        'seo-intro': 'Der Grussgenerator.de ist dein ultimatives Tool, um in Sekunden herzliche, lustige oder professionelle Grüße zu erstellen. Egal ob du Glückwünsche zum Geburtstag suchst, eine romantische Nachricht zur Hochzeit verfassen möchtest oder festliche Weihnachtsgrüße benötigst – unsere künstliche Intelligenz findet immer die richtigen Worte.',
        'seo-birthday-title': '🎂 Geburtstagswünsche',
        'seo-birthday-text': 'Von lustigen Sprüchen bis hin zu tiefgründigen Weisheiten. Personalisiere deine Wünsche mit dem Namen des Geburtstagskindes.',
        'seo-wedding-title': '💍 Hochzeit & Jubiläum',
        'seo-wedding-text': 'Finde elegante und emotionale Worte für den schönsten Tag im Leben. Ideal für Karten, Reden oder WhatsApp-Grüße.',
        'seo-holidays-title': '🎄 Festtage & Feiertage',
        'seo-holidays-text': 'Ob Weihnachten, Neujahr, Ostern oder Muttertag – verbreite Freude mit einzigartigen digitalen Grußkarten.',

        // FAQ
        'faq-title': 'Häufig gestellte Fragen (FAQ)',
        'faq-q1': 'Ist der Grußgenerator kostenlos?',
        'faq-a1': 'Ja, Grussgenerator.de ist zu 100% kostenlos nutzbar. Du kannst so viele Grüße generieren und teilen, wie du möchtest.',
        'faq-q2': 'Wie funktioniert die KI-Erstellung?',
        'faq-a2': 'Unsere KI analysiert deine Angaben zu Anlass, Beziehung und Tonalität, um einen maßgeschneiderten Text zu kreieren, der genau auf deine Bedürfnisse zugeschnitten ist.',
        'faq-q3': 'Kann ich die Grüße als Bild speichern?',
        'faq-a3': 'Absolut! Du kannst dein Design direkt als hochwertiges Bild (JPG/PNG) herunterladen oder über WhatsApp und Social Media teilen.',

        // Footer
        'footer-imprint': 'Impressum',
        'footer-privacy': 'Datenschutz',
        'footer-count': 'Bereits <strong id="footerCount">12,847</strong> Grüße erstellt! 🚀',

        // Social Proof
        'social-proof': ' Personen erstellen gerade Grüße! 🔥'
    },

    en: {
        'tagline': 'The perfect words for every occasion',
        'form-title': '✨ Create your greeting',
        'label-occasion': '📅 Occasion',
        'label-name': '👤 Recipient\'s name',
        'label-relationship': '💝 Relationship',
        'label-info': '💡 Additional info (optional)',
        'label-tone': '🎨 Style / Tone',
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
        'occasion-mothersday': 'Mother\'s Day',
        'occasion-fathersday': 'Father\'s Day',
        'occasion-graduation': 'Graduation',
        'occasion-anniversary': 'Anniversary',
        'occasion-condolence': 'Condolence',
        'occasion-general': 'Other',

        // Relationships
        'option-select': 'Please select...',
        'option-none': 'Not specified',
        'option-friend': 'Friend',
        'option-romantic': 'Partner 💕',
        'option-family': 'Family',
        'option-colleague': 'Colleague',
        'option-boss': 'Boss',
        'option-acquaintance': 'Acquaintance',

        // Tones
        'tone-warm': '😊 Warm & Heartfelt',
        'tone-funny': '😂 Humorous & Fun',
        'tone-formal': '👔 Formal & Professional',
        'tone-poetic': '✍️ Poetic & Creative',
        'tone-short': '⚡ Short & Sweet',

        // Buttons
        'btn-generate': '✨ Generate Greeting ✨',
        'btn-copy': 'Copy',
        'btn-whatsapp': 'WhatsApp',
        'btn-email': 'Email',
        'btn-download': 'Save as Image',
        'btn-share': 'Share',
        'btn-new': '🎊 Create new greeting',

        // Output
        'output-title': '🎉 Your personal greeting',

        // Trust Badges
        'badge-free': '🔒 100% free',
        'badge-fast': '⚡ Ready in seconds',
        'badge-languages': '🌍 6 Languages',

        // History
        'history-title': '📜 Your recent greetings',
        'history-empty': 'No greetings created yet.',

        // Toasts
        'toast-copied': 'Text copied! 📋',
        'toast-generated': 'Greeting generated! 🎉',
        'toast-error': 'Error:',
        'toast-loading': 'Generating...',
        'toast-history-loaded': 'Greeting loaded! 📜',
        'toast-feedback': 'Thanks for your feedback! ❤️',
        'toast-copy-fail': 'Copy failed 😞',
        'toast-share-prep': 'Preparing image... 📤',
        'toast-share-success': 'Shared successfully! 🎉',
        'toast-share-fail': 'Sharing failed',
        'toast-download-prep': 'Creating (1080x1080)... 📸',
        'toast-download-success': 'Image saved! 🎉',
        'toast-too-many': 'Too many elements on the card!',
        'toast-image-added': 'Image added! Drag the corner to resize. 📐',
        'toast-link-loaded': 'Data loaded from link! ✨',
        'toast-fields-required': 'Please fill in all required fields! ⚠️',

        // SEO Section
        'seo-title': 'Why use the AI Greeting Generator?',
        'seo-intro': 'Grussgenerator.de is your ultimate tool to create heartfelt, funny, or professional greetings in seconds. Whether you need birthday wishes, a romantic wedding message, or festive holiday greetings – our AI always finds the perfect words.',
        'seo-birthday-title': '🎂 Birthday Wishes',
        'seo-birthday-text': 'From funny quotes to heartfelt wisdom. Personalize your wishes with the birthday person\'s name.',
        'seo-wedding-title': '💍 Wedding & Anniversary',
        'seo-wedding-text': 'Find elegant and emotional words for the most beautiful day. Perfect for cards, speeches, or WhatsApp messages.',
        'seo-holidays-title': '🎄 Holidays & Celebrations',
        'seo-holidays-text': 'Whether Christmas, New Year, Easter, or Mother\'s Day – spread joy with unique digital greeting cards.',

        // FAQ
        'faq-title': 'Frequently Asked Questions (FAQ)',
        'faq-q1': 'Is the greeting generator free?',
        'faq-a1': 'Yes, Grussgenerator.de is 100% free to use. You can create and share as many greetings as you like.',
        'faq-q2': 'How does the AI creation work?',
        'faq-a2': 'Our AI analyzes your inputs for occasion, relationship, and tone to create a custom text tailored exactly to your needs.',
        'faq-q3': 'Can I save greetings as images?',
        'faq-a3': 'Absolutely! You can download your design as a high-quality image (JPG/PNG) or share it via WhatsApp and social media.',

        // Footer
        'footer-imprint': 'Imprint',
        'footer-privacy': 'Privacy Policy',
        'footer-count': '<strong id="footerCount">12,847</strong> greetings created! 🚀',

        // Social Proof
        'social-proof': ' people are creating greetings right now! 🔥'
    },

    es: {
        'tagline': 'El texto perfecto para cada ocasión',
        'form-title': '✨ Crea tu saludo',
        'label-occasion': '📅 Ocasión',
        'label-name': '👤 Nombre del destinatario',
        'label-relationship': '💝 Relación',
        'label-info': '💡 Información adicional (opcional)',
        'label-tone': '🎨 Estilo / Tono',
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
        'occasion-mothersday': 'Día de la Madre',
        'occasion-fathersday': 'Día del Padre',
        'occasion-graduation': 'Graduación',
        'occasion-anniversary': 'Aniversario',
        'occasion-condolence': 'Condolencias',
        'occasion-general': 'Otro',

        // Relationships
        'option-select': 'Seleccionar...',
        'option-none': 'No especificado',
        'option-friend': 'Amigo/a',
        'option-romantic': 'Pareja 💕',
        'option-family': 'Familia',
        'option-colleague': 'Colega',
        'option-boss': 'Jefe/a',
        'option-acquaintance': 'Conocido/a',

        // Tones
        'tone-warm': '😊 Cálido y Sincero',
        'tone-funny': '😂 Humorístico',
        'tone-formal': '👔 Formal y Profesional',
        'tone-poetic': '✍️ Poético y Creativo',
        'tone-short': '⚡ Corto y Conciso',

        // Buttons
        'btn-generate': '✨ Generar Saludo ✨',
        'btn-copy': 'Copiar',
        'btn-whatsapp': 'WhatsApp',
        'btn-email': 'Email',
        'btn-download': 'Guardar como imagen',
        'btn-share': 'Compartir',
        'btn-new': '🎊 Crear nuevo saludo',

        // Output
        'output-title': '🎉 Tu saludo personal',

        // Trust Badges
        'badge-free': '🔒 100% gratis',
        'badge-fast': '⚡ Listo en segundos',
        'badge-languages': '🌍 6 Idiomas',

        // History
        'history-title': '📜 Tus saludos recientes',
        'history-empty': 'Aún no has creado saludos.',

        // Toasts
        'toast-copied': '¡Texto copiado! 📋',
        'toast-generated': '¡Saludo generado! 🎉',
        'toast-error': 'Error:',
        'toast-loading': 'Generando...',
        'toast-history-loaded': '¡Saludo cargado! 📜',
        'toast-feedback': '¡Gracias por tu opinión! ❤️',
        'toast-copy-fail': 'Error al copiar 😞',
        'toast-share-prep': 'Preparando imagen... 📤',
        'toast-share-success': '¡Compartido con éxito! 🎉',
        'toast-share-fail': 'Error al compartir',
        'toast-download-prep': 'Creando (1080x1080)... 📸',
        'toast-download-success': '¡Imagen guardada! 🎉',
        'toast-too-many': '¡Demasiados elementos en la tarjeta!',
        'toast-image-added': '¡Imagen añadida! Arrastra la esquina para escalar. 📐',
        'toast-link-loaded': '¡Datos cargados desde enlace! ✨',
        'toast-fields-required': '¡Por favor completa todos los campos obligatorios! ⚠️',

        // SEO Section
        'seo-title': '¿Por qué usar el Generador de Saludos con IA?',
        'seo-intro': 'Grussgenerator.de es tu herramienta definitiva para crear saludos sinceros, divertidos o profesionales en segundos. Ya sea que necesites felicitaciones de cumpleaños, un mensaje romántico de boda o saludos festivos – nuestra IA siempre encuentra las palabras perfectas.',
        'seo-birthday-title': '🎂 Felicitaciones de cumpleaños',
        'seo-birthday-text': 'Desde frases divertidas hasta sabiduría profunda. Personaliza tus deseos con el nombre del cumpleañero.',
        'seo-wedding-title': '💍 Boda y Aniversario',
        'seo-wedding-text': 'Encuentra palabras elegantes y emotivas para el día más hermoso. Ideal para tarjetas, discursos o mensajes de WhatsApp.',
        'seo-holidays-title': '🎄 Fiestas y Celebraciones',
        'seo-holidays-text': 'Ya sea Navidad, Año Nuevo, Pascua o Día de la Madre – comparte alegría con tarjetas digitales únicas.',

        // FAQ
        'faq-title': 'Preguntas frecuentes (FAQ)',
        'faq-q1': '¿Es gratis el generador de saludos?',
        'faq-a1': 'Sí, Grussgenerator.de es 100% gratis. Puedes crear y compartir tantos saludos como desees.',
        'faq-q2': '¿Cómo funciona la creación con IA?',
        'faq-a2': 'Nuestra IA analiza tus datos sobre la ocasión, relación y tono para crear un texto personalizado adaptado a tus necesidades.',
        'faq-q3': '¿Puedo guardar los saludos como imagen?',
        'faq-a3': '¡Por supuesto! Puedes descargar tu diseño como imagen de alta calidad (JPG/PNG) o compartirlo por WhatsApp y redes sociales.',

        // Footer
        'footer-imprint': 'Aviso legal',
        'footer-privacy': 'Privacidad',
        'footer-count': '¡<strong id="footerCount">12,847</strong> saludos creados! 🚀',

        // Social Proof
        'social-proof': ' personas están creando saludos ahora mismo! 🔥'
    },

    fr: {
        'tagline': 'Le texte parfait pour chaque occasion',
        'form-title': '✨ Créez votre message',
        'label-occasion': '📅 Occasion',
        'label-name': '👤 Nom du destinataire',
        'label-relationship': '💝 Relation',
        'label-info': '💡 Infos supplémentaires (optionnel)',
        'label-tone': '🎨 Style / Ton',
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
        'occasion-mothersday': 'Fête des Mères',
        'occasion-fathersday': 'Fête des Pères',
        'occasion-graduation': 'Diplôme',
        'occasion-anniversary': 'Anniversaire (couple)',
        'occasion-condolence': 'Condoléances',
        'occasion-general': 'Autre',

        // Relationships
        'option-select': 'Sélectionner...',
        'option-none': 'Non précisé',
        'option-friend': 'Ami(e)',
        'option-romantic': 'Partenaire 💕',
        'option-family': 'Famille',
        'option-colleague': 'Collègue',
        'option-boss': 'Chef',
        'option-acquaintance': 'Connaissance',

        // Tones
        'tone-warm': '😊 Chaleureux & Sincère',
        'tone-funny': '😂 Humoristique & Fun',
        'tone-formal': '👔 Formel & Professionnel',
        'tone-poetic': '✍️ Poétique & Créatif',
        'tone-short': '⚡ Court & Concis',

        // Buttons
        'btn-generate': '✨ Générer le Message ✨',
        'btn-copy': 'Copier',
        'btn-whatsapp': 'WhatsApp',
        'btn-email': 'Email',
        'btn-download': 'Enregistrer comme image',
        'btn-share': 'Partager',
        'btn-new': '🎊 Créer un nouveau message',

        // Output
        'output-title': '🎉 Votre message personnel',

        // Trust Badges
        'badge-free': '🔒 100% gratuit',
        'badge-fast': '⚡ Prêt en secondes',
        'badge-languages': '🌍 6 Langues',

        // History
        'history-title': '📜 Vos messages récents',
        'history-empty': 'Aucun message créé pour le moment.',

        // Toasts
        'toast-copied': 'Texte copié ! 📋',
        'toast-generated': 'Message généré ! 🎉',
        'toast-error': 'Erreur :',
        'toast-loading': 'Génération...',
        'toast-history-loaded': 'Message chargé ! 📜',
        'toast-feedback': 'Merci pour votre avis ! ❤️',
        'toast-copy-fail': 'Échec de la copie 😞',
        'toast-share-prep': 'Préparation de l\'image... 📤',
        'toast-share-success': 'Partagé avec succès ! 🎉',
        'toast-share-fail': 'Échec du partage',
        'toast-download-prep': 'Création (1080x1080)... 📸',
        'toast-download-success': 'Image enregistrée ! 🎉',
        'toast-too-many': 'Trop d\'éléments sur la carte !',
        'toast-image-added': 'Image ajoutée ! Faites glisser le coin pour redimensionner. 📐',
        'toast-link-loaded': 'Données chargées depuis le lien ! ✨',
        'toast-fields-required': 'Veuillez remplir tous les champs obligatoires ! ⚠️',

        // SEO Section
        'seo-title': 'Pourquoi utiliser le Générateur de Messages IA ?',
        'seo-intro': 'Grussgenerator.de est votre outil ultime pour créer des messages chaleureux, drôles ou professionnels en quelques secondes. Que vous cherchiez des vœux d\'anniversaire, un message romantique de mariage ou des salutations festives – notre IA trouve toujours les mots parfaits.',
        'seo-birthday-title': '🎂 Vœux d\'anniversaire',
        'seo-birthday-text': 'Des citations amusantes aux sagesses profondes. Personnalisez vos vœux avec le nom du destinataire.',
        'seo-wedding-title': '💍 Mariage & Anniversaire',
        'seo-wedding-text': 'Trouvez des mots élégants et émouvants pour le plus beau jour. Idéal pour les cartes, discours ou messages WhatsApp.',
        'seo-holidays-title': '🎄 Fêtes & Célébrations',
        'seo-holidays-text': 'Que ce soit Noël, Nouvel An, Pâques ou Fête des Mères – partagez la joie avec des cartes numériques uniques.',

        // FAQ
        'faq-title': 'Questions fréquentes (FAQ)',
        'faq-q1': 'Le générateur de messages est-il gratuit ?',
        'faq-a1': 'Oui, Grussgenerator.de est 100% gratuit. Vous pouvez créer et partager autant de messages que vous le souhaitez.',
        'faq-q2': 'Comment fonctionne la création par IA ?',
        'faq-a2': 'Notre IA analyse vos données sur l\'occasion, la relation et le ton pour créer un texte personnalisé adapté à vos besoins.',
        'faq-q3': 'Puis-je sauvegarder les messages comme images ?',
        'faq-a3': 'Absolument ! Vous pouvez télécharger votre design en image haute qualité (JPG/PNG) ou le partager via WhatsApp et les réseaux sociaux.',

        // Footer
        'footer-imprint': 'Mentions légales',
        'footer-privacy': 'Confidentialité',
        'footer-count': '<strong id="footerCount">12,847</strong> messages créés ! 🚀',

        // Social Proof
        'social-proof': ' personnes créent des messages en ce moment ! 🔥'
    },

    tr: {
        'tagline': 'Her durum için mükemmel metin',
        'form-title': '✨ Tebriğinizi Oluşturun',
        'label-occasion': '📅 Vesilesi',
        'label-name': '👤 Alıcının adı',
        'label-relationship': '💝 İlişki',
        'label-info': '💡 Ek bilgi (isteğe bağlı)',
        'label-tone': '🎨 Stil / Ton',
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
        'occasion-mothersday': 'Anneler Günü',
        'occasion-fathersday': 'Babalar Günü',
        'occasion-graduation': 'Mezuniyet',
        'occasion-anniversary': 'Yıl Dönümü',
        'occasion-condolence': 'Başsağlığı',
        'occasion-general': 'Diğer',

        // Relationships
        'option-select': 'Seçiniz...',
        'option-none': 'Belirtilmemiş',
        'option-friend': 'Arkadaş',
        'option-romantic': 'Partner 💕',
        'option-family': 'Aile',
        'option-colleague': 'İş Arkadaşı',
        'option-boss': 'Patron',
        'option-acquaintance': 'Tanıdık',

        // Tones
        'tone-warm': '😊 Sıcak ve Samimi',
        'tone-funny': '😂 Mizahi ve Eğlenceli',
        'tone-formal': '👔 Resmi ve Profesyonel',
        'tone-poetic': '✍️ Şiirsel ve Yaratıcı',
        'tone-short': '⚡ Kısa ve Öz',

        // Buttons
        'btn-generate': '✨ Tebrik Oluştur ✨',
        'btn-copy': 'Kopyala',
        'btn-whatsapp': 'WhatsApp',
        'btn-email': 'E-posta',
        'btn-download': 'Resim olarak kaydet',
        'btn-share': 'Paylaş',
        'btn-new': '🎊 Yeni tebrik oluştur',

        // Output
        'output-title': '🎉 Kişisel tebriğiniz',

        // Trust Badges
        'badge-free': '🔒 %100 ücretsiz',
        'badge-fast': '⚡ Saniyeler içinde hazır',
        'badge-languages': '🌍 6 Dil',

        // History
        'history-title': '📜 Son tebrikleriniz',
        'history-empty': 'Henüz tebrik oluşturulmadı.',

        // Toasts
        'toast-copied': 'Metin kopyalandı! 📋',
        'toast-generated': 'Tebrik oluşturuldu! 🎉',
        'toast-error': 'Hata:',
        'toast-loading': 'Oluşturuluyor...',
        'toast-history-loaded': 'Tebrik yüklendi! 📜',
        'toast-feedback': 'Geri bildiriminiz için teşekkürler! ❤️',
        'toast-copy-fail': 'Kopyalama başarısız 😞',
        'toast-share-prep': 'Resim hazırlanıyor... 📤',
        'toast-share-success': 'Başarıyla paylaşıldı! 🎉',
        'toast-share-fail': 'Paylaşma başarısız',
        'toast-download-prep': 'Oluşturuluyor (1080x1080)... 📸',
        'toast-download-success': 'Resim kaydedildi! 🎉',
        'toast-too-many': 'Kartta çok fazla öğe var!',
        'toast-image-added': 'Resim eklendi! Ölçeklendirmek için köşeyi sürükleyin. 📐',
        'toast-link-loaded': 'Veriler bağlantıdan yüklendi! ✨',
        'toast-fields-required': 'Lütfen tüm zorunlu alanları doldurun! ⚠️',

        // SEO Section
        'seo-title': 'Neden AI Tebrik Oluşturucuyu Kullanmalısınız?',
        'seo-intro': 'Grussgenerator.de, saniyeler içinde samimi, eğlenceli veya profesyonel tebrikler oluşturmanız için en iyi araçtır. Doğum günü dilekleri, romantik bir düğün mesajı veya bayram kutlamaları – yapay zekamız her zaman mükemmel kelimeleri bulur.',
        'seo-birthday-title': '🎂 Doğum Günü Dilekleri',
        'seo-birthday-text': 'Komik sözlerden derin bilgeliklere. Dileklerinizi doğum günü sahibinin adıyla kişiselleştirin.',
        'seo-wedding-title': '💍 Düğün ve Yıl Dönümü',
        'seo-wedding-text': 'En güzel gün için zarif ve duygusal kelimeler bulun. Kartlar, konuşmalar veya WhatsApp mesajları için ideal.',
        'seo-holidays-title': '🎄 Bayramlar ve Kutlamalar',
        'seo-holidays-text': 'Noel, Yılbaşı, Paskalya veya Anneler Günü – benzersiz dijital tebrik kartlarıyla sevinç yayın.',

        // FAQ
        'faq-title': 'Sık Sorulan Sorular (SSS)',
        'faq-q1': 'Tebrik oluşturucu ücretsiz mi?',
        'faq-a1': 'Evet, Grussgenerator.de %100 ücretsizdir. İstediğiniz kadar tebrik oluşturabilir ve paylaşabilirsiniz.',
        'faq-q2': 'AI oluşturma nasıl çalışır?',
        'faq-a2': 'Yapay zekamız, vesile, ilişki ve ton hakkındaki bilgilerinizi analiz ederek tam ihtiyaçlarınıza uygun kişiselleştirilmiş bir metin oluşturur.',
        'faq-q3': 'Tebrikleri resim olarak kaydedebilir miyim?',
        'faq-a3': 'Kesinlikle! Tasarımınızı yüksek kaliteli resim (JPG/PNG) olarak indirebilir veya WhatsApp ve sosyal medya üzerinden paylaşabilirsiniz.',

        // Footer
        'footer-imprint': 'Künye',
        'footer-privacy': 'Gizlilik',
        'footer-count': '<strong id="footerCount">12,847</strong> tebrik oluşturuldu! 🚀',

        // Social Proof
        'social-proof': ' kişi şu anda tebrik oluşturuyor! 🔥'
    },

    it: {
        'tagline': 'Il testo perfetto per ogni occasione',
        'form-title': '✨ Crea il tuo messaggio',
        'label-occasion': '📅 Occasione',
        'label-name': '👤 Nome del destinatario',
        'label-relationship': '💝 Relazione',
        'label-info': '💡 Info aggiuntive (opzionale)',
        'label-tone': '🎨 Stile / Tono',
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
        'occasion-mothersday': 'Festa della Mamma',
        'occasion-fathersday': 'Festa del Papà',
        'occasion-graduation': 'Laurea',
        'occasion-anniversary': 'Anniversario',
        'occasion-condolence': 'Condoglianze',
        'occasion-general': 'Altro',

        // Relationships
        'option-select': 'Seleziona...',
        'option-none': 'Non specificato',
        'option-friend': 'Amico/a',
        'option-romantic': 'Partner 💕',
        'option-family': 'Famiglia',
        'option-colleague': 'Collega',
        'option-boss': 'Capo',
        'option-acquaintance': 'Conoscente',

        // Tones
        'tone-warm': '😊 Caloroso e Sincero',
        'tone-funny': '😂 Umoristico e Divertente',
        'tone-formal': '👔 Formale e Professionale',
        'tone-poetic': '✍️ Poetico e Creativo',
        'tone-short': '⚡ Breve e Conciso',

        // Buttons
        'btn-generate': '✨ Genera Messaggio ✨',
        'btn-copy': 'Copia',
        'btn-whatsapp': 'WhatsApp',
        'btn-email': 'Email',
        'btn-download': 'Salva come immagine',
        'btn-share': 'Condividi',
        'btn-new': '🎊 Crea nuovo messaggio',

        // Output
        'output-title': '🎉 Il tuo messaggio personale',

        // Trust Badges
        'badge-free': '🔒 100% gratuito',
        'badge-fast': '⚡ Pronto in pochi secondi',
        'badge-languages': '🌍 6 Lingue',

        // History
        'history-title': '📜 I tuoi messaggi recenti',
        'history-empty': 'Nessun messaggio creato ancora.',

        // Toasts
        'toast-copied': 'Testo copiato! 📋',
        'toast-generated': 'Messaggio generato! 🎉',
        'toast-error': 'Errore:',
        'toast-loading': 'Generazione...',
        'toast-history-loaded': 'Messaggio caricato! 📜',
        'toast-feedback': 'Grazie per il tuo feedback! ❤️',
        'toast-copy-fail': 'Copia fallita 😞',
        'toast-share-prep': 'Preparazione immagine... 📤',
        'toast-share-success': 'Condiviso con successo! 🎉',
        'toast-share-fail': 'Condivisione fallita',
        'toast-download-prep': 'Creazione (1080x1080)... 📸',
        'toast-download-success': 'Immagine salvata! 🎉',
        'toast-too-many': 'Troppi elementi sulla carta!',
        'toast-image-added': 'Immagine aggiunta! Trascina l\'angolo per ridimensionare. 📐',
        'toast-link-loaded': 'Dati caricati dal link! ✨',
        'toast-fields-required': 'Per favore compila tutti i campi obbligatori! ⚠️',

        // SEO Section
        'seo-title': 'Perché usare il Generatore di Messaggi AI?',
        'seo-intro': 'Grussgenerator.de è il tuo strumento definitivo per creare messaggi calorosi, divertenti o professionali in pochi secondi. Che tu abbia bisogno di auguri di compleanno, un messaggio romantico per un matrimonio o saluti festivi – la nostra IA trova sempre le parole perfette.',
        'seo-birthday-title': '🎂 Auguri di compleanno',
        'seo-birthday-text': 'Da citazioni divertenti a profonde saggezze. Personalizza i tuoi auguri con il nome del festeggiato.',
        'seo-wedding-title': '💍 Matrimonio e Anniversario',
        'seo-wedding-text': 'Trova parole eleganti ed emozionanti per il giorno più bello. Ideale per biglietti, discorsi o messaggi WhatsApp.',
        'seo-holidays-title': '🎄 Festività e Celebrazioni',
        'seo-holidays-text': 'Che sia Natale, Capodanno, Pasqua o Festa della Mamma – diffondi gioia con biglietti digitali unici.',

        // FAQ
        'faq-title': 'Domande frequenti (FAQ)',
        'faq-q1': 'Il generatore di messaggi è gratuito?',
        'faq-a1': 'Sì, Grussgenerator.de è 100% gratuito. Puoi creare e condividere tutti i messaggi che desideri.',
        'faq-q2': 'Come funziona la creazione con IA?',
        'faq-a2': 'La nostra IA analizza i tuoi dati su occasione, relazione e tono per creare un testo personalizzato su misura per le tue esigenze.',
        'faq-q3': 'Posso salvare i messaggi come immagini?',
        'faq-a3': 'Assolutamente! Puoi scaricare il tuo design come immagine di alta qualità (JPG/PNG) o condividerlo tramite WhatsApp e social media.',

        // Footer
        'footer-imprint': 'Note legali',
        'footer-privacy': 'Privacy',
        'footer-count': '<strong id="footerCount">12,847</strong> messaggi creati! 🚀',

        // Social Proof
        'social-proof': ' persone stanno creando messaggi in questo momento! 🔥'
    }
};

// Function to update all UI elements
function applyTranslations(lang) {
    const t = uiTranslations[lang] || uiTranslations.de;

    // Update data-i18n elements (use innerHTML for elements that may contain HTML like footer-count)
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            // Use innerHTML for keys known to contain HTML, textContent for all others
            if (key === 'footer-count') {
                el.innerHTML = t[key];
            } else {
                el.textContent = t[key];
            }
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key]) {
            el.placeholder = t[key];
        }
    });

    // Update the document title and meta description based on language
    if (lang === 'de') {
        document.title = 'Grussgenerator.de | KI Grußkarten kostenlos erstellen & teilen 🎉';
    } else if (lang === 'en') {
        document.title = 'Grussgenerator.de | Create Free AI Greeting Cards & Share 🎉';
    } else if (lang === 'es') {
        document.title = 'Grussgenerator.de | Crea Tarjetas de Saludo con IA Gratis 🎉';
    } else if (lang === 'fr') {
        document.title = 'Grussgenerator.de | Créez des Cartes de Vœux IA Gratuites 🎉';
    } else if (lang === 'tr') {
        document.title = 'Grussgenerator.de | Ücretsiz AI Tebrik Kartları Oluşturun 🎉';
    } else if (lang === 'it') {
        document.title = 'Grussgenerator.de | Crea Biglietti di Auguri AI Gratuiti 🎉';
    }
}

// Export for use in generator.js
window.uiTranslations = uiTranslations;
window.applyTranslations = applyTranslations;
