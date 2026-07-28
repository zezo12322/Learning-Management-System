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
once, on a machine you control.

Run it **outside the repository folder** (e.g. `~/keys`, `C:\Users\<you>\keys`) so
it cannot be committed by accident.

`keytool` ships with the JDK, not with Flutter. If it is not on your `PATH`, use
the one Android Studio bundles:

- Windows — `& "$env:LOCALAPPDATA\Programs\Android Studio\jbr\bin\keytool.exe"`
  (or under `C:\Program Files\Android\Android Studio\jbr\bin\`)
- macOS — `/Applications/Android Studio.app/Contents/jbr/Contents/Home/bin/keytool`

**macOS / Linux (bash):**
```bash
keytool -genkey -v -keystore upload-keystore.jks \
  -keyalg RSA -keysize 2048 -validity 10000 -alias upload
```

**Windows (PowerShell)** — one line. PowerShell does **not** understand bash's
`\` line-continuation; pasting the multi-line block above fails with
`Illegal option: \`. Its own continuation character is a trailing backtick.
```powershell
keytool -genkey -v -keystore upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
```

It then prompts for a **store password**, the certificate fields (name, org,
city, two-letter country code — `EG`), and finally a **key password** (Enter
reuses the store password). Nothing is echoed as you type the passwords.

> **Type passwords in ASCII.** With an Arabic keyboard layout active you will
> silently produce Arabic characters. The JVM encodes a non-ASCII password using
> the platform's default charset, so a keystore created on Windows can then fail
> to open on the Linux CI runner. Switch layout to English first.

### Verify the keystore before you rely on it
A mistyped password is invisible at creation and only surfaces later as a failed
CI build. Check it immediately (single line, same on every OS):

```bash
keytool -list -v -keystore upload-keystore.jks -alias upload
```
If it prints the certificate, the **store password** is correct — and the output
confirms the alias, which must match `ANDROID_KEY_ALIAS` exactly.

`-list` never touches the **key** password. To check that one, ask for something
that needs the private key:

```bash
keytool -certreq -alias upload -keystore upload-keystore.jks
```
It prompts for the store password, then the key password, and prints a CSR on
success. Nothing is written and nothing is sent anywhere — discard the output.

In practice the two are usually identical: on JDK 9+ `keytool` creates a **PKCS12**
keystore even for a `.jks` filename, and PKCS12 does not support a separate key
password — so pressing Enter at the key-password prompt is the normal path, and
`ANDROID_KEY_PASSWORD` gets the same value as `ANDROID_KEYSTORE_PASSWORD`.

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

`storeFile` is resolved relative to `mobile/android/`. If you point it at an
absolute Windows path, write it with **forward slashes** (`C:/Users/you/keys/…`)
or doubled backslashes — `\` is an escape character in a `.properties` file, so
`C:\Users\…` silently resolves to the wrong path.

### For CI builds
Add these repository secrets (Settings → Secrets and variables → Actions →
**New repository secret**, one per row):

| Secret | Value |
|---|---|
| `ANDROID_KEYSTORE_BASE64` | the keystore, base64-encoded (below) |
| `ANDROID_KEYSTORE_PASSWORD` | store password |
| `ANDROID_KEY_ALIAS` | e.g. `upload` |
| `ANDROID_KEY_PASSWORD` | key password |

Encoding the keystore — the result must be **one line with no wrapping**, because
the workflow pipes it straight into `base64 -d`:

```bash
base64 -w0 upload-keystore.jks              # Linux
base64 -i upload-keystore.jks | tr -d '\n'  # macOS
```
```powershell
# Windows: straight to the clipboard, so the value never lands in a file or in
# your shell history. Then paste into the secret field.
[Convert]::ToBase64String([IO.File]::ReadAllBytes("upload-keystore.jks")) | Set-Clipboard
```
Do **not** use `certutil -encode` on Windows — it wraps the output and adds
`-----BEGIN CERTIFICATE-----` headers, which `base64 -d` will not accept.

Paste these values into GitHub directly. Don't route a keystore or a password
through chat, email or a ticket — anything you paste there is stored by whatever
you pasted it into.

Until `ANDROID_KEYSTORE_BASE64` exists the workflow still builds, but warns and
marks the artifact as not publishable. Once all four secrets are set, the run
summary shows `Signing: ✅ release keystore` — that line is the proof they were
picked up correctly.

## 3. Building

**Via CI (recommended — reproducible):** Actions → **Build Android Release** →
*Run workflow*, choose `apk`, `appbundle`, or `both`. Pushing a `v*` tag builds an
APK automatically.

Artifacts produced:
- `app-release-apk` / `app-release-aab`
- `deobfuscation-symbols` — Dart symbols **and** R8 `mapping.txt`

**Locally** (these are single-line, so they run as-is in bash *and* PowerShell):
```bash
cd mobile
flutter build apk --release --obfuscate --split-debug-info=build/symbols
# Play Store prefers an App Bundle:
flutter build appbundle --release --obfuscate --split-debug-info=build/symbols
```

A local release build signs with whatever `android/key.properties` points at — and
with **debug keys** if that file is missing, printing a warning from Gradle. Check
what you actually got before shipping it anywhere, using `apksigner` from the
Android SDK (`$ANDROID_HOME/build-tools/<version>/`, `apksigner.bat` on Windows):

```bash
apksigner verify --print-certs build/app/outputs/flutter-apk/app-release.apk
```
A signer `CN=Android Debug` means it is debug-signed and not publishable. Prefer
`apksigner` over `keytool -printcert -jarfile` here: modern builds may carry only
v2/v3 signatures, which `keytool` cannot read.

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
