# Android Release: building a signed, obfuscated APK

How to produce a publishable build of the Flutter app, and what the obfuscation
does and does not protect.

## 1. What "obfuscation" actually means here

Two independent layers, both enabled:

| Layer | Covers | Enabled by |
|---|---|---|
| **Dart obfuscation** | Your app logic — every Dart class, method and field name inside `libapp.so` | `flutter build --obfuscate --split-debug-info=…` in `.github/workflows/build-apk.yml` |
| **R8 shrink + obfuscate** | The Java/Kotlin side: plugin code, the Flutter embedding, unused resources | `isMinifyEnabled` / `isShrinkResources` in `android/app/build.gradle.kts` |

### Be clear about the limits
Obfuscation raises the cost of reverse engineering. It is **not encryption**, and
an APK cannot be meaningfully encrypted — the device has to be able to run it, so
whatever unwraps it ships alongside it. Concretely, obfuscation does **not** hide:

- **Anything you put in the binary as a literal** — API keys, endpoints, tokens.
  The Firebase client keys in `firebase_options.dart` are extractable, and that is
  fine: they are public by design, and access is governed by Firebase Security
  Rules and **App Check**, not by secrecy.
- **Your network traffic.** Anyone can proxy the app and watch the API calls. The
  server is what must enforce authorization — which is why the backend has
  `RolesGuard` / `CourseAccessGuard` and enrollment checks on streaming.
- **Your video content**, beyond the signed-URL + short-lived key-token scheme
  already implemented.

So treat obfuscation as friction, and keep the real controls server-side. If
protecting premium content is the actual goal, the lever is DRM and App Check —
not the APK.

## 2. One-time setup: create the upload keystore

The release build currently falls back to **debug keys** when no keystore is
configured, and a debug-signed APK **cannot be published**. Create the keystore
once, on a machine you control:

```bash
keytool -genkey -v -keystore upload-keystore.jks \
  -keyalg RSA -keysize 2048 -validity 10000 -alias upload
```

> **Guard this file like a production credential.** If it is lost, you can never
> ship an update to the same Play Store listing again. Back it up somewhere
> durable and private. `key.properties`, `*.jks` and `*.keystore` are already
> gitignored — never commit them. (This repo has already leaked one credential
> through git history; see `OPERATIONS.md` §5.)

### For local release builds
Create `mobile/android/key.properties` (gitignored):

```properties
storeFile=upload-keystore.jks
storePassword=<store password>
keyAlias=upload
keyPassword=<key password>
```

`storeFile` is resolved relative to `mobile/android/`.

### For CI builds
Add these repository secrets (Settings → Secrets and variables → Actions):

| Secret | Value |
|---|---|
| `ANDROID_KEYSTORE_BASE64` | `base64 -w0 upload-keystore.jks` |
| `ANDROID_KEYSTORE_PASSWORD` | store password |
| `ANDROID_KEY_ALIAS` | e.g. `upload` |
| `ANDROID_KEY_PASSWORD` | key password |

Until `ANDROID_KEYSTORE_BASE64` exists the workflow still builds, but warns and
marks the artifact as not publishable.

## 3. Building

**Via CI (recommended — reproducible):** Actions → **Build Android Release** →
*Run workflow*, choose `apk`, `appbundle`, or `both`. Pushing a `v*` tag builds an
APK automatically.

Artifacts produced:
- `app-release-apk` / `app-release-aab`
- `deobfuscation-symbols` — Dart symbols **and** R8 `mapping.txt`

**Locally:**
```bash
cd mobile
flutter build apk --release --obfuscate --split-debug-info=build/symbols
# Play Store prefers an App Bundle:
flutter build appbundle --release --obfuscate --split-debug-info=build/symbols
```

## 4. Keep the symbols — this is not optional

An obfuscated build produces stack traces like `#0 aB.cD (package:…)`. They are
unreadable without the artifacts from the exact build that produced them.

```bash
# Dart stack traces
flutter symbolize -i <crash.txt> -d build/symbols/app.android-arm64.symbols
```
R8's `mapping.txt` does the same for Java/Kotlin traces. **Archive both with every
release you publish** — the CI artifact is retained for 90 days, which is not
long enough for a release you support for a year.

## 5. Before publishing: smoke-test on a real device

R8 can only be validated at runtime — a missing keep rule shows up as a crash in
release that never happens in debug. Install the artifact and check at minimum:

- login (email + Google), and sign-out
- catalog loads, course detail opens
- video playback, and that progress is saved
- a quiz submission
- payment checkout opens

If something breaks only in release, it is almost certainly a missing keep rule:
set `isMinifyEnabled = false` in `android/app/build.gradle.kts` to confirm, then
add the rule to `android/app/proguard-rules.pro` rather than leaving R8 off.
