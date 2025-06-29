// Variables globales
let currentUser = null;
let currentPage = 'home';
let currentWeek = 0;
let currentDay = 0; // 0 = Lundi, 1 = Mardi, etc.
let currentWeekVieScolaire = 0;
let isMobileMenuOpen = false;

// Données simulées
const scheduleData = {
    weeks: [],
    courses: {}
};

// Emploi du temps fixe pour chaque jour de la semaine
const fixedWeeklySchedule = {
    0: [ // Lundi
        { time: '08h00', subject: 'FRANCAIS', teacher: 'DILGER J.', room: '103', color: 'bg-red-200', textColor: 'text-red-800' },
        { time: '09h00', subject: 'FRANCAIS', teacher: 'DILGER J.', room: '103', color: 'bg-red-200', textColor: 'text-red-800' },
        { time: '10h10', subject: 'MATHEMATIQUES', teacher: 'HULIN J.', room: '223', color: 'bg-teal-200', textColor: 'text-teal-800' },
        { time: '11h10', subject: 'MATHEMATIQUES', teacher: 'HULIN J.', room: '223', color: 'bg-teal-200', textColor: 'text-teal-800' },
        { time: '13h10', subject: 'ANGLAIS LV1', teacher: 'ESTRADA F.', room: '123', color: 'bg-blue-200', textColor: 'text-blue-800' },
        { time: '14h10', subject: 'HISTOIRE-GEOGRAPHIE', teacher: 'RENE H.', room: '205', color: 'bg-yellow-200', textColor: 'text-yellow-800' },
        { time: '15h15', subject: 'SC.GESTION&NUMERIQUE', teacher: 'NOEL K.', room: '109i', color: 'bg-gray-200', textColor: 'text-gray-800' },
        { time: '16h15', subject: 'SC.GESTION&NUMERIQUE', teacher: 'NOEL K.', room: '109i', color: 'bg-gray-200', textColor: 'text-gray-800' },
        { time: '17h15', subject: 'ETUDE', teacher: 'Surveillant', room: 'CDI', color: 'bg-green-200', textColor: 'text-green-800' },
        { time: '18h15', subject: 'ETUDE', teacher: 'Surveillant', room: 'CDI', color: 'bg-green-200', textColor: 'text-green-800' }
    ],
    1: [ // Mardi
        { time: '08h00', subject: 'MATHEMATIQUES', teacher: 'HULIN J.', room: '223', color: 'bg-teal-200', textColor: 'text-teal-800' },
        { time: '09h00', subject: 'DROIT ET ECONOMIE', teacher: 'GHDAS S.', room: '121', color: 'bg-pink-200', textColor: 'text-pink-800' },
        { time: '10h10', subject: 'DROIT ET ECONOMIE', teacher: 'GHDAS S.', room: '121', color: 'bg-pink-200', textColor: 'text-pink-800' },
        { time: '11h10', subject: 'ESPAGNOL LV2', teacher: 'MAALLOU N.', room: '104', color: 'bg-red-200', textColor: 'text-red-800' },
        { time: '13h10', subject: 'MANAGEMENT', teacher: 'KOUROUMA A.', room: '122', color: 'bg-green-200', textColor: 'text-green-800' },
        { time: '14h10', subject: 'MANAGEMENT', teacher: 'KOUROUMA A.', room: '122', color: 'bg-green-200', textColor: 'text-green-800' },
        { time: '15h15', subject: 'ED.PHYSIQUE & SPORT.', teacher: 'LAURENT B.', room: 'Gymnase', color: 'bg-blue-200', textColor: 'text-blue-800' },
        { time: '16h15', subject: 'ED.PHYSIQUE & SPORT.', teacher: 'LAURENT B.', room: 'Gymnase', color: 'bg-blue-200', textColor: 'text-blue-800' },
        { time: '17h15', subject: 'ETUDE', teacher: 'Surveillant', room: 'CDI', color: 'bg-green-200', textColor: 'text-green-800' },
        { time: '18h15', subject: 'ETUDE', teacher: 'Surveillant', room: 'CDI', color: 'bg-green-200', textColor: 'text-green-800' }
    ],
    2: [ // Mercredi
        { time: '08h00', subject: 'FRANCAIS', teacher: 'DILGER J.', room: '103', color: 'bg-red-200', textColor: 'text-red-800' },
        { time: '09h00', subject: 'FRANCAIS', teacher: 'DILGER J.', room: '103', color: 'bg-red-200', textColor: 'text-red-800' },
        { time: '10h10', subject: 'ANGLAIS LV1', teacher: 'ESTRADA F.', room: '123', color: 'bg-blue-200', textColor: 'text-blue-800' },
        { time: '11h10', subject: 'ANGLAIS LV1', teacher: 'ESTRADA F.', room: '123', color: 'bg-blue-200', textColor: 'text-blue-800' },
        { time: '13h10', subject: 'MATHEMATIQUES', teacher: 'HULIN J.', room: '223', color: 'bg-teal-200', textColor: 'text-teal-800' },
        { time: '14h10', subject: 'SC.GESTION&NUMERIQUE', teacher: 'NOEL K.', room: '109i', color: 'bg-gray-200', textColor: 'text-gray-800' },
        { time: '15h15', subject: 'ESPAGNOL LV2', teacher: 'MAALLOU N.', room: '104', color: 'bg-red-200', textColor: 'text-red-800' },
        { time: '16h15', subject: 'ESPAGNOL LV2', teacher: 'MAALLOU N.', room: '104', color: 'bg-red-200', textColor: 'text-red-800' },
        { time: '17h15', subject: 'ETUDE', teacher: 'Surveillant', room: 'CDI', color: 'bg-green-200', textColor: 'text-green-800' },
        { time: '18h15', subject: 'ETUDE', teacher: 'Surveillant', room: 'CDI', color: 'bg-green-200', textColor: 'text-green-800' }
    ],
    3: [ // Jeudi
        { time: '08h00', subject: 'HISTOIRE-GEOGRAPHIE', teacher: 'RENE H.', room: '205', color: 'bg-yellow-200', textColor: 'text-yellow-800' },
        { time: '09h00', subject: 'HISTOIRE-GEOGRAPHIE', teacher: 'RENE H.', room: '205', color: 'bg-yellow-200', textColor: 'text-yellow-800' },
        { time: '10h10', subject: 'MATHEMATIQUES', teacher: 'HULIN J.', room: '223', color: 'bg-teal-200', textColor: 'text-teal-800' },
        { time: '11h10', subject: 'DROIT ET ECONOMIE', teacher: 'GHDAS S.', room: '121', color: 'bg-pink-200', textColor: 'text-pink-800' },
        { time: '13h10', subject: 'DROIT ET ECONOMIE', teacher: 'GHDAS S.', room: '121', color: 'bg-pink-200', textColor: 'text-pink-800' },
        { time: '14h10', subject: 'ANGLAIS LV1', teacher: 'ESTRADA F.', room: '123', color: 'bg-blue-200', textColor: 'text-blue-800' },
        { time: '15h15', subject: 'MANAGEMENT', teacher: 'KOUROUMA A.', room: '122', color: 'bg-green-200', textColor: 'text-green-800' },
        { time: '16h15', subject: 'SC.GESTION&NUMERIQUE', teacher: 'NOEL K.', room: '109i', color: 'bg-gray-200', textColor: 'text-gray-800' },
        { time: '17h15', subject: 'ETUDE', teacher: 'Surveillant', room: 'CDI', color: 'bg-green-200', textColor: 'text-green-800' },
        { time: '18h15', subject: 'ETUDE', teacher: 'Surveillant', room: 'CDI', color: 'bg-green-200', textColor: 'text-green-800' }
    ],
    4: [ // Vendredi
        { time: '08h00', subject: 'MATHEMATIQUES', teacher: 'HULIN J.', room: '223', color: 'bg-teal-200', textColor: 'text-teal-800' },
        { time: '09h00', subject: 'FRANCAIS', teacher: 'DILGER J.', room: '103', color: 'bg-red-200', textColor: 'text-red-800' },
        { time: '10h10', subject: 'FRANCAIS', teacher: 'DILGER J.', room: '103', color: 'bg-red-200', textColor: 'text-red-800' },
        { time: '11h10', subject: 'ANGLAIS LV1', teacher: 'ESTRADA F.', room: '123', color: 'bg-blue-200', textColor: 'text-blue-800' },
        { time: '13h10', subject: 'SC.GESTION&NUMERIQUE', teacher: 'NOEL K.', room: '109i', color: 'bg-gray-200', textColor: 'text-gray-800' },
        { time: '14h10', subject: 'SC.GESTION&NUMERIQUE', teacher: 'NOEL K.', room: '109i', color: 'bg-gray-200', textColor: 'text-gray-800' },
        { time: '15h15', subject: 'ED.PHYSIQUE & SPORT.', teacher: 'LAURENT B.', room: 'Gymnase', color: 'bg-blue-200', textColor: 'text-blue-800' },
        { time: '16h15', subject: 'ED.PHYSIQUE & SPORT.', teacher: 'LAURENT B.', room: 'Gymnase', color: 'bg-blue-200', textColor: 'text-blue-800' },
        { time: '17h15', subject: 'ETUDE', teacher: 'Surveillant', room: 'CDI', color: 'bg-green-200', textColor: 'text-green-800' },
        { time: '18h15', subject: 'ETUDE', teacher: 'Surveillant', room: 'CDI', color: 'bg-green-200', textColor: 'text-green-800' }
    ]
};

const homeworkData = [
    {
        id: '1',
        subject: 'MATHÉMATIQUES',
        teacher: 'M. HULIN J.',
        title: 'Exercices sur les dérivées',
        description: 'Terminer les exercices 15 à 20 page 142 du manuel',
        dueDate: '2025-01-15',
        type: 'exercice',
        priority: 'high',
        emoji: '📚'
    },
    {
        id: '2',
        subject: 'FRANÇAIS',
        teacher: 'M. DILGER J.',
        title: 'Analyse de texte',
        description: 'Analyser le poème de Baudelaire "L\'Albatros" - 2 pages minimum',
        dueDate: '2025-01-16',
        type: 'devoir',
        priority: 'medium',
        emoji: '📝'
    },
    {
        id: '3',
        subject: 'ANGLAIS LV1',
        teacher: 'M. ESTRADA F.',
        title: 'Présentation orale',
        description: 'Préparer une présentation de 5 minutes sur "Future careers"',
        dueDate: '2025-01-17',
        type: 'projet',
        priority: 'high',
        emoji: '🎯'
    },
    {
        id: '4',
        subject: 'HISTOIRE-GÉOGRAPHIE',
        teacher: 'Mme RENÉ H.',
        title: 'Révisions contrôle',
        description: 'Réviser le chapitre sur la Première Guerre mondiale',
        dueDate: '2025-01-18',
        type: 'revision',
        priority: 'medium',
        emoji: '🔄'
    },
    {
        id: '5',
        subject: 'SC.GESTION&NUMÉRIQUE',
        teacher: 'M. NOEL K.',
        title: 'Projet base de données',
        description: 'Finaliser la base de données de gestion des stocks',
        dueDate: '2025-01-20',
        type: 'projet',
        priority: 'low',
        emoji: '🎯'
    }
];

const resourcesData = [
    { subject: 'MATHEMATIQUES', file: 'TP pl42.py', date: 'déposé le 22 mai', emoji: '📄', size: '2.1 KB' },
    { subject: 'MATHEMATIQUES', file: 'Jazz.pdf', date: 'déposé le 22 mai', emoji: '📕', size: '1.2 MB' },
    { subject: 'MATHEMATIQUES', file: 'Eval B.pdf', date: 'déposé le 19 mai', emoji: '📕', size: '856 KB' },
    { subject: 'MATHEMATIQUES', file: 'Eval A.pdf', date: 'déposé le 19 mai', emoji: '📕', size: '743 KB' },
    { subject: 'MATHEMATIQUES', file: 'Evo81.ods', date: 'déposé le 15 mai', emoji: '📊', size: '45 KB' }
];

const infoData = [
    {
        title: "Dernier jour de cantine le 11 juin 2025",
        author: "CICERONE B.",
        emoji: "🍽️",
        date: "Il y a 2h"
    },
    {
        title: "Distribution convocations BAC 2025",
        author: "CLOUET L.",
        emoji: "📋",
        date: "Hier"
    },
    {
        title: "Spécialité non poursuivie",
        author: "CLOUET L.",
        emoji: "📚",
        date: "Il y a 3j"
    }
];

// Données des notes
const notesData = {
    1: {
        subjects: [
            {
                category: 'Tronc commun',
                items: [
                    { subject: 'FRANÇAIS', teacher: 'M. DILGER', studentAvg: '6.50', classAvg: '10.44', appreciation: 'Insuffisant. De nombreuses absences.' },
                    { subject: 'MATHÉMATIQUES', teacher: 'M. HULIN', studentAvg: '6.00', classAvg: '9.63', appreciation: 'Résultats insuffisants. Peu de travail, peu d\'implication et des absences.' },
                    { subject: 'HISTOIRE-GÉOGRAPHIE', teacher: 'Mme RENÉ', studentAvg: '11.72', classAvg: '12.86', appreciation: 'Des résultats en progrès au cours du trimestre.' },
                    { subject: 'ED.PHYSIQUE & SPORT.', teacher: 'M. PEREZ', studentAvg: '12.00', classAvg: '13.35', appreciation: 'Ensemble assez satisfaisant.' }
                ]
            },
            {
                category: 'Langues',
                items: [
                    { subject: 'ANGLAIS LV1', teacher: 'M. ESTRADA', studentAvg: '8.57', classAvg: '11.18', appreciation: 'Ensemble irrégulier. Manque d\'investissement.' },
                    { subject: 'ESPAGNOL LV2', teacher: 'Mme MAALLOU', studentAvg: '10.50', classAvg: '11.26', appreciation: 'Des résultats justes, mais peut progresser.' }
                ]
            },
            {
                category: 'Enseignement technologique',
                items: [
                    { subject: 'DROIT ET ÉCONOMIE', teacher: 'M. GHDAS', studentAvg: '11.84', classAvg: '12.38', appreciation: 'Bon trimestre dans l\'ensemble.' },
                    { subject: 'MANAGEMENT', teacher: 'M. KOUROUMA', studentAvg: '9.00', classAvg: '9.91', appreciation: 'Ensemble convenable. Vous devez participer davantage.' },
                    { subject: 'SC.GESTION&NUMÉRIQUE', teacher: 'M. NOEL', studentAvg: '9.70', classAvg: '12.79', appreciation: 'Trimestre très juste, accentuez votre implication.' }
                ]
            }
        ],
        generalAverage: { student: '10.00', class: '12.00' },
        schoolLife: { absences: '23 demi-journées (47h00) dont 9 sont non justifiées (13h00)' },
        globalAppreciation: 'L\'ensemble est juste. Il vous faut plus d\'implication dans le travail pour réussir votre second trimestre.'
    },
    2: {
        subjects: [
            {
                category: 'Tronc commun',
                items: [
                    { subject: 'FRANÇAIS', teacher: 'M. DILGER', studentAvg: '7.25', classAvg: '13.00', appreciation: 'Bien, en progrès. Il faut continuer sur cette bonne lancée.' },
                    { subject: 'MATHÉMATIQUES', teacher: 'M. HULIN', studentAvg: '7.50', classAvg: '10.33', appreciation: 'Trop peu d\'implication et de travail pour consolider des capacités.' },
                    { subject: 'HISTOIRE-GÉOGRAPHIE', teacher: 'Mme RENÉ', studentAvg: '12.25', classAvg: '12.25', appreciation: 'Des résultats en progrès, vous semblez avoir pris la mesure du travail à fournir.' },
                    { subject: 'ED.PHYSIQUE & SPORT.', teacher: 'M. PEREZ', studentAvg: '13.50', classAvg: '13.80', appreciation: 'Absente une partie du cycle et lors des évaluations.' }
                ]
            },
            {
                category: 'Langues',
                items: [
                    { subject: 'ANGLAIS LV1', teacher: 'M. ESTRADA', studentAvg: '9.25', classAvg: '15.00', appreciation: 'Des résultats corrects. Il faut approfondir le travail personnel.' },
                    { subject: 'ESPAGNOL LV2', teacher: 'Mme MAALLOU', studentAvg: '11.75', classAvg: '10.83', appreciation: 'Ensemble très fragile. Il faut consolider les apprentissages.' }
                ]
            },
            {
                category: 'Enseignement technologique',
                items: [
                    { subject: 'DROIT ET ÉCONOMIE', teacher: 'M. GHDAS', studentAvg: '12.50', classAvg: '13.33', appreciation: 'Un bon trimestre dans l\'ensemble malgré de nombreuses absences.' },
                    { subject: 'MANAGEMENT', teacher: 'M. KOUROUMA', studentAvg: '10.25', classAvg: '8.69', appreciation: 'Vous stagnez à un petit niveau. Il faut vous impliquer davantage.' },
                    { subject: 'SC.GESTION&NUMÉRIQUE', teacher: 'M. NOEL', studentAvg: '10.80', classAvg: '11.67', appreciation: 'Trimestre difficile, en raison de nombreuses absences.' }
                ]
            }
        ],
        generalAverage: { student: '10.75', class: '12.50' },
        schoolLife: { absences: '33 demi-journées (87h00) dont 14 sont non justifiées (23h00)' },
        globalAppreciation: 'Ensemble inégal. Il vous faut fournir plus de travail personnel dans l\'ensemble des matières.'
    },
    3: {
        subjects: [
            {
                category: 'Tronc commun',
                items: [
                    { subject: 'FRANÇAIS', teacher: 'M. DILGER', studentAvg: '8.75', classAvg: '13.00', appreciation: 'Bien trop juste. Le travail n\'est pas assez approfondi.' },
                    { subject: 'MATHÉMATIQUES', teacher: 'M. HULIN', studentAvg: '8.25', classAvg: '10.33', appreciation: 'Les résultats sont insuffisants, par manque de travail et d\'assiduité.' },
                    { subject: 'HISTOIRE-GÉOGRAPHIE', teacher: 'Mme RENÉ', studentAvg: '13.50', classAvg: '12.25', appreciation: 'Beaucoup de progrès ce trimestre. Maintenez ces efforts l\'an prochain.' },
                    { subject: 'ED.PHYSIQUE & SPORT.', teacher: 'M. PEREZ', studentAvg: '14.00', classAvg: '14.20', appreciation: 'Ensemble satisfaisant.' }
                ]
            },
            {
                category: 'Langues',
                items: [
                    { subject: 'ANGLAIS LV1', teacher: 'M. ESTRADA', studentAvg: '10.75', classAvg: '15.00', appreciation: 'Ensemble satisfaisant. Bonne participation. Élève sérieuse.' },
                    { subject: 'ESPAGNOL LV2', teacher: 'Mme MAALLOU', studentAvg: '12.25', classAvg: '10.83', appreciation: 'Bilan convenable sur le plan des résultats écrits.' }
                ]
            },
            {
                category: 'Enseignement technologique',
                items: [
                    { subject: 'DROIT ET ÉCONOMIE', teacher: 'M. GHDAS', studentAvg: '13.25', classAvg: '13.33', appreciation: 'Quelques efforts ce trimestre pour combler certaines lacunes, c\'est bien.' },
                    { subject: 'MANAGEMENT', teacher: 'M. KOUROUMA', studentAvg: '11.50', classAvg: '8.69', appreciation: 'Un début de trimestre moyen qui se termine par une très bonne note.' },
                    { subject: 'SC.GESTION&NUMÉRIQUE', teacher: 'M. NOEL', studentAvg: '11.90', classAvg: '12.67', appreciation: 'Trimestre trop juste, des efforts ont été constatés.' }
                ]
            }
        ],
        generalAverage: { student: '11.50', class: '12.75' },
        schoolLife: { absences: '40 demi-journées (81h00) dont 35 sont non justifiées (69h00)' },
        globalAppreciation: 'Progrès notable ce trimestre. Continuez sur cette lancée pour l\'année prochaine.'
    }
};

// Données du cahier de textes
const coursData = [
    {
        date: 'Lundi 02 juin',
        courses: [
            {
                subject: 'MATHÉMATIQUES',
                teacher: 'M. HULIN J.',
                time: '14h10 à 15h15',
                type: 'Révision',
                content: 'Dérivée et étude de fonctions.',
                category: 'Travaux pratiques'
            }
        ]
    },
    {
        date: 'Vendredi 23 mai',
        courses: [
            {
                subject: 'FRANÇAIS',
                teacher: 'M. DILGER J.',
                time: '08h00 à 09h00',
                type: 'Cours',
                content: 'Analyse littéraire - Les figures de style dans la poésie romantique.',
                category: 'Cours magistral'
            },
            {
                subject: 'ANGLAIS LV1',
                teacher: 'M. ESTRADA F.',
                time: '10h10 à 11h10',
                type: 'Expression orale',
                content: 'Présentation des projets - Thème: "Future careers and ambitions".',
                category: 'Travaux pratiques'
            }
        ]
    },
    {
        date: 'Jeudi 22 mai',
        courses: [
            {
                subject: 'HISTOIRE-GÉOGRAPHIE',
                teacher: 'Mme RENÉ H.',
                time: '09h50 à 10h45',
                type: 'Cours',
                content: 'La Première Guerre mondiale - Les causes et le déclenchement du conflit.',
                category: 'Cours magistral'
            },
            {
                subject: 'SC.GESTION&NUMÉRIQUE',
                teacher: 'M. NOEL K.',
                time: '14h05 à 15h00',
                type: 'TP',
                content: 'Création d\'une base de données - Gestion des stocks d\'une entreprise.',
                category: 'Travaux pratiques'
            }
        ]
    }
];

// Helper function to convert hyphenated strings to camelCase
function hyphenToCamelCase(str) {
    return str.replace(/-([a-z])/g, function(match, letter) {
        return letter.toUpperCase();
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    generateScheduleData();
    checkAuthStatus();
});

function initializeApp() {
    // Gestionnaires d'événements pour la connexion
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Gestionnaires d'événements pour la navigation
    setupNavigation();
    
    // Gestionnaires d'événements pour les données utilisateur
    setupDataPageEvents();
    
    // Gestionnaires d'événements pour le formulaire de mot de passe
    setupPasswordForm();

    // Gestionnaires pour les notes
    setupNotesEvents();

    // Gestionnaires pour le cahier de textes
    setupCahierTextesEvents();
}

function checkAuthStatus() {
    const savedUser = localStorage.getItem('pronote_user');
    const savedAuth = localStorage.getItem('pronote_authenticated');
    const savedPage = localStorage.getItem('pronote_current_page');
    
    if (savedUser && savedAuth === 'true') {
        try {
            currentUser = JSON.parse(savedUser);
            showMainApp();
            if (savedPage) {
                goToPage(savedPage);
            }
        } catch (error) {
            console.error('Erreur lors de la restauration de la session:', error);
            clearAuthData();
            showLoginPage();
        }
    } else {
        showLoginPage();
    }
}

function showLoginPage() {
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('mainApp').style.display = 'none';
}

function showMainApp() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('mainApp').style.display = 'block';
    
    // Charger le contenu de la page d'accueil
    loadHomePage();
}

function clearAuthData() {
    localStorage.removeItem('pronote_user');
    localStorage.removeItem('pronote_authenticated');
    localStorage.removeItem('pronote_current_page');
}

// Gestion de la connexion
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('passwordToggleIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleIcon.className = 'fas fa-eye';
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const loginBtn = document.getElementById('loginBtn');
    const loginBtnText = document.getElementById('loginBtnText');
    const loginSpinner = document.getElementById('loginSpinner');
    const errorDiv = document.getElementById('loginError');
    const errorText = document.getElementById('errorText');
    
    // Validation
    if (!username) {
        showLoginError('Veuillez saisir votre identifiant');
        return;
    }
    
    if (!password) {
        showLoginError('Veuillez saisir votre mot de passe');
        return;
    }
    
    // Afficher le spinner
    loginBtn.disabled = true;
    loginBtnText.style.display = 'none';
    loginSpinner.style.display = 'inline-block';
    errorDiv.style.display = 'none';
    
    // Simuler une authentification
    setTimeout(() => {
        if (username === 'glodean.giorgiana' && password === 'password123') {
            // Connexion réussie
            currentUser = { username, password };
            localStorage.setItem('pronote_user', JSON.stringify(currentUser));
            localStorage.setItem('pronote_authenticated', 'true');
            localStorage.setItem('pronote_current_page', 'home');
            
            showMainApp();
        } else {
            // Échec de la connexion
            showLoginError('Identifiant ou mot de passe incorrect');
        }
        
        // Masquer le spinner
        loginBtn.disabled = false;
        loginBtnText.style.display = 'inline';
        loginSpinner.style.display = 'none';
    }, 1000);
}

function showLoginError(message) {
    const errorDiv = document.getElementById('loginError');
    const errorText = document.getElementById('errorText');
    
    errorText.textContent = message;
    errorDiv.style.display = 'flex';
}

function logout() {
    currentUser = null;
    currentPage = 'home';
    clearAuthData();
    showLoginPage();
    
    // Réinitialiser le formulaire de connexion
    document.getElementById('loginForm').reset();
    document.getElementById('loginError').style.display = 'none';
}

// Navigation
function setupNavigation() {
    // Navigation desktop
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.getAttribute('data-page');
            goToPage(page);
        });
    });
    
    // Navigation mobile
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    mobileNavItems.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.getAttribute('data-page');
            goToPage(page);
        });
    });
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuIcon = document.getElementById('mobileMenuIcon');
    
    isMobileMenuOpen = !isMobileMenuOpen;
    
    if (isMobileMenuOpen) {
        mobileMenu.style.display = 'block';
        mobileMenuIcon.className = 'fas fa-times';
    } else {
        mobileMenu.style.display = 'none';
        mobileMenuIcon.className = 'fas fa-bars';
    }
}

function goToPage(page) {
    console.log('Navigation vers:', page); // Debug
    
    // Masquer toutes les pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));
    
    // Convert hyphenated page names to camelCase for element ID lookup
    const pageId = hyphenToCamelCase(page) + 'Page';
    
    // Afficher la page demandée
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        console.log('Page affichée:', page); // Debug
    } else {
        console.error('Page non trouvée:', pageId); // Debug
    }
    
    // Mettre à jour la navigation
    updateNavigation(page);
    
    // Sauvegarder la page actuelle
    currentPage = page;
    if (currentUser) {
        localStorage.setItem('pronote_current_page', page);
    }
    
    // Fermer le menu mobile
    if (isMobileMenuOpen) {
        toggleMobileMenu();
    }
    
    // Charger le contenu spécifique de la page
    if (page === 'home') {
        loadHomePage();
    } else if (page === 'notes') {
        loadNotesPage();
    } else if (page === 'vie-scolaire') {
        loadVieScolairePage();
    } else if (page === 'cahier-textes') {
        loadCahierTextesPage();
    }
}

function updateNavigation(activePage) {
    // Navigation desktop
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const page = item.getAttribute('data-page');
        if (page === activePage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Navigation mobile
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    mobileNavItems.forEach(item => {
        const page = item.getAttribute('data-page');
        if (page === activePage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Mettre à jour le titre de la page mobile
    const currentPageTitle = document.getElementById('currentPageTitle');
    const pageLabels = {
        'home': 'Page d\'accueil',
        'mes-donnees': 'Mes données',
        'cahier-textes': 'Cahier de textes',
        'notes': 'Notes',
        'vie-scolaire': 'Vie scolaire'
    };
    
    if (currentPageTitle && pageLabels[activePage]) {
        currentPageTitle.textContent = pageLabels[activePage];
    }
}

// Génération des données d'emploi du temps
function generateScheduleData() {
    const startDate = new Date(2024, 8, 2); // 2 septembre 2024
    const weekTypes = ['P', 'A', 'B'];
    // Créneaux horaires étendus jusqu'à 18h15
    const timeSlots = ['08h00', '09h00', '10h10', '11h10', '12h10', '13h10', '14h10', '15h15', '16h15', '17h15', '18h15'];
    
    // Générer 44 semaines
    for (let i = 0; i < 44; i++) {
        const weekStart = new Date(startDate);
        weekStart.setDate(startDate.getDate() + (i * 7));
        
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 4);
        
        const formatDate = (date) => {
            const day = date.getDate().toString().padStart(2, '0');
            const months = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
            return `${day}/${months[date.getMonth()]}`;
        };
        
        // Générer les jours de la semaine avec dates
        const days = [];
        const dayNames = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
        for (let j = 0; j < 5; j++) {
            const currentDay = new Date(weekStart);
            currentDay.setDate(weekStart.getDate() + j);
            days.push({
                name: dayNames[j],
                date: formatDate(currentDay),
                fullDate: currentDay
            });
        }
        
        scheduleData.weeks.push({
            label: `du ${formatDate(weekStart)} au ${formatDate(weekEnd)} - Semaine ${weekTypes[i % 3]}`,
            timeSlots: timeSlots,
            days: days
        });
        
        // Utiliser l'emploi du temps fixe pour chaque semaine
        scheduleData.courses[i] = {};
        
        // Copier l'emploi du temps fixe pour chaque jour de la semaine
        for (let dayIndex = 0; dayIndex < 5; dayIndex++) {
            scheduleData.courses[i][dayIndex] = [...fixedWeeklySchedule[dayIndex]];
        }
    }
}

// Chargement de la page d'accueil
function loadHomePage() {
    loadSchedule();
    loadHomework();
    loadResources();
    loadInfo();
}

function loadSchedule() {
    const scheduleContent = document.getElementById('scheduleContent');
    const currentWeekLabel = document.getElementById('currentWeekLabel');
    
    if (!scheduleContent || !currentWeekLabel) return;
    
    const week = scheduleData.weeks[currentWeek];
    const courses = scheduleData.courses[currentWeek][currentDay] || []; // Afficher le jour sélectionné
    
    // Mettre à jour le label avec le jour sélectionné
    const dayName = week.days[currentDay].name;
    const dayDate = week.days[currentDay].date;
    currentWeekLabel.textContent = `${dayName} ${dayDate}`;
    
    let html = '';
    week.timeSlots.forEach(time => {
        const course = courses.find(c => c.time === time);
        
        html += `
            <div class="schedule-item">
                <div class="schedule-time">${time}</div>
                <div class="schedule-course ${course ? course.color : 'empty'}">
                    ${course ? `
                        <div class="course-subject">${course.subject}</div>
                        <div class="course-teacher">${course.teacher}</div>
                        <div class="course-room">${course.room}</div>
                    ` : 'Pas de cours'}
                </div>
            </div>
        `;
    });
    
    scheduleContent.innerHTML = html;
}

function previousDay() {
    if (currentDay > 0) {
        currentDay--;
        loadSchedule();
    } else if (currentWeek > 0) {
        currentWeek--;
        currentDay = 4; // Vendredi de la semaine précédente
        loadSchedule();
    }
}

function nextDay() {
    if (currentDay < 4) {
        currentDay++;
        loadSchedule();
    } else if (currentWeek < scheduleData.weeks.length - 1) {
        currentWeek++;
        currentDay = 0; // Lundi de la semaine suivante
        loadSchedule();
    }
}

function previousWeekVieScolaire() {
    if (currentWeekVieScolaire > 0) {
        currentWeekVieScolaire--;
        loadVieScolaireSchedule();
    }
}

function nextWeekVieScolaire() {
    if (currentWeekVieScolaire < scheduleData.weeks.length - 1) {
        currentWeekVieScolaire++;
        loadVieScolaireSchedule();
    }
}

function loadHomework() {
    const homeworkList = document.getElementById('homeworkList');
    const taskCount = document.getElementById('taskCount');
    
    if (!homeworkList || !taskCount) return;
    
    // Filtrer les devoirs à venir
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    
    const upcomingHomework = homeworkData.filter(item => {
        const dueDate = new Date(item.dueDate);
        return dueDate >= today && dueDate <= nextWeek;
    }).slice(0, 3);
    
    taskCount.textContent = `${upcomingHomework.length} tâche${upcomingHomework.length > 1 ? 's' : ''}`;
    
    let html = '';
    upcomingHomework.forEach(homework => {
        const dueDate = new Date(homework.dueDate);
        const formattedDate = formatDateFrench(dueDate);
        
        html += `
            <div class="homework-item priority-${homework.priority}">
                <div class="homework-header">
                    <div class="homework-meta">
                        <span style="font-size: 1.125rem;">${homework.emoji}</span>
                        <div class="homework-subject">${homework.subject}</div>
                        ${homework.priority === 'high' ? '<i class="fas fa-exclamation-circle text-red-500"></i>' : ''}
                    </div>
                    <div class="homework-due">
                        <div class="homework-due-label">Pour le</div>
                        <div class="homework-due-date">${formattedDate}</div>
                    </div>
                </div>
                <div class="homework-teacher">${homework.teacher}</div>
                <div class="homework-title">${homework.title}</div>
                <div class="homework-description">${homework.description}</div>
            </div>
        `;
    });
    
    homeworkList.innerHTML = html;
}

function loadResources() {
    const resourcesList = document.getElementById('resourcesList');
    
    if (!resourcesList) return;
    
    let html = '';
    resourcesData.slice(0, 4).forEach(resource => {
        html += `
            <div class="resource-item">
                <div class="resource-header">
                    <div class="resource-content">
                        <div class="resource-subject">${resource.subject}</div>
                        <div class="resource-file">
                            <span style="font-size: 1.125rem;">${resource.emoji}</span>
                            <span class="resource-filename">${resource.file}</span>
                        </div>
                        <div class="resource-meta">
                            <span>${resource.date}</span>
                            <span>${resource.size}</span>
                        </div>
                    </div>
                    <button class="download-btn">
                        <i class="fas fa-download"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    resourcesList.innerHTML = html;
}

function loadInfo() {
    const infoList = document.getElementById('infoList');
    
    if (!infoList) return;
    
    let html = '';
    infoData.forEach(info => {
        html += `
            <div class="info-item">
                <span class="info-emoji">${info.emoji}</span>
                <div class="info-content">
                    <div class="info-title">${info.title}</div>
                    <div class="info-meta">
                        <div class="info-author">${info.author}</div>
                        <div class="info-date">${info.date}</div>
                    </div>
                </div>
            </div>
        `;
    });
    
    infoList.innerHTML = html;
}

// Utilitaires
function formatDateFrench(date) {
    const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 
                    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    
    return `${dayName} ${day} ${month}`;
}

// Page Mes données
function setupDataPageEvents() {
    // Gestionnaires pour la sidebar
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.getAttribute('data-section');
            showDataSection(section);
        });
    });
}

function showDataSection(section) {
    // Masquer toutes les sections
    const sections = document.querySelectorAll('.data-section');
    sections.forEach(s => s.classList.remove('active'));
    
    // Afficher la section demandée
    const targetSection = document.getElementById(section + 'Section');
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Mettre à jour la sidebar
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        const itemSection = item.getAttribute('data-section');
        if (itemSection === section) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Gestion des mots de passe
function setupPasswordForm() {
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', handlePasswordChange);
    }
}

function togglePasswordField(fieldId) {
    const field = document.getElementById(fieldId);
    const button = field.nextElementSibling;
    const icon = button.querySelector('i');
    
    if (field.type === 'password') {
        field.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        field.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

function handlePasswordChange(e) {
    e.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    const errorDiv = document.getElementById('passwordError');
    const errorText = document.getElementById('passwordErrorText');
    const successDiv = document.getElementById('passwordSuccess');
    
    // Masquer les messages précédents
    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';
    
    // Validation
    if (!currentPassword) {
        showPasswordError('Veuillez saisir votre mot de passe actuel');
        return;
    }
    
    if (!newPassword) {
        showPasswordError('Veuillez saisir un nouveau mot de passe');
        return;
    }
    
    if (newPassword.length < 8) {
        showPasswordError('Le nouveau mot de passe doit contenir au moins 8 caractères');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showPasswordError('Les nouveaux mots de passe ne correspondent pas');
        return;
    }
    
    if (currentPassword === newPassword) {
        showPasswordError('Le nouveau mot de passe doit être différent de l\'ancien');
        return;
    }
    
    // Vérifier le mot de passe actuel
    if (currentUser && currentUser.password !== currentPassword) {
        showPasswordError('Le mot de passe actuel est incorrect');
        return;
    }
    
    // Mettre à jour le mot de passe
    if (currentUser) {
        currentUser.password = newPassword;
        localStorage.setItem('pronote_user', JSON.stringify(currentUser));
        
        // Afficher le message de succès
        successDiv.style.display = 'flex';
        
        // Réinitialiser le formulaire
        document.getElementById('passwordForm').reset();
        
        // Masquer le message de succès après 5 secondes
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 5000);
    }
}

function showPasswordError(message) {
    const errorDiv = document.getElementById('passwordError');
    const errorText = document.getElementById('passwordErrorText');
    
    errorText.textContent = message;
    errorDiv.style.display = 'flex';
}

function resetPasswordForm() {
    document.getElementById('passwordForm').reset();
    document.getElementById('passwordError').style.display = 'none';
    document.getElementById('passwordSuccess').style.display = 'none';
}

// Page Notes
function setupNotesEvents() {
    const trimesterSelect = document.getElementById('trimesterSelect');
    if (trimesterSelect) {
        trimesterSelect.addEventListener('change', (e) => {
            loadNotesForTrimester(parseInt(e.target.value));
        });
    }
}

function loadNotesPage() {
    console.log('Chargement de la page Notes'); // Debug
    loadNotesForTrimester(3); // Charger le trimestre 3 par défaut
}

function loadNotesForTrimester(trimester) {
    console.log('Chargement du trimestre:', trimester); // Debug
    const data = notesData[trimester];
    const tableBody = document.getElementById('notesTableBody');
    const absencesInfo = document.getElementById('absencesInfo');
    const globalAppreciation = document.getElementById('globalAppreciation');
    
    if (!tableBody) {
        console.error('Element notesTableBody non trouvé'); // Debug
        return;
    }
    
    let html = '';
    
    // Générer les lignes pour chaque catégorie
    data.subjects.forEach(category => {
        // En-tête de catégorie
        html += `
            <tr class="category-header">
                <td colspan="3">
                    <strong>▼ ${category.category}</strong>
                </td>
            </tr>
        `;
        
        // Matières de la catégorie
        category.items.forEach(item => {
            html += `
                <tr>
                    <td>
                        <div class="subject-info">
                            <div class="subject-name">${item.subject}</div>
                            <div class="teacher-name">${item.teacher}</div>
                        </div>
                    </td>
                    <td class="averages-cell">
                        <div class="averages-container">
                            <span class="student-avg">${item.studentAvg}</span>
                            <span class="class-avg">${item.classAvg}</span>
                        </div>
                    </td>
                    <td class="appreciation-cell">${item.appreciation}</td>
                </tr>
            `;
        });
    });
    
    // Moyenne générale
    html += `
        <tr class="general-average">
            <td><strong>Moyenne générale</strong></td>
            <td class="averages-cell">
                <div class="averages-container">
                    <span class="student-avg">${data.generalAverage.student}</span>
                    <span class="class-avg">${data.generalAverage.class}</span>
                </div>
            </td>
            <td></td>
        </tr>
    `;
    
    tableBody.innerHTML = html;
    
    // Mettre à jour les informations complémentaires
    if (absencesInfo) {
        absencesInfo.textContent = `Absences : ${data.schoolLife.absences}`;
    }
    
    if (globalAppreciation) {
        globalAppreciation.textContent = data.globalAppreciation;
    }
    
    console.log('Notes chargées avec succès'); // Debug
}

// Fonction pour changer d'onglet dans les notes
function switchNotesTab(tab) {
    // Mettre à jour les boutons d'onglets
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        if (btn.getAttribute('data-tab') === tab) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Mettre à jour le contenu
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    const activeContent = document.getElementById(tab + 'Tab');
    if (activeContent) {
        activeContent.classList.add('active');
    }
}

// Fonction pour télécharger un bulletin
function downloadBulletin(bulletinId) {
    const bulletins = [
        { id: 1, title: 'Bulletin_Trimestre_1' },
        { id: 2, title: 'Bulletin_Trimestre_2' },
        { id: 3, title: 'Bulletin_Trimestre_3' }
    ];
    
    const bulletin = bulletins.find(b => b.id === bulletinId);
    if (bulletin) {
        // Simulation du téléchargement
        console.log(`Téléchargement du ${bulletin.title}.pdf`);
        alert(`Téléchargement du ${bulletin.title}.pdf en cours...`);
        // En production, ceci ferait un appel API pour télécharger le PDF
    }
}

// Page Vie scolaire
function loadVieScolairePage() {
    console.log('Chargement de la page Vie scolaire'); // Debug
    loadVieScolaireSchedule();
}

function loadVieScolaireSchedule() {
    const scheduleTable = document.getElementById('vieScolaireScheduleTable');
    const currentWeekLabel = document.getElementById('currentWeekLabelVieScolaire');
    
    // Mettre à jour les en-têtes des jours
    const mondayHeader = document.getElementById('mondayHeader');
    const tuesdayHeader = document.getElementById('tuesdayHeader');
    const wednesdayHeader = document.getElementById('wednesdayHeader');
    const thursdayHeader = document.getElementById('thursdayHeader');
    const fridayHeader = document.getElementById('fridayHeader');
    
    if (!scheduleTable || !currentWeekLabel) {
        console.error('Elements vie scolaire non trouvés'); // Debug
        return;
    }
    
    const week = scheduleData.weeks[currentWeekVieScolaire];
    const weekCourses = scheduleData.courses[currentWeekVieScolaire] || {};
    
    // Mettre à jour le label de la semaine
    currentWeekLabel.textContent = week.label;
    
    // Mettre à jour les en-têtes avec les dates
    if (mondayHeader) mondayHeader.textContent = `${week.days[0].name} ${week.days[0].date}`;
    if (tuesdayHeader) tuesdayHeader.textContent = `${week.days[1].name} ${week.days[1].date}`;
    if (wednesdayHeader) wednesdayHeader.textContent = `${week.days[2].name} ${week.days[2].date}`;
    if (thursdayHeader) thursdayHeader.textContent = `${week.days[3].name} ${week.days[3].date}`;
    if (fridayHeader) fridayHeader.textContent = `${week.days[4].name} ${week.days[4].date}`;
    
    let html = '';
    
    // Générer les lignes pour chaque créneau horaire
    week.timeSlots.forEach(time => {
        html += `<tr>`;
        html += `<td class="time-slot">${time}</td>`;
        
        // Pour chaque jour de la semaine (Lundi à Vendredi)
        for (let dayIndex = 0; dayIndex < 5; dayIndex++) {
            const dayCourses = weekCourses[dayIndex] || [];
            const courseAtTime = dayCourses.find(course => course.time === time);
            
            if (courseAtTime) {
                html += `
                    <td>
                        <div class="course-cell ${courseAtTime.color}">
                            <div class="course-info">
                                <div class="course-subject">${courseAtTime.subject}</div>
                                <div class="course-teacher">${courseAtTime.teacher}</div>
                                <div class="course-room">${courseAtTime.room}</div>
                            </div>
                        </div>
                    </td>
                `;
            } else {
                html += `<td class="empty-cell"></td>`;
            }
        }
        
        html += `</tr>`;
    });
    
    scheduleTable.innerHTML = html;
    console.log('Emploi du temps vie scolaire chargé'); // Debug
}

// Page Cahier de textes
function setupCahierTextesEvents() {
    // Les gestionnaires d'événements sont maintenant dans le HTML avec onclick
}

function loadCahierTextesPage() {
    console.log('Chargement de la page Cahier de textes'); // Debug
    loadCoursContent();
}

function switchCahierTextesTab(activeTab) {
    // Mettre à jour les boutons
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        if (btn.getAttribute('data-tab') === activeTab) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Mettre à jour le contenu
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    const activeContent = document.getElementById(activeTab + 'Tab');
    if (activeContent) {
        activeContent.classList.add('active');
    }
}

function loadCoursContent() {
    const coursContent = document.getElementById('coursContent');
    
    if (!coursContent) {
        console.error('Element coursContent non trouvé'); // Debug
        return;
    }
    
    let html = '';
    
    coursData.forEach(day => {
        html += `
            <div class="day-section">
                <h3 class="day-title">${day.date}</h3>
                <div class="courses-list">
        `;
        
        day.courses.forEach(course => {
            html += `
                <div class="course-item">
                    <div class="course-header">
                        <div class="course-meta">
                            <div class="course-subject">${course.subject}</div>
                            <div class="course-teacher">${course.teacher}</div>
                        </div>
                        <div class="course-time">${course.time}</div>
                    </div>
                    <div class="course-type">${course.type}</div>
                    <div class="course-content">${course.content}</div>
                    <div class="course-category">${course.category}</div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    });
    
    coursContent.innerHTML = html;
    console.log('Contenu des cours chargé'); // Debug
}

// Fonctions globales pour les événements onclick
window.togglePassword = togglePassword;
window.logout = logout;
window.toggleMobileMenu = toggleMobileMenu;
window.goToPage = goToPage;
window.previousDay = previousDay;
window.nextDay = nextDay;
window.previousWeekVieScolaire = previousWeekVieScolaire;
window.nextWeekVieScolaire = nextWeekVieScolaire;
window.togglePasswordField = togglePasswordField;
window.resetPasswordForm = resetPasswordForm;
window.switchNotesTab = switchNotesTab;
window.downloadBulletin = downloadBulletin;
window.switchCahierTextesTab = switchCahierTextesTab;