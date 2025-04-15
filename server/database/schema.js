// Create a new user record based on the schema
export const createNewUserRecord = (uid, email) => {
  const now = new Date().toISOString();

  return {
    // Basic Info
    userId: uid, // Same as the Authentication UID
    email, // For easy queries without auth calls
    displayName: null, // Full name for display
    phoneNumber: null, // User's contact number
    createdAt: now, // When account was created
    lastLoginAt: now, // Last login timestamp

    // Account Status
    isActive: true, // Account status
    isVerified: false, // Email verification status

    // Farm Information
    farms: {
      // Example structure:
      // "farm-uuid-1": {
      //   farmName: "Green Valley Farm",
      //   location: "Springfield, IL",
      //   size: 150, // acres/hectares
      //   sizeUnit: "acre", // acre or hectare
      //   isDefault: true,
      //   fields: {},  // Will contain field IDs and basic info
      //   createdAt: timestamp
      // }
    }, // Object containing farm IDs and basic info
    primaryFarmId: null, // ID of the user's primary farm
    farmRole: null, // owner, manager, worker, etc.

    // Plan Information
    planTier: "basic", // basic, standard, premium, enterprise
    planStartDate: now, // When current plan started
    planExpiryDate: null, // When current plan expires
    paymentStatus: "active", // active, past_due, canceled
    planFeatures: {
      maxFarms: 1, // Number of farms allowed
      maxUsers: 5, // Number of team members allowed
      cropTracking: true, // Basic crop tracking
      livestockTracking: true, // Basic livestock tracking
      equipmentTracking: true, // Basic equipment tracking
      advancedReporting: false, // Advanced reporting features
      inventoryManagement: false, // Inventory management features
      financialTools: false, // Financial management tools
    },

    // Profile Completion
    profileCompleted: 0, // Percentage of profile completed
    profileStepsCompleted: {
      // Track specific completion steps
      basicInfo: false,
      farmDetails: false,
      teamMembers: false,
      cropSetup: false,
      livestockSetup: false,
      equipmentSetup: false,
    },

    // Usage Metrics
    totalLogins: 1, // Total number of logins
    lastActiveAt: now, // Last activity timestamp
    featureUsage: {
      cropManagement: 0,
      livestockManagement: 0,
      equipmentManagement: 0,
      inventoryManagement: 0,
      financialManagement: 0,
      reporting: 0,
      planning: 0,
    },

    // Preferences
    preferences: {
      theme: "light", // UI theme preference
      emailNotifications: false, // Whether to receive email notifications
      marketingEmails: false, // Marketing email opt-in
      measurementSystem: "imperial", // imperial or metric
      currency: "USD", // Default currency for financial data
      dateFormat: "MM/DD/YYYY", // Date format preference
      startOfWeek: "sunday", // sunday or monday
      weatherAlerts: false, // Weather alerts enabled
      mobileNotifications: false, // Mobile push notifications
    },

    // References to Other Collections
    teamIds: [], // References to teams this user belongs to

    // Farm Types
    farmTypes: {
      crops: false, // User farms crops
      livestock: false, // User has livestock
      dairy: false, // User has dairy operations
      poultry: false, // User has poultry
      organic: false, // User has organic certification
      hydroponics: false, // User has hydroponic systems
      aquaponics: false, // User has aquaponic systems
      other: false, // Other farming types
    },

    // Field-specific data tracking preferences
    fieldTracking: {
      soilTypes: true,
      soilHealth: true,
      cropRotation: true,
      irrigation: true,
      fertilization: true,
      pestManagement: true,
      yieldData: true,
      weatherImpact: true,
    },

    // Admin/Internal Fields
    notes: "", // Admin notes
    flags: [], // Special flags/tags
    internalRating: 0, // For internal use
    supportTickets: 0, // Number of open support tickets

    // Onboarding
    onboarding: {
      isComplete: false,
      currentStep: "welcome",
      completedSteps: [],
      lastUpdated: now,
    },

    // Custom Claims
    customClaims: {
      admin: false,
      owner: false, // Farm owner
      manager: false, // Farm manager
      worker: false, // Farm worker
      readOnly: false, // Read-only access
      roles: [], // Custom roles
      permissions: ["profile:read", "profile:edit"],
      subscription: "basic",
      beta: false, // Access to beta features
    },

    // Weather Settings
    weatherSettings: {
      locations: [], // List of saved weather locations
      alertTypes: {
        frost: true,
        heavyRain: true,
        drought: true,
        extremeHeat: true,
        strongWinds: true,
      },
    },

    // Integrations
    integrations: {
      weatherService: false,
      equipmentAPI: false,
      financialSoftware: false,
      marketplaceAPI: false,
      sensorNetworks: false,
    },

    updatedAt: now,
  };
};
