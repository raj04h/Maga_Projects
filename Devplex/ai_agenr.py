import os
import zipfile
import google.generativeai as genai

class GeminiAPI:
    def __init__(self, api_key: str, model_name: str = "gemini-2.0-flash"):
        self.api_key = api_key
        self.model_name = model_name
        self.client = self._configure_api()
        self.model = self._load_model()

    def _configure_api(self):
        try:
            genai.configure(api_key=self.api_key)
            print("[INFO] API Configured")
            return genai
        except Exception as e:
            print(f"[ERROR] Failed to configure API: {e}")
            return None

    def _load_model(self):
        try:
            return self.client.GenerativeModel(self.model_name)
        except Exception as e:
            print(f"[ERROR] Failed to load model: {e}")
            return None

    def generate_response(self, prompt: str):
        if not self.model:
            print("[ERROR] Model not initialized!")
            return None
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            print(f"[ERROR] API request failed: {e}")
            return None

class CodeGenerator:
    def __init__(self, api: GeminiAPI, output_dir="generated_output"):
        self.api = api
        self.output_dir = output_dir
        os.makedirs(self.output_dir, exist_ok=True)

    def get_user_input(self):
        return input("Write your prompt: ")

    def get_short_form(self, prompt):
        """
        Generates a short form of the prompt by taking the first letter of each word.
        If no valid word is found, returns 'output'.
        """
        words = prompt.split()
        short_form = "".join(word[0].lower() for word in words if word.isalpha())
        return short_form if short_form else "output"

    def save_code_to_file(self, base_dir, filename, code):
        file_path = os.path.join(base_dir, filename)
        try:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(code)
            print(f"[INFO] Code saved to {file_path}")
        except Exception as e:
            print(f"[ERROR] Failed to save {filename}: {e}")

    def zip_directory(self, folder_path, zip_name):
        zip_path = os.path.join(self.output_dir, zip_name)
        try:
            with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
                for root, dirs, files in os.walk(folder_path):
                    for file in files:
                        full_path = os.path.join(root, file)
                        arcname = os.path.relpath(full_path, folder_path)
                        zipf.write(full_path, arcname)
            print(f"[INFO] Folder zipped as {zip_path}")
        except Exception as e:
            print(f"[ERROR] Failed to create zip file: {e}")

    def generate_single_file(self, user_prompt, folder_name):
        print("\n[INFO] Generating single file code...\n")
        response = self.api.generate_response(user_prompt)
        if response:
            # Determine extension based on content heuristics
            if "import" in response or "def" in response:
                ext = "py"
            elif "<html>" in response:
                ext = "html"
            elif "class" in response:
                ext = "java"
            else:
                ext = "txt"
            filename = f"{folder_name}_output.{ext}"
            project_dir = os.path.join(self.output_dir, folder_name)
            os.makedirs(project_dir, exist_ok=True)
            self.save_code_to_file(project_dir, filename, response)
        else:
            print("\n[ERROR] Failed to generate code for single file.")

    def generate_website(self, user_prompt, folder_name):
        print("\n[INFO] Generating website code...\n")
        website_dir = os.path.join(self.output_dir, folder_name)
        html_dir = website_dir  # index.html in the root
        css_dir = os.path.join(website_dir, "css")
        js_dir = os.path.join(website_dir, "js")
        os.makedirs(css_dir, exist_ok=True)
        os.makedirs(js_dir, exist_ok=True)

        prompts = {
            f"{folder_name}_index.html": f"Generate a complete HTML code for a website based on the following prompt: {user_prompt}",
            f"{folder_name}_style.css": f"Generate a complete CSS stylesheet for a website based on the following prompt: {user_prompt}",
            f"{folder_name}_script.js": f"Generate JavaScript code for interactivity based on the following prompt: {user_prompt}"
        }

        for filename, prompt in prompts.items():
            print(f"[INFO] Generating {filename}...")
            response = self.api.generate_response(prompt)
            if response:
                if filename.endswith(".css"):
                    target_dir = css_dir
                elif filename.endswith(".js"):
                    target_dir = js_dir
                else:
                    target_dir = html_dir
                self.save_code_to_file(target_dir, filename, response)
            else:
                print(f"[ERROR] Failed to generate code for {filename}")

        readme_content = f"# Website Project\n\nThis project was generated based on the prompt: {user_prompt}\n"
        self.save_code_to_file(website_dir, "README.md", readme_content)
        zip_filename = f"{folder_name}_website.zip"
        self.zip_directory(website_dir, zip_filename)

    # ----------------- App Generation Methods -----------------

    def generate_android_app(self, user_prompt, folder_name):
        print("\n[INFO] Generating Android app code (Kotlin)...\n")
        project_dir = os.path.join(self.output_dir, folder_name)
        # Create Android folder structure
        java_dir = os.path.join(project_dir, "app", "src", "main", "java", "com", "example", folder_name)
        res_dir = os.path.join(project_dir, "app", "src", "main", "res", "layout")
        os.makedirs(java_dir, exist_ok=True)
        os.makedirs(res_dir, exist_ok=True)

        # Generate MainActivity.kt
        prompt_main = f"Generate Kotlin code for an Android app's MainActivity based on the prompt: {user_prompt}"
        main_activity_code = self.api.generate_response(prompt_main)
        if main_activity_code:
            self.save_code_to_file(java_dir, "MainActivity.kt", main_activity_code)
        else:
            print("[ERROR] Failed to generate MainActivity code")

        # Generate activity_main.xml layout
        prompt_layout = f"Generate XML layout code for an Android activity (activity_main.xml) based on the prompt: {user_prompt}"
        layout_code = self.api.generate_response(prompt_layout)
        if layout_code:
            self.save_code_to_file(res_dir, "activity_main.xml", layout_code)
        else:
            print("[ERROR] Failed to generate layout XML")

        # Generate build.gradle file
        prompt_gradle = f"Generate a basic build.gradle configuration for an Android app based on the prompt: {user_prompt}"
        gradle_code = self.api.generate_response(prompt_gradle)
        if gradle_code:
            self.save_code_to_file(project_dir, "build.gradle", gradle_code)
        else:
            print("[ERROR] Failed to generate build.gradle")

        readme = f"# Android App Project\nGenerated based on prompt: {user_prompt}\n"
        self.save_code_to_file(project_dir, "README.md", readme)
        zip_filename = f"{folder_name}_android_app.zip"
        self.zip_directory(project_dir, zip_filename)

    def generate_ios_app(self, user_prompt, folder_name):
        print("\n[INFO] Generating iOS app code (Swift)...\n")
        project_dir = os.path.join(self.output_dir, folder_name)
        sources_dir = os.path.join(project_dir, "Sources")
        os.makedirs(sources_dir, exist_ok=True)

        # Generate ViewController.swift
        prompt_vc = f"Generate Swift code for an iOS app's ViewController based on the prompt: {user_prompt}"
        vc_code = self.api.generate_response(prompt_vc)
        if vc_code:
            self.save_code_to_file(sources_dir, "ViewController.swift", vc_code)
        else:
            print("[ERROR] Failed to generate ViewController.swift")

        # Optionally generate Main.storyboard
        prompt_storyboard = f"Generate XML code for a Main.storyboard for an iOS app based on the prompt: {user_prompt}"
        storyboard_code = self.api.generate_response(prompt_storyboard)
        if storyboard_code:
            self.save_code_to_file(project_dir, "Main.storyboard", storyboard_code)
        else:
            print("[ERROR] Failed to generate Main.storyboard")

        readme = f"# iOS App Project\nGenerated based on prompt: {user_prompt}\n"
        self.save_code_to_file(project_dir, "README.md", readme)
        zip_filename = f"{folder_name}_ios_app.zip"
        self.zip_directory(project_dir, zip_filename)

    def generate_flutter_app(self, user_prompt, folder_name):
        print("\n[INFO] Generating Flutter app code (Dart)...\n")
        project_dir = os.path.join(self.output_dir, folder_name)
        lib_dir = os.path.join(project_dir, "lib")
        os.makedirs(lib_dir, exist_ok=True)

        # Generate main.dart
        prompt_main = f"Generate Dart code for a Flutter app's main.dart based on the prompt: {user_prompt}"
        main_dart = self.api.generate_response(prompt_main)
        if main_dart:
            self.save_code_to_file(lib_dir, "main.dart", main_dart)
        else:
            print("[ERROR] Failed to generate main.dart")

        # Generate pubspec.yaml
        prompt_pubspec = f"Generate a pubspec.yaml file for a Flutter app based on the prompt: {user_prompt}"
        pubspec = self.api.generate_response(prompt_pubspec)
        if pubspec:
            self.save_code_to_file(project_dir, "pubspec.yaml", pubspec)
        else:
            print("[ERROR] Failed to generate pubspec.yaml")

        readme = f"# Flutter App Project\nGenerated based on prompt: {user_prompt}\n"
        self.save_code_to_file(project_dir, "README.md", readme)
        zip_filename = f"{folder_name}_flutter_app.zip"
        self.zip_directory(project_dir, zip_filename)

    def generate_nodejs_app(self, user_prompt, folder_name):
        print("\n[INFO] Generating Node.js app code...\n")
        project_dir = os.path.join(self.output_dir, folder_name)
        os.makedirs(project_dir, exist_ok=True)

        # Generate app.js
        prompt_app = f"Generate Node.js code for a server-based application based on the prompt: {user_prompt}"
        app_js = self.api.generate_response(prompt_app)
        if app_js:
            self.save_code_to_file(project_dir, "app.js", app_js)
        else:
            print("[ERROR] Failed to generate app.js")

        # Generate package.json
        prompt_package = f"Generate a package.json file for a Node.js app based on the prompt: {user_prompt}"
        package_json = self.api.generate_response(prompt_package)
        if package_json:
            self.save_code_to_file(project_dir, "package.json", package_json)
        else:
            print("[ERROR] Failed to generate package.json")

        readme = f"# Node.js App Project\nGenerated based on prompt: {user_prompt}\n"
        self.save_code_to_file(project_dir, "README.md", readme)
        zip_filename = f"{folder_name}_nodejs_app.zip"
        self.zip_directory(project_dir, zip_filename)

    def generate_app(self, user_prompt, folder_name):
        lower_prompt = user_prompt.lower()
        if "android" in lower_prompt:
            self.generate_android_app(user_prompt, folder_name)
        elif "ios" in lower_prompt:
            self.generate_ios_app(user_prompt, folder_name)
        elif "flutter" in lower_prompt:
            self.generate_flutter_app(user_prompt, folder_name)
        elif "nodejs" in lower_prompt:
            self.generate_nodejs_app(user_prompt, folder_name)
        else:
            # Default to a generic mobile app (using Flutter)
            self.generate_flutter_app(user_prompt, folder_name)

    def generate_code(self):
        user_prompt = self.get_user_input().strip()
        if not user_prompt:
            print("[ERROR] No prompt provided.")
            return

        folder_name = self.get_short_form(user_prompt)
        lower_prompt = user_prompt.lower()
        if "website" in lower_prompt:
            self.generate_website(user_prompt, folder_name)
        elif "app" in lower_prompt:
            self.generate_app(user_prompt, folder_name)
        else:
            self.generate_single_file(user_prompt, folder_name)

if __name__ == "__main__":
    # Replace with your actual API key
    api_key = "AIzaSyB5YhK-9aAklDGJy0xxjg8mVm1FVJJBYy4"
    gemini_api = GeminiAPI(api_key)
    code_generator = CodeGenerator(gemini_api)
    code_generator.generate_code()
