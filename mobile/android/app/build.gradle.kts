import java.io.FileInputStream
import java.util.Properties

// Release signing is read from android/key.properties, which is NEVER committed
// (see .gitignore). When it is absent — a fresh clone, or CI without the signing
// secrets — the release build falls back to the debug keys so `flutter run
// --release` still works locally. A fallback build is NOT publishable.
val keystorePropertiesFile = rootProject.file("key.properties")
val keystoreProperties = Properties()
val hasReleaseSigning = keystorePropertiesFile.exists()
if (hasReleaseSigning) {
    keystoreProperties.load(FileInputStream(keystorePropertiesFile))
}

plugins {
    id("com.android.application")
    id("kotlin-android")
    // START: FlutterFire Configuration
    id("com.google.gms.google-services")
    // END: FlutterFire Configuration
    // The Flutter Gradle Plugin must be applied after the Android and Kotlin Gradle plugins.
    id("dev.flutter.flutter-gradle-plugin")
}

android {
    namespace = "com.optimatech.optimatech_lms"
    compileSdk = flutter.compileSdkVersion
    ndkVersion = flutter.ndkVersion

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
        isCoreLibraryDesugaringEnabled = true
    }

    defaultConfig {
        applicationId = "com.optimatech.optimatech_lms"
        // You can update the following values to match your application needs.
        // For more information, see: https://flutter.dev/to/review-gradle-config.
        minSdk = flutter.minSdkVersion
        targetSdk = flutter.targetSdkVersion
        versionCode = flutter.versionCode
        versionName = flutter.versionName
    }

    signingConfigs {
        create("release") {
            if (hasReleaseSigning) {
                keyAlias = keystoreProperties["keyAlias"] as String
                keyPassword = keystoreProperties["keyPassword"] as String
                // Path in key.properties is resolved relative to mobile/android/.
                storeFile = rootProject.file(keystoreProperties["storeFile"] as String)
                storePassword = keystoreProperties["storePassword"] as String
            }
        }
    }

    buildTypes {
        release {
            signingConfig = if (hasReleaseSigning) {
                signingConfigs.getByName("release")
            } else {
                logger.warn(
                    "⚠️  android/key.properties not found — signing the release build with DEBUG keys. " +
                        "This build cannot be published. See docs/MOBILE_RELEASE.md.",
                )
                signingConfigs.getByName("debug")
            }

            // R8: shrink and obfuscate the Java/Kotlin side (plugins + embedding)
            // and drop unused resources. The Dart code is obfuscated separately by
            // `flutter build --obfuscate`; the two are complementary.
            //
            // Keep rules live in proguard-rules.pro. If a plugin misbehaves only in
            // release, suspect a missing keep rule before anything else — set
            // isMinifyEnabled = false to confirm, then add the rule.
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro",
            )
        }
    }
}

kotlin {
    compilerOptions {
        jvmTarget = org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17
    }
}

flutter {
    source = "../.."
}

dependencies {
    coreLibraryDesugaring("com.android.tools:desugar_jdk_libs:2.1.5")
}
