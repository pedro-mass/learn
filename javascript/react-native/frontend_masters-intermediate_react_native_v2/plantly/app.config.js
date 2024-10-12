const IS_DEV = process.env.NODE_ENV === "development";
const IS_PREVIEW = process.env.NODE_ENV === "preview";

const getUniqueIdentifier = () => {
  const appId = "com.anonymous.plantly";

  if (IS_DEV) {
    return `${appId}.dev`;
  }

  if (IS_PREVIEW) {
    return `${appId}.preview`;
  }

  return appId;
};

const getAppName = () => {
  const appName = "Plantly";

  if (IS_DEV) {
    return `${appName} (Dev)`;
  }

  if (IS_PREVIEW) {
    return `${appName} (Preview)`;
  }

  return appName;
};

export default {
  expo: {
    name: getAppName(),
    slug: "plantly",
    scheme: "plantly",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: getUniqueIdentifier(),
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.anonymous.plantly",
    },
    web: {
      favicon: "./assets/favicon.png",
      bundler: "metro",
    },
    plugins: ["expo-router"],
    extra: {
      eas: {
        projectId: "850aca81-95bb-42d1-b4b0-b45e420a0cee",
      },
    },
    owner: "pedromass",
  },
};
