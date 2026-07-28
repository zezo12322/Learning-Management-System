# R8 keep rules for the release build (isMinifyEnabled = true).
#
# Most Flutter plugins ship their own consumer rules, so this file only covers
# what R8 cannot infer: reflection, native/JNI entry points, and model classes
# used for (de)serialization. Rules are grouped by the plugin that needs them.
#
# If something works in debug but breaks in release, it is almost always a
# missing keep rule here. Reproduce with `isMinifyEnabled = false`, find the
# class in the stack trace, add a rule, re-enable.

# ── Flutter embedding + plugin registration ─────────────────────────────────
# Referenced from native code and via reflection by the generated registrant.
-keep class io.flutter.** { *; }
-keep class io.flutter.plugins.** { *; }
-keep class io.flutter.embedding.** { *; }
-dontwarn io.flutter.embedding.**

# ── Firebase (core, auth, firestore, storage, messaging, analytics,
#    data connect, app check) ────────────────────────────────────────────────
# Firestore/Data Connect map documents onto model classes reflectively, and FCM
# instantiates the service declared in the manifest by name.
-keep class com.google.firebase.** { *; }
-keep class com.google.android.gms.** { *; }
-dontwarn com.google.firebase.**
-dontwarn com.google.android.gms.**
-keepattributes Signature
-keepattributes *Annotation*
-keepattributes EnclosingMethod
-keepattributes InnerClasses

# ── Google Sign-In ──────────────────────────────────────────────────────────
-keep class com.google.android.gms.auth.** { *; }
-keep class com.google.android.gms.common.** { *; }

# ── flutter_local_notifications ─────────────────────────────────────────────
# Schedules are deserialized with Gson, so the model classes must keep members.
-keep class com.dexterous.** { *; }
-keep class com.dexterous.flutterlocalnotifications.models.** { *; }

# ── Gson (used transitively by several plugins) ─────────────────────────────
-keepclassmembers,allowobfuscation class * {
  @com.google.gson.annotations.SerializedName <fields>;
}
-keep class * extends com.google.gson.reflect.TypeToken
-dontwarn sun.misc.**

# ── flutter_secure_storage ──────────────────────────────────────────────────
-keep class androidx.security.crypto.** { *; }

# ── video_player / ExoPlayer (Media3) ───────────────────────────────────────
# Renderers and extractors are resolved by name at runtime.
-keep class androidx.media3.** { *; }
-dontwarn androidx.media3.**

# ── permission_handler / image_picker / file_picker ─────────────────────────
-keep class androidx.core.content.FileProvider { *; }
-keep class androidx.lifecycle.DefaultLifecycleObserver

# ── Kotlin coroutines internals ────────────────────────────────────────────
-dontwarn kotlinx.coroutines.**
-keepclassmembers class kotlinx.coroutines.** { volatile <fields>; }

# ── Keep annotations that drive runtime behaviour, and enum values ──────────
# Enum valueOf/values are called reflectively by several serializers.
-keepclassmembers enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}

# ── Preserve line numbers so obfuscated crash traces stay mappable ──────────
# Pair this with the mapping.txt produced under
# build/app/outputs/mapping/release/ — archive it with every release.
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile
